import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, Check, Plus, Trash2, Copy, Share2, ShoppingCart, 
  RotateCcw, Sparkles, CheckCheck, Utensils
} from 'lucide-react';

export const ShoppingListModal: React.FC = () => {
  const { 
    shoppingList, 
    shoppingListSource,
    toggleShoppingItem, 
    addShoppingItem, 
    removeShoppingItem, 
    clearCheckedShoppingItems, 
    resetAllShoppingItems, 
    closeModal, 
    language, 
    t 
  } = useApp();

  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [copied, setCopied] = useState(false);

  const totalItems = shoppingList.length;
  const completedItems = shoppingList.filter(i => i.checked).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const filteredItems = shoppingList.filter(i => {
    if (filter === 'pending') return !i.checked;
    if (filter === 'completed') return i.checked;
    return true;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    addShoppingItem(newItemName.trim(), newItemAmount.trim() || '1', 'шт');
    setNewItemName('');
    setNewItemAmount('');
  };

  const handleCopyList = async () => {
    const lines = [
      `🛒 ${t.shoppingList.title} (${shoppingListSource}):`,
      ...shoppingList.map(item => 
        `${item.checked ? '☑️' : '◻️'} ${item.name} — ${item.amount} ${item.unit} ${item.dishTitle ? `(${item.dishTitle})` : ''}`
      ),
    ];
    const text = lines.join('\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: t.shoppingList.title,
          text,
        });
        return;
      } catch {}
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 leading-tight">
                {t.shoppingList.title}
              </h2>
              {shoppingListSource && (
                <p className="text-[11px] text-slate-500 truncate max-w-[220px]">
                  {shoppingListSource}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-5 pt-3 pb-2 bg-white">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-600">
              {completedItems} из {totalItems} {t.shoppingList.purchased} ({progressPercent}%)
            </span>
            {progressPercent === 100 && totalItems > 0 && (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.shoppingList.allPurchased}</span>
              </span>
            )}
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="px-5 py-2 flex items-center justify-between gap-2 border-b border-slate-100">
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-medium">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Все ({totalItems})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filter === 'pending' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Купить ({totalItems - completedItems})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filter === 'completed' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Куплено ({completedItems})
            </button>
          </div>

          {completedItems > 0 && (
            <button
              onClick={clearCheckedShoppingItems}
              className="text-[11px] font-semibold text-slate-500 hover:text-rose-600 transition-colors"
            >
              {t.shoppingList.clearChecked}
            </button>
          )}
        </div>

        {/* Add item inline form */}
        <form onSubmit={handleAddItem} className="p-3 bg-slate-50 border-b border-slate-100 flex gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={t.shoppingList.addItemPlaceholder}
            className="flex-1 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
          <input
            type="text"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            placeholder="Кол-во"
            className="w-16 px-2 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-center"
          />
          <button
            type="submit"
            disabled={!newItemName.trim()}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
              newItemName.trim()
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>

        {/* Items List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => toggleShoppingItem(item.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  item.checked
                    ? 'bg-slate-50/80 border-slate-200/60 opacity-60'
                    : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                }`}
              >
                {/* Interactive Checkbox */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                    item.checked
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {item.checked && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold truncate transition-colors ${
                      item.checked ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}>
                      {item.name}
                    </p>
                    {item.dishTitle && (
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">
                        {t.shoppingList.dishSource} {item.dishTitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Amount and delete */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${
                    item.checked ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    {item.amount} {item.unit}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeShoppingItem(item.id);
                    }}
                    className="p-1 text-slate-300 hover:text-rose-500 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400">
              <ShoppingCart className="w-10 h-10 mx-auto mb-2 text-slate-300 opacity-60" />
              <p className="text-xs font-bold text-slate-600">{t.shoppingList.emptyTitle}</p>
              <p className="text-[11px] text-slate-400 mt-1">{t.shoppingList.emptyDesc}</p>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyList}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <CheckCheck className="w-4 h-4 text-emerald-300" />
                <span>{t.shoppingList.copied}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>{t.shoppingList.copy}</span>
              </>
            )}
          </button>

          {completedItems > 0 && (
            <button
              onClick={resetAllShoppingItems}
              className="py-3 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              title={t.shoppingList.resetAll}
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
