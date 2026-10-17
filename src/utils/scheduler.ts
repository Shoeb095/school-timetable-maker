import type { SlotsMap, Teacher, ClassInfo, AppSettings } from '../types';
import { isMathSubject, parseSubjectRequirements } from './validator';

export interface GenerationResult {
  slots: SlotsMap;
  unfilledCount: number;
  unfilledByClass: Record<string, Record<string, number>>;
  allocatedCatchUpCount: number;
}

/**
 * Checks if teacher would exceed 3 consecutive periods if placed at (day, period)
 */
function wouldTeacherExceedConsecutive(
  teacherPeriodsOnDay: Set<number>,
  period: number,
  maxPeriodsToday: number
): boolean {
  let consecutiveBefore = 0;
  for (let p = period - 1; p >= 0; p--) {
    if (teacherPeriodsOnDay.has(p)) consecutiveBefore++;
    else break;
  }
  let consecutiveAfter = 0;
  for (let p = period + 1; p < maxPeriodsToday; p++) {
    if (teacherPeriodsOnDay.has(p)) consecutiveAfter++;
    else break;
  }
  return consecutiveBefore + 1 + consecutiveAfter > 3;
}

/**
 * Generates or auto-fills timetable for specified classes while strictly adhering to all 5 hard rules.
 */
export function generateSchedule(
  currentSlots: SlotsMap,
  targetClassNames: string[],
  teachers: Teacher[],
  classes: ClassInfo[],
  settings: AppSettings,
  preserveExisting: boolean = true,
  catchUpShortfalls?: Record<string, Record<string, number>>
): GenerationResult {
  const classMap = new Map<string, ClassInfo>(classes.map(c => [c.name, c]));

  let bestResult: {
    slots: SlotsMap;
    unfilledCount: number;
    unfilledByClass: Record<string, Record<string, number>>;
    catchUpAllocated: number;
  } | null = null;

  const numAttempts = 40;

  for (let attempt = 0; attempt < numAttempts; attempt++) {
    const sl: SlotsMap = preserveExisting ? { ...currentSlots } : {};
    
    // If not preserving existing for target classes, remove target classes' slots
    if (!preserveExisting) {
      for (const k of Object.keys(currentSlots)) {
        const [c] = k.split('|');
        if (!targetClassNames.includes(c)) {
          sl[k] = currentSlots[k];
        }
      }
    }

    // State tracking
    // teacherId -> weekly load
    const teacherWeeklyLoad = new Map<number, number>();
    // teacherId|day -> Set of periods
    const teacherDayPeriods = new Map<string, Set<number>>();
    // teacherId|day|period -> boolean
    const teacherBusy = new Map<string, boolean>();
    // className|day|subject -> count
    const classDaySubjectCount = new Map<string, number>();

    // Initialize tracking from existing slots
    for (const [key, slot] of Object.entries(sl)) {
      const [c, dStr, pStr] = key.split('|');
      const d = parseInt(dStr, 10);
      const p = parseInt(pStr, 10);
      const tId = slot.t;
      const subj = slot.s;

      teacherWeeklyLoad.set(tId, (teacherWeeklyLoad.get(tId) || 0) + 1);

      const tdKey = `${tId}|${d}`;
      if (!teacherDayPeriods.has(tdKey)) {
        teacherDayPeriods.set(tdKey, new Set<number>());
      }
      teacherDayPeriods.get(tdKey)!.add(p);

      teacherBusy.set(`${tId}|${d}|${p}`, true);

      const cdsKey = `${c}|${d}|${subj.toLowerCase()}`;
      classDaySubjectCount.set(cdsKey, (classDaySubjectCount.get(cdsKey) || 0) + 1);
    }

    // Calculate remaining demands per target class
    const remainingDemands: Record<string, Record<string, number>> = {};
    const catchUpDemands: Record<string, Record<string, number>> = {};

    for (const className of targetClassNames) {
      remainingDemands[className] = {};
      catchUpDemands[className] = {};
      const cl = classMap.get(className);
      if (!cl) continue;

      const baseReqs = parseSubjectRequirements(cl.subs);
      for (const [subj, count] of Object.entries(baseReqs)) {
        remainingDemands[className][subj] = count;
      }

      // Add catch-up shortfalls if provided
      if (catchUpShortfalls && catchUpShortfalls[className]) {
        for (const [subj, count] of Object.entries(catchUpShortfalls[className])) {
          catchUpDemands[className][subj] = (catchUpDemands[className][subj] || 0) + count;
        }
      }

      // Subtract already placed slots
      for (const [key, slot] of Object.entries(sl)) {
        const [c] = key.split('|');
        if (c === className) {
          const s = slot.s;
          if (remainingDemands[className][s] && remainingDemands[className][s] > 0) {
            remainingDemands[className][s]--;
          }
        }
      }
    }

    // Prepare list of unassigned (day, period) slots for each class
    // Randomize class processing order
    const shuffledClasses = [...targetClassNames].sort(() => Math.random() - 0.5);

    // Phase 1: Regular weekly curriculum requirements
    for (const c of shuffledClasses) {
      // Find all empty slots for this class
      const emptySlots: { day: number; period: number }[] = [];
      for (let d = 0; d < settings.days; d++) {
        const maxP = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
        for (let p = 0; p < maxP; p++) {
          if (!sl[`${c}|${d}|${p}`]) {
            emptySlots.push({ day: d, period: p });
          }
        }
      }

      // Shuffle slots with slight bias
      emptySlots.sort(() => Math.random() - 0.5);

      for (const { day, period } of emptySlots) {
        if (sl[`${c}|${day}|${period}`]) continue;
        const maxP = settings.periodsPerDay[day] ?? settings.periodsPerDay[0] ?? 7;
        const isLastPeriod = period === maxP - 1;

        // Candidate subjects needing periods for this class
        const candidateSubjects = Object.keys(remainingDemands[c] || {})
          .filter(s => (remainingDemands[c][s] || 0) > 0)
          // Rule 3: Last period of class's day is NEVER Maths
          .filter(s => !(isLastPeriod && isMathSubject(s)))
          // Rule 5: Avoid same subject > 2 times on this day
          .filter(s => (classDaySubjectCount.get(`${c}|${day}|${s.toLowerCase()}`) || 0) < 2)
          .map(s => {
            const count = remainingDemands[c][s];
            const alreadyToday = classDaySubjectCount.get(`${c}|${day}|${s.toLowerCase()}`) || 0;
            // Prefer subjects with higher remaining count, penalize if already taught today
            const score = count * 2 - alreadyToday * 5 + Math.random() * 2;
            return { s, score };
          })
          .sort((a, b) => b.score - a.score);

        for (const { s: subj } of candidateSubjects) {
          // Find eligible teachers for this subject
          // Match by subject name or class allotment
          const eligibleTeachers = teachers.filter(t => {
            const matchesSubj = t.subj && (
              t.subj.toLowerCase() === subj.toLowerCase() ||
              t.subj.toLowerCase().includes(subj.toLowerCase()) ||
              subj.toLowerCase().includes(t.subj.toLowerCase())
            );
            const matchesClass = t.allottedClasses && (
              t.allottedClasses.includes(c) ||
              t.allottedClasses.toLowerCase().includes(c.toLowerCase())
            );
            return matchesSubj || matchesClass;
          });

          // Fallback to any teacher with matching subject if none specific
          const pool = eligibleTeachers.length > 0 ? eligibleTeachers : teachers.filter(t => 
            t.subj && t.subj.toLowerCase().includes(subj.toLowerCase())
          );

          // Filter against hard rules:
          // Rule 1: Max 30 periods/week
          // Rule 4: Not busy at (day, period)
          // Rule 2: Consecutive teaching <= 3
          const validTeachers = pool.filter(t => {
            const currentLoad = teacherWeeklyLoad.get(t.id) || 0;
            const maxLoad = t.maxLoad ?? settings.maxLoad ?? 30;
            if (currentLoad >= maxLoad) return false;

            if (teacherBusy.get(`${t.id}|${day}|${period}`)) return false;

            const tDayPeriods = teacherDayPeriods.get(`${t.id}|${day}`) || new Set<number>();
            if (wouldTeacherExceedConsecutive(tDayPeriods, period, maxP)) return false;

            return true;
          });

          if (validTeachers.length === 0) continue;

          // Pick teacher with lowest current weekly load
          validTeachers.sort((a, b) => (teacherWeeklyLoad.get(a.id) || 0) - (teacherWeeklyLoad.get(b.id) || 0));
          const chosenTeacher = validTeachers[0];

          // Assign slot
          const key = `${c}|${day}|${period}`;
          sl[key] = { t: chosenTeacher.id, s: subj };

          teacherWeeklyLoad.set(chosenTeacher.id, (teacherWeeklyLoad.get(chosenTeacher.id) || 0) + 1);
          teacherBusy.set(`${chosenTeacher.id}|${day}|${period}`, true);

          const tdKey = `${chosenTeacher.id}|${day}`;
          if (!teacherDayPeriods.has(tdKey)) {
            teacherDayPeriods.set(tdKey, new Set<number>());
          }
          teacherDayPeriods.get(tdKey)!.add(period);

          const cdsKey = `${c}|${day}|${subj.toLowerCase()}`;
          classDaySubjectCount.set(cdsKey, (classDaySubjectCount.get(cdsKey) || 0) + 1);

          remainingDemands[c][subj]--;
          break; // successfully placed this slot
        }
      }
    }

    // Phase 2: Catch-Up scheduling into remaining empty slots (without breaking hard rules)
    let catchUpAllocated = 0;
    if (catchUpShortfalls) {
      for (const c of shuffledClasses) {
        const catchUpMap = catchUpDemands[c] || {};
        for (let d = 0; d < settings.days; d++) {
          const maxP = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
          for (let p = 0; p < maxP; p++) {
            const key = `${c}|${daySlotKey(d, p)}`;
            if (sl[key]) continue;
            const isLast = p === maxP - 1;

            const neededCatchUps = Object.keys(catchUpMap)
              .filter(s => catchUpMap[s] > 0)
              .filter(s => !(isLast && isMathSubject(s)))
              .filter(s => (classDaySubjectCount.get(`${c}|${d}|${s.toLowerCase()}`) || 0) < 2);

            for (const subj of neededCatchUps) {
              const eligibleTeachers = teachers.filter(t => {
                const currentLoad = teacherWeeklyLoad.get(t.id) || 0;
                const maxLoad = t.maxLoad ?? settings.maxLoad ?? 30;
                if (currentLoad >= maxLoad) return false;
                if (teacherBusy.get(`${t.id}|${d}|${p}`)) return false;

                const tDayPeriods = teacherDayPeriods.get(`${t.id}|${d}`) || new Set<number>();
                if (wouldTeacherExceedConsecutive(tDayPeriods, p, maxP)) return false;

                const matchesSubj = t.subj && t.subj.toLowerCase().includes(subj.toLowerCase());
                return matchesSubj;
              });

              if (eligibleTeachers.length > 0) {
                eligibleTeachers.sort((a, b) => (teacherWeeklyLoad.get(a.id) || 0) - (teacherWeeklyLoad.get(b.id) || 0));
                const chosen = eligibleTeachers[0];

                sl[key] = { t: chosen.id, s: subj, isCatchUp: true };
                teacherWeeklyLoad.set(chosen.id, (teacherWeeklyLoad.get(chosen.id) || 0) + 1);
                teacherBusy.set(`${chosen.id}|${d}|${p}`, true);

                const tdKey = `${chosen.id}|${d}`;
                if (!teacherDayPeriods.has(tdKey)) {
                  teacherDayPeriods.set(tdKey, new Set<number>());
                }
                teacherDayPeriods.get(tdKey)!.add(p);

                const cdsKey = `${c}|${d}|${subj.toLowerCase()}`;
                classDaySubjectCount.set(cdsKey, (classDaySubjectCount.get(cdsKey) || 0) + 1);

                catchUpMap[subj]--;
                catchUpAllocated++;
                break;
              }
            }
          }
        }
      }
    }

    // Evaluate attempt
    let totalUnfilled = 0;
    const unfilledByClass: Record<string, Record<string, number>> = {};
    for (const c of targetClassNames) {
      unfilledByClass[c] = {};
      for (const [subj, count] of Object.entries(remainingDemands[c] || {})) {
        if (count > 0) {
          unfilledByClass[c][subj] = count;
          totalUnfilled += count;
        }
      }
    }

    if (!bestResult || totalUnfilled < bestResult.unfilledCount) {
      bestResult = {
        slots: sl,
        unfilledCount: totalUnfilled,
        unfilledByClass,
        catchUpAllocated
      };
      if (totalUnfilled === 0) break; // Perfect match found!
    }
  }

  return {
    slots: bestResult!.slots,
    unfilledCount: bestResult!.unfilledCount,
    unfilledByClass: bestResult!.unfilledByClass,
    allocatedCatchUpCount: bestResult!.catchUpAllocated
  };
}

function daySlotKey(day: number, period: number): string {
  return `${day}|${period}`;
}

export interface SubstitutionResult {
  slots: SlotsMap;
  substitutedCount: number;
  unsubstitutedCount: number;
  details: {
    className: string;
    day: number;
    period: number;
    subject: string;
    absentTeacherId: number;
    substituteTeacherId?: number;
    success: boolean;
  }[];
}

/**
 * Automatically assigns available teachers to cover for absent teachers
 * without violating any of the 5 hard rules (max 30 periods, <= 3 consecutive, no double-booking).
 */
export function autoAssignSubstitutes(
  currentSlots: SlotsMap,
  absentTeacherIds: number[],
  teachers: Teacher[],
  settings: AppSettings,
  dayFilter?: number
): SubstitutionResult {
  const sl: SlotsMap = { ...currentSlots };
  const absentSet = new Set<number>(absentTeacherIds);
  const details: SubstitutionResult['details'] = [];
  let substitutedCount = 0;
  let unsubstitutedCount = 0;

  // Track teacher loads & busy states
  const teacherWeeklyLoad = new Map<number, number>();
  const teacherDayPeriods = new Map<string, Set<number>>();
  const teacherBusy = new Map<string, boolean>();

  for (const [key, slot] of Object.entries(sl)) {
    const [, dStr, pStr] = key.split('|');
    const d = parseInt(dStr, 10);
    const p = parseInt(pStr, 10);
    const tId = slot.t;

    // Only count load if teacher is not absent
    if (!absentSet.has(tId)) {
      teacherWeeklyLoad.set(tId, (teacherWeeklyLoad.get(tId) || 0) + 1);
      const tdKey = `${tId}|${d}`;
      if (!teacherDayPeriods.has(tdKey)) {
        teacherDayPeriods.set(tdKey, new Set<number>());
      }
      teacherDayPeriods.get(tdKey)!.add(p);
      teacherBusy.set(`${tId}|${d}|${p}`, true);
    }
  }

  // Find all affected slots
  for (const [key, slot] of Object.entries(sl)) {
    const [c, dStr, pStr] = key.split('|');
    const d = parseInt(dStr, 10);
    const p = parseInt(pStr, 10);

    if (dayFilter !== undefined && d !== dayFilter) continue;

    if (absentSet.has(slot.t)) {
      const originalTId = slot.originalTeacherId || slot.t;
      const subj = slot.s;
      const maxP = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;

      // Find eligible substitutes
      // Filter candidates who are NOT absent, NOT busy at (d, p), under 30 periods, and won't exceed 3 consecutive
      const candidates = teachers.filter(t => {
        if (absentSet.has(t.id)) return false;
        const curLoad = teacherWeeklyLoad.get(t.id) || 0;
        const max = t.maxLoad ?? settings.maxLoad ?? 30;
        if (curLoad >= max) return false;

        if (teacherBusy.get(`${t.id}|${d}|${p}`)) return false;

        const tDayPeriods = teacherDayPeriods.get(`${t.id}|${d}`) || new Set<number>();
        if (wouldTeacherExceedConsecutive(tDayPeriods, p, maxP)) return false;

        return true;
      });

      if (candidates.length > 0) {
        // Score candidates: prefer same subject, then lowest current load
        candidates.sort((a, b) => {
          const aMatch = a.subj && a.subj.toLowerCase().includes(subj.toLowerCase()) ? 1 : 0;
          const bMatch = b.subj && b.subj.toLowerCase().includes(subj.toLowerCase()) ? 1 : 0;
          if (aMatch !== bMatch) return bMatch - aMatch;
          return (teacherWeeklyLoad.get(a.id) || 0) - (teacherWeeklyLoad.get(b.id) || 0);
        });

        const chosen = candidates[0];

        // Apply substitution
        sl[key] = {
          ...slot,
          t: chosen.id,
          isSubstituted: true,
          originalTeacherId: originalTId
        };

        teacherWeeklyLoad.set(chosen.id, (teacherWeeklyLoad.get(chosen.id) || 0) + 1);
        teacherBusy.set(`${chosen.id}|${d}|${p}`, true);

        const tdKey = `${chosen.id}|${d}`;
        if (!teacherDayPeriods.has(tdKey)) {
          teacherDayPeriods.set(tdKey, new Set<number>());
        }
        teacherDayPeriods.get(tdKey)!.add(p);

        substitutedCount++;
        details.push({
          className: c,
          day: d,
          period: p,
          subject: subj,
          absentTeacherId: originalTId,
          substituteTeacherId: chosen.id,
          success: true
        });
      } else {
        unsubstitutedCount++;
        details.push({
          className: c,
          day: d,
          period: p,
          subject: subj,
          absentTeacherId: originalTId,
          success: false
        });
      }
    }
  }

  return {
    slots: sl,
    substitutedCount,
    unsubstitutedCount,
    details
  };
}

/**
 * Reverts substitutions or restores absent teacher's slots
 */
export function restoreOriginalTeachers(
  currentSlots: SlotsMap,
  restoredTeacherIds: number[]
): SlotsMap {
  const sl: SlotsMap = { ...currentSlots };
  const restoredSet = new Set<number>(restoredTeacherIds);

  for (const [key, slot] of Object.entries(sl)) {
    if (slot.originalTeacherId && restoredSet.has(slot.originalTeacherId)) {
      sl[key] = {
        ...slot,
        t: slot.originalTeacherId,
        isSubstituted: false,
        originalTeacherId: undefined
      };
    }
  }

  return sl;
}

/**
 * Clears/vacates slots of absent teachers to make room for leisure or catch-up
 */
export function vacateAbsentTeacherSlots(
  currentSlots: SlotsMap,
  absentTeacherIds: number[],
  dayFilter?: number
): SlotsMap {
  const sl: SlotsMap = { ...currentSlots };
  const absentSet = new Set<number>(absentTeacherIds);

  for (const [key, slot] of Object.entries(sl)) {
    const [, dStr] = key.split('|');
    const d = parseInt(dStr, 10);
    if (dayFilter !== undefined && d !== dayFilter) continue;

    if (absentSet.has(slot.t)) {
      delete sl[key];
    }
  }

  return sl;
}

