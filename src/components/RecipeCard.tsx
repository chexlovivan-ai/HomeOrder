import React, { useState } from 'react';
import { Recipe } from '../types';
import { useApp } from '../context/AppContext';
import { Clock, Heart, Plus, ChefHat, Check } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
  compact?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect, compact = false }) => {
  const { language, isFavorite, toggleFavorite, addToCart, cart, t } = useApp();
  const [imageError, setImageError] = useState(false);
  const favorite = isFavorite(recipe.id);
  const inCart = cart.some(c => c.id === recipe.id);

  const title = recipe.title[language] || recipe.title.ru;

  if (compact) {
    return (
      <div 
        onClick={onSelect}
        className="w-48 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer flex flex-col group"
      >
        <div className="relative h-28 bg-slate-100 overflow-hidden">
          {!imageError ? (
            <img 
              src={recipe.photoUrl} 
              alt={title} 
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-700">
              <ChefHat className="w-8 h-8 opacity-70" />
            </div>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
          </button>
        </div>
        <div className="p-2.5 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">{title}</h4>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{recipe.timeMinutes} {t.home.minutesShort}</span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(recipe);
            }}
            className={`mt-2 w-full py-1 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors ${
              inCart ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-3 h-3" />
                <span>В заказе</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>{t.catalog.orderThis}</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer flex flex-col group"
    >
      {/* Recipe Photo */}
      <div className="relative h-44 sm:h-48 bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img 
            src={recipe.photoUrl} 
            alt={title} 
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-100 via-teal-50 to-slate-100 flex flex-col items-center justify-center text-emerald-800">
            <ChefHat className="w-12 h-12 opacity-60 mb-1" />
            <span className="text-xs font-semibold">{t.appName}</span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white active:scale-90 transition-all z-10"
          aria-label={t.catalog.addToFavorites}
        >
          <Heart className={`w-5 h-5 transition-colors ${favorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400 hover:text-slate-600'}`} />
        </button>

        {/* Cooking Time Badge */}
        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>{recipe.timeMinutes} {t.home.minutesShort}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
            <span className="capitalize">{t.categories[recipe.category]}</span>
            <span>·</span>
            <span>{recipe.ingredients.length} {language === 'ru' ? 'ингредиентов' : 'ingredients'}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {title}
          </h3>

          {recipe.description && (
            <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
              {recipe.description[language] || recipe.description.ru}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(recipe);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${
              inCart 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>{language === 'ru' ? 'В заказе' : 'In Order'}</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{t.catalog.orderThis}</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
          >
            <ChefHat className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">{t.catalog.startCooking}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
