import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { SlotsMap, Teacher, AppSettings } from '../types';
import { DAYS_NAMES } from '../utils/validator';

interface TeacherTimetableTabProps {
  slots: SlotsMap;
  teachers: Teacher[];
  settings: AppSettings;
}

export const TeacherTimetableTab: React.FC<TeacherTimetableTabProps> = ({
  slots,
  teachers,
  settings
}) => {
  const [viewMode, setViewMode] = useState<'master' | 'individual'>('master');
  const [selectedTeacherId, setSelectedTeacherId] = useState<number>(teachers[0]?.id || 1);
  const [searchQuery, setSearchQuery] = useState('');

  const teacherMap = new Map<number, Teacher>(teachers.map(t => [t.id, t]));

  // Index teacher slots: teacherId|day|period -> { className, subject, isCatchUp }
  const teacherSlotsMap = new Map<string, { className: string; subject: string; isCatchUp?: boolean }>();
  const teacherTotals = new Map<number, number>();

  for (const [key, slot] of Object.entries(slots)) {
    const [c, d, p] = key.split('|');
    const teacherKey = `${slot.t}|${d}|${p}`;
    teacherSlotsMap.set(teacherKey, { className: c, subject: slot.s, isCatchUp: slot.isCatchUp });
    teacherTotals.set(slot.t, (teacherTotals.get(slot.t) || 0) + 1);
  }

  // Filter teachers
  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subj.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.allottedClasses && t.allottedClasses.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getHue = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h * 31 + s.charCodeAt(i)) % 360;
    }
    return h;
  };

  const selectedTeacher = teacherMap.get(selectedTeacherId);
  const selectedTeacherLoad = teacherTotals.get(selectedTeacherId) || 0;
  const maxLoad = selectedTeacher?.maxLoad ?? settings.maxLoad ?? 30;

  return (
    <div>
      {/* Control Bar */}
      <div className="card">
        <div className="r" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              className={`b ${viewMode === 'master' ? 'p' : 'outline'}`}
              onClick={() => setViewMode('master')}
            >
              Master Grid View (Excel Format)
            </button>
            <button
              className={`b ${viewMode === 'individual' ? 'p' : 'outline'}`}
              onClick={() => setViewMode('individual')}
            >
              Individual Teacher View
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {viewMode === 'individual' ? (
              <label style={{ margin: 0, flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--mut)' }}>Teacher:</span>
                <select
                  value={selectedTeacherId}
                  onChange={e => setSelectedTeacherId(Number(e.target.value))}
                  style={{ minWidth: '220px', fontWeight: 600 }}
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({teacherTotals.get(t.id) || 0}/{t.maxLoad ?? 30}p) - {t.subj}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <div style={{ position: 'relative' }}>
                <input
                  placeholder="Filter teachers, subjects or classes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '28px', minWidth: '260px' }}
                />
                <Search size={14} style={{ position: 'absolute', left: '8px', top: '10px', color: 'var(--mut)' }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VIEW 1: Master Grid View (Excel Sheet Format) */}
      {viewMode === 'master' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3>
              Teachers Master Timetable Grid <small>({settings.month} {settings.year})</small>
            </h3>
            <span className="pill-stat">
              Showing <b>{filteredTeachers.length}</b> teachers
            </span>
          </div>

          <div className="sc" style={{ maxHeight: '700px', overflowY: 'auto' }}>
            <table style={{ fontSize: '11px', borderSpacing: '1px' }}>
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    style={{
                      position: 'sticky',
                      left: 0,
                      zIndex: 10,
                      background: 'var(--card)',
                      textAlign: 'left',
                      minWidth: '180px',
                      borderRight: '1px solid var(--line)',
                      padding: '6px'
                    }}
                  >
                    Staff Members & Subjects
                  </th>
                  {DAYS_NAMES.slice(0, settings.days).map((d, dIdx) => {
                    const pCount = settings.periodsPerDay[dIdx] ?? settings.periodsPerDay[0] ?? 7;
                    return (
                      <th
                        key={d}
                        colSpan={pCount}
                        style={{
                          borderBottom: '1px solid var(--line)',
                          borderLeft: '1px solid var(--line)',
                          padding: '4px',
                          background: 'rgba(125,125,125,0.05)'
                        }}
                      >
                        {d.toUpperCase()}
                      </th>
                    );
                  })}
                  <th rowSpan={2} style={{ minWidth: '140px', padding: '6px', borderLeft: '1px solid var(--line)' }}>
                    Classes Allotted
                  </th>
                  <th rowSpan={2} style={{ width: '80px', padding: '6px' }}>
                    Total
                  </th>
                </tr>
                <tr>
                  {DAYS_NAMES.slice(0, settings.days).flatMap((_, dIdx) => {
                    const pCount = settings.periodsPerDay[dIdx] ?? settings.periodsPerDay[0] ?? 7;
                    return Array.from({ length: pCount }).map((__, p) => (
                      <th
                        key={`${dIdx}-${p}`}
                        style={{
                          width: '42px',
                          fontSize: '10px',
                          padding: '2px',
                          borderLeft: p === 0 ? '1px solid var(--line)' : 'none'
                        }}
                      >
                        P{p + 1}
                      </th>
                    ));
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map(t => {
                  const total = teacherTotals.get(t.id) || 0;
                  const max = t.maxLoad ?? settings.maxLoad ?? 30;
                  const isOverloaded = total > max;

                  return (
                    <tr key={t.id} style={{ height: '36px' }}>
                      <td
                        style={{
                          position: 'sticky',
                          left: 0,
                          zIndex: 5,
                          background: 'var(--card)',
                          fontWeight: 600,
                          padding: '4px 8px',
                          whiteSpace: 'nowrap',
                          borderRight: '1px solid var(--line)',
                          borderBottom: '1px solid var(--line)'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>{t.name}</span>
                          <span style={{ fontSize: '10px', color: 'var(--mut)', fontWeight: 400 }}>
                            {t.subj || 'General'}
                          </span>
                        </div>
                      </td>

                      {DAYS_NAMES.slice(0, settings.days).flatMap((_, d) => {
                        const pCount = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
                        return Array.from({ length: pCount }).map((__, p) => {
                          const slotInfo = teacherSlotsMap.get(`${t.id}|${d}|${p}`);
                          const borderLeft = p === 0 ? '1px solid var(--line)' : 'none';

                          if (!slotInfo) {
                            return (
                              <td
                                key={`${d}-${p}`}
                                style={{
                                  borderLeft,
                                  borderBottom: '1px solid var(--line)',
                                  textAlign: 'center',
                                  color: 'var(--mut)',
                                  fontSize: '10px'
                                }}
                              >
                                –
                              </td>
                            );
                          }

                          const hueVal = getHue(slotInfo.subject);

                          return (
                            <td
                              key={`${d}-${p}`}
                              style={{
                                borderLeft,
                                borderBottom: '1px solid var(--line)',
                                padding: '1px',
                                textAlign: 'center'
                              }}
                            >
                              <div
                                style={{
                                  background: `hsl(${hueVal} var(--s) var(--l))`,
                                  borderRadius: '4px',
                                  padding: '2px',
                                  fontSize: '10.5px',
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                                title={`${slotInfo.className} (${slotInfo.subject})`}
                              >
                                {slotInfo.className}
                              </div>
                            </td>
                          );
                        });
                      })}

                      <td
                        style={{
                          fontSize: '10.5px',
                          padding: '4px',
                          color: 'var(--mut)',
                          borderLeft: '1px solid var(--line)',
                          borderBottom: '1px solid var(--line)',
                          maxWidth: '180px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title={t.allottedClasses}
                      >
                        {t.allottedClasses || '–'}
                      </td>

                      <td
                        style={{
                          textAlign: 'center',
                          fontWeight: 700,
                          borderBottom: '1px solid var(--line)',
                          color: isOverloaded ? 'var(--bad)' : total === max ? 'var(--ok)' : 'var(--ink)'
                        }}
                      >
                        {total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: Individual Teacher Weekly Timetable */}
      {viewMode === 'individual' && selectedTeacher && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h3 style={{ margin: 0 }}>
                {selectedTeacher.name}
                <small> · {selectedTeacher.subj || 'General'}</small>
              </h3>
              {selectedTeacher.allottedClasses && (
                <div style={{ fontSize: '11.5px', color: 'var(--mut)', marginTop: '2px' }}>
                  <b>Allotted:</b> {selectedTeacher.allottedClasses}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>
                  {selectedTeacherLoad} of {maxLoad} periods
                </span>
                <div className={`bar ${selectedTeacherLoad > maxLoad ? 'o' : selectedTeacherLoad === maxLoad ? 'full' : ''}`} style={{ width: '130px', marginTop: '4px' }}>
                  <i style={{ width: `${Math.min(100, (selectedTeacherLoad / maxLoad) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="sc">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '90px' }}>Period</th>
                  {DAYS_NAMES.slice(0, settings.days).map(d => (
                    <th key={d}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(...settings.periodsPerDay.slice(0, settings.days)) }).map((_, p) => (
                  <tr key={p}>
                    <td className="pl">
                      <b>P{p + 1}</b>
                      <span>{settings.times[p] || ''}</span>
                    </td>

                    {DAYS_NAMES.slice(0, settings.days).map((_, d) => {
                      const maxP = settings.periodsPerDay[d] ?? settings.periodsPerDay[0] ?? 7;
                      if (p >= maxP) {
                        return (
                          <td key={d}>
                            <div style={{ height: '44px', background: 'rgba(125,125,125,0.05)', borderRadius: '6px' }} />
                          </td>
                        );
                      }

                      const slotInfo = teacherSlotsMap.get(`${selectedTeacher.id}|${d}|${p}`);
                      if (!slotInfo) {
                        return (
                          <td key={d}>
                            <div className="c e ro">
                              <span style={{ color: 'var(--mut)', fontSize: '11px' }}>Free (Leisure)</span>
                            </div>
                          </td>
                        );
                      }

                      const hueVal = getHue(slotInfo.subject);

                      return (
                        <td key={d}>
                          <div
                            className={`c ro ${slotInfo.isCatchUp ? 'catch-up' : ''}`}
                            style={{ '--h': hueVal } as React.CSSProperties}
                          >
                            <span>Class {slotInfo.className}</span>
                            <small>{slotInfo.subject}</small>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
