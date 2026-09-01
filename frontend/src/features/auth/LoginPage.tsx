import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bot,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Zap,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, demoLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col lg:flex-row relative overflow-hidden font-sans">
      {/* Background ambient light */}
      <div className="fixed top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-600/15 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary-600/15 blur-[150px] pointer-events-none" />

      {/* Left Column: Brand Hero & Showcase */}
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
              <p className="text-xs text-slate-400 font-medium">Autonomous Voice Calling CRM</p>
            </div>
          </div>

          {/* Hero text */}
          <div className="mt-14 space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Next-Gen Autonomous Recruitment Engine
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Screen 1,000s of candidates in minutes, not weeks.
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Deploy hyper-realistic AI voice recruiters with 240ms latency. Qualify talent, schedule hiring manager interviews, and sync live transcripts automatically.
            </p>
          </div>
        </div>

        {/* Feature showcase card */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Live AI Screening Output</p>
                <p className="text-[10px] text-slate-400">Dialed 48 candidates in last 30 mins</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 font-mono">68.4% Conv. Rate</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
            <div className="p-2 rounded-lg bg-slate-950/60">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Voice Latency</p>
              <p className="text-xs font-bold text-white mt-0.5">240ms</p>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Interviews Set</p>
              <p className="text-xs font-bold text-emerald-400 mt-0.5">14 Today</p>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Time Saved</p>
              <p className="text-xs font-bold text-brand-300 mt-0.5">164 hrs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex items-center justify-center relative z-10">
        <div className="max-w-md w-full space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Sign in to your workspace</h2>
            <p className="text-xs text-slate-400 mt-1">Enter your recruiter credentials to access the AI dialer</p>
          </div>

          {/* Quick Demo Login CTA */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-950/80 to-slate-900 border border-brand-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-brand-400" />
                Instant Demo Access
              </span>
              <span className="text-[10px] text-slate-400">Preloaded candidate dataset</span>
            </div>
            <button
              onClick={handleDemoSignIn}
              type="button"
              className="w-full py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Explore as Recruiter Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-slate-800" />
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Or sign in with email</span>
            <div className="h-[1px] flex-1 bg-slate-800" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <a href="#forgot" className="text-[11px] text-brand-400 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-400">Don't have an enterprise account? </span>
            <Link to="/register" className="text-xs font-semibold text-brand-400 hover:text-brand-300">
              Register company
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

