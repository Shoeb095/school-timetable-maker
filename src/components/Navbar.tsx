import React from 'react';
import { Calendar, Users, Grid, ShieldAlert, Zap, Download, Sun, Moon } from 'lucide-react';
import type { AppSettings } from '../types';

export type TabId = 'setup' | 'class-tt' | 'teacher-tt' | 'checks' | 'catch-up' | 'export';

interface NavbarProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  violationCount: number;
  unfilledCount: number;
  catchUpShortfall: number;
  onOpenAbsenceModal: () => void;
  substitutedCount: number;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  settings,
  onUpdateSettings,
  theme,
  onToggleTheme,
  violationCount,
  unfilledCount,
  catchUpShortfall,
  onOpenAbsenceModal,
  substitutedCount
}) => {
  const activeWeek = settings.activeWeek || 'master';

  return (
    <header>
      <div className="hd">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="logo">I</div>
          <div>
            <h1>Insight Education</h1>
            <div className="sb">
              Timetable Maker · {settings.month} {settings.year}
            </div>
          </div>
        </div>

        {/* Month & Year Quick Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="no-print">
          <select
            value={settings.month}
            onChange={e => onUpdateSettings({ month: e.target.value })}
            style={{ padding: '4px 8px', fontSize: '12px' }}
          >
            {MONTHS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="number"
            value={settings.year}
            onChange={e => onUpdateSettings({ year: parseInt(e.target.value, 10) || 2026 })}
            style={{ width: '70px', padding: '4px 8px', fontSize: '12px' }}
          />
        </div>

        {/* Week-by-Week Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(125,125,125,0.08)',
            borderRadius: '8px',
            padding: '2px',
            gap: '2px'
          }}
          className="no-print"
        >
          <button
            onClick={() => onUpdateSettings({ activeWeek: 'master' })}
            style={{
              border: 0,
              background: activeWeek === 'master' ? 'var(--card)' : 'transparent',
              color: activeWeek === 'master' ? 'var(--acc)' : 'var(--mut)',
              boxShadow: activeWeek === 'master' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Master
          </button>
          {[1, 2, 3, 4].map(w => (
            <button
              key={w}
              onClick={() => onUpdateSettings({ activeWeek: w as 1 | 2 | 3 | 4 })}
              style={{
                border: 0,
                background: activeWeek === w ? 'var(--card)' : 'transparent',
                color: activeWeek === w ? 'var(--acc)' : 'var(--mut)',
                boxShadow: activeWeek === w ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              W{w}
            </button>
          ))}
        </div>

        {/* Teacher Leave & Substitution Button */}
        <button
          className="b outline no-print"
          onClick={onOpenAbsenceModal}
          style={{ padding: '5px 9px', fontSize: '11.5px', gap: '5px' }}
          title="Manage absent teachers and auto-assign substitutes"
        >
          Teacher Leave / Sub
          {substitutedCount > 0 && (
            <span className="badge warn" style={{ fontSize: '9px', padding: '1px 5px' }}>
              {substitutedCount} sub
            </span>
          )}
        </button>

        <nav>
          <button
            className={currentTab === 'setup' ? 'on' : ''}
            onClick={() => onSelectTab('setup')}
          >
            <Calendar size={15} />
            Setup
          </button>

          <button
            className={currentTab === 'class-tt' ? 'on' : ''}
            onClick={() => onSelectTab('class-tt')}
          >
            <Grid size={15} />
            Class View
            {unfilledCount > 0 && (
              <span className="badge warn" style={{ fontSize: '9.5px', padding: '1px 5px' }}>
                {unfilledCount} left
              </span>
            )}
          </button>

          <button
            className={currentTab === 'teacher-tt' ? 'on' : ''}
            onClick={() => onSelectTab('teacher-tt')}
          >
            <Users size={15} />
            Teacher Grid
          </button>

          <button
            className={currentTab === 'checks' ? 'on' : ''}
            onClick={() => onSelectTab('checks')}
          >
            <ShieldAlert size={15} />
            Audit & Checks
            {violationCount > 0 && (
              <span className="badge bad" style={{ fontSize: '9.5px', padding: '1px 5px' }}>
                {violationCount}
              </span>
            )}
          </button>

          <button
            className={currentTab === 'catch-up' ? 'on' : ''}
            onClick={() => onSelectTab('catch-up')}
          >
            <Zap size={15} />
            Catch-Up
            {catchUpShortfall > 0 && (
              <span className="badge warn" style={{ fontSize: '9.5px', padding: '1px 5px' }}>
                {catchUpShortfall}p
              </span>
            )}
          </button>

          <button
            className={currentTab === 'export' ? 'on' : ''}
            onClick={() => onSelectTab('export')}
          >
            <Download size={15} />
            Export & Print
          </button>

          <button
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            style={{ padding: '7px 9px', marginLeft: '4px' }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </nav>
      </div>
    </header>
  );
};
