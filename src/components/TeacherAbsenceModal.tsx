import React, { useState } from 'react';
import { UserX, Users, X, RefreshCw } from 'lucide-react';
import type { Teacher, SlotsMap, AppSettings } from '../types';
import { DAYS_NAMES } from '../utils/validator';
import { autoAssignSubstitutes, restoreOriginalTeachers, vacateAbsentTeacherSlots } from '../utils/scheduler';

interface TeacherAbsenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  teachers: Teacher[];
  slots: SlotsMap;
  settings: AppSettings;
  onUpdateSlots: (updatedSlots: SlotsMap) => void;
  onNotify: (msg: string, type: 'ok' | 'warn' | 'bad') => void;
}

export const TeacherAbsenceModal: React.FC<TeacherAbsenceModalProps> = ({
  isOpen,
  onClose,
  teachers,
  slots,
  settings,
  onUpdateSlots,
  onNotify
}) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | ''>('');
  const [dayFilter, setDayFilter] = useState<'all' | number>('all');

  if (!isOpen) return null;

  // Find currently substituted or absent slots
  const substitutedSlotsCount = Object.values(slots).filter(s => s.isSubstituted).length;
  const substitutedOriginalTeacherIds = new Set<number>();
  for (const s of Object.values(slots)) {
    if (s.isSubstituted && s.originalTeacherId) {
      substitutedOriginalTeacherIds.add(s.originalTeacherId);
    }
  }

  // Count periods for selected teacher
  let affectedPeriods = 0;
  if (selectedTeacherId !== '') {
    for (const [key, slot] of Object.entries(slots)) {
      const [, dStr] = key.split('|');
      const d = parseInt(dStr, 10);
      if (dayFilter !== 'all' && d !== dayFilter) continue;
      if (slot.t === selectedTeacherId || slot.originalTeacherId === selectedTeacherId) {
        affectedPeriods++;
      }
    }
  }

  // Handle Auto-Substitute
  const handleAutoSubstitute = () => {
    if (selectedTeacherId === '') return;
    const filter = dayFilter === 'all' ? undefined : dayFilter;
    const res = autoAssignSubstitutes(slots, [selectedTeacherId], teachers, settings, filter);
    onUpdateSlots(res.slots);
    if (res.substitutedCount > 0) {
      onNotify(
        `Assigned substitutes for ${res.substitutedCount} periods! ${
          res.unsubstitutedCount > 0 ? `(${res.unsubstitutedCount} periods had no free substitute without breaking 30-period limit)` : ''
        }`,
        res.unsubstitutedCount > 0 ? 'warn' : 'ok'
      );
    } else {
      onNotify('No available substitute teachers found under the 30-period limit for these slots.', 'warn');
    }
    onClose();
  };

  // Handle Vacate slots
  const handleVacateSlots = () => {
    if (selectedTeacherId === '') return;
    const filter = dayFilter === 'all' ? undefined : dayFilter;
    const updated = vacateAbsentTeacherSlots(slots, [selectedTeacherId], filter);
    onUpdateSlots(updated);
    onNotify(`Vacated ${affectedPeriods} periods for the absent teacher.`, 'ok');
    onClose();
  };

  // Handle Restore
  const handleRestoreTeacher = (tId: number) => {
    const updated = restoreOriginalTeachers(slots, [tId]);
    onUpdateSlots(updated);
    const t = teachers.find(teach => teach.id === tId);
    onNotify(`Restored ${t ? t.name : 'teacher'} to their original classes.`, 'ok');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          margin: 0,
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserX size={18} color="var(--bad)" />
            Teacher Absence & Substitution Manager
          </h3>
          <button className="b outline" onClick={onClose} style={{ padding: '3px 6px' }}>
            <X size={15} />
          </button>
        </div>

        <p className="mut" style={{ fontSize: '12.5px', marginTop: 0 }}>
          When a teacher is absent or on leave, pick their name below. You can either automatically assign free substitute teachers (who won't exceed the 30-period limit) or vacate their periods for leisure/catch-up.
        </p>

        {/* Currently Substituted Teachers Bar */}
        {substitutedOriginalTeacherIds.size > 0 && (
          <div style={{ background: 'var(--acc2)', borderRadius: '8px', padding: '10px 12px', marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--acc)', marginBottom: '6px' }}>
              CURRENTLY ON LEAVE / SUBSTITUTED ({substitutedSlotsCount} periods):
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {Array.from(substitutedOriginalTeacherIds).map(id => {
                const t = teachers.find(teach => teach.id === id);
                return (
                  <span
                    key={id}
                    className="badge warn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 8px' }}
                  >
                    <span>{t ? t.name : `Teacher #${id}`}</span>
                    <button
                      className="b"
                      onClick={() => handleRestoreTeacher(id)}
                      style={{ padding: '1px 5px', fontSize: '10px', height: '18px' }}
                      title="Restore original teacher when back from leave"
                    >
                      <RefreshCw size={10} /> Back
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Selection Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600 }}>
            Select Absent Teacher:
            <select
              value={selectedTeacherId}
              onChange={e => setSelectedTeacherId(e.target.value === '' ? '' : Number(e.target.value))}
              style={{ width: '100%', marginTop: '4px', fontSize: '13px' }}
            >
              <option value="">Choose teacher...</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.subj || 'General'})
                </option>
              ))}
            </select>
          </label>

          <label style={{ fontSize: '12px', fontWeight: 600 }}>
            Absence Duration:
            <select
              value={dayFilter}
              onChange={e => setDayFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              style={{ width: '100%', marginTop: '4px', fontSize: '13px' }}
            >
              <option value="all">Entire Week (All Days)</option>
              {DAYS_NAMES.slice(0, settings.days).map((d, idx) => (
                <option key={d} value={idx}>
                  {d} Only (Today)
                </option>
              ))}
            </select>
          </label>
        </div>

        {selectedTeacherId !== '' && (
          <div
            style={{
              padding: '10px',
              borderRadius: '8px',
              background: 'rgba(125,125,125,0.06)',
              marginBottom: '14px',
              fontSize: '12px'
            }}
          >
            <b>{affectedPeriods} periods</b> affected by this absence.
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button
            className="b p"
            onClick={handleAutoSubstitute}
            disabled={selectedTeacherId === '' || affectedPeriods === 0}
            style={{ flex: 1, minWidth: '160px' }}
          >
            <Users size={14} />
            Auto-Assign Free Substitutes
          </button>

          <button
            className="b outline"
            onClick={handleVacateSlots}
            disabled={selectedTeacherId === '' || affectedPeriods === 0}
          >
            Vacate / Clear Slots
          </button>

          <button className="b" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
