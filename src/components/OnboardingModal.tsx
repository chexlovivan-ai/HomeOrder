import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, QrCode, ChefHat, ArrowRight, Check } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { setOnboardingSeen, closeModal, t } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Utensils className="w-16 h-16 text-emerald-600" />,
      title: t.onboarding.slide1Title,
      desc: t.onboarding.slide1Desc,
      bg: 'bg-emerald-50',
    },
    {
      icon: <QrCode className="w-16 h-16 text-blue-600" />,
      title: t.onboarding.slide2Title,
      desc: t.onboarding.slide2Desc,
      bg: 'bg-blue-50',
    },
    {
      icon: <ChefHat className="w-16 h-16 text-amber-500" />,
      title: t.onboarding.slide3Title,
      desc: t.onboarding.slide3Desc,
      bg: 'bg-amber-50',
    },
  ];

  const handleFinish = () => {
    setOnboardingSeen(true);
    closeModal();
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl p-6 flex flex-col justify-between min-h-[500px] shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Top Skip Button */}
        <div className="flex justify-end">
          <button
            onClick={handleFinish}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 p-1"
          >
            {t.onboarding.skip}
          </button>
        </div>

        {/* Slide Graphic & Text */}
        <div className="flex flex-col items-center text-center my-auto px-4">
          <div className={`w-32 h-32 rounded-3xl ${slides[currentSlide].bg} flex items-center justify-center mb-6 shadow-sm`}>
            {slides[currentSlide].icon}
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs">
            {slides[currentSlide].desc}
          </p>
        </div>

        {/* Dots & Next/Start Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <div 
                key={i}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === i ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <span>{currentSlide === slides.length - 1 ? t.onboarding.start : t.onboarding.next}</span>
            {currentSlide === slides.length - 1 ? (
              <Check className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
