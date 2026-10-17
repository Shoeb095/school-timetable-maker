import type { Teacher, SlotsMap, AppSettings, ClassInfo, CatchUpCapacityReport } from '../types';
import { parseSubjectRequirements } from './validator';

export interface PastedScheduleEntry {
  teacherName?: string;
  className: string;
  subject: string;
  day?: string;
  period?: number;
}

/**
 * Parses tab-separated or CSV text copied from Excel.
 * Handles both grid format (copied from Teachers timetable sheet) and table/list format.
 */
export function parsePastedTimetable(text: string): {
  entries: PastedScheduleEntry[];
  classSubjectCounts: Record<string, Record<string, number>>;
  summaryMessage: string;
} {
  const trimmed = text.trim();
  if (!trimmed) {
    return { entries: [], classSubjectCounts: {}, summaryMessage: 'No timetable pasted.' };
  }

  const lines = trimmed.split(/\r?\n/).filter(l => l.trim().length > 0);
  const entries: PastedScheduleEntry[] = [];
  const classSubjectCounts: Record<string, Record<string, number>> = {};

  // Check if it's tab-separated grid or comma-separated
  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const firstRow = lines[0].split(delimiter).map(s => s.trim().toLowerCase());

  // Check if it has named columns: teacher, day, period, class, subject
  const colTeacher = firstRow.findIndex(c => c.includes('teacher') || c.includes('staff'));
  const colDay = firstRow.findIndex(c => c.includes('day'));
  const colPeriod = firstRow.findIndex(c => c.includes('period') || c === 'p');
  const colClass = firstRow.findIndex(c => c.includes('class') || c.includes('grade'));
  const colSubject = firstRow.findIndex(c => c.includes('subj') || c.includes('entry'));

  if (colClass !== -1 && colSubject !== -1) {
    // List / tabular format
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(delimiter).map(s => s.trim());
      const c = parts[colClass];
      const s = parts[colSubject];
      const t = colTeacher !== -1 ? parts[colTeacher] : undefined;
      const d = colDay !== -1 ? parts[colDay] : undefined;
      const p = colPeriod !== -1 ? parseInt(parts[colPeriod], 10) : undefined;

      if (c && s) {
        entries.push({ className: c, subject: s, teacherName: t, day: d, period: p });
        if (!classSubjectCounts[c]) classSubjectCounts[c] = {};
        classSubjectCounts[c][s] = (classSubjectCounts[c][s] || 0) + 1;
      }
    }
  } else {
    // Grid format copied from Excel (Teacher in col 0, periods across columns)
    for (const line of lines) {
      const cells = line.split(delimiter).map(s => s.trim().replace(/^"|"$/g, ''));
      if (cells.length < 2) continue;
      const teacherStr = cells[0];
      if (/staff|teacher|monday|tuesday|period/i.test(teacherStr)) continue;

      for (let colIdx = 1; colIdx < cells.length; colIdx++) {
        const val = cells[colIdx];
        if (!val || /^\d+$/.test(val)) continue; // skip numbers or empty

        let className = val;
        let subject = 'General';
        if (val.includes(' - ')) {
          const parts = val.split(' - ');
          className = parts[0].trim();
          subject = parts[1].trim();
        } else if (val.includes('-Com')) {
          className = val.replace('-Com', '').trim();
          subject = 'Computers';
        } else if (teacherStr.toLowerCase().includes('english') || teacherStr.toLowerCase().includes('eng')) {
          subject = 'English';
        } else if (teacherStr.toLowerCase().includes('math')) {
          subject = 'Math';
        } else if (teacherStr.toLowerCase().includes('sci')) {
          subject = 'Science';
        } else if (teacherStr.toLowerCase().includes('islamic')) {
          subject = 'Islamic Studies';
        }

        // Clean class name
        className = className.replace(/EY1-B/i, 'EYP1B').replace(/EY(\d)[-\s]*([A-Z])/i, 'EYP$1$2');

        if (className.length > 0 && className.length <= 8) {
          entries.push({ className, subject, teacherName: teacherStr });
          if (!classSubjectCounts[className]) classSubjectCounts[className] = {};
          classSubjectCounts[className][subject] = (classSubjectCounts[className][subject] || 0) + 1;
        }
      }
    }
  }

  const totalPeriods = Object.values(classSubjectCounts).reduce(
    (sum, subMap) => sum + Object.values(subMap).reduce((a, b) => a + b, 0),
    0
  );

  return {
    entries,
    classSubjectCounts,
    summaryMessage: `Parsed ${totalPeriods} period slots across ${Object.keys(classSubjectCounts).length} classes.`
  };
}

/**
 * Calculates shortfall per subject per class based on lost time
 */
export function calculateShortfall(
  pastedCounts: Record<string, Record<string, number>>,
  classes: ClassInfo[],
  lostWeeks: number,
  lostDays: number,
  halfDays: boolean,
  classOverrides?: Record<string, Record<string, number>>
): {
  shortfallByClass: Record<string, Record<string, number>>;
  totalShortfall: number;
} {
  const shortfallByClass: Record<string, Record<string, number>> = {};
  let totalShortfall = 0;

  // Working days in a standard school month ~ 24 days (4 weeks * 6 days)
  const daysLostTotal = lostWeeks * 6 + lostDays;

  for (const cl of classes) {
    const c = cl.name;
    shortfallByClass[c] = {};

    // Get baseline weekly periods for this class
    const reqs = pastedCounts[c] && Object.keys(pastedCounts[c]).length > 0
      ? pastedCounts[c]
      : parseSubjectRequirements(cl.subs);

    for (const [subj, weeklyPeriods] of Object.entries(reqs)) {
      // Check for explicit override
      if (classOverrides && classOverrides[c] && classOverrides[c][subj] !== undefined) {
        const override = classOverrides[c][subj];
        shortfallByClass[c][subj] = override;
        totalShortfall += override;
      } else {
        // Periods lost = weeklyPeriods * weeksLost (or daily proportional)
        const lost = Math.round(weeklyPeriods * (daysLostTotal / 6) * (halfDays ? 0.5 : 1.0));
        if (lost > 0) {
          shortfallByClass[c][subj] = lost;
          totalShortfall += lost;
        }
      }
    }
  }

  return { shortfallByClass, totalShortfall };
}

/**
 * Calculates available spare capacity across all teachers (Hard limit: max 30 periods/week)
 */
export function calculateCatchUpCapacity(
  teachers: Teacher[],
  slots: SlotsMap,
  settings: AppSettings,
  totalShortfall: number
): CatchUpCapacityReport {
  // Current teacher loads
  const currentLoads = new Map<number, number>();
  for (const slot of Object.values(slots)) {
    currentLoads.set(slot.t, (currentLoads.get(slot.t) || 0) + 1);
  }

  let availableCapacity = 0;
  const teacherSpareCapacity: CatchUpCapacityReport['teacherSpareCapacity'] = [];

  for (const t of teachers) {
    const cur = currentLoads.get(t.id) || 0;
    const max = t.maxLoad ?? settings.maxLoad ?? 30;
    const spare = Math.max(0, max - cur);
    if (spare > 0) {
      availableCapacity += spare;
    }
    teacherSpareCapacity.push({
      teacherId: t.id,
      teacherName: t.name,
      currentLoad: cur,
      spareLoad: spare
    });
  }

  teacherSpareCapacity.sort((a, b) => b.spareLoad - a.spareLoad);

  const isDeficit = totalShortfall > availableCapacity;
  const deficitAmount = Math.max(0, totalShortfall - availableCapacity);

  return {
    totalShortfall,
    availableCapacity,
    teacherSpareCapacity,
    isDeficit,
    deficitAmount
  };
}
