import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, BookOpen, Clock, User, ShoppingBag } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t, activeOrder, cart, openModal } = useApp();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 max-w-md mx-auto">
      {/* Floating cart bar if items are selected and not in checkout */}
      {cart.length > 0 && (
        <div className="px-4 pt-2">
          <button
            onClick={() => openModal('checkout')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-between shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold">
                {t.checkout.selectedDishes}: {cart.length}
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-lg">
              {t.checkout.submitOrder} &rarr;
            </span>
          </button>
        </div>
      )}

      <nav className="grid grid-cols-4 items-center h-16 px-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'home' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className={`text-[11px] mt-1 font-medium ${activeTab === 'home' ? 'font-semibold' : ''}`}>
            {t.nav.home}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'catalog' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'catalog' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className={`text-[11px] mt-1 font-medium ${activeTab === 'catalog' ? 'font-semibold' : ''}`}>
            {t.nav.catalog}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'orders' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <Clock className={`w-5 h-5 ${activeTab === 'orders' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {activeOrder && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          <span className={`text-[11px] mt-1 font-medium ${activeTab === 'orders' ? 'font-semibold' : ''}`}>
            {t.nav.orders}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'profile' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className={`text-[11px] mt-1 font-medium ${activeTab === 'profile' ? 'font-semibold' : ''}`}>
            {t.nav.profile}
          </span>
        </button>
      </nav>
    </div>
  );
};
