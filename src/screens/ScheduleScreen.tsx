import { useState } from 'react';
import { tripData } from '../data/tripData';
import { ChevronDown, ChevronUp, ExternalLink, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScheduleScreen() {
  const [expandedDay, setExpandedDay] = useState<string>(tripData.schedule[0].id);

  return (
    <div className="space-y-4 pb-8">
      <h2 className="text-2xl font-semibold px-2 mb-6">Itinerary</h2>
      
      <div className="space-y-4">
        {tripData.schedule.map((day) => (
          <DayCard 
            key={day.id} 
            day={day} 
            isExpanded={expandedDay === day.id}
            onToggle={() => setExpandedDay(expandedDay === day.id ? '' : day.id)}
          />
        ))}
      </div>
    </div>
  );
}

function DayCard({ day, isExpanded, onToggle }: { day: any, isExpanded: boolean, onToggle: () => void }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden shadow-sm border border-beige-200">
      <button 
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between bg-white/50 hover:bg-white/80 transition-colors"
      >
        <div className="text-left">
          <p className="text-sm font-medium text-gold-500">{day.displayDate}</p>
          <p className="text-lg font-semibold text-forest-900">{day.theme}</p>
        </div>
        <div className="text-forest-900/50">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5 pt-2"
          >
            <div className="relative border-l-2 border-beige-200 ml-3 space-y-6 mt-4">
              {day.activities.map((activity: any, idx: number) => (
                <div key={idx} className="relative pl-6">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white ${activity.main ? 'bg-gold-500' : 'bg-beige-200'}`}></div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-forest-900/60 bg-beige-100 px-2 py-0.5 rounded-md">
                        {activity.time}
                      </span>
                      {activity.optional && (
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-forest-800/50 border border-forest-800/20 px-2 py-0.5 rounded-full">
                          Optional
                        </span>
                      )}
                      {activity.main && (
                        <span className="text-gold-500 flex items-center text-xs font-medium">
                          <Star size={12} className="mr-1 fill-gold-500" /> Main Event
                        </span>
                      )}
                    </div>
                    
                    <h4 className={`text-base font-medium ${activity.optional ? 'text-forest-900/70' : 'text-forest-900'}`}>
                      {activity.title}
                    </h4>
                    
                    {activity.notes && (
                      <p className="text-sm text-forest-900/60 leading-snug mt-1">
                        {activity.notes}
                      </p>
                    )}
                    
                    {activity.link && (
                      <a href={activity.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-gold-500 font-medium mt-2 hover:underline">
                        <ExternalLink size={14} className="mr-1" /> View Link
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
