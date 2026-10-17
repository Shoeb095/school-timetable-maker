import React, { useState, useRef } from 'react';
import { Upload, Plus, Trash2, RotateCcw, CheckCircle2 } from 'lucide-react';
import type { Teacher, ClassInfo, AppSettings, SlotsMap } from '../types';
import { parseSubjectRequirements, DAYS_NAMES } from '../utils/validator';
import { importFromExcel } from '../utils/excelIO';

interface SetupTabProps {
  settings: AppSettings;
  onUpdateSettings: (s: Partial<AppSettings>) => void;
  teachers: Teacher[];
  onUpdateTeachers: (teachers: Teacher[]) => void;
  classes: ClassInfo[];
  onUpdateClasses: (classes: ClassInfo[]) => void;
  onResetToDefault: () => void;
  onClearAll: () => void;
  onImportComplete: (t: Teacher[], c: ClassInfo[], s: SlotsMap, msg: string) => void;
}

export const SetupTab: React.FC<SetupTabProps> = ({
  settings,
  onUpdateSettings,
  teachers,
  onUpdateTeachers,
  classes,
  onUpdateClasses,
  onResetToDefault,
  onClearAll,
  onImportComplete
}) => {
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherSubj, setNewTeacherSubj] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [teacherSearch, setTeacherSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add Teacher
  const handleAddTeacher = () => {
    if (!newTeacherName.trim()) return;
    const newId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
    onUpdateTeachers([
      ...teachers,
      {
        id: newId,
        name: newTeacherName.trim(),
        subj: newTeacherSubj.trim(),
        maxLoad: 30
      }
    ]);
    setNewTeacherName('');
    setNewTeacherSubj('');
  };

  // Delete Teacher
  const handleDeleteTeacher = (id: number) => {
    onUpdateTeachers(teachers.filter(t => t.id !== id));
  };

  // Add Class
  const handleAddClass = () => {
    const cName = newClassName.trim().toUpperCase();
    if (!cName) return;
    if (classes.some(c => c.name === cName)) {
      alert(`Class ${cName} already exists.`);
      return;
    }
    onUpdateClasses([
      ...classes,
      {
        name: cName,
        subs: 'English:6\nMath:6\nScience:5\nSocial:4\nIslamic:4\nHindi:4\nComputers:3\nPE:2\nArt:2\nLibrary:1\nPublic Speaking:1\nGK:1\nKarate:1'
      }
    ]);
    setNewClassName('');
  };

  // Delete Class
  const handleDeleteClass = (name: string) => {
    onUpdateClasses(classes.filter(c => c.name !== name));
  };

  // Handle Excel Import
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setImportStatus('Reading and analyzing Excel file...');
      const result = await importFromExcel(file);
      onImportComplete(result.teachers, result.classes, result.slots, result.message);
      setImportStatus(result.message);
    } catch (err: any) {
      setImportStatus(`Error importing file: ${err.message || 'Unknown error'}`);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    t.subj.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    (t.allottedClasses && t.allottedClasses.toLowerCase().includes(teacherSearch.toLowerCase()))
  );

  const totalWeeklySlots = settings.periodsPerDay
    .slice(0, settings.days)
    .reduce((sum, p) => sum + p, 0);

  return (
    <div>
      {importStatus && (
        <div className={`msg ${importStatus.startsWith('Error') ? 'bad' : 'ok'}`}>
          <CheckCircle2 size={16} />
          {importStatus}
        </div>
      )}

      {/* 1. School Data Quick Presets */}
      <div className="card">
        <h3>1. Data Presets & Excel Import</h3>
        <div className="r">
          <button className="b p" onClick={onResetToDefault}>
            <RotateCcw size={14} />
            Load Insight International School Data (June 2026)
          </button>
          
          <label className="b outline" style={{ cursor: 'pointer', margin: 0, flexDirection: 'row', alignItems: 'center' }}>
            <Upload size={14} />
            Import .xlsx Workbook
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </label>

          <button className="b" onClick={onClearAll}>
            Start Blank
          </button>
        </div>
        <div className="mut">
          Upload any timetable workbook matching the school format (sheets: <i>"Teachers timetable"</i>, <i>"Teachers Workload"</i>, <i>"Grades and Subjects"</i>). All data is saved automatically in your browser's localStorage.
        </div>
      </div>

      {/* 2. School Settings */}
      <div className="card">
        <h3>2. Schedule Structure & Period Timings</h3>
        <div className="r">
          <label>
            Days per week
            <select
              value={settings.days}
              onChange={e => onUpdateSettings({ days: parseInt(e.target.value, 10) })}
            >
              <option value={5}>5 Days (Mon – Fri)</option>
              <option value={6}>6 Days (Mon – Sat)</option>
            </select>
          </label>

          <label>
            Max Teacher Load (Periods/Week)
            <input
              type="number"
              min={1}
              max={45}
              value={settings.maxLoad}
              onChange={e => onUpdateSettings({ maxLoad: parseInt(e.target.value, 10) || 30 })}
              style={{ width: '90px' }}
            />
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontSize: '11px', color: 'var(--mut)', fontWeight: 500 }}>
              Periods per day (Mon–{DAYS_NAMES[settings.days - 1]}):
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {DAYS_NAMES.slice(0, settings.days).map((d, idx) => (
                <div key={d} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', color: 'var(--mut)', display: 'block' }}>{d}</span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={settings.periodsPerDay[idx] || 7}
                    onChange={e => {
                      const newP = [...settings.periodsPerDay];
                      newP[idx] = parseInt(e.target.value, 10) || 7;
                      onUpdateSettings({ periodsPerDay: newP });
                    }}
                    style={{ width: '48px', padding: '4px', textAlign: 'center', fontSize: '12px' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingBottom: '4px' }}>
            <span className="pill-stat">
              Weekly class capacity: <b>{totalWeeklySlots} periods</b>
            </span>
          </div>
        </div>

        <label className="mut" style={{ display: 'block', marginTop: '10px', marginBottom: '4px' }}>
          Period times (one per line, e.g. "9:10–9:55")
        </label>
        <textarea
          value={settings.times.join('\n')}
          onChange={e => onUpdateSettings({ times: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
          style={{ minHeight: '80px', maxHeight: '140px' }}
        />
      </div>

      <div className="two">
        {/* 3. Teachers */}
        <div className="card">
          <h3>
            3. Teachers <small>({teachers.length} registered)</small>
          </h3>
          <div className="r">
            <input
              placeholder="Search teachers or subjects..."
              value={teacherSearch}
              onChange={e => setTeacherSearch(e.target.value)}
              style={{ flex: 1, minWidth: '160px' }}
            />
          </div>
          <div className="r" style={{ background: 'rgba(125,125,125,0.04)', padding: '8px', borderRadius: '8px' }}>
            <label style={{ flex: 1 }}>
              Teacher Name
              <input
                placeholder="e.g. Ms. Sumiya Aman"
                value={newTeacherName}
                onChange={e => setNewTeacherName(e.target.value)}
              />
            </label>
            <label style={{ width: '130px' }}>
              Subject
              <input
                placeholder="e.g. English"
                value={newTeacherSubj}
                onChange={e => setNewTeacherSubj(e.target.value)}
              />
            </label>
            <button className="b p" onClick={handleAddTeacher}>
              <Plus size={14} /> Add
            </button>
          </div>

          <div className="sc" style={{ maxHeight: '420px', overflowY: 'auto' }}>
            <table className="wt">
              <thead>
                <tr>
                  <th>Teacher Name</th>
                  <th>Subject</th>
                  <th>Max</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map(t => (
                  <tr key={t.id}>
                    <td>
                      <input
                        value={t.name}
                        onChange={e => {
                          const updated = teachers.map(item =>
                            item.id === t.id ? { ...item, name: e.target.value } : item
                          );
                          onUpdateTeachers(updated);
                        }}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td>
                      <input
                        value={t.subj}
                        onChange={e => {
                          const updated = teachers.map(item =>
                            item.id === t.id ? { ...item, subj: e.target.value } : item
                          );
                          onUpdateTeachers(updated);
                        }}
                        style={{ width: '110px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={t.maxLoad ?? 30}
                        onChange={e => {
                          const updated = teachers.map(item =>
                            item.id === t.id ? { ...item, maxLoad: parseInt(e.target.value, 10) || 30 } : item
                          );
                          onUpdateTeachers(updated);
                        }}
                        style={{ width: '45px', textAlign: 'center', padding: '4px' }}
                      />
                    </td>
                    <td>
                      <button className="b x" onClick={() => handleDeleteTeacher(t.id)} title="Delete teacher">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTeachers.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--mut)', padding: '16px' }}>
                      No teachers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Classes & Subjects */}
        <div className="card">
          <h3>
            4. Classes & Weekly Subject Distribution <small>({classes.length} classes)</small>
          </h3>
          <div className="r" style={{ background: 'rgba(125,125,125,0.04)', padding: '8px', borderRadius: '8px' }}>
            <label style={{ flex: 1 }}>
              Add Class / Section Name
              <input
                placeholder="e.g. 6A or 10B"
                value={newClassName}
                onChange={e => setNewClassName(e.target.value)}
              />
            </label>
            <button className="b p" onClick={handleAddClass}>
              <Plus size={14} /> Add Class
            </button>
          </div>

          <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
            {classes.map(c => {
              const reqs = parseSubjectRequirements(c.subs);
              const totalSubs = Object.values(reqs).reduce((a, b) => a + b, 0);
              const isMatch = totalSubs === totalWeeklySlots;

              return (
                <div key={c.name} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <b>Class {c.name}</b>
                      <span className={`badge ${isMatch ? 'ok' : 'warn'}`}>
                        {totalSubs} / {totalWeeklySlots} periods
                      </span>
                    </div>
                    <button className="b x" onClick={() => handleDeleteClass(c.name)} title="Delete class">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <textarea
                    value={c.subs}
                    onChange={e => {
                      const updated = classes.map(item =>
                        item.name === c.name ? { ...item, subs: e.target.value } : item
                      );
                      onUpdateClasses(updated);
                    }}
                    placeholder="Subject:periods per line (e.g. Maths:6)"
                    style={{ minHeight: '65px', fontSize: '11.5px' }}
                  />
                </div>
              );
            })}
            {classes.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--mut)', padding: '24px' }}>
                No classes registered yet. Add a class above or load school preset.
              </div>
            )}
          </div>
          <div className="mut" style={{ marginTop: '8px' }}>
            Format: One subject per line as <code>Subject:periods</code>. Periods sum to class weekly requirement.
          </div>
        </div>
      </div>
    </div>
  );
};
