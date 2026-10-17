import type { SlotsMap, Teacher, ClassInfo, AppSettings, RuleViolation } from '../types';

export const DAYS_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const isMathSubject = (s: string): boolean => {
  if (!s) return false;
  const lower = s.toLowerCase().trim();
  return lower === 'math' || lower === 'maths' || lower.startsWith('math ') || lower.startsWith('maths ');
};

export const parseSubjectRequirements = (subsText: string): Record<string, number> => {
  const reqs: Record<string, number> = {};
  if (!subsText) return reqs;
  const lines = subsText.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^(.+?)[:=,\s]+(\d+)$/);
    if (match) {
      reqs[match[1].trim()] = parseInt(match[2], 10);
    }
  }
  return reqs;
};

export interface ScheduleStats {
  totalRequired: number;
  totalPlaced: number;
  unfilledCount: number;
  teacherClashes: number;
  overloadedTeachers: number;
  consecutiveViolations: number;
  lastPeriodMathsViolations: number;
  subjectDailyExcessViolations: number;
  totalViolations: number;
}

/**
 * Validates a single proposed slot assignment against all 5 hard rules.
 */
export function validateProposedSlot(
  slots: SlotsMap,
  className: string,
  day: number,
  period: number,
  teacherId: number,
  subject: string,
  teachers: Teacher[],
  settings: AppSettings
): RuleViolation[] {
  const violations: RuleViolation[] = [];
  const teacher = teachers.find(t => t.id === teacherId);
  const teacherName = teacher ? teacher.name : `Teacher #${teacherId}`;
  const maxLoad = teacher?.maxLoad ?? settings.maxLoad ?? 30;
  const currentKey = `${className}|${day}|${period}`;

  // 1. Rule 3: The last period of a class's day is never Maths.
  const maxPeriodsToday = settings.periodsPerDay[day] ?? settings.periodsPerDay[0] ?? 7;
  if (period === maxPeriodsToday - 1 && isMathSubject(subject)) {
    violations.push({
      ruleId: 3,
      ruleName: 'Last Period Maths',
      severity: 'error',
      message: `Rule 3 Violation: The last period of the day (${DAYS_NAMES[day]} P${period + 1}) cannot be Maths for class ${className}.`,
      className,
      dayIndex: day,
      periodIndex: period,
      cellKey: currentKey
    });
  }

  // 2. Rule 4: No teacher in two classes at once
  for (const [key, slot] of Object.entries(slots)) {
    if (key === currentKey) continue;
    const [c, dStr, pStr] = key.split('|');
    const d = parseInt(dStr, 10);
    const p = parseInt(pStr, 10);
    if (d === day && p === period && slot.t === teacherId) {
      violations.push({
        ruleId: 4,
        ruleName: 'Teacher Clash',
        severity: 'error',
        message: `Rule 4 Violation: ${teacherName} is already teaching class ${c} at ${DAYS_NAMES[day]} P${p + 1}.`,
        className,
        teacherId,
        teacherName,
        dayIndex: day,
        periodIndex: period,
        cellKey: currentKey
      });
      break;
    }
  }

  // 3. Rule 1: Max 30 periods per teacher per week
  let teacherWeeklyPeriods = 0;
  for (const [key, slot] of Object.entries(slots)) {
    if (key === currentKey) continue;
    if (slot.t === teacherId) {
      teacherWeeklyPeriods++;
    }
  }
  if (teacherWeeklyPeriods + 1 > maxLoad) {
    violations.push({
      ruleId: 1,
      ruleName: 'Max Teacher Load',
      severity: 'error',
      message: `Rule 1 Violation: Placing this will give ${teacherName} ${teacherWeeklyPeriods + 1} periods/week (Limit: ${maxLoad}).`,
      className,
      teacherId,
      teacherName,
      dayIndex: day,
      periodIndex: period,
      cellKey: currentKey
    });
  }

  // 4. Rule 2: A teacher never teaches more than 3 consecutive periods; a leisure period must follow.
  // We reconstruct the teacher's schedule on this day:
  const teacherPeriodsToday = new Set<number>();
  for (const [key, slot] of Object.entries(slots)) {
    if (key === currentKey) continue;
    const [, dStr, pStr] = key.split('|');
    const d = parseInt(dStr, 10);
    const p = parseInt(pStr, 10);
    if (d === day && slot.t === teacherId) {
      teacherPeriodsToday.add(p);
    }
  }
  teacherPeriodsToday.add(period);

  // Check consecutive run around 'period'
  let consecutiveBefore = 0;
  for (let p = period - 1; p >= 0; p--) {
    if (teacherPeriodsToday.has(p)) consecutiveBefore++;
    else break;
  }
  let consecutiveAfter = 0;
  for (let p = period + 1; p < maxPeriodsToday; p++) {
    if (teacherPeriodsToday.has(p)) consecutiveAfter++;
    else break;
  }
  const totalConsecutive = consecutiveBefore + 1 + consecutiveAfter;
  if (totalConsecutive > 3) {
    violations.push({
      ruleId: 2,
      ruleName: 'Consecutive Periods Exceeded',
      severity: 'error',
      message: `Rule 2 Violation: ${teacherName} would teach ${totalConsecutive} consecutive periods (P${period - consecutiveBefore + 1} to P${period + consecutiveAfter + 1}) on ${DAYS_NAMES[day]} without a leisure period. Maximum is 3.`,
      className,
      teacherId,
      teacherName,
      dayIndex: day,
      periodIndex: period,
      cellKey: currentKey
    });
  }

  // 5. Rule 5: Avoid the same subject more than twice a day for a class
  let classSubjectCountToday = 0;
  for (const [key, slot] of Object.entries(slots)) {
    if (key === currentKey) continue;
    const [c, dStr] = key.split('|');
    const d = parseInt(dStr, 10);
    if (c === className && d === day && slot.s.toLowerCase().trim() === subject.toLowerCase().trim()) {
      classSubjectCountToday++;
    }
  }
  if (classSubjectCountToday + 1 > 2) {
    violations.push({
      ruleId: 5,
      ruleName: 'Subject Daily Limit',
      severity: 'error',
      message: `Rule 5 Violation: Subject "${subject}" would be taught ${classSubjectCountToday + 1} times on ${DAYS_NAMES[day]} in class ${className}. Limit is 2 per day.`,
      className,
      dayIndex: day,
      periodIndex: period,
      cellKey: currentKey
    });
  }

  return violations;
}

/**
 * Validates the entire schedule and returns detailed violations and statistics.
 */
export function validateFullSchedule(
  slots: SlotsMap,
  teachers: Teacher[],
  classes: ClassInfo[],
  settings: AppSettings
): { violations: RuleViolation[]; stats: ScheduleStats } {
  const violations: RuleViolation[] = [];
  const teacherMap = new Map<number, Teacher>(teachers.map(t => [t.id, t]));

  // Index slots for fast checks
  // teacher -> day -> set of periods
  const teacherDayPeriods = new Map<string, Set<number>>();
  // teacher -> total count
  const teacherTotalLoads = new Map<number, number>();
  // day|period -> teacher -> array of classNames
  const timeTeacherClasses = new Map<string, string[]>();
  // class -> day -> subject -> count
  const classDaySubjectCount = new Map<string, Map<string, number>>();

  for (const [key, slot] of Object.entries(slots)) {
    const [c, dStr, pStr] = key.split('|');
    const d = parseInt(dStr, 10);
    const p = parseInt(pStr, 10);
    const tId = slot.t;
    const subj = slot.s;

    // Teacher load
    teacherTotalLoads.set(tId, (teacherTotalLoads.get(tId) || 0) + 1);

    // Teacher day periods
    const tdKey = `${tId}|${d}`;
    if (!teacherDayPeriods.has(tdKey)) {
      teacherDayPeriods.set(tdKey, new Set<number>());
    }
    teacherDayPeriods.get(tdKey)!.add(p);

    // Time teacher clash
    const ttKey = `${d}|${p}|${tId}`;
    if (!timeTeacherClasses.has(ttKey)) {
      timeTeacherClasses.set(ttKey, []);
    }
    timeTeacherClasses.get(ttKey)!.push(c);

    // Class day subject
    const cdKey = `${c}|${d}`;
    if (!classDaySubjectCount.has(cdKey)) {
      classDaySubjectCount.set(cdKey, new Map<string, number>());
    }
    const subjMap = classDaySubjectCount.get(cdKey)!;
    subjMap.set(subj.toLowerCase(), (subjMap.get(subj.toLowerCase()) || 0) + 1);

    // Rule 3: Last period Maths check
    const maxP = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
    if (p === maxP - 1 && isMathSubject(subj)) {
      violations.push({
        ruleId: 3,
        ruleName: 'Last Period Maths',
        severity: 'error',
        message: `Class ${c} has Maths scheduled on the last period (${DAYS_NAMES[d]} P${p + 1}).`,
        className: c,
        dayIndex: d,
        periodIndex: p,
        cellKey: key
      });
    }
  }

  // Check Rule 1: Max 30 periods per teacher per week
  let overloadedTeachers = 0;
  for (const [tId, load] of teacherTotalLoads.entries()) {
    const t = teacherMap.get(tId);
    const maxLoad = t?.maxLoad ?? settings.maxLoad ?? 30;
    if (load > maxLoad) {
      overloadedTeachers++;
      violations.push({
        ruleId: 1,
        ruleName: 'Teacher Overload',
        severity: 'error',
        message: `${t ? t.name : `Teacher #${tId}`} has ${load} periods assigned per week (Limit: ${maxLoad}).`,
        teacherId: tId,
        teacherName: t?.name
      });
    }
  }

  // Check Rule 4: Teacher clashes (Double booking)
  let teacherClashes = 0;
  for (const [ttKey, classList] of timeTeacherClasses.entries()) {
    if (classList.length > 1) {
      teacherClashes++;
      const [dStr, pStr, tIdStr] = ttKey.split('|');
      const d = parseInt(dStr, 10);
      const p = parseInt(pStr, 10);
      const tId = parseInt(tIdStr, 10);
      const t = teacherMap.get(tId);
      violations.push({
        ruleId: 4,
        ruleName: 'Teacher Clash',
        severity: 'error',
        message: `${t ? t.name : `Teacher #${tId}`} is assigned simultaneously to ${classList.join(' and ')} on ${DAYS_NAMES[d]} P${p + 1}.`,
        teacherId: tId,
        teacherName: t?.name,
        dayIndex: d,
        periodIndex: p
      });
    }
  }

  // Check Rule 2: Consecutive periods > 3
  let consecutiveViolations = 0;
  for (const [tdKey, pSet] of teacherDayPeriods.entries()) {
    const [tIdStr, dStr] = tdKey.split('|');
    const tId = parseInt(tIdStr, 10);
    const d = parseInt(dStr, 10);
    const t = teacherMap.get(tId);
    const maxP = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;

    let currentConsecutive = 0;
    let startP = 0;
    for (let p = 0; p < maxP; p++) {
      if (pSet.has(p)) {
        if (currentConsecutive === 0) startP = p;
        currentConsecutive++;
        if (currentConsecutive === 4) {
          consecutiveViolations++;
          violations.push({
            ruleId: 2,
            ruleName: 'Consecutive Teaching Exceeded',
            severity: 'error',
            message: `${t ? t.name : `Teacher #${tId}`} is scheduled for ${currentConsecutive}+ consecutive periods (P${startP + 1} to P${p + 1}) on ${DAYS_NAMES[d]} without a leisure break.`,
            teacherId: tId,
            teacherName: t?.name,
            dayIndex: d,
            periodIndex: p
          });
        }
      } else {
        currentConsecutive = 0;
      }
    }
  }

  // Check Rule 5: Subject daily limit (> 2 per day)
  let subjectDailyExcessViolations = 0;
  for (const [cdKey, subjMap] of classDaySubjectCount.entries()) {
    const [c, dStr] = cdKey.split('|');
    const d = parseInt(dStr, 10);
    for (const [subj, count] of subjMap.entries()) {
      if (count > 2) {
        subjectDailyExcessViolations++;
        violations.push({
          ruleId: 5,
          ruleName: 'Subject Daily Excess',
          severity: 'warning',
          message: `Class ${c} has ${count} periods of "${subj}" on ${DAYS_NAMES[d]} (recommended max: 2 per day).`,
          className: c,
          dayIndex: d
        });
      }
    }
  }

  // Calculate required vs placed periods
  let totalRequired = 0;
  for (const cl of classes) {
    const reqs = parseSubjectRequirements(cl.subs);
    for (const cnt of Object.values(reqs)) {
      totalRequired += cnt;
    }
  }

  const totalPlaced = Object.keys(slots).length;
  const unfilledCount = Math.max(0, totalRequired - totalPlaced);

  const stats: ScheduleStats = {
    totalRequired,
    totalPlaced,
    unfilledCount,
    teacherClashes,
    overloadedTeachers,
    consecutiveViolations,
    lastPeriodMathsViolations: violations.filter(v => v.ruleId === 3).length,
    subjectDailyExcessViolations,
    totalViolations: violations.length
  };

  return { violations, stats };
}
