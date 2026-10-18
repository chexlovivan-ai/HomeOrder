import React, { useEffect } from 'react';
import { AppProvider, useApp, DEMO_USERS } from './context/AppContext';
import { TopSimulatorBar } from './components/TopSimulatorBar';
import { PhoneWrapper } from './components/PhoneWrapper';
import { BottomNav } from './components/BottomNav';
import { NotificationToast } from './components/NotificationToast';

import { HomeScreen } from './screens/HomeScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { ProfileScreen } from './screens/ProfileScreen';

import { RecipeModal } from './components/RecipeModal';
import { OrderCheckoutModal } from './components/OrderCheckoutModal';
import { OrderDetailModal } from './components/OrderDetailModal';
import { CookingModeModal } from './components/CookingModeModal';
import { CounterOfferModal } from './components/CounterOfferModal';
import { PairingModal } from './components/PairingModal';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthModal } from './components/AuthModal';
import { AddRecipeModal } from './components/AddRecipeModal';
import { ShoppingListModal } from './components/ShoppingListModal';

const MainScreenContent: React.FC = () => {
  const { activeTab } = useApp();

  switch (activeTab) {
    case 'home':
      return <HomeScreen />;
    case 'catalog':
      return <CatalogScreen />;
    case 'orders':
      return <OrdersScreen />;
    case 'profile':
      return <ProfileScreen />;
    default:
      return <HomeScreen />;
  }
};

const ModalRenderer: React.FC = () => {
  const { activeModal } = useApp();

  return (
    <>
      <NotificationToast />
      {activeModal === 'recipe' && <RecipeModal />}
      {activeModal === 'checkout' && <OrderCheckoutModal />}
      {activeModal === 'order_detail' && <OrderDetailModal />}
      {activeModal === 'cooking' && <CookingModeModal />}
      {activeModal === 'counter_offer' && <CounterOfferModal />}
      {activeModal === 'pairing' && <PairingModal />}
      {activeModal === 'onboarding' && <OnboardingModal />}
      {activeModal === 'auth' && <AuthModal />}
      {activeModal === 'add_recipe' && <AddRecipeModal />}
      {activeModal === 'shopping_list' && <ShoppingListModal />}
    </>
  );
};

// Secondary phone view for the Split Simulator
const SecondaryPhoneView: React.FC<{ targetUid: string }> = ({ targetUid }) => {
  const { orders, openModal, recipes, language, t } = useApp();
  const user = DEMO_USERS[targetUid];
  const activeOrder = orders.find(o => o.status !== 'ready' && o.status !== 'cancelled');

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
            <span>{user.avatar}</span>
            <span>{user.displayName}</span>
          </h3>
          <p className="text-[11px] text-slate-400">Устройство партнера 2</p>
        </div>
        <span className="text-[11px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded-lg text-slate-700">
          {user.pairCode}
        </span>
      </div>

      {/* Active Order on Partner 2 */}
      {activeOrder ? (
        <div 
          onClick={() => openModal('order_detail', activeOrder)}
          className="cursor-pointer bg-slate-900 text-white rounded-3xl p-4 shadow-lg space-y-2 hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md">
              {activeOrder.cookId === targetUid ? 'Вы готовите' : 'Вы заказали'}
            </span>
            <span className="text-xs text-slate-300 font-semibold">
              {t.order.statuses[activeOrder.status]}
            </span>
          </div>

          <p className="text-sm font-bold text-white truncate">
            {activeOrder.items.map(i => i.title[language] || i.title.ru).join(', ')}
          </p>
          <p className="text-xs text-slate-300">
            {t.order.serveTime}: {activeOrder.serveAt}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal('order_detail', activeOrder);
            }}
            className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl text-center"
          >
            Открыть заказ партнера
          </button>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <p className="text-xs font-semibold text-slate-600">Ожидание заказов от партнера</p>
        </div>
      )}

      {/* Quick Catalog preview */}
      <div>
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
          Рецепты в каталоге ({recipes.length})
        </h4>
        <div className="space-y-2">
          {recipes.slice(0, 3).map(r => (
            <div 
              key={r.id}
              onClick={() => openModal('recipe', r)}
              className="flex items-center gap-3 p-2 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 cursor-pointer transition-colors"
            >
              <img 
                src={r.photoUrl} 
                alt="dish" 
                className="w-10 h-10 rounded-xl object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {r.title[language] || r.title.ru}
                </p>
                <p className="text-[10px] text-slate-400">~{r.timeMinutes} мин</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AppShell: React.FC = () => {
  const { viewMode, currentUser, onboardingSeen, openModal } = useApp();

  // First-time launch: open onboarding
  useEffect(() => {
    if (!onboardingSeen) {
      openModal('onboarding');
    }
  }, [onboardingSeen, openModal]);

  const secondaryUid = currentUser.uid === 'user_alex' ? 'user_anna' : 'user_alex';
  const secondaryUser = DEMO_USERS[secondaryUid];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans antialiased text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top simulator toolbar */}
      <TopSimulatorBar />

      {/* Main Canvas */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-6 overflow-x-auto">
        {viewMode === 'split' ? (
          /* Split Mode: 2 Devices side-by-side for couple collaboration testing */
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-5xl py-4">
            <div className="w-full sm:w-[400px]">
              <PhoneWrapper userLabel={currentUser.displayName} userAvatar={currentUser.avatar}>
                <MainScreenContent />
                <BottomNav />
              </PhoneWrapper>
            </div>

            <div className="w-full sm:w-[400px]">
              <PhoneWrapper userLabel={secondaryUser.displayName} userAvatar={secondaryUser.avatar}>
                <SecondaryPhoneView targetUid={secondaryUid} />
              </PhoneWrapper>
            </div>
          </div>
        ) : (
          /* Single Device Mode */
          <div className="w-full flex justify-center">
            <PhoneWrapper userLabel={currentUser.displayName} userAvatar={currentUser.avatar}>
              <MainScreenContent />
              <BottomNav />
            </PhoneWrapper>
          </div>
        )}
      </main>

      {/* Overlaid modals (Order, Recipe, Cook Mode, Pairing, etc.) */}
      <ModalRenderer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
