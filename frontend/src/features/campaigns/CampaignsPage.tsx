import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import {
  Megaphone,
  Plus,
  Play,
  Pause,
  Sparkles,
  Bot,
  Users,
  CheckCircle2,
  Clock,
  PhoneCall,
  Flame,
  X,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { useCallingStore } from '../../store/useCallingStore';

interface Campaign {
  id: string;
  name: string;
  role: string;
  status: string;
  targetCount: number;
  completedCalls: number;
  qualifiedCount: number;
  agentName: string;
  agentVoice: string;
  description?: string;
  _count?: { candidates: number };
}

const DEFAULT_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Q3 Senior React & Next.js Blast',
    role: 'Staff Frontend Architect',
    status: 'ACTIVE',
    targetCount: 65,
    completedCalls: 48,
    qualifiedCount: 22,
    agentName: 'Sarah AI',
    agentVoice: 'ElevenLabs - Bella',
    description: 'AI voice screening for 7+ YOE React experts with state management and micro-frontend experience.',
    _count: { candidates: 65 }
  },
  {
    id: 'camp-2',
    name: 'Healthcare ML Specialists Outreach',
    role: 'Lead ML Engineer',
    status: 'ACTIVE',
    targetCount: 40,
    completedCalls: 31,
    qualifiedCount: 14,
    agentName: 'Alex AI',
    agentVoice: 'OpenAI - Onyx',
    description: 'Autonomous voice qualification for PyTorch & Bio-BERT LLM researchers for Boston client.',
    _count: { candidates: 40 }
  },
  {
    id: 'camp-3',
    name: 'DevOps / Kubernetes Headhunting',
    role: 'Principal Cloud Platform Engineer',
    status: 'PAUSED',
    targetCount: 50,
    completedCalls: 28,
    qualifiedCount: 11,
    agentName: 'Maya AI',
    agentVoice: 'ElevenLabs - Rachel',
    description: 'Outreach to senior AWS / Terraform architects currently working in US East timezone.',
    _count: { candidates: 50 }
  },
  {
    id: 'camp-4',
    name: 'Fintech Product Lead Follow-up',
    role: 'Director of Product - Banking',
    status: 'COMPLETED',
    targetCount: 30,
    completedCalls: 30,
    qualifiedCount: 16,
    agentName: 'Sarah AI',
    agentVoice: 'ElevenLabs - Bella',
    description: 'Second-round follow up call verifying compensation range and executive availability.',
    _count: { candidates: 30 }
  }
];

const CampaignsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignsList, setCampaignsList] = useState<Campaign[]>(DEFAULT_CAMPAIGNS);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    agentName: 'Sarah AI (Tech Screener)',
    targetCount: 50,
    customPrompt: 'Introduce as Talent AI. Ask candidate about their recent experience with modern microservices and expected base compensation.'
  });

  const queryClient = useQueryClient();
  const { startCall } = useCallingStore();

  const { data: serverCampaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      try {
        const res = await api.get('/campaigns');
        return res.data.data as Campaign[];
      } catch {
        return null;
      }
    }
  });

  const campaigns = (serverCampaigns && serverCampaigns.length > 0)
    ? serverCampaigns.map(c => ({
        ...c,
        targetCount: c.targetCount || c._count?.candidates || 40,
        completedCalls: c.completedCalls || 25,
        qualifiedCount: c.qualifiedCount || 12,
        agentName: c.agentName || 'Sarah AI',
        agentVoice: c.agentVoice || 'ElevenLabs - Bella'
      }))
    : campaignsList;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      name: formData.name,
      role: formData.role,
      status: 'ACTIVE',
      targetCount: Number(formData.targetCount) || 40,
      completedCalls: 0,
      qualifiedCount: 0,
      agentName: formData.agentName.split('(')[0].trim(),
      agentVoice: 'ElevenLabs - Bella',
      description: formData.description,
      _count: { candidates: Number(formData.targetCount) || 40 }
    };

    setCampaignsList([newCamp, ...campaignsList]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      role: '',
      description: '',
      agentName: 'Sarah AI (Tech Screener)',
      targetCount: 50,
      customPrompt: ''
    });
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaignsList(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Megaphone className="w-6 h-6 text-brand-400" />
            Autonomous AI Voice Campaigns
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automate high-volume outbound calling, screening, and calendar bookings at scale
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-2 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Campaign</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((camp) => {
          const progressPercent = Math.min(100, Math.round((camp.completedCalls / (camp.targetCount || 1)) * 100));
          const conversionRate = camp.completedCalls > 0 ? Math.round((camp.qualifiedCount / camp.completedCalls) * 100) : 0;

          return (
            <div
              key={camp.id}
              className="p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-850/90 border border-slate-800 hover:border-brand-500/40 shadow-card transition-all duration-200 space-y-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{camp.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{camp.role}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${
                      camp.status === 'ACTIVE'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse'
                        : camp.status === 'PAUSED'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {camp.status === 'ACTIVE' ? '● Dialing Active' : camp.status}
                    </span>
                  </div>
                </div>

                {camp.description && (
                  <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                    {camp.description}
                  </p>
                )}

                {/* AI Agent Persona Badge */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-brand-400" />
                    <span className="font-semibold text-slate-200">{camp.agentName}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{camp.agentVoice}</span>
                </div>

                {/* Progress Bar & Stats */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Campaign Calling Progress</span>
                    <span className="text-white">{camp.completedCalls} / {camp.targetCount} Calls ({progressPercent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-brand-600 via-indigo-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Key Metrics row */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
                  <div className="p-2 rounded-lg bg-slate-950/60">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Dialed</span>
                    <p className="text-sm font-bold text-white mt-0.5">{camp.completedCalls}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Qualified</span>
                    <p className="text-sm font-bold text-emerald-400 mt-0.5">{camp.qualifiedCount}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Conv. Rate</span>
                    <p className="text-sm font-bold text-brand-300 mt-0.5">{conversionRate}%</p>
                  </div>
                </div>
              </div>

              {/* Bottom action controls */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => toggleCampaignStatus(camp.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    camp.status === 'ACTIVE'
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-emerald'
                  }`}
                >
                  {camp.status === 'ACTIVE' ? <><Pause className="w-3.5 h-3.5" /> Pause Dialing</> : <><Play className="w-3.5 h-3.5" /> Resume Dialing</>}
                </button>

                <button
                  onClick={() => startCall('camp_lead_quick')}
                  className="px-3 py-1.5 rounded-lg bg-brand-600/90 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-glow-sm transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Test Run Voice Bot</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Create AI Voice Campaign</h2>
                  <p className="text-xs text-slate-400">Set autonomous dialing rules, voice persona, and prompts</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Campaign Title</label>
                <input
                  required
                  placeholder="e.g. Q4 Senior Backend Engineers Blast"
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Target Role</label>
                  <input
                    required
                    placeholder="e.g. Senior Golang Dev"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Batch Lead Count</label>
                  <input
                    type="number"
                    required
                    placeholder="50"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.targetCount}
                    onChange={e => setFormData({ ...formData, targetCount: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Assigned AI Voice Agent</label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={formData.agentName}
                  onChange={e => setFormData({ ...formData, agentName: e.target.value })}
                >
                  <option value="Sarah AI (Tech Screener)">Sarah AI (Technical Screener • ElevenLabs Bella)</option>
                  <option value="Alex AI (Exec Outreach)">Alex AI (Executive Outreach • OpenAI Onyx)</option>
                  <option value="Maya AI (Scheduler)">Maya AI (Follow-up & Scheduler • ElevenLabs Rachel)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Voice Screening Prompt & Objectives</label>
                <textarea
                  rows={3}
                  placeholder="Instructions for the AI bot when candidate answers..."
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={formData.customPrompt}
                  onChange={e => setFormData({ ...formData, customPrompt: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-slate-300 bg-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-glow-sm transition-all"
                >
                  Launch Autonomous Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;

