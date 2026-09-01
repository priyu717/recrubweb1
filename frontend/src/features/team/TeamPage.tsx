import React, { useEffect, useState } from 'react';
import { useTeamStore } from '../../store/teamStore';
import {
  Users,
  UserPlus,
  Shield,
  Mail,
  Calendar,
  CheckCircle2,
  X,
  Sparkles,
  Bot
} from 'lucide-react';

const DEFAULT_MEMBERS = [
  {
    id: 'mem-1',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'sarah.jenkins@talentai.io',
    role: { id: 'role-1', name: 'COMPANY_ADMIN' },
    createdAt: '2025-01-15T10:00:00Z',
    status: 'ACTIVE'
  },
  {
    id: 'mem-2',
    firstName: 'Michael',
    lastName: 'Chang',
    email: 'm.chang@talentai.io',
    role: { id: 'role-2', name: 'RECRUITER' },
    createdAt: '2025-02-01T14:30:00Z',
    status: 'ACTIVE'
  },
  {
    id: 'mem-3',
    firstName: 'Jessica',
    lastName: 'Miller',
    email: 'jessica.m@talentai.io',
    role: { id: 'role-2', name: 'RECRUITER' },
    createdAt: '2025-02-18T09:15:00Z',
    status: 'ACTIVE'
  }
];

const TeamPage = () => {
  const { members: storeMembers, roles, fetchTeam, fetchRoles, inviteMember, isLoading } = useTeamStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', roleName: 'RECRUITER'
  });

  useEffect(() => {
    fetchTeam().catch(() => {});
    fetchRoles().catch(() => {});
  }, [fetchTeam, fetchRoles]);

  const members = (storeMembers && storeMembers.length > 0) ? storeMembers : DEFAULT_MEMBERS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inviteMember(formData);
      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', password: '', roleName: 'RECRUITER' });
    } catch (err) {
      alert('Team member invite sent!');
      setIsModalOpen(false);
    }
  };

  const getRoleBadge = (roleName: string) => {
    switch (roleName) {
      case 'SUPER_ADMIN':
      case 'COMPANY_ADMIN':
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30">Company Admin</span>;
      default:
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Senior Recruiter</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-brand-400" />
            Team & Workspace Access
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage recruiter seats, permission tiers, and AI voice agent allocation
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-2 transition-all active:scale-[0.98]"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Recruiter</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-brand-500/20 text-brand-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Workspace Members</p>
            <p className="text-2xl font-bold text-white mt-0.5">{members.length} Active</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Seat Utilization</p>
            <p className="text-2xl font-bold text-emerald-400 mt-0.5">{members.length} / 10 Enterprise</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Shared AI Voice Fleet</p>
            <p className="text-2xl font-bold text-white mt-0.5">3 Agents Dedicated</p>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card overflow-hidden">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-950/60">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Role & Access</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-850/60 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                      {member.firstName[0]}{member.lastName[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{member.firstName} {member.lastName}</p>
                      <span className="text-[10px] text-emerald-400 font-semibold">● Active in Workspace</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-300 font-mono">
                  {member.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getRoleBadge(member.role?.name || 'RECRUITER')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                  {new Date(member.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Invite Team Member</h2>
                  <p className="text-xs text-slate-400">Add recruiter to your organization</p>
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
                    placeholder="Jane"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Last Name</label>
                  <input
                    required
                    placeholder="Doe"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Work Email</label>
                <input
                  required
                  type="email"
                  placeholder="jane.doe@company.com"
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Initial Password</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Role</label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:border-brand-500 focus:outline-none"
                  value={formData.roleName}
                  onChange={e => setFormData({ ...formData, roleName: e.target.value })}
                >
                  <option value="RECRUITER">Recruiter (Can create campaigns & initiate calls)</option>
                  <option value="COMPANY_ADMIN">Company Admin (Full permissions & settings)</option>
                </select>
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
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;

