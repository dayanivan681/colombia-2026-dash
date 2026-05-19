import React, { useState } from 'react';
import { Home, CalendarClock, BookUser, Wallet } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Screens
import OverviewScreen from './screens/OverviewScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import ChecklistScreen from './screens/ChecklistScreen';
import BudgetScreen from './screens/BudgetScreen';
import InfoScreen from './screens/InfoScreen';

export type Tab = 'home' | 'schedule' | 'checklist' | 'budget' | 'info';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-cream text-forest-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-beige-200/50 px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight text-center">
          Medellín <span className="text-gold-500 font-light">2026</span>
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="px-4 py-6 w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && <OverviewScreen onNavigate={setActiveTab} />}
            {activeTab === 'schedule' && <ScheduleScreen />}
            {activeTab === 'checklist' && <ChecklistScreen />}
            {activeTab === 'budget' && <BudgetScreen />}
            {activeTab === 'info' && <InfoScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-beige-200/50 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-md mx-auto flex justify-between items-center px-6 py-3">
          <NavItem icon={<Home />} label="Home" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<CalendarClock />} label="Schedule" isActive={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} />
          <NavItem icon={<BookUser />} label="Info" isActive={activeTab === 'info'} onClick={() => setActiveTab('info')} />
          <NavItem icon={<Wallet />} label="Budget" isActive={activeTab === 'budget'} onClick={() => setActiveTab('budget')} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center space-y-1 w-16 transition-colors ${
        isActive ? 'text-forest-900' : 'text-forest-900/40 hover:text-forest-900/70'
      }`}
    >
      <div className={`${isActive ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
        {React.cloneElement(icon as React.ReactElement, { size: 22, strokeWidth: isActive ? 2.5 : 2 })}
      </div>
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}

export default App;
