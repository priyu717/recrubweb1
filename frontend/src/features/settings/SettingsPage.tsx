import React, { useState } from 'react';
import {
  Settings,
  Bot,
  Sliders,
  Key,
  Shield,
  Building,
  Save,
  CheckCircle2,
  Sparkles,
  Volume2,
  Phone,
  Globe,
  Lock
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const SettingsPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'voice' | 'telephony' | 'org'>('voice');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [voiceSettings, setVoiceSettings] = useState({
    defaultVoice: 'ElevenLabs - Bella (Natural English)',
    latencyMode: 'ULTRA_LOW',
    speechRate: 1.05,
    temperature: 0.7,
    allowInterruption: true,
    backgroundNoiseReduction: true,
    aiModel: 'GPT-4o Realtime Audio Engine'
  });

  const [telephonySettings, setTelephonySettings] = useState({
    twilioSid: 'AC_live_94819038291048201',
    twilioToken: '••••••••••••••••••••••••••••••••',
    callerId: '+1 (800) 482-9011',
    vapiApiKey: 'vapi_live_sec_892184910283',
    webhookUrl: 'https://api.recruitvoice.io/v1/webhooks/voice-events'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-brand-400" />
          AI Voice & Platform Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure autonomous speech synthesis parameters, telephony pipelines, and organization credentials
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Configuration updated successfully across all active AI voice bots!
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('voice')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'voice'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Voice Engine & Persona</span>
        </button>

        <button
          onClick={() => setActiveTab('telephony')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'telephony'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Telephony & API Keys</span>
        </button>

        <button
          onClick={() => setActiveTab('org')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'org'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Organization Profile</span>
        </button>
      </div>

      {/* Tab Content */}
      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === 'voice' && (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Voice Synthesis & Agent Persona Tuning</h3>
              <p className="text-xs text-slate-400 mt-0.5">Control how human-like and responsive your AI recruiter speaks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Default Voice Persona</label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={voiceSettings.defaultVoice}
                  onChange={e => setVoiceSettings({ ...voiceSettings, defaultVoice: e.target.value })}
                >
                  <option value="ElevenLabs - Bella (Natural English)">ElevenLabs - Bella (Natural US English - Warm & Engaging)</option>
                  <option value="OpenAI - Onyx (Executive Deep)">OpenAI - Onyx (Executive Deep - Authoritative & Crisp)</option>
                  <option value="ElevenLabs - Rachel (Friendly Recruiter)">ElevenLabs - Rachel (Friendly Recruiter - High Energy)</option>
                  <option value="OpenAI - Alloy (Neutral Tech)">OpenAI - Alloy (Neutral Tech - Fast Paced)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">AI Language & Reasoning Backbone</label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={voiceSettings.aiModel}
                  onChange={e => setVoiceSettings({ ...voiceSettings, aiModel: e.target.value })}
                >
                  <option value="GPT-4o Realtime Audio Engine">GPT-4o Realtime Audio Engine (Sub-300ms SLA)</option>
                  <option value="Claude 3.5 Sonnet + ElevenLabs">Claude 3.5 Sonnet + ElevenLabs (Highest IQ)</option>
                </select>
              </div>
            </div>

            {/* Speech rate slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Speaking Pace / Cadence</span>
                <span className="text-brand-400 font-mono">{voiceSettings.speechRate}x Normal</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.3"
                step="0.05"
                value={voiceSettings.speechRate}
                onChange={e => setVoiceSettings({ ...voiceSettings, speechRate: parseFloat(e.target.value) })}
                className="w-full accent-brand-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.8x (Measured / Deliberate)</span>
                <span>1.0x (Standard)</span>
                <span>1.3x (Energetic / Rapid)</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <label className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors">
                <div>
                  <p className="text-xs font-bold text-white">Barge-in / Human Interruption</p>
                  <p className="text-[11px] text-slate-400">AI stops speaking instantly when candidate interrupts</p>
                </div>
                <input
                  type="checkbox"
                  checked={voiceSettings.allowInterruption}
                  onChange={e => setVoiceSettings({ ...voiceSettings, allowInterruption: e.target.checked })}
                  className="w-4 h-4 rounded accent-brand-500"
                />
              </label>

              <label className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors">
                <div>
                  <p className="text-xs font-bold text-white">Ambient Noise Suppression</p>
                  <p className="text-[11px] text-slate-400">Filters traffic, typing, and background chatter</p>
                </div>
                <input
                  type="checkbox"
                  checked={voiceSettings.backgroundNoiseReduction}
                  onChange={e => setVoiceSettings({ ...voiceSettings, backgroundNoiseReduction: e.target.checked })}
                  className="w-4 h-4 rounded accent-brand-500"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === 'telephony' && (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Telephony & Voice Provider Connections</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manage SIP trunking, outbound caller ID, and webhooks</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Twilio Account SID</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 font-mono focus:border-brand-500 focus:outline-none"
                  value={telephonySettings.twilioSid}
                  onChange={e => setTelephonySettings({ ...telephonySettings, twilioSid: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Twilio Auth Token</label>
                  <input
                    type="password"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 font-mono focus:border-brand-500 focus:outline-none"
                    value={telephonySettings.twilioToken}
                    onChange={e => setTelephonySettings({ ...telephonySettings, twilioToken: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Verified Caller ID (Outbound)</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 font-mono focus:border-brand-500 focus:outline-none"
                    value={telephonySettings.callerId}
                    onChange={e => setTelephonySettings({ ...telephonySettings, callerId: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Webhook Callback URL</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 font-mono focus:border-brand-500 focus:outline-none"
                  value={telephonySettings.webhookUrl}
                  onChange={e => setTelephonySettings({ ...telephonySettings, webhookUrl: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'org' && (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Company Profile & Enterprise Workspace</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manage your agency profile, timezone, and data compliance</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Company Name</label>
                <input
                  type="text"
                  disabled
                  value={user?.company || 'Apex Talent Global'}
                  className="w-full bg-slate-950/60 border border-slate-800 text-xs text-slate-400 rounded-xl p-3 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Recruiter Admin Email</label>
                <input
                  type="text"
                  disabled
                  value={user?.email || 'sarah.jenkins@talentai.io'}
                  className="w-full bg-slate-950/60 border border-slate-800 text-xs text-slate-400 rounded-xl p-3 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-glow flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
