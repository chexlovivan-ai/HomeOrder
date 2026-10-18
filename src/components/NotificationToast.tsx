import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, UtensilsCrossed, HeartHandshake, Flame, CheckCircle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { currentNotification, dismissNotification, openModal, orders } = useApp();

  if (!currentNotification) return null;

  const handleClick = () => {
    if (currentNotification.orderId) {
      const order = orders.find(o => o.id === currentNotification.orderId);
      if (order) {
        openModal('order_detail', order);
      }
    }
    dismissNotification();
  };

  const getIcon = () => {
    switch (currentNotification.type) {
      case 'order':
        return <UtensilsCrossed className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'cooking':
        return <Flame className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'ready':
        return <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'pair':
        return <HeartHandshake className="w-5 h-5 text-rose-500 shrink-0" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600 shrink-0" />;
    }
  };

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-in slide-in-from-top-4 duration-200">
      <div 
        onClick={handleClick}
        className="cursor-pointer bg-slate-900/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-700/50 flex items-start gap-3 hover:bg-slate-900 transition-colors"
      >
        <div className="p-2 bg-white/10 rounded-xl mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">HomeOrder</span>
            <span className="text-[10px] text-slate-400">сейчас</span>
          </div>
          <p className="text-xs font-bold text-white mt-0.5 truncate">{currentNotification.title}</p>
          <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">{currentNotification.body}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); dismissNotification(); }}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
