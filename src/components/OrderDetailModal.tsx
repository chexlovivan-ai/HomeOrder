import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { 
  X, Clock, ChefHat, CheckCircle2, Flame, Send, ArrowRight,
  RotateCcw, Sparkles, MessageCircle, AlertCircle, Check, Ban, ShoppingCart
} from 'lucide-react';

interface OrderDetailModalProps {
  order?: Order;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order: propOrder }) => {
  const { 
    selectedOrder, 
    closeModal, 
    currentUser, 
    updateOrderStatus, 
    setOrderEta, 
    sendOrderMessage, 
    respondToCounterOffer, 
    openModal, 
    repeatOrder,
    generateShoppingListFromOrder,
    language, 
    t 
  } = useApp();

  const order = propOrder || selectedOrder;

  // Live ETA countdown in seconds
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    if (!order?.etaMinutes || !order?.etaSetAt) {
      setRemainingSeconds(null);
      return;
    }

    const calculateRemaining = () => {
      const setAt = new Date(order.etaSetAt!).getTime();
      const targetTime = setAt + order.etaMinutes! * 60 * 1000;
      const now = Date.now();
      const diff = Math.max(0, Math.floor((targetTime - now) / 1000));
      setRemainingSeconds(diff);
    };

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);
    return () => clearInterval(interval);
  }, [order?.etaMinutes, order?.etaSetAt]);

  if (!order) return null;

  const isCustomer = currentUser.uid === order.createdBy;
  const isCook = currentUser.uid === order.cookId;

  // Status timeline steps
  const statusSteps: OrderStatus[] = ['sent', 'accepted', 'cooking', 'ready'];
  const currentStepIdx = statusSteps.indexOf(order.status);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins} ${t.order.countdownMinutes} ${secs.toString().padStart(2, '0')} ${t.order.countdownSeconds}`;
  };

  const handleLaunchCookMode = () => {
    if (order.items.length > 0) {
      openModal('cooking', { orderId: order.id, recipeId: order.items[0].recipeId });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.order.title}
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              isCustomer 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isCustomer ? t.order.customerRole : t.order.cookRole}
            </span>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          
          {/* Status Timeline */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2">
              <span>{t.home.statusTimeline}</span>
              <span className="text-emerald-700 font-bold">
                {t.order.statuses[order.status]}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 relative">
              {statusSteps.map((st, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                return (
                  <div key={st} className="flex flex-col items-center text-center">
                    <div className={`w-full h-1.5 rounded-full mb-2 transition-all ${
                      isPassed ? 'bg-emerald-600' : 'bg-slate-200'
                    }`} />
                    <span className={`text-[10px] font-medium leading-tight ${
                      isCurrent ? 'text-emerald-700 font-bold' : isPassed ? 'text-slate-800' : 'text-slate-400'
                    }`}>
                      {t.order.statuses[st]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live ETA Countdown Card */}
          {order.status === 'cooking' && remainingSeconds !== null && (
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-4 rounded-2xl shadow-md text-center">
              <span className="text-xs uppercase tracking-wider text-emerald-100 font-semibold">
                {t.order.countdownLabel}
              </span>
              <div className="text-2xl font-black mt-1 font-mono tracking-tight">
                {remainingSeconds > 0 ? formatCountdown(remainingSeconds) : 'Почти готово! 🍽️'}
              </div>
              <p className="text-[11px] text-emerald-100 mt-1">
                {language === 'ru' ? 'Повар готовит блюдо прямо сейчас' : 'Chef is actively cooking right now'}
              </p>
            </div>
          )}

          {/* Dishes in Order */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {language === 'ru' ? 'Состав заказа' : 'Ordered Dishes'}
            </span>
            {order.items.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm"
              >
                <img 
                  src={item.photoUrl} 
                  alt={item.title[language] || item.title.ru} 
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.title[language] || item.title.ru}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>~{item.timeMinutes} {t.home.minutesShort}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600 flex items-center justify-between">
              <span className="font-medium text-slate-500">{t.order.serveTime}:</span>
              <span className="font-bold text-slate-900">{order.serveAt}</span>
            </div>

            {order.comment && (
              <div className="bg-amber-50/80 border border-amber-100 p-2.5 rounded-xl text-xs text-amber-900">
                <span className="font-bold">Пожелание: </span>
                <span>{order.comment}</span>
              </div>
            )}

            {/* Shopping List Button for Order */}
            <button
              onClick={() => generateShoppingListFromOrder(order)}
              className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold border border-emerald-200/80 flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-98"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <span>{t.shoppingList.title}</span>
            </button>
          </div>

          {/* Counter-Offer Proposal Alert (if exists) */}
          {order.counterOffer && order.counterOffer.status === 'pending' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-amber-900">
                    {t.order.counterOfferReceived}
                  </h4>
                  {order.counterOffer.reason && (
                    <p className="text-xs text-amber-800 mt-1">
                      {order.counterOffer.reason}
                    </p>
                  )}
                  <div className="mt-2 space-y-1">
                    {order.counterOffer.items.map((alt, i) => (
                      <div key={i} className="text-xs font-semibold text-slate-800 bg-white/80 px-2 py-1 rounded-md border border-amber-100">
                        {alt.title[language] || alt.title.ru}
                      </div>
                    ))}
                  </div>

                  {/* Accept / Decline for Customer */}
                  {isCustomer && (
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => respondToCounterOffer(order.id, true)}
                        className="flex-1 py-1.5 px-3 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.order.acceptAlternative}</span>
                      </button>
                      <button
                        onClick={() => respondToCounterOffer(order.id, false)}
                        className="py-1.5 px-3 bg-white border border-slate-200 text-slate-700 hover:text-rose-600 rounded-lg text-xs font-semibold"
                      >
                        {t.order.declineAlternative}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick Chat Messages */}
          {order.messages.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Заметки к заказу
              </span>
              {order.messages.map(m => (
                <div 
                  key={m.id}
                  className={`p-2 rounded-xl text-xs max-w-[85%] ${
                    m.fromUid === currentUser.uid 
                      ? 'ml-auto bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Quick Reply Chips */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              {t.order.quickRepliesLabel}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(isCook ? t.order.quickCookReplies : t.order.quickCustomerReplies).map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => sendOrderMessage(order.id, reply)}
                  className="px-2.5 py-1 rounded-full text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* COOK CONTROLS SECTION */}
          {isCook && order.status !== 'ready' && order.status !== 'cancelled' && (
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-emerald-600" />
                <span>{t.order.cookControls}</span>
              </span>

              {/* Status Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => updateOrderStatus(order.id, 'accepted')}
                  disabled={order.status !== 'sent'}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center ${
                    order.status === 'accepted'
                      ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-500'
                      : order.status === 'sent'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {t.order.statusButtons.accept}
                </button>

                <button
                  onClick={() => updateOrderStatus(order.id, 'cooking', 30)}
                  disabled={order.status === 'cooking'}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center ${
                    order.status === 'cooking'
                      ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-500'
                      : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                  }`}
                >
                  {t.order.statusButtons.cooking}
                </button>

                <button
                  onClick={() => updateOrderStatus(order.id, 'ready')}
                  className="py-2 px-1 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm text-center"
                >
                  {t.order.statusButtons.ready}
                </button>
              </div>

              {/* ETA Presets: 15 / 30 / 45 / 60 min */}
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                  {t.order.setEta}
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[15, 30, 45, 60].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setOrderEta(order.id, mins)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        order.etaMinutes === mins
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {mins} {t.home.minutesShort}
                    </button>
                  ))}
                </div>
              </div>

              {/* Counter-offer and Cooking Mode buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openModal('counter_offer', order)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{t.order.suggestAlternative}</span>
                </button>

                <button
                  onClick={handleLaunchCookMode}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>{t.order.launchCookingMode}</span>
                </button>
              </div>
            </div>
          )}

          {/* Repeat Order Button (if ready or history) */}
          {order.status === 'ready' && (
            <div className="pt-2 text-center">
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-semibold mb-3 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Заказ выполнен! Приятного аппетита ❤️</span>
              </div>
              <button
                onClick={() => repeatOrder(order)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.order.repeatOrder}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
