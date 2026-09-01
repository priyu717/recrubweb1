import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  Users,
  Briefcase,
  DollarSign,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  X,
  Layers
} from 'lucide-react';
import { useCallingStore } from '../../store/useCallingStore';

interface ClientAccount {
  id: string;
  name: string;
  industry: string;
  location: string;
  stage: 'KEY_ACCOUNT' | 'ACTIVE' | 'NEGOTIATION' | 'PROSPECT';
  openPositions: number;
  contractValue: string;
  contactPerson: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  recentActivity: string;
  tags: string[];
}

const DEFAULT_CLIENTS: ClientAccount[] = [
  {
    id: 'client-1',
    name: 'TechMatrix Global',
    industry: 'Enterprise SaaS & Cloud',
    location: 'San Francisco, CA',
    stage: 'KEY_ACCOUNT',
    openPositions: 8,
    contractValue: '$180,000 / yr',
    contactPerson: {
      name: 'Victoria Vance',
      role: 'VP of Talent Acquisition',
      email: 'victoria.vance@techmatrix.io',
      phone: '+1 (555) 782-9011'
    },
    recentActivity: 'AI Calling bot screened 14 React leads yesterday. 6 sent for hiring manager review.',
    tags: ['Retainer', 'Priority', 'Frontend & AI']
  },
  {
    id: 'client-2',
    name: 'BioGenix Health',
    industry: 'HealthTech & Biotech',
    location: 'Boston, MA',
    stage: 'ACTIVE',
    openPositions: 5,
    contractValue: '$125,000 / yr',
    contactPerson: {
      name: 'Dr. Raymond Kim',
      role: 'Head of Engineering',
      email: 'r.kim@biogenix.health',
      phone: '+1 (555) 902-3341'
    },
    recentActivity: 'Campaign "Q3 ML Bio-Engineers" actively dialing candidate pool.',
    tags: ['Bioinformatics', 'Python', 'Healthcare']
  },
  {
    id: 'client-3',
    name: 'HyperScale Fintech',
    industry: 'Crypto & Digital Banking',
    location: 'New York, NY',
    stage: 'NEGOTIATION',
    openPositions: 12,
    contractValue: '$240,000 / yr',
    contactPerson: {
      name: 'Samantha Reed',
      role: 'Chief People Officer',
      email: 'samantha@hyperscalefin.com',
      phone: '+1 (555) 441-8900'
    },
    recentActivity: 'Contract MSA submitted for legal review. Expected close next Monday.',
    tags: ['Fintech', 'Golang', 'High Volume']
  },
  {
    id: 'client-4',
    name: 'Nexis Autonomous Systems',
    industry: 'Robotics & AI Hardware',
    location: 'Austin, TX',
    stage: 'ACTIVE',
    openPositions: 4,
    contractValue: '$95,000 / yr',
    contactPerson: {
      name: 'Jason Alvarez',
      role: 'Director of HR',
      email: 'j.alvarez@nexisauto.ai',
      phone: '+1 (555) 312-7640'
    },
    recentActivity: 'Autonomous call scheduler booked 3 senior interviews for this Thursday.',
    tags: ['Embedded', 'C++', 'Robotics']
  }
];

const ClientsPage = () => {
  const [clients, setClients] = useState<ClientAccount[]>(DEFAULT_CLIENTS);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientAccount | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    industry: 'Enterprise Software',
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactRole: '',
    contractValue: '$100,000 / yr',
    openPositions: 3
  });

  const { startCall } = useCallingStore();

  const filteredClients = clients.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.name.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter === 'ALL' || c.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: ClientAccount = {
      id: `client-${Date.now()}`,
      name: formData.name,
      industry: formData.industry,
      location: formData.location || 'Remote, US',
      stage: 'PROSPECT',
      openPositions: Number(formData.openPositions) || 1,
      contractValue: formData.contractValue,
      contactPerson: {
        name: formData.contactName,
        role: formData.contactRole || 'Hiring Manager',
        email: formData.contactEmail,
        phone: formData.contactPhone
      },
      recentActivity: 'Client account created. Ready for automated hiring campaign.',
      tags: ['New Account']
    };

    setClients([newClient, ...clients]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      industry: 'Enterprise Software',
      location: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      contactRole: '',
      contractValue: '$100,000 / yr',
      openPositions: 3
    });
  };

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'KEY_ACCOUNT':
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">Key Enterprise Account</span>;
      case 'ACTIVE':
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Active Hiring</span>;
      case 'NEGOTIATION':
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">Contract Negotiation</span>;
      default:
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700">Prospect</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-brand-400" />
            Corporate Clients & Requisitions
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage hiring partner accounts, open job orders, and autonomous outreach campaigns
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Corporate Client</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-brand-500/20 text-brand-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Partner Accounts</p>
            <p className="text-2xl font-bold text-white mt-0.5">{clients.length}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Open Requisitions</p>
            <p className="text-2xl font-bold text-emerald-400 mt-0.5">
              {clients.reduce((acc, c) => acc + c.openPositions, 0)} Roles
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Active Contract Value</p>
            <p className="text-2xl font-bold text-white mt-0.5">$640,000 / yr</p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients, industries, contact persons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          {['ALL', 'KEY_ACCOUNT', 'ACTIVE', 'NEGOTIATION'].map((st) => (
            <button
              key={st}
              onClick={() => setStageFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                stageFilter === st
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st === 'ALL' ? 'All' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => setSelectedClient(client)}
            className="p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-850/90 border border-slate-800 hover:border-brand-500/40 shadow-card transition-all duration-200 cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{client.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400">{client.industry} • {client.location}</p>
                </div>
                <div>{getStageBadge(client.stage)}</div>
              </div>

              {/* Positions & Value metrics */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Open Requisitions</span>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{client.openPositions} Active Openings</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Annual Contract</span>
                  <p className="text-sm font-bold text-white mt-0.5">{client.contractValue}</p>
                </div>
              </div>

              {/* Contact person */}
              <div className="mt-3 p-3 rounded-xl bg-slate-850/90 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-200">{client.contactPerson.name}</p>
                  <p className="text-[11px] text-slate-400">{client.contactPerson.role}</p>
                </div>
                <span className="font-mono text-[11px] text-slate-400">{client.contactPerson.phone}</span>
              </div>

              {/* Recent Activity Quote */}
              <div className="mt-3 p-2.5 rounded-lg bg-slate-950/90 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">{client.recentActivity}</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {client.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startCall(client.id);
                }}
                className="px-3 py-1.5 rounded-lg bg-brand-600/90 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-glow-sm transition-all"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call Client Lead</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Add Corporate Client</h2>
                  <p className="text-xs text-slate-400">Set up new hiring partner organization</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Company Name</label>
                <input
                  required
                  placeholder="e.g. Acme Cloud Corp"
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Industry</label>
                  <input
                    required
                    placeholder="e.g. Fintech / SaaS"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">HQ Location</label>
                  <input
                    placeholder="e.g. New York, NY"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Contact Person Name</label>
                  <input
                    required
                    placeholder="e.g. Sarah Connor"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.contactName}
                    onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Contact Role</label>
                  <input
                    placeholder="e.g. VP Talent"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.contactRole}
                    onChange={e => setFormData({ ...formData, contactRole: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Contact Email</label>
                  <input
                    required
                    type="email"
                    placeholder="contact@company.com"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.contactEmail}
                    onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Contact Phone</label>
                  <input
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.contactPhone}
                    onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>
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
                  Create Client Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
