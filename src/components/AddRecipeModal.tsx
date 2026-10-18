import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Category, Recipe } from '../types';
import { X, Plus, Trash2, ChefHat } from 'lucide-react';

export const AddRecipeModal: React.FC = () => {
  const { closeModal, addCustomRecipe, language, t } = useApp();
  
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState<Category>('dinner');
  const [timeMinutes, setTimeMinutes] = useState(30);
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80');

  const [ingredients, setIngredients] = useState<Array<{ name: string; amount: string; unit: string }>>([
    { name: '', amount: '1', unit: 'шт' },
  ]);

  const [steps, setSteps] = useState<Array<{ text: string; timerMinutes?: number }>>([
    { text: '', timerMinutes: 5 },
  ]);

  const handleAddIngredient = () => {
    setIngredients(prev => [...prev, { name: '', amount: '1', unit: 'шт' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    setSteps(prev => [...prev, { text: '', timerMinutes: 5 }]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleRu.trim()) return;

    const newRecipe: Recipe = {
      id: `custom_${Date.now()}`,
      title: { ru: titleRu.trim(), en: titleEn.trim() || titleRu.trim() },
      category,
      timeMinutes: Number(timeMinutes) || 20,
      photoUrl: photoUrl.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      difficulty: 'medium',
      ingredients: ingredients
        .filter(i => i.name.trim())
        .map(i => ({
          name: { ru: i.name, en: i.name },
          amount: i.amount || '1',
          unit: { ru: i.unit, en: i.unit },
        })),
      steps: steps
        .filter(s => s.text.trim())
        .map(s => ({
          text: { ru: s.text, en: s.text },
          ...(s.timerMinutes ? { timerSeconds: s.timerMinutes * 60 } : {}),
        })),
      isCustom: true,
    };

    addCustomRecipe(newRecipe);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              {language === 'ru' ? 'Добавить рецепт пары' : 'Add Couple Recipe'}
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex-1 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Название блюда (RU)*
            </label>
            <input
              type="text"
              required
              value={titleRu}
              onChange={(e) => setTitleRu(e.target.value)}
              placeholder="Например, Домашняя паста с белыми грибами"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Название блюда (EN)
            </label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g. Homemade Wild Mushroom Pasta"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Категория
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium capitalize"
              >
                {(['breakfast', 'lunch', 'dinner', 'salad', 'soup', 'dessert'] as Category[]).map(c => (
                  <option key={c} value={c}>{t.categories[c]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Время (минут)
              </label>
              <input
                type="number"
                min="5"
                max="240"
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          {/* Ingredients list builder */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Ингредиенты
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Добавить</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="Название"
                    value={ing.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIngredients(prev => prev.map((item, i) => i === idx ? { ...item, name: val } : item));
                    }}
                    className="flex-1 p-2 rounded-lg border border-slate-200 text-xs text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Кол-во"
                    value={ing.amount}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIngredients(prev => prev.map((item, i) => i === idx ? { ...item, amount: val } : item));
                    }}
                    className="w-16 p-2 rounded-lg border border-slate-200 text-xs text-slate-900 text-center"
                  />
                  <input
                    type="text"
                    placeholder="Ед."
                    value={ing.unit}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIngredients(prev => prev.map((item, i) => i === idx ? { ...item, unit: val } : item));
                    }}
                    className="w-14 p-2 rounded-lg border border-slate-200 text-xs text-slate-900 text-center"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Steps list builder */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Шаги приготовления
              </label>
              <button
                type="button"
                onClick={handleAddStep}
                className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Добавить шаг</span>
              </button>
            </div>

            <div className="space-y-2">
              {steps.map((st, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Шаг {idx + 1}</span>
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Опишите действие на этом шаге..."
                    value={st.text}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSteps(prev => prev.map((item, i) => i === idx ? { ...item, text: val } : item));
                    }}
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-900 resize-none"
                  />
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span>Таймер (мин):</span>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      value={st.timerMinutes || 0}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSteps(prev => prev.map((item, i) => i === idx ? { ...item, timerMinutes: val } : item));
                      }}
                      className="w-16 p-1 border border-slate-200 rounded text-center text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20"
            >
              Сохранить рецепт
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
