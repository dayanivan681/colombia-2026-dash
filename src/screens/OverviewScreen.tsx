import { MapPin, Calendar, Users, Plane } from 'lucide-react';
import { tripData } from '../data/tripData';
import type { Tab } from '../App';
import { useEffect, useState } from 'react';

export default function OverviewScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const [todayActivity, setTodayActivity] = useState<any>(null);
  const [isTripActive, setIsTripActive] = useState(false);

  useEffect(() => {
    // Smart Travel Mode
    const today = new Date();
    // For demo/dev purposes if current date is before trip, we show preview. 
    // You can hardcode a date here to test "Trip Active" mode.
    // const testDate = new Date('2026-05-25T12:00:00');
    
    const currentDateStr = today.toISOString().split('T')[0];
    const scheduleDay = tripData.schedule.find(d => d.dateStr === currentDateStr);
    
    if (scheduleDay) {
      setIsTripActive(true);
      setTodayActivity(scheduleDay);
    } else {
      setIsTripActive(false);
    }
  }, []);

  return (
    <div className="space-y-6 pb-8">
      {/* Smart Status Card */}
      <div className="glass-panel rounded-2xl p-5 bg-gradient-to-br from-forest-900 to-forest-800 text-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <MapPin size={100} />
        </div>
        
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium tracking-wider mb-3">
            {isTripActive ? 'HAPPENING NOW' : 'TRIP PREVIEW MODE'}
          </div>
          <h2 className="text-3xl font-light mb-1">{tripData.destination}</h2>
          <p className="text-gold-400 font-medium">{tripData.dates}</p>
        </div>

        {isTripActive && todayActivity && (
          <div className="mt-5 bg-white/10 rounded-xl p-3 border border-white/20">
            <p className="text-xs uppercase tracking-wider text-white/70 mb-1">Today's Highlight</p>
            <p className="font-medium">{todayActivity.theme}</p>
          </div>
        )}
      </div>

      {/* Quick Details */}
      <div className="grid grid-cols-2 gap-3">
        <DetailCard icon={<Calendar size={18} />} label="Duration" value={`${tripData.nights} Nights`} />
        <DetailCard icon={<Users size={18} />} label="Travelers" value="2 People" />
        <DetailCard icon={<MapPin size={18} />} label="Area" value={tripData.area} />
        <DetailCard icon={<Plane size={18} />} label="Status" value="Booked" />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-3 px-1">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <ActionButton onClick={() => onNavigate('schedule')} title="Open Schedule" />
          <ActionButton onClick={() => onNavigate('checklist')} title="Checklists" highlight />
          <ActionButton onClick={() => onNavigate('info')} title="Airbnb & Flights" />
          <ActionButton onClick={() => onNavigate('budget')} title="Budget Tracker" />
        </div>
      </div>

      {/* Flight Mini-Card */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-beige-100 p-2 rounded-lg text-forest-800">
            <Plane size={20} />
          </div>
          <div>
            <p className="text-xs text-forest-900/60 font-medium">Booking Code</p>
            <p className="font-semibold">{tripData.flights.bookingCode}</p>
          </div>
        </div>
        <button onClick={() => onNavigate('info')} className="text-gold-500 text-sm font-medium pr-2">View</button>
      </div>
    </div>
  );
}

function DetailCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="glass-panel rounded-xl p-3 flex flex-col justify-center space-y-1">
      <div className="text-gold-500 mb-1">{icon}</div>
      <p className="text-xs text-forest-900/60 font-medium">{label}</p>
      <p className="text-sm font-semibold truncate">{value}</p>
    </div>
  );
}

function ActionButton({ title, onClick, highlight = false }: { title: string, onClick: () => void, highlight?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`p-4 rounded-xl text-left font-medium transition-transform active:scale-95 ${
        highlight 
          ? 'bg-gold-500 text-white shadow-md' 
          : 'glass-panel text-forest-900 hover:bg-white/90'
      }`}
    >
      {title}
    </button>
  );
}
