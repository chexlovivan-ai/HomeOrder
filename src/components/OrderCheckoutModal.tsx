import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServeMode } from '../types';
import { X, Trash2, Plus, Clock, Send, MessageSquare, ShoppingCart } from 'lucide-react';

export const OrderCheckoutModal: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    submitOrder, 
    closeModal, 
    openModal, 
    generateShoppingListFromCart,
    language, 
    t 
  } = useApp();
  const [serveMode, setServeMode] = useState<ServeMode>('in30');
  const [customTime, setCustomTime] = useState('19:30');
  const [comment, setComment] = useState('');

  if (cart.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl p-6 text-center shadow-2xl">
          <p className="text-sm font-semibold text-slate-700 mb-4">В корзине пока нет блюд</p>
          <button
            onClick={closeModal}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold"
          >
            Выбрать блюда из каталога
          </button>
        </div>
      </div>
    );
  }

  const getComputedServeAt = (): string => {
    const now = new Date();
    switch (serveMode) {
      case 'asap':
        return language === 'ru' ? 'Как можно скорее ⚡' : 'As soon as possible ⚡';
      case 'in30': {
        const target = new Date(now.getTime() + 30 * 60 * 1000);
        return `${language === 'ru' ? 'Через 30 мин' : 'In 30 min'} (~${target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
      }
      case 'in60': {
        const target = new Date(now.getTime() + 60 * 60 * 1000);
        return `${language === 'ru' ? 'Через 1 час' : 'In 1 hour'} (~${target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
      }
      case 'at':
        return `${language === 'ru' ? 'К' : 'By'} ${customTime}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedServeAt = getComputedServeAt();
    submitOrder(serveMode, formattedServeAt, comment);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">{t.checkout.title}</h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex-1 space-y-5">
          {/* Dishes List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t.checkout.selectedDishes}
              </span>
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  // Returns to catalog
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.checkout.addMore}</span>
              </button>
            </div>

            <div className="space-y-2">
              {cart.map((dish) => (
                <div 
                  key={dish.id}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <img 
                    src={dish.photoUrl} 
                    alt={dish.title[language] || dish.title.ru} 
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {dish.title[language] || dish.title.ru}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      ~{dish.timeMinutes} {t.home.minutesShort} · {t.categories[dish.category]}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(dish.id)}
                    className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg"
                    title="Удалить"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => generateShoppingListFromCart()}
              className="w-full mt-2.5 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200/60 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.shoppingList.title} ({cart.length} {cart.length === 1 ? 'блюдо' : 'блюда'})</span>
            </button>
          </div>

          {/* When to serve */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t.checkout.whenToServe}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setServeMode('asap')}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all flex items-center gap-2 ${
                  serveMode === 'asap'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t.checkout.asap}</span>
              </button>

              <button
                type="button"
                onClick={() => setServeMode('in30')}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all flex items-center gap-2 ${
                  serveMode === 'in30'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t.checkout.in30}</span>
              </button>

              <button
                type="button"
                onClick={() => setServeMode('in60')}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all flex items-center gap-2 ${
                  serveMode === 'in60'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t.checkout.in60}</span>
              </button>

              <button
                type="button"
                onClick={() => setServeMode('at')}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all flex items-center gap-2 ${
                  serveMode === 'at'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t.checkout.atTime}</span>
              </button>
            </div>

            {serveMode === 'at' && (
              <div className="mt-2">
                <input
                  type="time"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.checkout.commentLabel}</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.checkout.commentPlaceholder}
              rows={2}
              className="w-full p-3 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>{t.checkout.submitOrder} ({getComputedServeAt()})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
