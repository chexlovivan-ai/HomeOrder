import React from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import { 
  User, QrCode, HeartHandshake, Bell, Globe, LogOut, 
  Split, Smartphone, HelpCircle, ChevronRight, ShieldCheck, ShoppingCart 
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { 
    currentUser, 
    partner, 
    couple, 
    unlinkCouple, 
    openModal, 
    language, 
    setLanguage, 
    soundEnabled, 
    setSoundEnabled,
    switchUser,
    viewMode,
    setViewMode,
    shoppingList,
    t 
  } = useApp();

  return (
    <div className="p-4 space-y-5">
      {/* User Card */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl shrink-0">
          {currentUser.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-black text-slate-900 tracking-tight truncate">
            {currentUser.displayName}
          </h2>
          <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700">
              Код: {currentUser.pairCode}
            </span>
          </div>
        </div>
      </div>

      {/* Partner & Couple Status Block */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.profile.coupleStatus}
            </h3>
          </div>
          {partner && (
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              Активна ❤️
            </span>
          )}
        </div>

        {partner && couple ? (
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{partner.avatar}</span>
              <div>
                <p className="text-xs font-bold text-slate-900">{partner.displayName}</p>
                <p className="text-[11px] text-emerald-700">В паре с вами</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (window.confirm(t.profile.unlinkConfirm)) {
                  unlinkCouple();
                }
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 px-2 py-1"
            >
              {t.profile.unlinkCouple}
            </button>
          </div>
        ) : (
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <p className="text-xs text-slate-600 mb-2">{t.profile.single}</p>
            <button
              onClick={() => openModal('pairing')}
              className="py-2 px-4 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              {t.home.linkPrompt}
            </button>
          </div>
        )}

        <button
          onClick={() => openModal('pairing')}
          className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-slate-500" />
            <span>{t.pairing.myCode} & QR</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => openModal('shopping_list')}
          className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-between transition-colors shadow-sm"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-600" />
            <span>{t.shoppingList.title}</span>
          </div>
          <span className="text-[11px] font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">
            {shoppingList.length} поз.
          </span>
        </button>
      </div>

      {/* Simulator Device Switcher Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg space-y-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            {t.profile.deviceSwitcherTitle}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            {t.profile.deviceSwitcherDesc}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {Object.values(DEMO_USERS).map(u => (
            <button
              key={u.uid}
              onClick={() => switchUser(u.uid)}
              className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                currentUser.uid === u.uid
                  ? 'border-emerald-500 bg-emerald-950/60 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-800/80 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className="text-xl">{u.avatar}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">{u.displayName}</p>
                <p className="text-[10px] text-slate-400">{currentUser.uid === u.uid ? 'Активен' : 'Переключить'}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-300">Режим отображения:</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setViewMode('single')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                viewMode === 'single' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              1 экран
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                viewMode === 'split' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              2 экрана рядом
            </button>
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        {/* Language */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <Globe className="w-4 h-4 text-slate-500" />
            <span>{t.profile.language}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
            <button
              onClick={() => setLanguage('ru')}
              className={`px-2 py-0.5 rounded text-xs font-bold transition-colors ${
                language === 'ru' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-xs font-bold transition-colors ${
                language === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Notifications & Sound */}
        <div className="flex items-center justify-between py-1 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <Bell className="w-4 h-4 text-slate-500" />
            <span>{t.profile.soundNotifications}</span>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              soundEnabled ? 'bg-emerald-600' : 'bg-slate-200'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                soundEnabled ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* How to use / Onboarding walkthrough */}
        <div className="pt-1 border-t border-slate-100">
          <button
            onClick={() => openModal('onboarding')}
            className="w-full py-2 flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>Как пользоваться приложением (Онбординг)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Log out / Auth */}
      <div>
        <button
          onClick={() => openModal('auth')}
          className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.profile.logOut}</span>
        </button>
      </div>
    </div>
  );
};
