import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import type { TabId } from './components/Navbar';
import { SetupTab } from './components/SetupTab';
import { ClassTimetableTab } from './components/ClassTimetableTab';
import { TeacherTimetableTab } from './components/TeacherTimetableTab';
import { WorkloadChecksTab } from './components/WorkloadChecksTab';
import { CatchUpTab } from './components/CatchUpTab';
import { ExportPrintTab } from './components/ExportPrintTab';
import { TeacherAbsenceModal } from './components/TeacherAbsenceModal';

import type { AppSettings, Teacher, ClassInfo, SlotsMap } from './types';
import { DEFAULT_SETTINGS, DEFAULT_TEACHERS, DEFAULT_CLASSES, DEFAULT_SLOTS } from './data/defaultSchoolData';
import { validateFullSchedule } from './utils/validator';
import { generateSchedule } from './utils/scheduler';

const STORAGE_KEY = 'insight-timetable-maker-v2';

export const App: React.FC = () => {
  // 1. Initial State from localStorage or default school data
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}-settings`);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}-teachers`);
      return saved ? JSON.parse(saved) : DEFAULT_TEACHERS;
    } catch {
      return DEFAULT_TEACHERS;
    }
  });

  const [classes, setClasses] = useState<ClassInfo[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}-classes`);
      return saved ? JSON.parse(saved) : DEFAULT_CLASSES;
    } catch {
      return DEFAULT_CLASSES;
    }
  });

  const activeWeekKey = String(settings.activeWeek || 'master');

  const [slotsByWeek, setSlotsByWeek] = useState<Record<string, SlotsMap>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}-slotsByWeek`);
      if (saved) return JSON.parse(saved);
      const savedMaster = localStorage.getItem(`${STORAGE_KEY}-slots`);
      return { master: savedMaster ? JSON.parse(savedMaster) : DEFAULT_SLOTS };
    } catch {
      return { master: DEFAULT_SLOTS };
    }
  });

  const slots = slotsByWeek[activeWeekKey] || slotsByWeek['master'] || DEFAULT_SLOTS;

  const setSlots = (newSlots: SlotsMap) => {
    setSlotsByWeek(prev => ({
      ...prev,
      [activeWeekKey]: newSlots
    }));
  };

  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}-theme`);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [currentTab, setCurrentTab] = useState<TabId>('class-tt');
  const [activeClass, setActiveClass] = useState<string>('');
  const [globalBanner, setGlobalBanner] = useState<{ message: string; type: 'ok' | 'warn' | 'bad' } | null>(null);

  // 2. Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}-settings`, JSON.stringify(settings));
    } catch (e) { console.error(e); }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}-teachers`, JSON.stringify(teachers));
    } catch (e) { console.error(e); }
  }, [teachers]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}-classes`, JSON.stringify(classes));
    } catch (e) { console.error(e); }
  }, [classes]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}-slotsByWeek`, JSON.stringify(slotsByWeek));
      if (slotsByWeek.master) {
        localStorage.setItem(`${STORAGE_KEY}-slots`, JSON.stringify(slotsByWeek.master));
      }
    } catch (e) { console.error(e); }
  }, [slotsByWeek]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}-theme`, theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) { console.error(e); }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 3. Live Validation
  const { violations, stats } = validateFullSchedule(slots, teachers, classes, settings);

  // 4. Scheduling Handlers
  const handleAutoFillClass = (className: string) => {
    const res = generateSchedule(slots, [className], teachers, classes, settings, true);
    setSlots(res.slots);
    if (res.unfilledCount > 0) {
      setGlobalBanner({
        message: `Filled what fit for Class ${className}; ${res.unfilledCount} periods unplaced due to teacher capacity/rules.`,
        type: 'warn'
      });
    } else {
      setGlobalBanner({
        message: `Class ${className} timetable successfully filled with 0 clashes!`,
        type: 'ok'
      });
    }
  };

  const handleAutoFillAll = () => {
    const classNames = classes.map(c => c.name);
    const res = generateSchedule(slots, classNames, teachers, classes, settings, true);
    setSlots(res.slots);
    if (res.unfilledCount > 0) {
      setGlobalBanner({
        message: `Auto-filled timetable: ${res.unfilledCount} periods could not fit under teacher limits (max 30) or clash constraints.`,
        type: 'warn'
      });
    } else {
      setGlobalBanner({
        message: 'All classes successfully filled with 0 clashes and all rules respected!',
        type: 'ok'
      });
    }
  };

  const handleRegenerateAll = () => {
    const classNames = classes.map(c => c.name);
    const res = generateSchedule({}, classNames, teachers, classes, settings, false);
    setSlots(res.slots);
    if (res.unfilledCount > 0) {
      setGlobalBanner({
        message: `Regenerated schedule: ${res.unfilledCount} periods unplaced under strict 30-period teacher limit.`,
        type: 'warn'
      });
    } else {
      setGlobalBanner({
        message: 'Full timetable regenerated from scratch with 0 clashes and all 5 hard rules met!',
        type: 'ok'
      });
    }
  };

  const handleClearClass = (className: string) => {
    const updated: SlotsMap = {};
    for (const [k, v] of Object.entries(slots)) {
      if (!k.startsWith(`${className}|`)) {
        updated[k] = v;
      }
    }
    setSlots(updated);
    setGlobalBanner({ message: `Cleared all periods for Class ${className}.`, type: 'ok' });
  };

  const handleApplyCatchUp = (shortfalls: Record<string, Record<string, number>>) => {
    const classNames = classes.map(c => c.name);
    const res = generateSchedule(slots, classNames, teachers, classes, settings, true, shortfalls);
    setSlots(res.slots);
    setGlobalBanner({
      message: `Scheduled ${res.allocatedCatchUpCount} extra catch-up periods into spare teacher capacity without breaking rules!`,
      type: 'ok'
    });
    setCurrentTab('class-tt');
  };

  const handleResetToDefault = () => {
    if (confirm('Load pre-loaded Insight International School data (June 2026)? This will reset your current edits.')) {
      setSettings(DEFAULT_SETTINGS);
      setTeachers(DEFAULT_TEACHERS);
      setClasses(DEFAULT_CLASSES);
      setSlots(DEFAULT_SLOTS);
      setGlobalBanner({ message: 'Loaded Insight International School data (June 2026).', type: 'ok' });
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to start blank? All teachers, classes, and slots will be cleared.')) {
      setTeachers([]);
      setClasses([]);
      setSlots({});
      setGlobalBanner({ message: 'Started blank. You can add teachers and classes or import an Excel file.', type: 'ok' });
    }
  };

  const handleImportComplete = (
    newTeachers: Teacher[],
    newClasses: ClassInfo[],
    newSlots: SlotsMap,
    msg: string
  ) => {
    if (newTeachers.length > 0) setTeachers(newTeachers);
    if (newClasses.length > 0) setClasses(newClasses);
    if (Object.keys(newSlots).length > 0) setSlots(newSlots);
    setGlobalBanner({ message: msg, type: 'ok' });
  };

  const handleRestoreJSON = (backup: {
    settings: AppSettings;
    teachers: Teacher[];
    classes: ClassInfo[];
    slots: SlotsMap;
  }) => {
    setSettings(backup.settings);
    setTeachers(backup.teachers);
    setClasses(backup.classes);
    setSlots(backup.slots);
    setGlobalBanner({ message: 'Restored full timetable state from JSON backup.', type: 'ok' });
  };

  return (
    <div>
      <Navbar
        currentTab={currentTab}
        onSelectTab={t => {
          setCurrentTab(t);
          setGlobalBanner(null);
        }}
        settings={settings}
        onUpdateSettings={s => setSettings(prev => ({ ...prev, ...s }))}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        violationCount={violations.length}
        unfilledCount={stats.unfilledCount}
        catchUpShortfall={0}
        onOpenAbsenceModal={() => setIsAbsenceModalOpen(true)}
        substitutedCount={Object.values(slots).filter(s => s.isSubstituted).length}
      />

      <main className="w">
        {globalBanner && (
          <div className={`msg ${globalBanner.type === 'bad' ? 'bad' : globalBanner.type === 'warn' ? '' : 'ok'} no-print`}>
            {globalBanner.message}
          </div>
        )}

        {currentTab === 'setup' && (
          <SetupTab
            settings={settings}
            onUpdateSettings={s => setSettings(prev => ({ ...prev, ...s }))}
            teachers={teachers}
            onUpdateTeachers={setTeachers}
            classes={classes}
            onUpdateClasses={setClasses}
            onResetToDefault={handleResetToDefault}
            onClearAll={handleClearAll}
            onImportComplete={handleImportComplete}
          />
        )}

        {currentTab === 'class-tt' && (
          <ClassTimetableTab
            slots={slots}
            onUpdateSlots={setSlots}
            teachers={teachers}
            classes={classes}
            settings={settings}
            selectedClass={activeClass}
            onSelectClass={setActiveClass}
            onAutoFillClass={handleAutoFillClass}
            onAutoFillAll={handleAutoFillAll}
            onRegenerateAll={handleRegenerateAll}
            onClearClass={handleClearClass}
          />
        )}

        {currentTab === 'teacher-tt' && (
          <TeacherTimetableTab
            slots={slots}
            teachers={teachers}
            settings={settings}
          />
        )}

        {currentTab === 'checks' && (
          <WorkloadChecksTab
            slots={slots}
            teachers={teachers}
            classes={classes}
            settings={settings}
            onSelectClass={c => {
              setActiveClass(c);
              setCurrentTab('class-tt');
            }}
            onRegenerate={handleRegenerateAll}
          />
        )}

        {currentTab === 'catch-up' && (
          <CatchUpTab
            slots={slots}
            onUpdateSlots={setSlots}
            teachers={teachers}
            classes={classes}
            settings={settings}
            onApplyCatchUp={handleApplyCatchUp}
          />
        )}

        {currentTab === 'export' && (
          <ExportPrintTab
            slots={slots}
            teachers={teachers}
            classes={classes}
            settings={settings}
            onRestoreJSON={handleRestoreJSON}
          />
        )}
      </main>

      <TeacherAbsenceModal
        isOpen={isAbsenceModalOpen}
        onClose={() => setIsAbsenceModalOpen(false)}
        teachers={teachers}
        slots={slots}
        settings={settings}
        onUpdateSlots={setSlots}
        onNotify={(msg, type) => setGlobalBanner({ message: msg, type })}
      />
    </div>
  );
};

export default App;
