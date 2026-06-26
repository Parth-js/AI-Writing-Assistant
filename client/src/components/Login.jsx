import React, { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
import { FaBolt } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

function LoginPage() {
  const { login, ready, authenticated } = usePrivy();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && authenticated) {
      navigate("/write");
    }
  }, [ready, authenticated, navigate]);

  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#030712]">
        <div className="h-10 w-10 animate-spin-slow rounded-full border-2 border-teal-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#030712] relative overflow-hidden px-4">
      {/* Aurora Blobs */}
      <div className="absolute top-[-100px] left-[-80px] w-[350px] h-[350px] bg-teal-500 rounded-full blur-[160px] opacity-20 animate-pulse-glow"></div>
      <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-violet-600 rounded-full blur-[160px] opacity-15 animate-pulse-glow"></div>

      <div className="glass p-10 w-full max-w-md text-center relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl aurora-bg flex items-center justify-center shadow-xl shadow-teal-500/25">
            <FaBolt className="text-white text-2xl" />
          </div>
        </div>

        <h1 className="text-3xl font-black mb-2 aurora-text">ErrorLess Write</h1>
        <p className="text-slate-400 mb-10 text-base leading-relaxed">
          Your AI writing companion.<br />
          Sign in to start creating.
        </p>

        <button
          onClick={login}
          className="w-full aurora-bg text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-teal-500/20 mb-4 text-base"
        >
          <FaBolt className="text-sm" />
          Sign In
        </button>

        <button
          onClick={login}
          className="w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-teal-500/30 text-slate-300 hover:text-white py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 text-base"
        >
          Create Account
          <FaArrowRight className="text-teal-400 text-sm" />
        </button>

        <p className="mt-8 text-xs text-slate-600 leading-relaxed">
          New here? Click "Create Account" to set up your profile and start writing with AI assistance.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
