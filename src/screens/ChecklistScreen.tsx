import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface NotionBlock {
  id: string;
  type: string;
  text: string;
  checked?: boolean;
}

export default function ChecklistScreen() {
  // Notion State
  const [notionBlocks, setNotionBlocks] = useState<NotionBlock[]>([]);
  const [isLoadingNotion, setIsLoadingNotion] = useState(true);

  useEffect(() => {
    // Fetch Notion blocks
    fetchNotionList();
  }, []);

  const fetchNotionList = async () => {
    try {
      const res = await fetch('/api/packing-list');
      const data = await res.json();
      setNotionBlocks(data);
    } catch (err) {
      console.error("Error fetching notion", err);
    } finally {
      setIsLoadingNotion(false);
    }
  };

  const toggleNotionItem = async (id: string, currentChecked: boolean) => {
    // Optimistic UI update
    setNotionBlocks(prev => prev.map(b => b.id === id ? { ...b, checked: !currentChecked } : b));
    
    // API Call
    try {
      await fetch(`/api/packing-list/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checked: !currentChecked })
      });
    } catch (err) {
      console.error("Error updating notion", err);
      // Revert if failed
      setNotionBlocks(prev => prev.map(b => b.id === id ? { ...b, checked: currentChecked } : b));
    }
  };

  // Group blocks by heading
  const groupedPackingList: { title: string, items: NotionBlock[] }[] = [];
  let currentGroup: { title: string, items: NotionBlock[] } | null = null;

  notionBlocks.forEach(block => {
    if (block.type.startsWith('heading')) {
      if (currentGroup) groupedPackingList.push(currentGroup);
      currentGroup = { title: block.text, items: [] };
    } else if (block.type === 'to_do' && currentGroup) {
      currentGroup.items.push(block);
    }
  });
  if (currentGroup) groupedPackingList.push(currentGroup);

  const activeGroups = groupedPackingList.filter(g => g.items.length > 0);

  return (
    <div className="space-y-8 pb-8">
      <div>
        <div className="flex items-center justify-between px-2 mb-4">
          <h2 className="text-2xl font-semibold">Live Checklists</h2>
          {isLoadingNotion ? (
            <div className="flex items-center text-xs font-medium text-forest-900/50 bg-beige-100 px-2 py-1 rounded-full">
              <Loader2 size={12} className="animate-spin mr-1" /> Syncing
            </div>
          ) : (
            <div className="flex items-center text-xs font-medium text-gold-500 bg-gold-500/10 px-2 py-1 rounded-full">
              <CheckCircle2 size={12} className="mr-1" /> Synced with Notion
            </div>
          )}
        </div>
        
        {isLoadingNotion && notionBlocks.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-forest-900/40">
            <Loader2 size={32} className="animate-spin mb-2" />
            <p className="text-sm font-medium">Connecting to Notion...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeGroups.map((group, gIdx) => (
              <div key={gIdx}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-900/50 mb-3 px-2">{group.title}</h3>
                <div className="glass-panel rounded-2xl p-4 space-y-3">
                  {group.items.map((item) => (
                    <ChecklistItem 
                      key={item.id} 
                      label={item.text} 
                      isChecked={!!item.checked} 
                      onToggle={() => toggleNotionItem(item.id, !!item.checked)} 
                      important={group.title.includes('Confirmaciones')}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChecklistItem({ label, isChecked, onToggle, important = false }: { label: string, isChecked: boolean, onToggle: () => void, important?: boolean }) {
  return (
    <div 
      className={`flex items-start space-x-3 cursor-pointer transition-all ${isChecked ? 'opacity-50' : 'opacity-100'}`}
      onClick={onToggle}
    >
      <div className={`mt-0.5 shrink-0 ${isChecked ? 'text-gold-500' : 'text-beige-200'}`}>
        {isChecked ? <CheckCircle2 size={20} /> : <Circle size={20} className="text-forest-900/30" />}
      </div>
      <div className="flex-1">
        <p className={`text-sm ${isChecked ? 'line-through text-forest-900/60' : 'text-forest-900'} ${important ? 'font-medium' : ''}`}>
          {label}
        </p>
      </div>
    </div>
  );
}
