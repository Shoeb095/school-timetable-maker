import React, { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import type { SlotsMap, Teacher, ClassInfo, AppSettings } from '../types';
import { parsePastedTimetable, calculateShortfall, calculateCatchUpCapacity } from '../utils/catchUp';

interface CatchUpTabProps {
  slots: SlotsMap;
  onUpdateSlots: (slots: SlotsMap) => void;
  teachers: Teacher[];
  classes: ClassInfo[];
  settings: AppSettings;
  onApplyCatchUp: (shortfalls: Record<string, Record<string, number>>) => void;
}

export const CatchUpTab: React.FC<CatchUpTabProps> = ({
  slots,
  onUpdateSlots,
  teachers,
  classes,
  settings,
  onApplyCatchUp
}) => {
  const [pastedText, setPastedText] = useState('');
  const [lostWeeks, setLostWeeks] = useState(2);
  const [lostDays, setLostDays] = useState(0);
  const [halfDays, setHalfDays] = useState(true);
  const [lossDescription, setLossDescription] = useState('2 weeks lost, half days');
  const [overrideClass, setOverrideClass] = useState<string>('');
  const [overrideSubj, setOverrideSubj] = useState<string>('');
  const [overridePeriods, setOverridePeriods] = useState<number>(0);
  const [customOverrides, setCustomOverrides] = useState<Record<string, Record<string, number>>>({});

  // Parse pasted timetable
  const parsedData = parsePastedTimetable(pastedText);

  // Calculate shortfall
  const { shortfallByClass, totalShortfall } = calculateShortfall(
    parsedData.classSubjectCounts,
    classes,
    lostWeeks,
    lostDays,
    halfDays,
    customOverrides
  );

  // Calculate teacher spare capacity
  const capacityReport = calculateCatchUpCapacity(teachers, slots, settings, totalShortfall);

  // Count currently allocated catch-up slots
  const allocatedCatchUpCount = Object.values(slots).filter(s => s.isCatchUp).length;

  // Add override
  const handleAddOverride = () => {
    if (!overrideClass || !overrideSubj || overridePeriods <= 0) return;
    setCustomOverrides(prev => ({
      ...prev,
      [overrideClass]: {
        ...(prev[overrideClass] || {}),
        [overrideSubj]: overridePeriods
      }
    }));
    setOverrideSubj('');
    setOverridePeriods(0);
  };

  const handleRemoveOverride = (c: string, s: string) => {
    setCustomOverrides(prev => {
      const updated = { ...prev };
      if (updated[c]) {
        delete updated[c][s];
        if (Object.keys(updated[c]).length === 0) delete updated[c];
      }
      return updated;
    });
  };

  // Clear all catch-up slots
  const handleClearCatchUpSlots = () => {
    const updated: SlotsMap = {};
    for (const [k, slot] of Object.entries(slots)) {
      if (!slot.isCatchUp) {
        updated[k] = slot;
      }
    }
    onUpdateSlots(updated);
  };

  return (
    <div>
      {/* Overview & Instructions */}
      <div className="card">
        <h3>
          <Zap size={16} color="var(--acc)" />
          Catch-Up Scheduler & Capacity Shortfall Planner (Optional)
        </h3>
        <p className="mut" style={{ fontSize: '13px', margin: '4px 0 10px' }}>
          When academic time is lost due to events, exams, or half-days, paste the previous timetable below and specify lost duration. The system automatically computes shortfalls per subject and books remedial periods using teachers with spare capacity (&lt; 30 periods/week) without violating any hard rules.
        </p>
      </div>

      <div className="two">
        {/* 1. Paste Box & Loss Inputs */}
        <div className="card">
          <h3>1. Last Month's Timetable (Copy & Paste from Excel)</h3>
          <textarea
            value={pastedText}
            onChange={e => setPastedText(e.target.value)}
            placeholder="Paste cells directly from Excel (e.g. from 'Teachers timetable' sheet or list of periods)&#10;Teacher	Day	Period	Class	Subject"
            style={{ minHeight: '130px', fontSize: '11px' }}
          />
          {pastedText && (
            <div className="mut" style={{ fontSize: '12px', marginTop: '4px' }}>
              {parsedData.summaryMessage}
            </div>
          )}

          <h3 style={{ marginTop: '14px' }}>2. Specify Time Lost</h3>
          <div className="r">
            <label style={{ flex: 1 }}>
              Loss Description
              <input
                value={lossDescription}
                onChange={e => {
                  setLossDescription(e.target.value);
                  if (e.target.value.toLowerCase().includes('half')) setHalfDays(true);
                }}
                placeholder="e.g. 2 weeks lost, half days"
              />
            </label>

            <label style={{ width: '80px' }}>
              Weeks Lost
              <input
                type="number"
                min={0}
                max={4}
                value={lostWeeks}
                onChange={e => setLostWeeks(parseInt(e.target.value, 10) || 0)}
              />
            </label>

            <label style={{ width: '80px' }}>
              Days Lost
              <input
                type="number"
                min={0}
                max={24}
                value={lostDays}
                onChange={e => setLostDays(parseInt(e.target.value, 10) || 0)}
              />
            </label>

            <label style={{ flexDirection: 'row', alignItems: 'center', gap: '6px', height: '36px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={halfDays}
                onChange={e => setHalfDays(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              <span style={{ fontSize: '12px' }}>Half-days only</span>
            </label>
          </div>

          {/* Optional Per-Class Override */}
          <div style={{ marginTop: '12px', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Optional per-class shortfall override:</span>
            <div className="r" style={{ marginTop: '6px' }}>
              <select
                value={overrideClass}
                onChange={e => setOverrideClass(e.target.value)}
                style={{ fontSize: '12px' }}
              >
                <option value="">Choose Class...</option>
                {classes.map(c => (
                  <option key={c.name} value={c.name}>
                    Class {c.name}
                  </option>
                ))}
              </select>

              <input
                placeholder="Subject (e.g. Maths)"
                value={overrideSubj}
                onChange={e => setOverrideSubj(e.target.value)}
                style={{ width: '130px', fontSize: '12px' }}
              />

              <input
                type="number"
                min={1}
                max={20}
                placeholder="Lost p"
                value={overridePeriods || ''}
                onChange={e => setOverridePeriods(parseInt(e.target.value, 10) || 0)}
                style={{ width: '65px', fontSize: '12px' }}
              />

              <button className="b p" onClick={handleAddOverride} style={{ padding: '6px 10px', fontSize: '12px' }}>
                Add Override
              </button>
            </div>

            {Object.keys(customOverrides).length > 0 && (
              <div style={{ marginTop: '6px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {Object.entries(customOverrides).flatMap(([c, sMap]) =>
                  Object.entries(sMap).map(([s, p]) => (
                    <span key={`${c}-${s}`} className="badge warn" style={{ display: 'inline-flex', gap: '4px' }}>
                      {c}: {s} ({p}p)
                      <button
                        onClick={() => handleRemoveOverride(c, s)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
                      >
                        ✕
                      </button>
                    </span>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* 2. Capacity Report & Action */}
        <div className="card">
          <h3>3. Catch-Up Capacity Report</h3>
          
          <div style={{ background: 'rgba(125,125,125,0.04)', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Capacity Availability</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: capacityReport.isDeficit ? 'var(--bad)' : 'var(--ok)' }}>
                {capacityReport.totalShortfall} needed / {capacityReport.availableCapacity} available
              </span>
            </div>

            <div className={`bar ${capacityReport.isDeficit ? 'o' : 'full'}`} style={{ height: '12px' }}>
              <i
                style={{
                  width: capacityReport.availableCapacity > 0
                    ? `${Math.min(100, (capacityReport.totalShortfall / capacityReport.availableCapacity) * 100)}%`
                    : '100%'
                }}
              />
            </div>

            {capacityReport.isDeficit ? (
              <div className="msg bad" style={{ marginTop: '10px', fontSize: '12.5px' }}>
                <AlertTriangle size={16} />
                <div>
                  <b>Deficit Warning:</b> Timetable needs <b>{capacityReport.totalShortfall}</b> catch-up periods, but school teachers only have <b>{capacityReport.availableCapacity}</b> periods of spare capacity under the 30-period limit.
                  <div style={{ marginTop: '4px', fontSize: '11.5px' }}>
                    Shortfall gap of <b>{capacityReport.deficitAmount} periods</b> cannot be scheduled without hiring additional staff or adding extra days.
                  </div>
                </div>
              </div>
            ) : (
              <div className="msg ok" style={{ marginTop: '10px', fontSize: '12.5px' }}>
                <CheckCircle size={16} />
                <div>
                  <b>Adequate Capacity:</b> All {capacityReport.totalShortfall} shortfall periods can be scheduled within teachers' weekly 30-period limit!
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <button
              className="b p"
              onClick={() => onApplyCatchUp(shortfallByClass)}
              disabled={totalShortfall === 0}
            >
              <Sparkles size={14} />
              Auto-Allocate Catch-Up Periods
            </button>
            {allocatedCatchUpCount > 0 && (
              <button className="b x" onClick={handleClearCatchUpSlots}>
                Clear Catch-Up Slots ({allocatedCatchUpCount} active)
              </button>
            )}
          </div>

          {/* Teacher Spare Capacity Breakdown */}
          <span style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
            Teachers with spare capacity (&lt; 30 periods/week):
          </span>
          <div className="sc" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <table className="wt">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Current Load</th>
                  <th>Spare Room</th>
                </tr>
              </thead>
              <tbody>
                {capacityReport.teacherSpareCapacity.filter(t => t.spareLoad > 0).map(t => (
                  <tr key={t.teacherId}>
                    <td>{t.teacherName}</td>
                    <td>{t.currentLoad} / 30</td>
                    <td>
                      <b style={{ color: 'var(--acc)' }}>+{t.spareLoad} periods</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Class Shortfall Details */}
      {totalShortfall > 0 && (
        <div className="card">
          <h3>Calculated Shortfall by Class & Subject</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
            {Object.entries(shortfallByClass).filter(([, subjs]) => Object.values(subjs).some(v => v > 0)).map(([c, subjs]) => (
              <div key={c} style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '8px', background: 'var(--card)' }}>
                <b style={{ display: 'block', marginBottom: '4px' }}>Class {c}</b>
                <div style={{ fontSize: '11.5px', color: 'var(--mut)' }}>
                  {Object.entries(subjs).map(([s, n]) => (
                    <div key={s} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{s}:</span>
                      <b>+{n}p</b>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
