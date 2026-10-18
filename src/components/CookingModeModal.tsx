import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Recipe } from '../types';
import { 
  X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, 
  Eye, Check, ListChecks, BellRing, Sparkles, Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CookingModeModalProps {
  payload?: any;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({ payload }) => {
  const { 
    closeModal, 
    recipes, 
    orders, 
    updateOrderStatus, 
    playAudioChime, 
    language, 
    t 
  } = useApp();

  // Find recipe either directly or from order payload
  const [recipe, setRecipe] = useState<Recipe | null>(() => {
    if (!payload) return recipes[0];
    if (payload.ingredients) return payload as Recipe;
    if (payload.recipeId) {
      return recipes.find(r => r.id === payload.recipeId) || recipes[0];
    }
    return recipes[0];
  });

  const orderId = payload?.orderId || orders.find(o => o.items.some(i => i.recipeId === recipe?.id))?.id;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [keepAwakeActive, setKeepAwakeActive] = useState(true);

  // WakeLock API reference
  const wakeLockRef = useRef<any>(null);

  useEffect(() => {
    async function requestWakeLock() {
      try {
        if ('wakeLock' in navigator && keepAwakeActive) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        }
      } catch {
        // WakeLock unsupported or denied
      }
    }
    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, [keepAwakeActive]);

  // Current Step details
  const step = recipe?.steps[currentStepIndex];
  const totalSteps = recipe?.steps.length || 1;
  const isLastStep = currentStepIndex === totalSteps - 1;

  // Step Timer
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const initialStepSeconds = step?.timerSeconds || 0;

  useEffect(() => {
    if (step?.timerSeconds) {
      setTimerSecondsLeft(step.timerSeconds);
      setTimerRunning(false);
    } else {
      setTimerSecondsLeft(0);
      setTimerRunning(false);
    }
  }, [currentStepIndex, step?.timerSeconds]);

  useEffect(() => {
    if (!timerRunning || timerSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setTimerSecondsLeft(prev => {
        if (prev <= 1) {
          setTimerRunning(false);
          playAudioChime('timer');
          try {
            navigator.vibrate?.([300, 150, 300]);
          } catch {}
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timerSecondsLeft, playAudioChime]);

  if (!recipe || !step) return null;

  const formatTimerTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleFinishCooking = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    playAudioChime('timer');
    if (orderId) {
      updateOrderStatus(orderId, 'ready');
    }
    closeModal();
  };

  const toggleIngredientCheck = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const checkedCount = Object.values(checkedIngredients).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden select-none">
      
      {/* Top Bar with KeepAwake & Ingredients Toggle */}
      <div className="h-14 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
        <button
          onClick={closeModal}
          className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80"
          title="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Recipe Title & Step count */}
        <div className="text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[200px]">
            {recipe.title[language] || recipe.title.ru}
          </p>
          <p className="text-xs font-black text-emerald-400">
            {t.cooking.step} {currentStepIndex + 1} {t.cooking.of} {totalSteps}
          </p>
        </div>

        {/* Keep Awake & Ingredients Drawer Trigger */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setKeepAwakeActive(!keepAwakeActive)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
              keepAwakeActive ? 'bg-emerald-600/30 text-emerald-400' : 'bg-slate-800 text-slate-400'
            }`}
            title={keepAwakeActive ? t.cooking.keepAwakeOn : t.cooking.keepAwakeOff}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowIngredients(!showIngredients)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 text-xs font-semibold relative"
          >
            <ListChecks className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">{t.cooking.ingredientsToggle}</span>
            {checkedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {checkedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Step Center View (Large readable text for cooking ergonomics) */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-4 max-w-lg mx-auto w-full text-center overflow-y-auto">
        
        {/* Step Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="my-auto">
          <p className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-100">
            {step.text[language] || step.text.ru}
          </p>

          {/* Interactive Step Timer */}
          {initialStepSeconds > 0 && (
            <div className="mt-8 p-6 bg-slate-900 border border-slate-800 rounded-3xl max-w-xs mx-auto shadow-xl">
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-emerald-400">
                {formatTimerTime(timerSecondsLeft)}
              </div>

              {timerSecondsLeft === 0 && (
                <p className="text-xs font-bold text-amber-400 mt-2 flex items-center justify-center gap-1 animate-bounce">
                  <BellRing className="w-4 h-4" />
                  <span>{t.cooking.timerDone}</span>
                </p>
              )}

              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`py-2 px-5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md ${
                    timerRunning
                      ? 'bg-amber-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {timerRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>{t.cooking.timerPause}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>{t.cooking.timerStart}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setTimerSecondsLeft(initialStepSeconds);
                    setTimerRunning(false);
                  }}
                  className="p-2.5 rounded-2xl bg-slate-800 text-slate-300 hover:text-white"
                  title={t.cooking.timerReset}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="h-20 px-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between shrink-0 max-w-lg mx-auto w-full gap-3">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className={`h-12 px-4 rounded-2xl font-bold text-xs flex items-center gap-1 transition-all ${
            currentStepIndex === 0 
              ? 'opacity-30 cursor-not-allowed bg-slate-800 text-slate-500' 
              : 'bg-slate-800 hover:bg-slate-700 text-white active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t.cooking.prevStep}</span>
        </button>

        {isLastStep ? (
          <button
            onClick={handleFinishCooking}
            className="flex-1 h-12 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
          >
            <Trophy className="w-5 h-5 text-amber-300" />
            <span>{t.cooking.markReady}</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 h-12 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
          >
            <span>{t.cooking.nextStep}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Slide-in Ingredients Checklist Drawer */}
      {showIngredients && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-md bg-slate-900 text-white rounded-t-[32px] sm:rounded-3xl max-h-[85vh] flex flex-col overflow-hidden border border-slate-800 shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {t.catalog.ingredients}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {checkedCount} / {recipe.ingredients.length} {t.cooking.ingredientsChecked}
                </p>
              </div>
              <button
                onClick={() => setShowIngredients(false)}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleIngredientCheck(idx)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition-all ${
                      isChecked
                        ? 'bg-emerald-950/40 border-emerald-800 text-slate-400 line-through'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                        isChecked ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-600'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-semibold">{ing.name[language] || ing.name.ru}</span>
                    </div>
                    <span className="font-mono text-emerald-400">
                      {ing.amount} {ing.unit[language] || ing.unit.ru}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <button
                onClick={() => setShowIngredients(false)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
              >
                Вернуться к готовке
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
