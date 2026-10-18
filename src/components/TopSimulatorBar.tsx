import React from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import { Smartphone, Split, Volume2, VolumeX, Globe, Sparkles, ShoppingCart } from 'lucide-react';

export const TopSimulatorBar: React.FC = () => {
  const { 
    currentUser, 
    switchUser, 
    viewMode, 
    setViewMode, 
    language, 
    setLanguage, 
    soundEnabled, 
    setSoundEnabled,
    partner,
    shoppingList,
    openModal,
  } = useApp();

  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-800 text-xs py-2 px-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
      {/* Brand & Partner Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-sm">
            H
          </div>
          <span className="font-bold tracking-tight text-white text-sm">HomeOrder</span>
        </div>

        <div className="h-4 w-px bg-slate-700 hidden sm:block" />

        <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
          <span className="text-slate-400">Устройство:</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1">
            <span>{currentUser.avatar}</span>
            <span>{currentUser.displayName}</span>
          </span>
          {partner && (
            <span className="text-slate-400 ml-1 text-[11px]">
              &hearts; {partner.displayName}
            </span>
          )}
        </div>
      </div>

      {/* Simulator Controls */}
      <div className="flex items-center gap-2">
        {/* Switch User buttons */}
        <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          {Object.values(DEMO_USERS).map(u => (
            <button
              key={u.uid}
              onClick={() => switchUser(u.uid)}
              className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all flex items-center gap-1 ${
                currentUser.uid === u.uid
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>{u.avatar}</span>
              <span className="hidden md:inline">{u.displayName}</span>
            </button>
          ))}
        </div>

        {/* View Mode: Single vs Split */}
        <div className="hidden sm:flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => setViewMode('single')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'single' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Один экран телефона"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'split' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Сплит 2 устройства (для тестирования пары)"
          >
            <Split className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold"
          title="Сменить язык"
        >
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span>{language === 'ru' ? 'RU' : 'EN'}</span>
        </button>

        {/* Shopping List Quick Button */}
        <button
          onClick={() => openModal('shopping_list')}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/80 font-semibold transition-colors"
          title="Список покупок к заказу"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Покупки</span>
          <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
            {shoppingList.length}
          </span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          title={soundEnabled ? 'Звук включен' : 'Звук выключен'}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-slate-500" />
          )}
        </button>
      </div>
    </header>
  );
};
