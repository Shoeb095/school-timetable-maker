import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';
import type { SlotsMap, Teacher, ClassInfo, AppSettings } from '../types';
import { validateFullSchedule } from '../utils/validator';

interface WorkloadChecksTabProps {
  slots: SlotsMap;
  teachers: Teacher[];
  classes: ClassInfo[];
  settings: AppSettings;
  onSelectClass: (c: string) => void;
  onRegenerate: () => void;
}

export const WorkloadChecksTab: React.FC<WorkloadChecksTabProps> = ({
  slots,
  teachers,
  classes,
  settings,
  onSelectClass,
  onRegenerate
}) => {
  const [filterRule, setFilterRule] = useState<number | 'all'>('all');
  const [searchTeacher, setSearchTeacher] = useState('');

  const { violations, stats } = validateFullSchedule(slots, teachers, classes, settings);

  // Compute teacher loads
  const teacherLoads = new Map<number, number>();
  for (const slot of Object.values(slots)) {
    teacherLoads.set(slot.t, (teacherLoads.get(slot.t) || 0) + 1);
  }

  const teacherRows = teachers.map(t => {
    const load = teacherLoads.get(t.id) || 0;
    const max = t.maxLoad ?? settings.maxLoad ?? 30;
    return {
      teacher: t,
      load,
      max,
      isOverloaded: load > max,
      isFull: load === max,
      spare: Math.max(0, max - load)
    };
  }).sort((a, b) => b.load - a.load);

  const filteredViolations = filterRule === 'all'
    ? violations
    : violations.filter(v => v.ruleId === filterRule);

  const filteredTeachers = teacherRows.filter(r =>
    r.teacher.name.toLowerCase().includes(searchTeacher.toLowerCase()) ||
    r.teacher.subj.toLowerCase().includes(searchTeacher.toLowerCase())
  );

  return (
    <div>
      {/* 1. Audit Summary Scorecard */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color={violations.length === 0 ? 'var(--ok)' : 'var(--bad)'} />
              School Timetable Audit & Health Check
            </h3>
            <div className="mut" style={{ fontSize: '12px' }}>
              Automatic live verification of all 5 hard scheduling rules and curriculum coverage.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="b p" onClick={onRegenerate}>
              <Sparkles size={14} />
              Regenerate Clean Timetable
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          {/* Rule 1 */}
          <div
            onClick={() => setFilterRule(filterRule === 1 ? 'all' : 1)}
            style={{
              background: stats.overloadedTeachers > 0 ? 'rgba(194,65,12,0.08)' : 'rgba(21,128,61,0.06)',
              border: `1px solid ${stats.overloadedTeachers > 0 ? 'var(--bad)' : 'var(--line)'}`,
              borderRadius: '8px',
              padding: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--mut)' }}>Rule 1: Max 30 Periods</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: stats.overloadedTeachers > 0 ? 'var(--bad)' : 'var(--ok)' }}>
              {stats.overloadedTeachers} overloaded
            </div>
            <div style={{ fontSize: '11px', color: 'var(--mut)' }}>Max 30 periods/teacher/wk</div>
          </div>

          {/* Rule 2 */}
          <div
            onClick={() => setFilterRule(filterRule === 2 ? 'all' : 2)}
            style={{
              background: stats.consecutiveViolations > 0 ? 'rgba(194,65,12,0.08)' : 'rgba(21,128,61,0.06)',
              border: `1px solid ${stats.consecutiveViolations > 0 ? 'var(--bad)' : 'var(--line)'}`,
              borderRadius: '8px',
              padding: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--mut)' }}>Rule 2: Consecutive Teaching</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: stats.consecutiveViolations > 0 ? 'var(--bad)' : 'var(--ok)' }}>
              {stats.consecutiveViolations} breaks needed
            </div>
            <div style={{ fontSize: '11px', color: 'var(--mut)' }}>Max 3 in a row without break</div>
          </div>

          {/* Rule 3 */}
          <div
            onClick={() => setFilterRule(filterRule === 3 ? 'all' : 3)}
            style={{
              background: stats.lastPeriodMathsViolations > 0 ? 'rgba(194,65,12,0.08)' : 'rgba(21,128,61,0.06)',
              border: `1px solid ${stats.lastPeriodMathsViolations > 0 ? 'var(--bad)' : 'var(--line)'}`,
              borderRadius: '8px',
              padding: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--mut)' }}>Rule 3: Last Period Maths</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: stats.lastPeriodMathsViolations > 0 ? 'var(--bad)' : 'var(--ok)' }}>
              {stats.lastPeriodMathsViolations} violations
            </div>
            <div style={{ fontSize: '11px', color: 'var(--mut)' }}>Last period is never Maths</div>
          </div>

          {/* Rule 4 */}
          <div
            onClick={() => setFilterRule(filterRule === 4 ? 'all' : 4)}
            style={{
              background: stats.teacherClashes > 0 ? 'rgba(194,65,12,0.08)' : 'rgba(21,128,61,0.06)',
              border: `1px solid ${stats.teacherClashes > 0 ? 'var(--bad)' : 'var(--line)'}`,
              borderRadius: '8px',
              padding: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--mut)' }}>Rule 4: Teacher Double-Booking</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: stats.teacherClashes > 0 ? 'var(--bad)' : 'var(--ok)' }}>
              {stats.teacherClashes} clashes
            </div>
            <div style={{ fontSize: '11px', color: 'var(--mut)' }}>No teacher in two classes at once</div>
          </div>

          {/* Rule 5 & Coverage */}
          <div
            onClick={() => setFilterRule(filterRule === 5 ? 'all' : 5)}
            style={{
              background: stats.unfilledCount > 0 ? 'rgba(180,83,9,0.08)' : 'rgba(21,128,61,0.06)',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              padding: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--mut)' }}>Curriculum Placement</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: stats.unfilledCount > 0 ? 'var(--warning)' : 'var(--ok)' }}>
              {stats.totalPlaced} / {stats.totalRequired}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--mut)' }}>
              {stats.unfilledCount > 0 ? `${stats.unfilledCount} periods unplaced` : '100% placed'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Rule Violations Log */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3>
            Active Rule Violations Log
            {filterRule !== 'all' && <small> (Filtered to Rule {filterRule})</small>}
          </h3>
          {filterRule !== 'all' && (
            <button className="b outline" onClick={() => setFilterRule('all')} style={{ padding: '3px 8px', fontSize: '11px' }}>
              Show All Rules
            </button>
          )}
        </div>

        {filteredViolations.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: 'var(--ok)', fontWeight: 600 }}>
            ✓ No rule violations found! All hard rules are fully respected.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '300px', overflowY: 'auto' }}>
            {filteredViolations.map((v, i) => (
              <div
                key={i}
                className={`msg ${v.severity === 'error' ? 'bad' : ''}`}
                style={{
                  margin: 0,
                  fontSize: '12px',
                  justifyContent: 'space-between',
                  padding: '8px 12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={15} />
                  <span>
                    <b>[Rule {v.ruleId}: {v.ruleName}]</b> {v.message}
                  </span>
                </div>
                {v.className && (
                  <button
                    className="b outline"
                    onClick={() => onSelectClass(v.className!)}
                    style={{ padding: '2px 8px', fontSize: '11px', whiteSpace: 'nowrap' }}
                  >
                    Go to Class {v.className}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Teacher Workload Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <h3>
            Teacher Weekly Workload Distribution <small>({teachers.length} teachers)</small>
          </h3>
          <input
            placeholder="Search teacher or subject..."
            value={searchTeacher}
            onChange={e => setSearchTeacher(e.target.value)}
            style={{ width: '220px', padding: '5px 10px', fontSize: '12px' }}
          />
        </div>

        <div className="sc" style={{ maxHeight: '420px', overflowY: 'auto' }}>
          <table className="wt">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Subject</th>
                <th>Allotted Classes</th>
                <th style={{ width: '120px' }}>Weekly Periods</th>
                <th style={{ width: '160px' }}>Load Status</th>
                <th style={{ width: '100px' }}>Spare Capacity</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map(({ teacher, load, max, isOverloaded, isFull, spare }) => (
                <tr key={teacher.id}>
                  <td>
                    <b>{teacher.name}</b>
                  </td>
                  <td>{teacher.subj || 'General'}</td>
                  <td style={{ color: 'var(--mut)', fontSize: '11.5px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={teacher.allottedClasses}>
                    {teacher.allottedClasses || '–'}
                  </td>
                  <td>
                    <b style={{ color: isOverloaded ? 'var(--bad)' : isFull ? 'var(--ok)' : 'var(--ink)' }}>
                      {load}
                    </b>{' '}
                    <span className="mut">/ {max}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className={`bar ${isOverloaded ? 'o' : isFull ? 'full' : ''}`} style={{ flex: 1 }}>
                        <i style={{ width: `${Math.min(100, (load / max) * 100)}%` }} />
                      </div>
                      <span className={`badge ${isOverloaded ? 'bad' : isFull ? 'ok' : 'warn'}`}>
                        {isOverloaded ? 'OVERLOAD' : isFull ? 'FULL' : 'OK'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: spare > 0 ? 'var(--acc)' : 'var(--mut)' }}>
                      {spare > 0 ? `+${spare} periods` : '0'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
