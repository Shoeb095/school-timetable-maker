import * as XLSX from 'xlsx';
import type { Teacher, ClassInfo, SlotsMap, AppSettings } from '../types';
import { DAYS_NAMES } from './validator';

export interface ExcelImportResult {
  teachers: Teacher[];
  classes: ClassInfo[];
  slots: SlotsMap;
  settings?: Partial<AppSettings>;
  message: string;
}

export async function importFromExcel(file: File): Promise<ExcelImportResult> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  
  const teachers: Teacher[] = [];
  const classes: ClassInfo[] = [];
  const slots: SlotsMap = {};
  const classNamesSet = new Set<string>();
  const classSubjCounts: Record<string, Record<string, number>> = {};
  let nextTeacherId = 1;

  // 1. Check for "Teachers Workload" sheet
  const workloadSheetName = workbook.SheetNames.find(s => /work\s*load/i.test(s));
  if (workloadSheetName) {
    const ws = workbook.Sheets[workloadSheetName];
    const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });
    for (const row of rows) {
      if (!row || row.length < 3) continue;
      const subj = row[1];
      const name = row[2];
      const allotted = row[3];
      if (name && (String(name).startsWith('Ms') || String(name).startsWith('Mr') || String(name).startsWith('Mrs'))) {
        teachers.push({
          id: nextTeacherId++,
          name: String(name).trim(),
          subj: subj ? String(subj).trim() : '',
          allottedClasses: allotted ? String(allotted).trim() : '',
          maxLoad: 30
        });
      }
    }
  }

  // 2. Check for "Teachers timetable" sheet
  const timetableSheetName = workbook.SheetNames.find(s => /timetable|teachers\s*timetable/i.test(s));
  if (timetableSheetName) {
    const ws = workbook.Sheets[timetableSheetName];
    const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });
    
    // Find header row with MONDAY / Staff
    let headerRowIdx = -1;
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (r && r.some(cell => String(cell).toLowerCase().includes('monday') || String(cell).toLowerCase().includes('staff'))) {
        headerRowIdx = i;
        break;
      }
    }

    if (headerRowIdx !== -1) {
      const dayCols = [
        { day: 0, start: 1, count: 7 }, // Mon
        { day: 1, start: 8, count: 7 }, // Tue
        { day: 2, start: 15, count: 7 }, // Wed
        { day: 3, start: 22, count: 7 }, // Thu
        { day: 4, start: 29, count: 7 }, // Fri
        { day: 5, start: 36, count: 5 }  // Sat
      ];

      for (let r = headerRowIdx + 2; r < rows.length; r++) {
        const row = rows[r];
        if (!row || !row[0]) continue;
        const teacherHeader = String(row[0]).trim();
        if (/staff|teacher|total|note/i.test(teacherHeader)) continue;

        // Match or create teacher
        let t = teachers.find(teach => {
          const tPart = teach.name.toLowerCase().split(' ')[1] || teach.name.toLowerCase();
          return teacherHeader.toLowerCase().includes(tPart);
        });

        if (!t) {
          t = {
            id: nextTeacherId++,
            name: teacherHeader.split('-')[0].trim(),
            subj: teacherHeader.split('-')[1]?.trim() || '',
            maxLoad: 30
          };
          teachers.push(t);
        }

        for (const dayDef of dayCols) {
          for (let p = 0; p < dayDef.count; p++) {
            const col = dayDef.start + p;
            const val = row[col] ? String(row[col]).trim() : '';
            if (!val) continue;

            let cName = val;
            let subj = t.subj || 'General';
            if (val.includes(' - ')) {
              const parts = val.split(' - ');
              cName = parts[0].trim();
              subj = parts[1].trim();
            } else if (val.includes('-Com')) {
              cName = val.replace('-Com', '').trim();
              subj = 'Computers';
            }

            cName = cName.replace(/EY1-B/i, 'EYP1B').replace(/EY(\d)[-\s]*([A-Z])/i, 'EYP$1$2');

            classNamesSet.add(cName);
            if (!classSubjCounts[cName]) classSubjCounts[cName] = {};
            classSubjCounts[cName][subj] = (classSubjCounts[cName][subj] || 0) + 1;

            slots[`${cName}|${dayDef.day}|${p}`] = {
              t: t.id,
              s: subj
            };
          }
        }
      }
    }
  }

  // Build classes list
  for (const cName of classNamesSet) {
    const sMap = classSubjCounts[cName] || {};
    const subsStr = Object.entries(sMap)
      .map(([s, n]) => `${s}:${n}`)
      .join('\n');
    classes.push({
      name: cName,
      subs: subsStr
    });
  }

  return {
    teachers,
    classes,
    slots,
    message: `Successfully imported ${teachers.length} teachers, ${classes.length} classes, and ${Object.keys(slots).length} timetable slots.`
  };
}

export function exportToExcel(
  teachers: Teacher[],
  classes: ClassInfo[],
  slots: SlotsMap,
  settings: AppSettings
) {
  const wb = XLSX.utils.book_new();
  const teacherMap = new Map<number, Teacher>(teachers.map(t => [t.id, t]));

  // Sheet 1: Teachers Timetable (Matches June 2026 Timetable format)
  const ttData: any[][] = [];
  ttData.push([`INSIGHT INTERNATIONAL SCHOOL - ${settings.month.toUpperCase()} ${settings.year} TIMETABLE`]);
  ttData.push([]);
  
  // Header row 1: Day names
  const header1 = ['STAFF MEMBERS & SUBJECTS'];
  for (let d = 0; d < settings.days; d++) {
    const pCount = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
    header1.push(DAYS_NAMES[d].toUpperCase());
    for (let i = 1; i < pCount; i++) header1.push('');
  }
  header1.push('CLASSES ALLOTTED', 'Total No. of Periods');
  ttData.push(header1);

  // Header row 2: Period numbers
  const header2 = [''];
  for (let d = 0; d < settings.days; d++) {
    const pCount = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
    for (let p = 1; p <= pCount; p++) {
      header2.push(String(p));
    }
  }
  header2.push('', '');
  ttData.push(header2);

  // Map slots by teacher
  // teacherId|day|period -> className (with subject if needed)
  const teacherSlots = new Map<string, string>();
  const teacherTotals = new Map<number, number>();

  for (const [key, slot] of Object.entries(slots)) {
    const [c, d, p] = key.split('|');
    const teacherSlotKey = `${slot.t}|${d}|${p}`;
    const t = teacherMap.get(slot.t);
    const text = t && t.subj && t.subj.toLowerCase() === slot.s.toLowerCase()
      ? c
      : `${c} - ${slot.s}`;
    teacherSlots.set(teacherSlotKey, text);
    teacherTotals.set(slot.t, (teacherTotals.get(slot.t) || 0) + 1);
  }

  // Teacher rows
  for (const t of teachers) {
    const row: any[] = [`${t.name}${t.subj ? ` - ${t.subj}` : ''}`];
    for (let d = 0; d < settings.days; d++) {
      const pCount = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
      for (let p = 0; p < pCount; p++) {
        const val = teacherSlots.get(`${t.id}|${d}|${p}`) || '';
        row.push(val);
      }
    }
    row.push(t.allottedClasses || '', teacherTotals.get(t.id) || 0);
    ttData.push(row);
  }

  const wsTT = XLSX.utils.aoa_to_sheet(ttData);
  XLSX.utils.book_append_sheet(wb, wsTT, 'Teachers Timetable');

  // Sheet 2: Class Timetables
  const classData: any[][] = [];
  classData.push([`CLASS-WISE TIMETABLES - ${settings.month.toUpperCase()} ${settings.year}`]);
  classData.push([]);

  for (const cl of classes) {
    classData.push([`CLASS: ${cl.name}`]);
    const cHead = ['Period', 'Time', ...DAYS_NAMES.slice(0, settings.days)];
    classData.push(cHead);

    const maxPeriods = Math.max(...settings.periodsPerDay.slice(0, settings.days));
    for (let p = 0; p < maxPeriods; p++) {
      const row = [`P${p + 1}`, settings.times[p] || ''];
      for (let d = 0; d < settings.days; d++) {
        const pCount = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
        if (p < pCount) {
          const slot = slots[`${cl.name}|${d}|${p}`];
          if (slot) {
            const t = teacherMap.get(slot.t);
            row.push(`${slot.s} (${t ? t.name : 'T' + slot.t})`);
          } else {
            row.push('–');
          }
        } else {
          row.push('–');
        }
      }
      classData.push(row);
    }
    classData.push([]);
  }

  const wsClasses = XLSX.utils.aoa_to_sheet(classData);
  XLSX.utils.book_append_sheet(wb, wsClasses, 'Class Timetables');

  // Sheet 3: Teachers Workload Summary
  const wlData: any[][] = [
    ['S.No.', 'TEACHER NAME', 'SUBJECT', 'CLASSES ALLOTTED', 'WORKLOAD (PERIODS/WK)', 'MAX ALLOWED', 'STATUS']
  ];
  teachers.forEach((t, i) => {
    const total = teacherTotals.get(t.id) || 0;
    const max = t.maxLoad ?? settings.maxLoad ?? 30;
    const status = total > max ? 'OVERLOAD' : total === max ? 'FULL' : 'OK';
    wlData.push([i + 1, t.name, t.subj, t.allottedClasses || '', total, max, status]);
  });
  const wsWL = XLSX.utils.aoa_to_sheet(wlData);
  XLSX.utils.book_append_sheet(wb, wsWL, 'Teachers Workload');

  // Download workbook
  const fileName = `Insight_Education_Timetable_${settings.month}_${settings.year}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
