import { useState, useEffect } from 'react';
import { tripData } from '../data/tripData';
import { Plus, Trash2, DollarSign } from 'lucide-react';

interface Expense {
  id: string;
  name: string;
  amountUSD: number;
  amountCOP: number;
}

export default function BudgetScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [exchangeRate, setExchangeRate] = useState<number>(3900); // Default estimate

  useEffect(() => {
    const saved = localStorage.getItem('mde26_budget');
    const savedRate = localStorage.getItem('mde26_fx');
    if (saved) {
      setExpenses(JSON.parse(saved));
    } else {
      setExpenses(tripData.budget.initialExpenses);
    }
    if (savedRate) {
      setExchangeRate(Number(savedRate));
    }
  }, []);

  const saveExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
    localStorage.setItem('mde26_budget', JSON.stringify(newExpenses));
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setExchangeRate(val);
    localStorage.setItem('mde26_fx', val.toString());
  };

  const addExpense = () => {
    const name = prompt('Expense name:');
    if (!name) return;
    const isCOP = confirm('Is this amount in COP? (Cancel for USD)');
    const amountStr = prompt(`Amount in ${isCOP ? 'COP' : 'USD'}:`);
    if (!amountStr) return;
    
    const amount = Number(amountStr);
    if (isNaN(amount)) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      name,
      amountUSD: isCOP ? amount / exchangeRate : amount,
      amountCOP: isCOP ? amount : amount * exchangeRate,
    };

    saveExpenses([...expenses, newExpense]);
  };

  const removeExpense = (id: string) => {
    if (confirm('Remove this expense?')) {
      saveExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const totalUSD = expenses.reduce((acc, curr) => acc + curr.amountUSD, 0);
  const totalCOP = expenses.reduce((acc, curr) => acc + curr.amountCOP, 0);

  return (
    <div className="space-y-6 pb-8">
      <h2 className="text-2xl font-semibold px-2 mb-2">Budget Tracker</h2>
      
      {/* Total Card */}
      <div className="glass-panel rounded-3xl p-6 bg-forest-900 text-white relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <DollarSign size={120} />
        </div>
        <p className="text-gold-400 font-medium text-sm mb-1 uppercase tracking-wider">Total Estimated</p>
        <h3 className="text-4xl font-light mb-2">${totalUSD.toFixed(2)} <span className="text-lg text-white/50">USD</span></h3>
        <p className="text-white/70 font-medium">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalCOP)} COP</p>
      </div>

      {/* FX Rate */}
      <div className="glass-panel rounded-xl p-4 flex items-center justify-between">
        <div className="text-sm font-medium text-forest-900/70">Exchange Rate (USD to COP)</div>
        <input 
          type="number" 
          value={exchangeRate} 
          onChange={handleRateChange}
          className="w-24 bg-beige-100 rounded-md px-2 py-1 text-right text-sm font-semibold outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      {/* Expense List */}
      <div>
        <div className="flex items-center justify-between px-2 mb-4">
          <h3 className="text-lg font-semibold">Expenses</h3>
          <button onClick={addExpense} className="flex items-center text-sm font-medium text-gold-500 bg-gold-500/10 px-3 py-1.5 rounded-full">
            <Plus size={16} className="mr-1" /> Add
          </button>
        </div>

        <div className="space-y-3">
          {expenses.map(expense => (
            <div key={expense.id} className="glass-panel rounded-xl p-4 flex items-center justify-between group">
              <div>
                <p className="font-medium text-forest-900 text-sm">{expense.name}</p>
                {expense.amountCOP > 0 && expense.amountUSD > 0 && (
                   <p className="text-xs text-forest-900/50">
                     {expense.amountCOP > expense.amountUSD * 100 
                        ? `${new Intl.NumberFormat('es-CO').format(expense.amountCOP)} COP` 
                        : `$${expense.amountUSD.toFixed(2)} USD`}
                   </p>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <p className="font-semibold text-forest-900">${expense.amountUSD.toFixed(2)}</p>
                <button onClick={() => removeExpense(expense.id)} className="text-red-400 opacity-50 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
