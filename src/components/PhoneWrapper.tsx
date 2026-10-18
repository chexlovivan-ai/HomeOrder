import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneWrapperProps {
  children: React.ReactNode;
  userLabel?: string;
  userAvatar?: string;
}

export const PhoneWrapper: React.FC<PhoneWrapperProps> = ({ 
  children, 
  userLabel,
  userAvatar
}) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col items-center justify-center p-0 sm:p-4 w-full">
      {userLabel && (
        <div className="hidden sm:flex items-center gap-1.5 mb-2 px-3 py-1 bg-slate-800 text-white rounded-full text-xs font-semibold shadow-sm">
          <span>{userAvatar}</span>
          <span>Экран: {userLabel}</span>
        </div>
      )}

      {/* Android Device Mockup Shell */}
      <div className="w-full sm:max-w-[420px] h-[100dvh] sm:h-[840px] bg-white sm:rounded-[40px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col overflow-hidden relative sm:ring-1 sm:ring-slate-900/10">
        
        {/* Android Punch Hole Camera & Speaker */}
        <div className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 rounded-full z-50 ring-2 ring-slate-800/80" />

        {/* Android Status Bar */}
        <div className="h-7 px-5 bg-white flex items-center justify-between text-xs text-slate-800 font-medium shrink-0 z-30 select-none">
          <span className="text-[12px] font-semibold tracking-tight">{currentTime}</span>
          <div className="flex items-center gap-2 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-white pb-20 select-none">
          {children}
        </div>
      </div>
    </div>
  );
};
