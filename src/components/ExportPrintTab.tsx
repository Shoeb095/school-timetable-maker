import React, { useState, useRef } from 'react';
import { Download, Printer, FileSpreadsheet, FileJson, Upload, CheckCircle2 } from 'lucide-react';
import type { Teacher, ClassInfo, SlotsMap, AppSettings } from '../types';
import { exportToExcel } from '../utils/excelIO';
import { DAYS_NAMES } from '../utils/validator';

interface ExportPrintTabProps {
  slots: SlotsMap;
  teachers: Teacher[];
  classes: ClassInfo[];
  settings: AppSettings;
  onRestoreJSON: (state: { settings: AppSettings; teachers: Teacher[]; classes: ClassInfo[]; slots: SlotsMap }) => void;
}

export const ExportPrintTab: React.FC<ExportPrintTabProps> = ({
  slots,
  teachers,
  classes,
  settings,
  onRestoreJSON
}) => {
  const [printTarget, setPrintTarget] = useState<'all-classes' | 'single-class' | 'teacher-grid'>('all-classes');
  const [selectedPrintClass, setSelectedPrintClass] = useState<string>(classes[0]?.name || '');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);

  const teacherMap = new Map<number, Teacher>(teachers.map(t => [t.id, t]));

  // Download Excel
  const handleExportExcel = () => {
    try {
      exportToExcel(teachers, classes, slots, settings);
      setStatusMsg('Excel workbook generated and downloaded successfully!');
    } catch (err: any) {
      alert(`Error exporting Excel: ${err.message}`);
    }
  };

  // Print / Save as PDF
  const handlePrint = () => {
    window.print();
  };

  // Download JSON backup
  const handleExportJSON = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      settings,
      teachers,
      classes,
      slots
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Insight_Education_Backup_${settings.month}_${settings.year}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg('JSON backup file saved!');
  };

  // Restore JSON backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const json = JSON.parse(evt.target?.result as string);
        if (json && json.teachers && json.classes && json.slots) {
          onRestoreJSON({
            settings: json.settings || settings,
            teachers: json.teachers,
            classes: json.classes,
            slots: json.slots
          });
          setStatusMsg('Successfully restored timetable data from JSON backup.');
        } else {
          alert('Invalid JSON backup file structure.');
        }
      } catch (err: any) {
        alert(`Failed to parse JSON file: ${err.message}`);
      }
    };
    reader.readAsText(file);
    if (jsonFileInputRef.current) jsonFileInputRef.current.value = '';
  };



  return (
    <div>
      {statusMsg && (
        <div className="msg ok no-print">
          <CheckCircle2 size={16} />
          {statusMsg}
        </div>
      )}

      {/* Export Options Cards */}
      <div className="two no-print">
        {/* 1. Excel Export */}
        <div className="card">
          <h3>
            <FileSpreadsheet size={16} color="var(--ok)" />
            Export to Excel (.xlsx)
          </h3>
          <p className="mut" style={{ fontSize: '12.5px' }}>
            Generates a complete multi-sheet Excel file matching the school's format:
          </p>
          <ul style={{ fontSize: '12px', color: 'var(--mut)', paddingLeft: '18px', margin: '6px 0 14px' }}>
            <li><b>Teachers Timetable:</b> Monthly grid (Mon-Fri 7 periods, Sat 5 periods) with total periods</li>
            <li><b>Class Timetables:</b> Formatted weekly grid for every class</li>
            <li><b>Teachers Workload:</b> Allotted classes and workload check (cap 30)</li>
          </ul>
          <button className="b p" onClick={handleExportExcel} style={{ background: '#16a34a', borderColor: '#16a34a' }}>
            <Download size={14} />
            Download Excel (.xlsx) Workbook
          </button>
        </div>

        {/* 2. Print / Save as PDF */}
        <div className="card">
          <h3>
            <Printer size={16} color="var(--acc)" />
            Print or Save as PDF
          </h3>
          <p className="mut" style={{ fontSize: '12.5px' }}>
            Opens the browser's native print engine configured for clean landscape printing:
          </p>
          <div className="r" style={{ margin: '10px 0' }}>
            <label>
              Print Scope:
              <select value={printTarget} onChange={e => setPrintTarget(e.target.value as any)}>
                <option value="all-classes">All Class Timetables</option>
                <option value="single-class">Selected Class Only</option>
                <option value="teacher-grid">Master Teacher Grid</option>
              </select>
            </label>

            {printTarget === 'single-class' && (
              <label>
                Class:
                <select value={selectedPrintClass} onChange={e => setSelectedPrintClass(e.target.value)}>
                  {classes.map(c => (
                    <option key={c.name} value={c.name}>
                      Class {c.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          <button className="b p" onClick={handlePrint}>
            <Printer size={14} />
            Print / Save to PDF
          </button>
        </div>
      </div>

      {/* 3. JSON Backup & Restore */}
      <div className="card no-print">
        <h3>
          <FileJson size={16} />
          Browser Data Backup (JSON)
        </h3>
        <p className="mut" style={{ fontSize: '12.5px' }}>
          Your data is automatically preserved in this browser's local storage. You can also download a raw JSON file to transfer between devices or restore later.
        </p>
        <div className="r">
          <button className="b outline" onClick={handleExportJSON}>
            <Download size={14} />
            Download JSON Backup
          </button>

          <label className="b outline" style={{ cursor: 'pointer', margin: 0, flexDirection: 'row', alignItems: 'center' }}>
            <Upload size={14} />
            Restore from JSON
            <input
              ref={jsonFileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImportJSON}
            />
          </label>
        </div>
      </div>

      {/* PRINT VIEW TEMPLATE (Visible during printing or preview) */}
      <div className="print-only" style={{ display: 'none' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0 }}>INSIGHT INTERNATIONAL SCHOOL</h2>
          <div style={{ fontSize: '13px' }}>Timetable - {settings.month} {settings.year}</div>
        </div>

        {/* Print Option A: Single Class */}
        {printTarget === 'single-class' && (
          <div>
            <h3>Class {selectedPrintClass}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #000', padding: '6px' }}>Period</th>
                  {DAYS_NAMES.slice(0, settings.days).map(d => (
                    <th key={d} style={{ border: '1px solid #000', padding: '6px' }}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(...settings.periodsPerDay.slice(0, settings.days)) }).map((_, p) => (
                  <tr key={p}>
                    <td style={{ border: '1px solid #000', padding: '6px', fontWeight: 600 }}>
                      P{p + 1} ({settings.times[p] || ''})
                    </td>
                    {DAYS_NAMES.slice(0, settings.days).map((_, d) => {
                      const maxP = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
                      if (p >= maxP) return <td key={d} style={{ border: '1px solid #000' }}>–</td>;
                      const slot = slots[`${selectedPrintClass}|${d}|${p}`];
                      const teacher = slot ? teacherMap.get(slot.t) : null;
                      return (
                        <td key={d} style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>
                          {slot ? (
                            <div>
                              <b>{slot.s}</b>
                              <div style={{ fontSize: '11px' }}>{teacher ? teacher.name : ''}</div>
                            </div>
                          ) : (
                            '–'
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Print Option B: All Classes */}
        {printTarget === 'all-classes' && (
          <div>
            {classes.map(cl => (
              <div key={cl.name} style={{ pageBreakAfter: 'always', marginBottom: '24px' }}>
                <h3 style={{ margin: '8px 0' }}>Class {cl.name}</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #000', padding: '4px' }}>Period</th>
                      {DAYS_NAMES.slice(0, settings.days).map(d => (
                        <th key={d} style={{ border: '1px solid #000', padding: '4px' }}>{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: Math.max(...settings.periodsPerDay.slice(0, settings.days)) }).map((_, p) => (
                      <tr key={p}>
                        <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 600, fontSize: '11px' }}>
                          P{p + 1} ({settings.times[p] || ''})
                        </td>
                        {DAYS_NAMES.slice(0, settings.days).map((_, d) => {
                          const maxP = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
                          if (p >= maxP) return <td key={d} style={{ border: '1px solid #000' }}>–</td>;
                          const slot = slots[`${cl.name}|${d}|${p}`];
                          const teacher = slot ? teacherMap.get(slot.t) : null;
                          return (
                            <td key={d} style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontSize: '11px' }}>
                              {slot ? (
                                <div>
                                  <b>{slot.s}</b>
                                  <div style={{ fontSize: '10px' }}>{teacher ? teacher.name : ''}</div>
                                </div>
                              ) : (
                                '–'
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {/* Print Option C: Master Teacher Grid */}
        {printTarget === 'teacher-grid' && (
          <div>
            <h3>Teachers Master Timetable</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', fontSize: '10px' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #000', padding: '3px' }}>Staff</th>
                  {DAYS_NAMES.slice(0, settings.days).map(d => (
                    <th key={d} style={{ border: '1px solid #000', padding: '3px' }}>{d}</th>
                  ))}
                  <th style={{ border: '1px solid #000', padding: '3px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(t => {
                  let total = 0;
                  return (
                    <tr key={t.id}>
                      <td style={{ border: '1px solid #000', padding: '3px', fontWeight: 600 }}>{t.name}</td>
                      {DAYS_NAMES.slice(0, settings.days).map((_, d) => {
                        const maxP = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
                        const daySlots: string[] = [];
                        for (let p = 0; p < maxP; p++) {
                          // check if teaching any class
                          for (const [k, sl] of Object.entries(slots)) {
                            const [c, dd, pp] = k.split('|');
                            if (parseInt(dd, 10) === d && parseInt(pp, 10) === p && sl.t === t.id) {
                              daySlots.push(`P${p + 1}:${c}`);
                              total++;
                            }
                          }
                        }
                        return (
                          <td key={d} style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>
                            {daySlots.join(' ') || '–'}
                          </td>
                        );
                      })}
                      <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center', fontWeight: 700 }}>
                        {total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
