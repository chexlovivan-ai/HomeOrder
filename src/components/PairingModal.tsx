import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import QRCode from 'qrcode';
import { 
  X, Copy, Check, QrCode, Camera, Share2, HeartHandshake, 
  ArrowRight, ShieldCheck, Sparkles 
} from 'lucide-react';

export const PairingModal: React.FC = () => {
  const { currentUser, partner, couple, pairWithCode, unlinkCouple, closeModal, language, t } = useApp();
  const [partnerCodeInput, setPartnerCodeInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Generate QR Code data URL
  useEffect(() => {
    if (currentUser.pairCode) {
      QRCode.toDataURL(currentUser.pairCode, {
        width: 240,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
      .then(url => setQrDataUrl(url))
      .catch(() => {});
    }
  }, [currentUser.pairCode]);

  // Copy code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(currentUser.pairCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HomeOrder Код пары',
          text: `Мой код для пары в HomeOrder: ${currentUser.pairCode}`,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!partnerCodeInput.trim()) return;

    const success = pairWithCode(partnerCodeInput);
    if (!success) {
      setErrorMessage(
        language === 'ru' 
          ? 'Код не найден. Попробуйте код другого партнера (например, ANNA88 или ALEX26)' 
          : 'Code not found. Try your partner’s code (e.g., ANNA88 or ALEX26)'
      );
    }
  };

  // Toggle Camera QR Scanner
  const startCamera = async () => {
    setIsScanning(true);
    setErrorMessage('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setErrorMessage(language === 'ru' ? 'Камера недоступна в этом окне браузера' : 'Camera not accessible in this frame');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const demoPartnerCode = currentUser.uid === 'user_alex' ? 'ANNA88' : 'ALEX26';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">{t.pairing.title}</h2>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {/* Current Status */}
          {partner && couple ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-2xl mb-1 block">👩‍❤️‍👨</span>
              <h3 className="text-sm font-bold text-emerald-900">
                {t.home.partnerConnected} {partner.displayName}
              </h3>
              <p className="text-xs text-emerald-700 mt-1">
                {language === 'ru' ? 'Ваша пара активна. Вы можете заказывать и готовить друг другу.' : 'Your couple is connected. You can order and cook for each other.'}
              </p>
              <button
                onClick={unlinkCouple}
                className="mt-3 text-xs font-semibold text-rose-600 hover:text-rose-700 underline"
              >
                {t.profile.unlinkCouple}
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-600">
                {t.pairing.subtitle}
              </p>
            </div>
          )}

          {/* Section 1: My 6-Char Code & QR */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {t.pairing.myCode}
            </span>

            {/* Big 6-character code badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 rounded-2xl border border-slate-200">
              <span className="text-2xl font-black font-mono tracking-widest text-slate-900">
                {currentUser.pairCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
                title="Копировать"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* QR Code Container */}
            {qrDataUrl && (
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-[200px] mx-auto">
                <img 
                  src={qrDataUrl} 
                  alt="QR Code" 
                  className="w-40 h-40 rounded-xl"
                />
                <span className="text-[10px] text-slate-400 mt-1 font-mono">
                  {currentUser.pairCode}
                </span>
              </div>
            )}

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{t.pairing.shareCode}</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 font-semibold uppercase tracking-wider absolute">
              или
            </span>
          </div>

          {/* Section 2: Enter Partner's Code */}
          <form onSubmit={handleSubmitCode} className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.pairing.enterCode}
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={partnerCodeInput}
                onChange={(e) => setPartnerCodeInput(e.target.value.toUpperCase())}
                placeholder={t.pairing.partnerCodePlaceholder}
                className="flex-1 p-3 rounded-xl border border-slate-200 text-sm font-mono font-bold tracking-widest text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1"
              >
                <span>{t.pairing.sendRequest}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-600 font-medium">{errorMessage}</p>
            )}

            {/* Demo Partner Quick Button */}
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 flex items-center justify-between gap-2">
              <div className="text-[11px] text-emerald-900">
                <span className="font-semibold">{t.pairing.demoCodeHint}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  pairWithCode(demoPartnerCode);
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm shrink-0"
              >
                {t.pairing.useDemoPartner} ({demoPartnerCode})
              </button>
            </div>
          </form>

          {/* Section 3: Camera QR Scanner button / view */}
          <div>
            {!isScanning ? (
              <button
                type="button"
                onClick={startCamera}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>{t.pairing.scanQr}</span>
              </button>
            ) : (
              <div className="relative bg-slate-950 rounded-2xl overflow-hidden p-2 text-center">
                <video 
                  ref={videoRef} 
                  className="w-full h-44 object-cover rounded-xl"
                  playsInline
                />
                <button
                  type="button"
                  onClick={stopCamera}
                  className="mt-2 py-1.5 px-3 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold"
                >
                  Остановить камеру
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
