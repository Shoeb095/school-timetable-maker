export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export interface Teacher {
  id: number;
  name: string;
  subj: string;
  maxLoad?: number; // defaults to 30
  allottedClasses?: string;
  workloadTotal?: number;
}

export interface SubjectSplit {
  subject: string;
  periods: number;
}

export interface ClassInfo {
  name: string; // e.g. "3A", "10B"
  gradeGroup?: string; // e.g. "Grade 3", "EYP"
  subs: string; // "Maths:6\nEnglish:6..." or parsed
  classTeacher?: string;
  room?: string;
}

// Key format: `${className}|${dayIndex}|${periodIndex}`
export interface Slot {
  t: number; // teacher id (current teaching teacher or substitute)
  s: string; // subject name
  isCatchUp?: boolean;
  isSubstituted?: boolean;
  originalTeacherId?: number;
}

export interface SlotsMap {
  [key: string]: Slot;
}

export interface DayConfig {
  day: DayOfWeek;
  periods: number;
}

export interface AppSettings {
  month: string;
  year: number;
  days: number; // 5 or 6
  periodsPerDay: number[]; // e.g. [7, 7, 7, 7, 7, 5] for Mon-Sat
  maxLoad: number; // 30
  times: string[]; // default period times
  activeWeek?: 'master' | 1 | 2 | 3 | 4;
  absentTeacherIds?: number[];
}

export interface RuleViolation {
  ruleId: number;
  ruleName: string;
  severity: "error" | "warning";
  message: string;
  className?: string;
  teacherId?: number;
  teacherName?: string;
  dayIndex?: number;
  periodIndex?: number;
  cellKey?: string;
}

export interface CatchUpLossInput {
  description: string;
  lostWeeks: number;
  lostDays: number;
  halfDaysOnly: boolean; // if true, only afternoon periods (e.g. periods > 4) were lost
  customSubjectLost?: Record<string, number>; // class:subject -> lost periods
}

export interface CatchUpClassStatus {
  className: string;
  subjectShortfall: Record<string, number>; // subject -> shortfall
  totalShortfall: number;
}

export interface CatchUpCapacityReport {
  totalShortfall: number;
  availableCapacity: number;
  teacherSpareCapacity: {
    teacherId: number;
    teacherName: string;
    currentLoad: number;
    spareLoad: number;
  }[];
  isDeficit: boolean;
  deficitAmount: number;
}
