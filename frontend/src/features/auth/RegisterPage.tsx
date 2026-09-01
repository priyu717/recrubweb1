import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bot,
  Mail,
  Lock,
  Building,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col lg:flex-row relative overflow-hidden font-sans">
      {/* Glow Orbs */}
      <div className="fixed top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-600/15 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary-600/15 blur-[150px] pointer-events-none" />

      {/* Left Column: Hero */}
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative z-10 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-gradient-to-b from-slate-950/60 to-slate-900/40">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-primary-400 p-[1px] shadow-glow flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-brand-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Recruit<span className="text-brand-400">Voice</span> AI
              </span>
              <p className="text-xs text-slate-400 font-medium">Enterprise Autonomous CRM</p>
            </div>
          </div>

          <div className="mt-14 space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Start 14-Day Free Enterprise Trial
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Empower your recruitment team with AI Voice SDRs.
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Create your organization account in 30 seconds. Plug in your job requisitions and candidate lead lists to start automated voice screening today.
            </p>
          </div>
        </div>

        <div className="mt-12 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-brand-400 flex-shrink-0" />
          <p className="text-xs text-slate-400">
            SOC2 Type II & GDPR Compliant. All voice audio recordings encrypted with AES-256 at rest.
          </p>
        </div>
      </div>

      {/* Right Column: Register Form */}
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex items-center justify-center relative z-10">
        <div className="max-w-md w-full space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Register your Agency</h2>
            <p className="text-xs text-slate-400 mt-1">Set up your company workspace and team admin profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="Sarah"
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl px-3.5 py-3 focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Jenkins"
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl px-3.5 py-3 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Company / Agency Name</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="Apex Talent Global"
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="sarah@apextalent.io"
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••••••"
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow-sm transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Creating Workspace...' : 'Register Organization'}
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-400">Already registered? </span>
            <Link to="/login" className="text-xs font-semibold text-brand-400 hover:text-brand-300">
              Sign in to workspace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

