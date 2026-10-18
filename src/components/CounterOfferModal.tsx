import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Recipe, Order, OrderItem } from '../types';
import { X, Search, Check, UtensilsCrossed, Send } from 'lucide-react';

interface CounterOfferModalProps {
  order?: Order;
}

export const CounterOfferModal: React.FC<CounterOfferModalProps> = ({ order: propOrder }) => {
  const { selectedOrder, closeModal, recipes, sendCounterOffer, language, t } = useApp();
  const order = propOrder || selectedOrder;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [reason, setReason] = useState('Нет нужных продуктов в холодильнике');

  if (!order) return null;

  const filteredRecipes = recipes.filter(r => {
    const title = (r.title[language] || r.title.ru).toLowerCase();
    return title.includes(search.toLowerCase());
  });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    if (selectedIds.length === 0) return;
    const items: OrderItem[] = selectedIds.map(id => {
      const rec = recipes.find(r => r.id === id)!;
      return {
        recipeId: rec.id,
        title: rec.title,
        timeMinutes: rec.timeMinutes,
        photoUrl: rec.photoUrl,
      };
    });

    sendCounterOffer(order.id, items, reason);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {t.order.suggestAlternative}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Выберите замену блюд для заказчика
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Reason Field */}
        <div className="p-4 bg-slate-50 border-b border-slate-100">
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Причина замены:
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            placeholder="Например: нет свинины, давай курицу"
          />
        </div>

        {/* Search */}
        <div className="px-4 pt-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск альтернативного блюда..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Recipes Selection List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {filteredRecipes.map((r) => {
            const isSelected = selectedIds.includes(r.id);
            return (
              <div
                key={r.id}
                onClick={() => toggleSelect(r.id)}
                className={`flex items-center gap-3 p-2.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <img
                  src={r.photoUrl}
                  alt={r.title[language] || r.title.ru}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {r.title[language] || r.title.ru}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    ~{r.timeMinutes} {t.home.minutesShort} · {t.categories[r.category]}
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Send Counter-Offer Button */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <button
            onClick={handleSend}
            disabled={selectedIds.length === 0}
            className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              selectedIds.length > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Отправить замену ({selectedIds.length} выбрано)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
