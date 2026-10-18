import React from 'react';
import { useApp } from '../context/AppContext';
import { RecipeCard } from '../components/RecipeCard';
import { 
  HeartHandshake, Plus, Clock, ChefHat, Sparkles, 
  ArrowRight, Flame, Heart, QrCode, ShoppingBag, ShoppingCart
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { 
    currentUser, 
    partner, 
    couple, 
    activeOrder, 
    openModal, 
    favorites, 
    recipes, 
    generateShoppingListFromOrder,
    language, 
    t,
    setActiveTab 
  } = useApp();

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  // Determine active order role
  const isCustomer = activeOrder ? currentUser.uid === activeOrder.createdBy : false;
  const isCook = activeOrder ? currentUser.uid === activeOrder.cookId : false;

  return (
    <div className="p-4 space-y-6">
      
      {/* Header: Partner & Couple Status */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>{t.home.partnerConnected}</span>
            {partner ? (
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <span>{partner.avatar}</span>
                <span>{partner.displayName}</span>
              </span>
            ) : (
              <span className="text-amber-600 font-semibold">{t.home.waitingPartner}</span>
            )}
          </div>
          <h1 className="text-xl font-black text-slate-900 mt-0.5 tracking-tight flex items-center gap-2">
            <span>Привет, {currentUser.displayName}!</span>
            <span>{currentUser.avatar}</span>
          </h1>
        </div>

        {/* Pair button / QR */}
        <button
          onClick={() => openModal('pairing')}
          className="p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          title={t.pairing.title}
        >
          <QrCode className="w-4 h-4" />
          <span className="text-xs font-bold font-mono">{currentUser.pairCode}</span>
        </button>
      </div>

      {/* ACTIVE ORDER CARD (If one exists) */}
      {activeOrder ? (
        <div 
          onClick={() => openModal('order_detail', activeOrder)}
          className="cursor-pointer bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white rounded-3xl p-5 shadow-xl shadow-emerald-700/20 relative overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          {/* Subtle background glow */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-xl">
              {t.home.activeOrderTitle}
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>{t.order.statuses[activeOrder.status]}</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 my-2">
            {activeOrder.items[0]?.photoUrl && (
              <img 
                src={activeOrder.items[0].photoUrl} 
                alt="Order item" 
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30 shrink-0"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-extrabold truncate text-white">
                {activeOrder.items.map(i => i.title[language] || i.title.ru).join(', ')}
              </h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                {t.order.serveTime}: <span className="font-semibold text-white">{activeOrder.serveAt}</span>
              </p>
              <p className="text-[11px] text-emerald-200 mt-0.5">
                {isCustomer ? '👨‍🍳 Партнер готовит блюдо' : '🍳 Вы назначены поваром'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-100 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeOrder.etaMinutes ? `Будет через ~${activeOrder.etaMinutes} мин` : 'Ожидает ответа'}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  generateShoppingListFromOrder(activeOrder);
                }}
                className="flex items-center gap-1 text-emerald-100 hover:text-white bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-xl font-bold transition-colors"
                title={t.shoppingList.title}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Список</span>
              </button>
              <span className="flex items-center gap-1 text-white bg-white/20 px-3 py-1 rounded-xl font-bold">
                <span>{t.home.viewOrder}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State banner: "Что хочешь сегодня?" */
        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900">
            {t.home.noActiveOrders}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
            {t.home.noActiveOrdersSubtitle}
          </p>
        </div>
      )}

      {/* BIG "MAKE ORDER" BUTTON */}
      <div>
        <button
          onClick={() => setActiveTab('catalog')}
          className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-blue-600/25 active:scale-[0.98] transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{t.home.makeOrder}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* "OUR DISHES" (FAVORITES HORIZONTAL REEL) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                {t.home.ourDishes}
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t.home.ourDishesSubtitle}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('catalog')}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Все ({recipes.length})
          </button>
        </div>

        {favoriteRecipes.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
            {favoriteRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                compact={true}
                onSelect={() => openModal('recipe', recipe)} 
              />
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center text-xs text-slate-500">
            В избранном пары пока пусто. Нажимайте сердечко на блюдах в каталоге!
          </div>
        )}
      </div>

      {/* Recommended Specials Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Популярно для ужина
          </h2>
          <button
            onClick={() => setActiveTab('catalog')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Смотреть все &rarr;
          </button>
        </div>

        <div className="space-y-4">
          {recipes.slice(0, 3).map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={() => openModal('recipe', recipe)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
