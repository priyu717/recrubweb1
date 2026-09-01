import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { useCallingStore } from '../../store/useCallingStore';
import {
  Search,
  Plus,
  Phone,
  Filter,
  Sparkles,
  UserCheck,
  Mail,
  PhoneCall,
  LayoutGrid,
  List,
  MoreVertical,
  X,
  FileText,
  CheckCircle,
  Clock,
  Briefcase,
  Star,
  Zap,
  Play
} from 'lucide-react';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  skills: string[];
  status: string;
  matchScore?: number;
  experienceYears?: number;
  currentRole?: string;
  notes?: string;
}

const DEFAULT_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    firstName: 'Alexander',
    lastName: 'Wright',
    email: 'alex.wright@devmatrix.io',
    phone: '+1 (555) 234-8901',
    skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'GraphQL'],
    status: 'AI_SCREENED',
    matchScore: 96,
    experienceYears: 7,
    currentRole: 'Senior Frontend Architect',
    notes: 'Ex-Stripe engineer. Passed 1st round AI voice screening with high enthusiasm on architecture challenges.'
  },
  {
    id: 'cand-2',
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@ailabs.org',
    phone: '+1 (555) 394-1122',
    skills: ['Python', 'PyTorch', 'FastAPI', 'LLMs', 'Kubernetes'],
    status: 'INTERVIEW_SET',
    matchScore: 92,
    experienceYears: 6,
    currentRole: 'Lead Machine Learning Engineer',
    notes: 'Strong publication track record. Looking for remote US/EU roles.'
  },
  {
    id: 'cand-3',
    firstName: 'Marcus',
    lastName: 'Chen',
    email: 'marcus.chen@fintechcore.com',
    phone: '+1 (555) 883-9021',
    skills: ['Product Strategy', 'SQL', 'Agile', 'Fintech', 'Go-To-Market'],
    status: 'CALLBACK_REQUESTED',
    matchScore: 84,
    experienceYears: 5,
    currentRole: 'Senior Product Manager',
    notes: 'Requested a follow-up call next Tuesday at 3 PM to discuss equity packages.'
  },
  {
    id: 'cand-4',
    firstName: 'Sophia',
    lastName: 'Taylor',
    email: 'sophia.t@cloudmesh.dev',
    phone: '+1 (555) 431-7765',
    skills: ['AWS', 'Terraform', 'Kubernetes', 'CI/CD', 'Golang'],
    status: 'AI_SCREENED',
    matchScore: 95,
    experienceYears: 8,
    currentRole: 'Principal DevOps Architect',
    notes: 'Demonstrated deep expertise in multi-region failover and cost optimization.'
  },
  {
    id: 'cand-5',
    firstName: 'David',
    lastName: 'O’Connor',
    email: 'david.oc@scaleup.io',
    phone: '+1 (555) 771-4920',
    skills: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Microservices'],
    status: 'NEW_LEAD',
    matchScore: 88,
    experienceYears: 9,
    currentRole: 'Backend Tech Lead',
    notes: 'Recently open to new opportunities. Needs AI voice screening outreach.'
  },
  {
    id: 'cand-6',
    firstName: 'Aria',
    lastName: 'Patel',
    email: 'aria.patel@designsystem.co',
    phone: '+1 (555) 612-9843',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'User Research', 'TailwindCSS'],
    status: 'OFFER_EXTENDED',
    matchScore: 98,
    experienceYears: 6,
    currentRole: 'Lead Product Designer',
    notes: 'Awaiting offer sign-off by client hiring manager.'
  }
];

const CandidatesPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    skills: '',
    currentRole: '',
    experienceYears: 3
  });

  const queryClient = useQueryClient();
  const { startCall } = useCallingStore();

  const { data: serverCandidates, isLoading } = useQuery({
    queryKey: ['candidates', search],
    queryFn: async () => {
      try {
        const res = await api.get(`/candidates?search=${search}`);
        return res.data.data as Candidate[];
      } catch {
        return null;
      }
    }
  });

  const candidatesList: Candidate[] = (serverCandidates && serverCandidates.length > 0)
    ? serverCandidates
    : DEFAULT_CANDIDATES;

  const filteredCandidates = candidatesList.filter(c => {
    const matchesSearch =
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const createMutation = useMutation({
    mutationFn: async (newCandidate: any) => {
      const res = await api.post('/candidates', {
        ...newCandidate,
        skills: typeof newCandidate.skills === 'string' ? newCandidate.skills.split(',').map((s: string) => s.trim()) : newCandidate.skills
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', skills: '', currentRole: '', experienceYears: 3 });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AI_SCREENED':
        return <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">AI Screened</span>;
      case 'INTERVIEW_SET':
        return <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30">Interview Set</span>;
      case 'CALLBACK_REQUESTED':
        return <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">Callback Req.</span>;
      case 'OFFER_EXTENDED':
        return <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">Offer Stage</span>;
      default:
        return <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">New Lead</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-brand-400" />
            Talent Pool & Candidates
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {filteredCandidates.length} candidate profiles available for automated AI voice qualification
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Candidate</span>
          </button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidates by name, email, skills (e.g. React, PyTorch, Kubernetes)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-brand-500/80 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            {['ALL', 'AI_SCREENED', 'INTERVIEW_SET', 'CALLBACK_REQUESTED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'ALL' ? 'All' : st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Table View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCandidates.map((cand) => (
            <div
              key={cand.id}
              onClick={() => setSelectedCandidate(cand)}
              className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850/90 border border-slate-800 hover:border-brand-500/40 shadow-card transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-sm flex-shrink-0">
                      {cand.firstName[0]}{cand.lastName[0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                        {cand.firstName} {cand.lastName}
                      </h3>
                      <p className="text-xs text-slate-400 truncate max-w-[170px]">{cand.currentRole || 'Senior Engineer'}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {getStatusBadge(cand.status)}
                    {cand.matchScore && (
                      <span className="text-[10px] font-mono font-bold text-brand-300 bg-brand-500/15 px-1.5 py-0.5 rounded border border-brand-500/20">
                        {cand.matchScore}% Match
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{cand.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span>{cand.phone}</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cand.skills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                      {skill}
                    </span>
                  ))}
                  {cand.skills.length > 4 && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400">
                      +{cand.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action row */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{cand.experienceYears ?? 5} yrs exp</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startCall(cand.id);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-glow-emerald transition-all active:scale-95"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call with AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card overflow-hidden">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-950/60">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Skills & Experience</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Match / Status</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
              {filteredCandidates.map((cand) => (
                <tr
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className="hover:bg-slate-850/60 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                        {cand.firstName[0]}{cand.lastName[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{cand.firstName} {cand.lastName}</p>
                        <p className="text-[11px] text-slate-400">{cand.currentRole || 'Engineer'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                    <p>{cand.email}</p>
                    <p className="text-slate-400">{cand.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-300">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {cand.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="bg-slate-950 px-2 py-0.5 rounded text-[10px] border border-slate-800">{skill}</span>
                      ))}
                      {cand.skills.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{cand.skills.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {getStatusBadge(cand.status)}
                      {cand.matchScore && (
                        <p className="text-[10px] font-mono text-brand-300 font-bold">{cand.matchScore}% Match</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startCall(cand.id);
                      }}
                      className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white inline-flex items-center justify-center shadow-glow-emerald transition-all"
                      title="Launch AI Voice Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Candidate Detail Drawer */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex justify-end z-50 animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-base font-bold text-white">
                    {selectedCandidate.firstName[0]}{selectedCandidate.lastName[0]}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {selectedCandidate.firstName} {selectedCandidate.lastName}
                    </h2>
                    <p className="text-xs text-slate-400">{selectedCandidate.currentRole || 'Senior Engineer'}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status and Match Card */}
              <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">AI Match Score</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl font-black text-brand-400">{selectedCandidate.matchScore ?? 94}%</span>
                    <span className="text-xs text-emerald-400 font-semibold">• High Fit</span>
                  </div>
                </div>
                <div>{getStatusBadge(selectedCandidate.status)}</div>
              </div>

              {/* Contact info */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Information</h4>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-slate-200 font-mono">{selectedCandidate.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="text-slate-200 font-mono">{selectedCandidate.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Experience:</span>
                    <span className="text-slate-200 font-semibold">{selectedCandidate.experienceYears ?? 6} Years</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs font-medium rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Voice Interview Summary & Notes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  AI Voice Screening Notes
                </h4>
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {selectedCandidate.notes || 'AI voice agent completed candidate screening with high confidence.'}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button
                onClick={() => {
                  startCall(selectedCandidate.id);
                  setSelectedCandidate(null);
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-glow-emerald transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Launch AI Voice Call</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Candidate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Add New Candidate</h2>
                  <p className="text-xs text-slate-400">Enter candidate details for autonomous AI screening</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">First Name</label>
                  <input
                    required
                    placeholder="e.g. John"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Last Name</label>
                  <input
                    required
                    placeholder="e.g. Doe"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Current Role / Title</label>
                <input
                  placeholder="e.g. Senior Fullstack Engineer"
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={formData.currentRole}
                  onChange={e => setFormData({ ...formData, currentRole: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Phone Number</label>
                  <input
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Skills (Comma separated)</label>
                <input
                  required
                  placeholder="React, TypeScript, GraphQL, Node.js"
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={formData.skills}
                  onChange={e => setFormData({ ...formData, skills: e.target.value })}
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
                  disabled={createMutation.isPending}
                  className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-glow-sm disabled:opacity-50 transition-all"
                >
                  {createMutation.isPending ? 'Saving...' : 'Save & Prepare for AI Call'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage;

