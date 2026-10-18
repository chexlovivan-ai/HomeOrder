import React, { useState } from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import { Order } from '../types';
import { Clock, ChefHat, RotateCcw, CheckCircle2, Flame, ArrowRight, UserCheck } from 'lucide-react';

export const OrdersScreen: React.FC = () => {
  const { orders, openModal, repeatOrder, currentUser, language, t } = useApp();
  const [tab, setTab] = useState<'active' | 'history'>('active');

  const activeOrders = orders.filter(o => o.status !== 'ready' && o.status !== 'cancelled');
  const historyOrders = orders.filter(o => o.status === 'ready' || o.status === 'cancelled');

  const displayedOrders = tab === 'active' ? activeOrders : historyOrders;

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'sent':
        return <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">{t.order.statuses.sent}</span>;
      case 'accepted':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">{t.order.statuses.accepted}</span>;
      case 'cooking':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Flame className="w-3 h-3" />{t.order.statuses.cooking}</span>;
      case 'ready':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{t.order.statuses.ready}</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">{t.order.statuses.cancelled}</span>;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pt-1">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          {t.ordersList.title}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          История и текущие заказы между вами и партнером
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setTab('active')}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            tab === 'active' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {t.ordersList.activeTab} ({activeOrders.length})
        </button>
        <button
          onClick={() => setTab('history')}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            tab === 'history' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {t.ordersList.historyTab} ({historyOrders.length})
        </button>
      </div>

      {/* Orders List */}
      {displayedOrders.length > 0 ? (
        <div className="space-y-3">
          {displayedOrders.map(order => {
            const customer = DEMO_USERS[order.createdBy];
            const cook = DEMO_USERS[order.cookId];
            const isMeCustomer = order.createdBy === currentUser.uid;

            return (
              <div
                key={order.id}
                onClick={() => openModal('order_detail', order)}
                className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
              >
                {/* Top Row: Date & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">
                    {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {getStatusBadge(order.status)}
                </div>

                {/* Items preview */}
                <div className="flex items-center gap-3">
                  {order.items[0]?.photoUrl && (
                    <img
                      src={order.items[0].photoUrl}
                      alt="dish"
                      className="w-14 h-14 rounded-2xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {order.items.map(i => i.title[language] || i.title.ru).join(', ')}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {t.order.serveTime}: <span className="font-semibold text-slate-700">{order.serveAt}</span>
                    </p>
                  </div>
                </div>

                {/* Roles strip */}
                <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">{t.order.orderedBy}:</span>
                    <span className="font-semibold text-slate-800">
                      {customer?.displayName || 'Партнер'} {isMeCustomer ? '(Вы)' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">{t.order.cook}:</span>
                    <span className="font-semibold text-slate-800">
                      {cook?.displayName || 'Партнер'} {!isMeCustomer ? '(Вы)' : ''}
                    </span>
                  </div>
                </div>

                {/* Repeat order button if in history */}
                {tab === 'history' && (
                  <div className="pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        repeatOrder(order);
                      }}
                      className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.order.repeatOrder}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center rounded-3xl bg-slate-50 border border-slate-100 my-8">
          <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">
            {tab === 'active' ? t.ordersList.noActiveOrders : t.ordersList.noHistoryOrders}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Заказы между партнерами будут отображаться здесь
          </p>
        </div>
      )}
    </div>
  );
};
