import React from "react";
import { Link } from "react-router-dom";
import { FaBolt, FaShieldHalved, FaWandMagicSparkles } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* ---- Hero Section ---- */}
      <section className="relative overflow-hidden px-6 py-24 lg:py-36">
        {/* Aurora Blobs */}
        <div className="absolute top-[-80px] left-[-60px] w-[420px] h-[420px] bg-teal-500 rounded-full blur-[160px] opacity-20 animate-pulse-glow"></div>
        <div className="absolute bottom-[-80px] right-[-60px] w-[380px] h-[380px] bg-violet-600 rounded-full blur-[160px] opacity-15 animate-pulse-glow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500 rounded-full blur-[200px] opacity-10"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="animate-fade-in-up">
            <span className="inline-block px-5 py-2 mb-8 rounded-full bg-teal-500/10 border border-teal-500/25 text-sm text-teal-400 font-medium tracking-wide">
              ⚡ AI-Powered Writing Engine
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight animate-fade-in-up-delay-1">
            Write at the
            <br />
            <span className="aurora-text">Speed of Thought</span>
          </h1>

          {/* Sub-copy */}
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up-delay-2">
            Your ideas deserve perfection. ErrorLess Write uses advanced AI to refine your grammar,
            rephrase your sentences, and unlock your best writing — instantly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
            <Link
              to="/write"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl aurora-bg text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(45,212,191,0.25)]"
            >
              <FaPencilAlt className="text-base" />
              Start Writing Free
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-semibold text-lg hover:bg-white/10 hover:border-teal-500/30 hover:text-white transition-all duration-300"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Features Section ---- */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-4 tracking-tight">
            Why Writers Choose <span className="aurora-text">ErrorLess Write</span>
          </h2>
          <p className="text-center text-slate-500 max-w-xl mx-auto mb-16 text-lg">
            Three powerful AI tools. One seamless experience.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<FaBolt />}
              color="text-teal-400"
              title="Instant Grammar Fix"
              description="Deep contextual analysis catches errors that basic checkers miss. Your writing sounds natural, polished, and professional."
              delay="animate-fade-in-up"
            />
            <FeatureCard
              icon={<FaShieldHalved />}
              color="text-emerald-400"
              title="Smart Spell Guard"
              description="Context-aware spelling intelligence that understands homophones, technical terms, and slang — so every word is right."
              delay="animate-fade-in-up-delay-1"
            />
            <FeatureCard
              icon={<FaWandMagicSparkles />}
              color="text-violet-400"
              title="AI Rephrasing"
              description="Select any sentence and get multiple AI-generated alternatives. Find the perfect tone, clarity, and impact instantly."
              delay="animate-fade-in-up-delay-2"
            />
          </div>
        </div>
      </section>

      {/* ---- Stats Strip ---- */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <StatItem number="10K+" label="Words Refined" />
          <StatItem number="3" label="AI Tools Built In" />
          <StatItem number="< 2s" label="Average Response" />
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-white/5 py-10 text-center">
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} <span className="aurora-text font-semibold">ErrorLess Write</span> — Built by{" "}
          <span className="text-teal-500 font-medium">Parth-js</span>
        </p>
      </footer>
    </div>
  );
};

/* ---- Sub-components ---- */

const FeatureCard = ({ icon, title, description, color, delay }) => (
  <div className={`group glass p-8 hover:-translate-y-2 transition-all duration-300 cursor-default ${delay}`}>
    <div className={`text-4xl mb-5 ${color} group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-[15px]">{description}</p>
  </div>
);

const StatItem = ({ number, label }) => (
  <div>
    <p className="text-3xl font-black aurora-text mb-1">{number}</p>
    <p className="text-slate-500 text-sm font-medium">{label}</p>
  </div>
);

export default Home;