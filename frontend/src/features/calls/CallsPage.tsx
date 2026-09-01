import React, { useState } from 'react';
import {
  PhoneCall,
  Play,
  Pause,
  Clock,
  User,
  Sparkles,
  CheckCircle2,
  FileText,
  Search,
  Filter,
  Phone,
  Bot,
  Volume2,
  VolumeX,
  X,
  Zap,
  Flame
} from 'lucide-react';
import { useCallingStore } from '../../store/useCallingStore';

interface CallRecord {
  id: string;
  candidateName: string;
  candidateRole: string;
  phone: string;
  agentName: string;
  duration: string;
  disposition: 'INTERESTED' | 'NOT_INTERESTED' | 'CALL_BACK' | 'VOICEMAIL';
  sentiment: 'High Positive' | 'Positive' | 'Neutral' | 'Hesitant';
  score: number;
  date: string;
  summary: string;
  keyInsights: string[];
  transcript: {
    speaker: 'AI Agent' | 'Candidate';
    text: string;
    time: string;
  }[];
}

const DEFAULT_CALL_LOGS: CallRecord[] = [
  {
    id: 'call-rec-1',
    candidateName: 'Alexander Wright',
    candidateRole: 'Senior React / Node Architect',
    phone: '+1 (555) 234-8901',
    agentName: 'Sarah AI',
    duration: '4m 12s',
    disposition: 'INTERESTED',
    sentiment: 'High Positive',
    score: 96,
    date: 'Today, 2:45 PM',
    summary: 'Candidate expressed strong excitement about leading micro-frontends transition. Confirmed availability to interview this Thursday.',
    keyInsights: [
      'Base salary expectation: $175k - $190k',
      'Notice period: 2 weeks',
      'Expertise: React 19, TypeScript, Server Actions, Zustand'
    ],
    transcript: [
      { speaker: 'AI Agent', time: '00:02', text: "Hello Alexander! This is Sarah from Apex Talent AI. I’m calling regarding the Staff Frontend Architect opening for TechMatrix. Do you have 3 minutes to chat?" },
      { speaker: 'Candidate', time: '00:09', text: "Hi Sarah! Yes, I was actually looking at that role on LinkedIn. I'm definitely open to hearing more." },
      { speaker: 'AI Agent', time: '00:16', text: "Fantastic! The team is migrating legacy monolithic apps to Next.js 15 and micro-frontends. How comfortable are you with distributed state and SSR performance tuning?" },
      { speaker: 'Candidate', time: '00:28', text: "I led a 9-month migration at my previous company where we reduced initial bundle size by 45% and transitioned to Zustand and Server Components." },
      { speaker: 'AI Agent', time: '00:42', text: "That is spot on. What is your expected compensation range and timeline to start?" },
      { speaker: 'Candidate', time: '00:48', text: "I am targeting $180,000 base with equity, and I have a 2-week notice period." },
      { speaker: 'AI Agent', time: '00:58', text: "Great, that aligns perfectly with the budget. I have marked you as a top match and will schedule the hiring manager technical chat for Thursday." }
    ]
  },
  {
    id: 'call-rec-2',
    candidateName: 'Elena Rostova',
    candidateRole: 'Lead Machine Learning Engineer',
    phone: '+1 (555) 394-1122',
    agentName: 'Alex AI',
    duration: '6m 45s',
    disposition: 'INTERESTED',
    sentiment: 'High Positive',
    score: 92,
    date: 'Today, 1:15 PM',
    summary: 'Elena demonstrated deep competence in LLM fine-tuning and PyTorch inference latency optimization for healthcare datasets.',
    keyInsights: [
      'Specialization: Bio-BERT, LoRA fine-tuning, Triton Server',
      'Location: Boston, MA (Open to hybrid/remote)',
      'Availability: Immediate'
    ],
    transcript: [
      { speaker: 'AI Agent', time: '00:02', text: "Good afternoon Elena, Alex from RecruitVoice AI here. Calling about the Senior ML Lead position at BioGenix Health." },
      { speaker: 'Candidate', time: '00:08', text: "Hello Alex. Yes, please tell me about the model deployment scale." },
      { speaker: 'AI Agent', time: '00:14', text: "They run real-time inference on 100k+ clinical EHR records daily using Triton and PyTorch with sub-50ms SLA." },
      { speaker: 'Candidate', time: '00:26', text: "That aligns with my recent research paper. I optimized multi-modal transformer weights using TensorRT." },
      { speaker: 'AI Agent', time: '00:39', text: "Awesome! I’ve scheduled a deep-dive call with Dr. Raymond Kim for tomorrow at 10 AM EST." }
    ]
  },
  {
    id: 'call-rec-3',
    candidateName: 'Marcus Chen',
    candidateRole: 'Senior Product Manager',
    phone: '+1 (555) 883-9021',
    agentName: 'Maya AI',
    duration: '3m 10s',
    disposition: 'CALL_BACK',
    sentiment: 'Hesitant',
    score: 78,
    date: 'Today, 11:30 AM',
    summary: 'Candidate was in a transit meeting. Requested a scheduled callback next Tuesday at 3:00 PM.',
    keyInsights: [
      'Callback booked for Tuesday 3 PM',
      'Focus: B2B payment rails and ACH APIs'
    ],
    transcript: [
      { speaker: 'AI Agent', time: '00:02', text: "Hi Marcus, Maya from RecruitVoice AI reaching out regarding HyperScale Fintech." },
      { speaker: 'Candidate', time: '00:07', text: "Hey Maya, I'm currently boarding a train. Can we reconnect early next week?" },
      { speaker: 'AI Agent', time: '00:14', text: "Absolutely Marcus! Would Tuesday at 3:00 PM work for you?" },
      { speaker: 'Candidate', time: '00:19', text: "Yes, Tuesday 3 PM is perfect. Send me a calendar invite." },
      { speaker: 'AI Agent', time: '00:25', text: "Done! Invite sent to your email. Have a great flight." }
    ]
  }
];

const CallsPage = () => {
  const [calls, setCalls] = useState<CallRecord[]>(DEFAULT_CALL_LOGS);
  const [search, setSearch] = useState('');
  const [dispositionFilter, setDispositionFilter] = useState('ALL');
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const { startCall } = useCallingStore();

  const filteredCalls = calls.filter(c => {
    const matchesSearch =
      c.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      c.candidateRole.toLowerCase().includes(search.toLowerCase()) ||
      c.agentName.toLowerCase().includes(search.toLowerCase());
    const matchesDisp = dispositionFilter === 'ALL' || c.disposition === dispositionFilter;
    return matchesSearch && matchesDisp;
  });

  const getDispositionBadge = (disp: string) => {
    switch (disp) {
      case 'INTERESTED':
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Interested • Qualified</span>;
      case 'CALL_BACK':
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">Callback Scheduled</span>;
      case 'NOT_INTERESTED':
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">Not Interested</span>;
      default:
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-slate-800 text-slate-300">Voicemail</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <PhoneCall className="w-6 h-6 text-brand-400" />
            Live Calls & Audio Intelligence
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time call recordings, speaker diarization, AI summaries, and sentiment analytics
          </p>
        </div>

        <button
          onClick={() => startCall('quick-dial')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-2 transition-all active:scale-[0.98]"
        >
          <Phone className="w-4 h-4" />
          <span>Launch Immediate AI Dial</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audio transcripts, candidate names, roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          {['ALL', 'INTERESTED', 'CALL_BACK', 'NOT_INTERESTED'].map((disp) => (
            <button
              key={disp}
              onClick={() => setDispositionFilter(disp)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dispositionFilter === disp
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {disp === 'ALL' ? 'All' : disp.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Call Records List */}
      <div className="space-y-4">
        {filteredCalls.map((call) => {
          const isPlaying = activePlayingId === call.id;

          return (
            <div
              key={call.id}
              onClick={() => setSelectedCall(call)}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850/90 border border-slate-800 hover:border-brand-500/40 shadow-card transition-all duration-200 cursor-pointer space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePlayingId(isPlaying ? null : call.id);
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isPlaying
                        ? 'bg-brand-500 text-white shadow-glow'
                        : 'bg-slate-800 text-slate-300 hover:bg-brand-600 hover:text-white'
                    }`}
                  >
                    {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{call.candidateName}</h3>
                      <span className="text-xs text-slate-400 font-mono">({call.phone})</span>
                    </div>
                    <p className="text-xs text-slate-400">{call.candidateRole} • Dialed by <span className="text-brand-300 font-semibold">{call.agentName}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  {getDispositionBadge(call.disposition)}
                  <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-brand-500/15 text-brand-300 border border-brand-500/20">
                    {call.score}% AI Match
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {call.duration}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p><strong className="text-brand-300">AI Call Insight:</strong> {call.summary}</p>
                </div>
              </div>

              {/* Simulated Audio Waveform Bar */}
              {isPlaying && (
                <div className="mt-2 p-3 rounded-xl bg-slate-950/90 border border-brand-500/30 flex items-center gap-4">
                  <span className="text-[11px] font-mono text-brand-400">01:42 / {call.duration}</span>
                  <div className="flex-1 flex items-center gap-1 h-6">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-brand-600 to-indigo-400 rounded-full"
                        style={{
                          height: `${Math.max(4, Math.sin(i * 0.4) * 20 + 8)}px`,
                          opacity: i < 14 ? 1 : 0.3
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Live Audio Stream
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Transcript & Insights Modal */}
      {selectedCall && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] flex flex-col justify-between space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {selectedCall.candidateName} • Full Audio Transcript
                  </h2>
                  <p className="text-xs text-slate-400">
                    Conducted by {selectedCall.agentName} • Duration: {selectedCall.duration}
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedCall(null)} className="p-2 rounded-xl text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Extracted Key Insights */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-bold text-brand-300 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                AI Key Takeaways & Extracted Details
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedCall.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transcript Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-72">
              {selectedCall.transcript.map((msg, idx) => {
                const isAI = msg.speaker === 'AI Agent';

                return (
                  <div key={idx} className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}>
                    {isAI && (
                      <div className="w-7 h-7 rounded-lg bg-brand-600/30 border border-brand-500/40 flex items-center justify-center flex-shrink-0 text-brand-300">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isAI
                          ? 'bg-slate-850 text-slate-200 border border-slate-800 rounded-tl-sm'
                          : 'bg-brand-600 text-white rounded-tr-sm shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-75">
                        <span className="font-bold">{msg.speaker}</span>
                        <span className="font-mono">{msg.time}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getDispositionBadge(selectedCall.disposition)}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    startCall(selectedCall.id);
                    setSelectedCall(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-glow-emerald flex items-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Redial with AI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallsPage;
