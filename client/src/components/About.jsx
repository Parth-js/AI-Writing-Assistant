import React from "react";
import { Link } from "react-router-dom";
import {
  FaBolt,
  FaShieldHalved,
  FaWandMagicSparkles,
  FaLightbulb,
} from "react-icons/fa6";

const About = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-white px-6 py-24 relative overflow-hidden">
      {/* Aurora Blobs */}
      <div className="absolute top-[-80px] left-[-60px] w-[400px] h-[400px] bg-teal-500 rounded-full blur-[160px] opacity-20 animate-pulse-glow"></div>
      <div className="absolute bottom-[-80px] right-[-60px] w-[350px] h-[350px] bg-violet-600 rounded-full blur-[160px] opacity-15 animate-pulse-glow"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ---- Header ---- */}
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="inline-block px-5 py-2 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-400 text-sm font-medium tracking-wide mb-6">
            About ErrorLess Write
          </span>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Your Ideas.{" "}
            <span className="aurora-text">Perfectly Expressed.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
            ErrorLess Write is an AI writing companion designed to help students,
            creators, and professionals communicate with confidence and clarity.
          </p>
        </div>

        {/* ---- Story Section ---- */}
        <div className="glass p-8 md:p-12 mb-20 animate-fade-in-up-delay-1">
          <h2 className="text-2xl font-bold mb-5 text-white">
            Why We Built This
          </h2>

          <p className="text-slate-400 leading-8 mb-5">
            Great writing isn't about knowing every grammar rule — it's about
            expressing ideas clearly and powerfully. We built ErrorLess Write because
            we believe AI should amplify human creativity, not replace it.
          </p>

          <p className="text-slate-400 leading-8">
            Whether you're drafting a college essay, a client email, a blog
            post, or a creative piece — ErrorLess Write gives you instant,
            intelligent feedback so you can focus on what matters: your ideas.
          </p>
        </div>

        {/* ---- Bento Grid Features ---- */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14 tracking-tight">
            What <span className="aurora-text">ErrorLess Write</span> Can Do
          </h2>

          {/* Bento Grid — asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Large Card */}
            <div className="glass p-8 md:row-span-2 flex flex-col justify-between animate-fade-in-up">
              <div>
                <div className="text-4xl text-teal-400 mb-5">
                  <FaBolt />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Instant Grammar Analysis
                </h3>
                <p className="text-slate-400 leading-relaxed text-[15px]">
                  Our AI engine doesn't just flag errors — it understands the
                  context of your writing. Get highly accurate corrections that
                  preserve your voice while fixing complex grammatical issues
                  that basic tools miss entirely.
                </p>
              </div>
              <div className="mt-8 h-1 w-16 rounded-full aurora-bg opacity-60"></div>
            </div>

            {/* Top Right */}
            <div className="glass p-8 animate-fade-in-up-delay-1">
              <div className="text-3xl text-emerald-400 mb-4">
                <FaShieldHalved />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                Context-Aware Spelling
              </h3>
              <p className="text-slate-400 leading-relaxed text-[15px]">
                Goes far beyond dictionary lookups. Detects homophones,
                technical jargon, and contextual misspellings with deep
                understanding.
              </p>
            </div>

            {/* Bottom Right */}
            <div className="glass p-8 animate-fade-in-up-delay-2">
              <div className="text-3xl text-violet-400 mb-4">
                <FaWandMagicSparkles />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                AI Sentence Rephrasing
              </h3>
              <p className="text-slate-400 leading-relaxed text-[15px]">
                Highlight any sentence, click rephrase, and get multiple
                polished alternatives tailored to your tone and intent.
              </p>
            </div>

            {/* Full Width Bottom */}
            <div className="glass p-8 md:col-span-2 animate-fade-in-up-delay-3">
              <div className="flex items-start gap-5">
                <div className="text-3xl text-amber-400 mt-1">
                  <FaLightbulb />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    Built for Real Writers
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-[15px]">
                    From students to professionals — ErrorLess Write is designed to be
                    your everyday writing partner. Simple enough for quick edits,
                    powerful enough for long-form content. No fluff, just great
                    writing tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- CTA ---- */}
        <div className="aurora-bg rounded-3xl p-10 md:p-16 text-center shadow-2xl shadow-teal-500/10 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
            Ready to Write Better?
          </h2>

          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Join writers who use ErrorLess Write to transform rough drafts into
            polished, professional content — in seconds.
          </p>

          <Link
            to="/write"
            className="inline-block bg-white text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Writing Now →
          </Link>
        </div>

        {/* ---- Footer ---- */}
        <footer className="border-t border-white/5 py-10 text-center mt-20">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} <span className="aurora-text font-semibold">ErrorLess Write</span> — Built by{" "}
            <span className="text-teal-500 font-medium">Parth-js</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;