import React, { useState } from 'react';
import { Sparkles, Trash2, AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { SlotsMap, Teacher, ClassInfo, AppSettings, RuleViolation } from '../types';
import { parseSubjectRequirements, validateProposedSlot, DAYS_NAMES } from '../utils/validator';

interface ClassTimetableTabProps {
  slots: SlotsMap;
  onUpdateSlots: (slots: SlotsMap) => void;
  teachers: Teacher[];
  classes: ClassInfo[];
  settings: AppSettings;
  selectedClass?: string;
  onSelectClass?: (c: string) => void;
  onAutoFillClass: (className: string) => void;
  onAutoFillAll: () => void;
  onRegenerateAll: () => void;
  onClearClass: (className: string) => void;
}

export const ClassTimetableTab: React.FC<ClassTimetableTabProps> = ({
  slots,
  onUpdateSlots,
  teachers,
  classes,
  settings,
  selectedClass: propSelectedClass,
  onSelectClass: propOnSelectClass,
  onAutoFillClass,
  onAutoFillAll,
  onRegenerateAll,
  onClearClass
}) => {
  const [internalClass, setInternalClass] = useState<string>(classes[0]?.name || '');
  const selectedClass = propSelectedClass || internalClass;
  const setSelectedClass = (c: string) => {
    if (propOnSelectClass) propOnSelectClass(c);
    setInternalClass(c);
  };
  const [editingCell, setEditingCell] = useState<{ day: number; period: number } | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | ''>('');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const teacherMap = new Map<number, Teacher>(teachers.map(t => [t.id, t]));
  const currentClassInfo = classes.find(c => c.name === selectedClass);

  // Subject balance calculation
  const classReqs = currentClassInfo ? parseSubjectRequirements(currentClassInfo.subs) : {};
  const placedCounts: Record<string, number> = {};
  for (const [key, slot] of Object.entries(slots)) {
    const [c] = key.split('|');
    if (c === selectedClass) {
      placedCounts[slot.s] = (placedCounts[slot.s] || 0) + 1;
    }
  }

  const unplacedEntries = Object.entries(classReqs)
    .map(([s, req]) => ({
      subject: s,
      required: req,
      placed: placedCounts[s] || 0,
      remaining: Math.max(0, req - (placedCounts[s] || 0))
    }))
    .filter(item => item.remaining > 0);

  const totalRequired = Object.values(classReqs).reduce((a, b) => a + b, 0);
  const totalPlaced = Object.values(placedCounts).reduce((a, b) => a + b, 0);

  // Subject Hue
  const getHue = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h * 31 + s.charCodeAt(i)) % 360;
    }
    return h;
  };

  // Open cell editor
  const handleCellClick = (d: number, p: number) => {
    const key = `${selectedClass}|${d}|${p}`;
    const current = slots[key];
    setEditingCell({ day: d, period: p });
    setSelectedSubject(current?.s || '');
    setSelectedTeacherId(current?.t || '');
  };

  // Live Rule Violations for proposed edit
  const proposedViolations: RuleViolation[] = editingCell && selectedTeacherId !== '' && selectedSubject !== ''
    ? validateProposedSlot(
        slots,
        selectedClass,
        editingCell.day,
        editingCell.period,
        Number(selectedTeacherId),
        selectedSubject,
        teachers,
        settings
      )
    : [];

  // Save Cell Edit
  const handleSaveCell = () => {
    if (!editingCell) return;
    if (!selectedSubject.trim() || selectedTeacherId === '') {
      alert('Please choose both a subject and a teacher.');
      return;
    }
    const key = `${selectedClass}|${editingCell.day}|${editingCell.period}`;
    const updated = {
      ...slots,
      [key]: {
        t: Number(selectedTeacherId),
        s: selectedSubject.trim()
      }
    };
    onUpdateSlots(updated);
    setEditingCell(null);
    setActionMessage('Cell updated successfully.');
  };

  // Clear Single Cell
  const handleClearCell = () => {
    if (!editingCell) return;
    const key = `${selectedClass}|${editingCell.day}|${editingCell.period}`;
    const updated = { ...slots };
    delete updated[key];
    onUpdateSlots(updated);
    setEditingCell(null);
    setActionMessage('Cell cleared.');
  };

  // Navigation between classes
  const currentIndex = classes.findIndex(c => c.name === selectedClass);
  const handlePrevClass = () => {
    if (currentIndex > 0) {
      setSelectedClass(classes[currentIndex - 1].name);
      setEditingCell(null);
    }
  };
  const handleNextClass = () => {
    if (currentIndex < classes.length - 1) {
      setSelectedClass(classes[currentIndex + 1].name);
      setEditingCell(null);
    }
  };

  // Check teacher busy map for this cell
  const getTeacherBusyInfo = (tId: number, d: number, p: number) => {
    for (const [key, slot] of Object.entries(slots)) {
      const [c, dStr, pStr] = key.split('|');
      if (parseInt(dStr, 10) === d && parseInt(pStr, 10) === p && slot.t === tId && c !== selectedClass) {
        return c;
      }
    }
    return null;
  };

  // Teacher Weekly Load
  const getTeacherLoad = (tId: number) => {
    let count = 0;
    for (const slot of Object.values(slots)) {
      if (slot.t === tId) count++;
    }
    return count;
  };

  if (classes.length === 0) {
    return (
      <div className="card">
        <h3>No classes configured</h3>
        <p className="mut">Please register classes in the Setup tab first.</p>
      </div>
    );
  }

  return (
    <div>
      {actionMessage && (
        <div className="msg ok">
          <CheckCircle2 size={16} />
          {actionMessage}
        </div>
      )}

      {/* Class Toolbar */}
      <div className="card">
        <div className="r" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="b outline" onClick={handlePrevClass} disabled={currentIndex <= 0} title="Previous class">
              <ChevronLeft size={16} />
            </button>
            <label style={{ margin: 0 }}>
              <span style={{ fontSize: '11px', color: 'var(--mut)' }}>Selected Class:</span>
              <select
                value={selectedClass}
                onChange={e => {
                  setSelectedClass(e.target.value);
                  setEditingCell(null);
                }}
                style={{ fontSize: '15px', fontWeight: 700, padding: '5px 12px' }}
              >
                {classes.map(c => (
                  <option key={c.name} value={c.name}>
                    Class {c.name}
                  </option>
                ))}
              </select>
            </label>
            <button className="b outline" onClick={handleNextClass} disabled={currentIndex >= classes.length - 1} title="Next class">
              <ChevronRight size={16} />
            </button>

            <span className="pill-stat">
              Placed: <b>{totalPlaced} / {totalRequired}</b> periods
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="b p" onClick={() => onAutoFillClass(selectedClass)}>
              <Sparkles size={14} />
              Auto-fill this Class
            </button>
            <button className="b p" onClick={onAutoFillAll}>
              <Sparkles size={14} />
              Auto-fill All Classes
            </button>
            <button className="b outline" onClick={onRegenerateAll} title="Regenerate all classes from scratch with 0 clashes">
              Regenerate All
            </button>
            <button className="b x" onClick={() => onClearClass(selectedClass)}>
              <Trash2 size={14} />
              Clear Class
            </button>
          </div>
        </div>

        {/* Unplaced periods notification */}
        <div className="mut" style={{ fontSize: '12px', marginTop: '6px' }}>
          {unplacedEntries.length > 0 ? (
            <span>
              <b>Pending placement:</b>{' '}
              {unplacedEntries.map(e => `${e.subject} (${e.remaining})`).join(', ')}
            </span>
          ) : (
            <span style={{ color: 'var(--ok)', fontWeight: 600 }}>
              ✓ All required curriculum periods are fully placed for this class.
            </span>
          )}
        </div>
      </div>

      {/* Class Timetable Grid */}
      <div className="card">
        <h3>Class {selectedClass} Weekly Grid</h3>
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

                    const key = `${selectedClass}|${d}|${p}`;
                    const slot = slots[key];
                    const isSelected = editingCell?.day === d && editingCell?.period === p;
                    const teacher = slot ? teacherMap.get(slot.t) : null;

                    if (!slot) {
                      return (
                        <td key={d}>
                          <div
                            className={`c e ${isSelected ? 'sel' : ''}`}
                            onClick={() => handleCellClick(d, p)}
                          >
                            +
                          </div>
                        </td>
                      );
                    }

                    const originalTeacher = slot.originalTeacherId ? teacherMap.get(slot.originalTeacherId) : null;

                    return (
                      <td key={d}>
                        <div
                          className={`c ${isSelected ? 'sel' : ''} ${slot.isCatchUp ? 'catch-up' : ''} ${slot.isSubstituted ? 'substituted' : ''}`}
                          style={{ '--h': getHue(slot.s) } as React.CSSProperties}
                          onClick={() => handleCellClick(d, p)}
                          title={`${slot.s} · ${teacher ? teacher.name : 'Unknown'}${slot.isSubstituted ? ` (Substitute for ${originalTeacher ? originalTeacher.name : 'original'})` : ''} (${DAYS_NAMES[d]} P${p + 1})`}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                            <span>{slot.s}</span>
                            {slot.isSubstituted && (
                              <span style={{ fontSize: '8px', background: 'var(--bad)', color: '#fff', borderRadius: '3px', padding: '0 2px', fontWeight: 700 }}>
                                SUB
                              </span>
                            )}
                          </div>
                          <small>
                            {teacher ? teacher.name : `T#${slot.t}`}
                            {slot.isSubstituted && originalTeacher && (
                              <span style={{ display: 'block', fontSize: '9px', opacity: 0.8 }}>
                                for {originalTeacher.name.split(' ')[1] || originalTeacher.name}
                              </span>
                            )}
                          </small>
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

      {/* Manual Cell Editor Modal / Card */}
      {editingCell && (
        <div className="card" style={{ borderColor: 'var(--acc)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ margin: 0 }}>
              Edit Cell: {DAYS_NAMES[editingCell.day]} · Period P{editingCell.period + 1}
              <small> ({settings.times[editingCell.period] || ''})</small>
            </h3>
            <button className="b outline" onClick={() => setEditingCell(null)} style={{ padding: '3px 6px' }}>
              <X size={14} />
            </button>
          </div>

          <div className="r">
            <label style={{ flex: 1 }}>
              Subject
              <input
                list="subject-options"
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                placeholder="Select or type subject"
              />
              <datalist id="subject-options">
                {Object.keys(classReqs).map(s => (
                  <option key={s} value={s}>
                    {s} ({placedCounts[s] || 0}/{classReqs[s]} placed)
                  </option>
                ))}
              </datalist>
            </label>

            <label style={{ flex: 1.5 }}>
              Teacher
              <select
                value={selectedTeacherId}
                onChange={e => setSelectedTeacherId(e.target.value === '' ? '' : Number(e.target.value))}
              >
                <option value="">Select Teacher...</option>
                {teachers.map(t => {
                  const busyIn = getTeacherBusyInfo(t.id, editingCell.day, editingCell.period);
                  const load = getTeacherLoad(t.id);
                  const max = t.maxLoad ?? settings.maxLoad ?? 30;
                  const isBusy = busyIn !== null;

                  return (
                    <option key={t.id} value={t.id} disabled={isBusy}>
                      {t.name} ({load}/{max}p) - {t.subj || 'General'}
                      {isBusy ? ` [BUSY in ${busyIn}]` : ''}
                    </option>
                  );
                })}
              </select>
            </label>

            <button className="b p" onClick={handleSaveCell}>
              Save Cell
            </button>
            <button className="b x" onClick={handleClearCell}>
              Clear Cell
            </button>
            <button className="b" onClick={() => setEditingCell(null)}>
              Cancel
            </button>
          </div>

          {/* Live Rule Violation Feedback */}
          {proposedViolations.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              {proposedViolations.map((v, i) => (
                <div key={i} className="msg bad" style={{ margin: '4px 0', fontSize: '12px' }}>
                  <AlertTriangle size={15} />
                  <span>{v.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
