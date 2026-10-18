import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Category, Recipe } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { Search, Heart, Plus, Sparkles, Filter } from 'lucide-react';

export const CatalogScreen: React.FC = () => {
  const { recipes, favorites, openModal, language, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Array<{ id: Category | 'all' | 'favorites'; label: string }> = [
    { id: 'all', label: t.categories.all },
    { id: 'favorites', label: `❤️ ${t.catalog.favoritesOnly} (${favorites.length})` },
    { id: 'breakfast', label: t.categories.breakfast },
    { id: 'lunch', label: t.categories.lunch },
    { id: 'dinner', label: t.categories.dinner },
    { id: 'salad', label: t.categories.salad },
    { id: 'soup', label: t.categories.soup },
    { id: 'dessert', label: t.categories.dessert },
  ];

  const filteredRecipes = recipes.filter(r => {
    // Category match
    if (selectedCategory === 'favorites') {
      if (!favorites.includes(r.id)) return false;
    } else if (selectedCategory !== 'all') {
      if (r.category !== selectedCategory) return false;
    }

    // Search query match (title or ingredients)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const titleRu = r.title.ru.toLowerCase();
      const titleEn = r.title.en.toLowerCase();
      const matchesTitle = titleRu.includes(q) || titleEn.includes(q);
      const matchesIng = r.ingredients.some(ing => 
        ing.name.ru.toLowerCase().includes(q) || ing.name.en.toLowerCase().includes(q)
      );
      return matchesTitle || matchesIng;
    }

    return true;
  });

  return (
    <div className="p-4 space-y-4">
      {/* Search Header */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.catalog.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 border border-transparent text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-300 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              &times;
            </button>
          )}
        </div>

        {/* Add custom recipe button */}
        <button
          onClick={() => openModal('add_recipe')}
          className="p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 transition-colors flex items-center justify-center shrink-0 shadow-sm"
          title="Добавить свой рецепт"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Category Horizontal Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        {categories.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Counter summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Найдено блюд: {filteredRecipes.length}</span>
        {selectedCategory === 'favorites' && (
          <span className="text-rose-600 font-semibold">Общие любимые рецепты пары ❤️</span>
        )}
      </div>

      {/* Recipes Cards Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="space-y-4">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={() => openModal('recipe', recipe)}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center rounded-3xl bg-slate-50 border border-slate-100 my-8">
          <p className="text-sm font-bold text-slate-700">{t.catalog.notFound}</p>
          <p className="text-xs text-slate-400 mt-1">Попробуйте изменить поисковый запрос или фильтр категорий</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
};
