import React, { useEffect, useState } from 'react';
import { useCallingStore } from '../../store/useCallingStore';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  Flame,
  X,
  Pause
} from 'lucide-react';

const CallSimulatorModal = () => {
  const { status, duration, activeCandidateId, endCall, tickTimer, reset } = useCallingStore();
  const [disposition, setDisposition] = useState('INTERESTED');
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  useEffect(() => {
    let interval: any;
    if (status === 'CONNECTED' && !isOnHold) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, isOnHold, tickTimer]);

  if (status === 'IDLE') return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEndCall = () => {
    endCall(disposition);
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-brand-500/40 z-50 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
      {/* Glow Top Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-500 via-indigo-400 to-emerald-400" />

      <div className="p-6 text-center space-y-4">
        {/* Header Avatar & Status */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                status === 'CONNECTED' ? 'bg-emerald-400' : 'bg-brand-400'
              } opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                status === 'CONNECTED' ? 'bg-emerald-500' : 'bg-brand-500'
              }`}></span>
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {status === 'INITIATING' && 'Dialing Candidate...'}
              {status === 'RINGING' && 'Ringing (Twilio SIP)...'}
              {status === 'CONNECTED' && 'AI Voice Session Live'}
              {status === 'COMPLETED' && 'Call Concluded'}
            </span>
          </div>

          <span className="text-xs font-mono font-bold text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded-lg border border-brand-500/20">
            {formatTime(duration)}
          </span>
        </div>

        {/* Center Calling Animation */}
        <div className="relative py-2 flex flex-col items-center">
          <div className="relative">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              status === 'CONNECTED'
                ? 'bg-gradient-to-tr from-brand-600 to-emerald-500 shadow-glow-emerald'
                : 'bg-slate-800 border border-slate-700 animate-pulse'
            }`}>
              <Bot className="w-10 h-10 text-white" />
            </div>

            {status === 'CONNECTED' && (
              <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-white shadow">
                <Mic className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <h3 className="text-sm font-bold text-white mt-3">
            Sarah AI ↔ Alexander Wright
          </h3>
          <p className="text-xs text-slate-400">Staff Frontend Architect Screening</p>
        </div>

        {/* Live Audio Equalizer & Simulated AI Transcript Stream */}
        {status === 'CONNECTED' && (
          <div className="space-y-3">
            {/* Waveform visualizer */}
            <div className="flex items-center justify-center gap-1.5 h-6">
              <div className="sound-bar" style={{ animationDuration: '0.6s' }}></div>
              <div className="sound-bar" style={{ animationDuration: '0.9s' }}></div>
              <div className="sound-bar" style={{ animationDuration: '0.7s' }}></div>
              <div className="sound-bar" style={{ animationDuration: '1.2s' }}></div>
              <div className="sound-bar" style={{ animationDuration: '0.8s' }}></div>
              <div className="sound-bar" style={{ animationDuration: '1.0s' }}></div>
              <div className="sound-bar" style={{ animationDuration: '0.5s' }}></div>
            </div>

            {/* Live Streaming Speech Bubble */}
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-left text-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] text-brand-300 font-semibold">
                <span>AI Live Transcription (240ms)</span>
                <span className="text-emerald-400 font-mono">98% Sentiment</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed italic">
                "...Yes, I led the React 19 architecture migration and I'm very interested in the $180k range..."
              </p>
            </div>

            {/* In-Call Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isMuted ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Mute Recruiter Mic"
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOnHold(!isOnHold)}
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isOnHold ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Hold Call"
              >
                <Pause className="w-4 h-4" />
              </button>

              <button
                onClick={handleEndCall}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-glow-rose transition-all active:scale-95"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            </div>
          </div>
        )}

        {/* Ringing or Initiating state controls */}
        {(status === 'INITIATING' || status === 'RINGING') && (
          <div className="pt-2">
            <button
              onClick={handleEndCall}
              className="w-12 h-12 bg-rose-600 hover:bg-rose-500 rounded-full flex items-center justify-center mx-auto transition-all shadow-glow-rose"
            >
              <PhoneOff className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {/* Completed Call Disposition Selector */}
        {status === 'COMPLETED' && (
          <div className="space-y-4 text-left pt-2 animate-in fade-in">
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Call finished! AI summary & transcript processed.</span>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1 block">Candidate Disposition</label>
              <select
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:border-brand-500 focus:outline-none"
                value={disposition}
                onChange={(e) => setDisposition(e.target.value)}
              >
                <option value="INTERESTED">Interested • Advance to Tech Interview</option>
                <option value="CALL_BACK">Callback Scheduled (Follow-up)</option>
                <option value="NOT_INTERESTED">Not Interested / Declined</option>
                <option value="VOICEMAIL">Left Voicemail</option>
              </select>
            </div>

            <button
              onClick={reset}
              className="w-full py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow-sm transition-all active:scale-[0.98]"
            >
              Save Results to Talent Pool
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallSimulatorModal;

