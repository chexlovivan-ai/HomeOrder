import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Clock, Heart, Users, ChefHat, Check, Plus, Timer, Sparkles, ShoppingCart } from 'lucide-react';

export const RecipeModal: React.FC = () => {
  const { 
    selectedRecipe, 
    closeModal, 
    language, 
    isFavorite, 
    toggleFavorite, 
    addToCart, 
    cart, 
    openModal, 
    generateShoppingListFromRecipe,
    t 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps'>('ingredients');
  const [imageError, setImageError] = useState(false);

  if (!selectedRecipe) return null;

  const favorite = isFavorite(selectedRecipe.id);
  const inCart = cart.some(c => c.id === selectedRecipe.id);
  const title = selectedRecipe.title[language] || selectedRecipe.title.ru;
  const description = selectedRecipe.description?.[language] || selectedRecipe.description?.ru;

  const handleStartCooking = () => {
    // Open cooking mode directly for this recipe
    openModal('cooking', selectedRecipe);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200"
      >
        {/* Header Photo & Controls */}
        <div className="relative h-56 sm:h-64 bg-slate-100 shrink-0">
          {!imageError ? (
            <img 
              src={selectedRecipe.photoUrl} 
              alt={title} 
              onError={() => setImageError(true)}
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-800">
              <ChefHat className="w-16 h-16 opacity-70" />
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(selectedRecipe.id)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
          </button>

          {/* Bottom gradient overlay with time */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex items-end justify-between text-white">
            <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-600/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
              {t.categories[selectedRecipe.category]}
            </span>
            <div className="flex items-center gap-3 text-xs font-medium">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedRecipe.timeMinutes} {t.home.minutesShort}</span>
              </div>
              {selectedRecipe.servings && (
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>{selectedRecipe.servings} {t.catalog.servings}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto flex-1">
          <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {description}
            </p>
          )}

          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mt-4 mb-4">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'ingredients'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.catalog.ingredients} ({selectedRecipe.ingredients.length})
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'steps'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.catalog.steps} ({selectedRecipe.steps.length})
            </button>
          </div>

          {/* Tab 1: Ingredients */}
          {activeTab === 'ingredients' ? (
            <div className="space-y-2">
              {selectedRecipe.ingredients.map((ing, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between py-2 border-b border-slate-100 text-xs"
                >
                  <span className="font-medium text-slate-800">
                    {ing.name[language] || ing.name.ru}
                  </span>
                  <span className="font-bold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-md">
                    {ing.amount} {ing.unit[language] || ing.unit.ru}
                  </span>
                </div>
              ))}

              <button
                type="button"
                onClick={() => generateShoppingListFromRecipe(selectedRecipe)}
                className="w-full mt-3 py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold border border-emerald-200/80 flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ShoppingCart className="w-4 h-4 text-emerald-600" />
                <span>{t.shoppingList.title}</span>
              </button>
            </div>
          ) : (
            /* Tab 2: Steps */
            <div className="space-y-3">
              {selectedRecipe.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-slate-800 leading-relaxed font-normal">
                      {step.text[language] || step.text.ru}
                    </p>
                    {step.timerSeconds && (
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold text-[11px] border border-amber-200">
                        <Timer className="w-3 h-3 text-amber-600" />
                        <span>{Math.round(step.timerSeconds / 60)} {t.home.minutesShort}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA Actions */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3 shrink-0">
          <button
            onClick={() => addToCart(selectedRecipe)}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
              inCart
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>{language === 'ru' ? 'В вашем заказе' : 'In your order'}</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{t.catalog.orderThis}</span>
              </>
            )}
          </button>

          <button
            onClick={handleStartCooking}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 active:scale-[0.98]"
          >
            <ChefHat className="w-4 h-4" />
            <span>{t.catalog.startCooking}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
