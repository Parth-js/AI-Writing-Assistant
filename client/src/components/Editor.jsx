import React, { useState } from "react";
import axios from "axios";
import {
  FaSpellCheck,
  FaSyncAlt,
  FaCheck,
  FaPencilAlt,
} from "react-icons/fa";
import { SiGrammarly } from "react-icons/si";
import { usePrivy } from "@privy-io/react-auth";

const API_BASE = "http://localhost:5000";

const Editor = () => {
  const { getAccessToken } = usePrivy();

  const [text, setText] = useState("");
  const [selectedSentence, setSelectedSentence] = useState("");
  const [rephrasedSentences, setRephrasedSentences] = useState([]);
  const [correctedSentences, setCorrectedSentences] = useState([]);
  const [spellCheckedText, setSpellCheckedText] = useState("");
  const [grammarCheckedText, setGrammarCheckedText] = useState("");
  const [loading, setLoading] = useState({
    spell: false,
    grammar: false,
    rephrase: false,
  });
  const [error, setError] = useState("");

  /* ---- Auth Helper ---- */
  const authHeader = async () => {
    try {
      const token = await getAccessToken?.();
      return token ? { Authorization: `Bearer ${token}` } : {};
    } catch {
      return {};
    }
  };

  /* ---- Handlers ---- */
  const handleTextChange = (e) => setText(e.target.value);

  const handleSentenceSelection = () => {
    const selection = window.getSelection().toString();
    if (selection) setSelectedSentence(selection);
  };

  const checkSpelling = async () => {
    if (!text.trim()) return setError("Please enter some text first.");
    setError("");
    setLoading((l) => ({ ...l, spell: true }));
    try {
      const headers = await authHeader();
      const response = await axios.post(
        `${API_BASE}/api/spellcheck`,
        { text },
        { headers }
      );
      setSpellCheckedText(response.data.correctedText || "");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Spell check failed. Is server running?");
    } finally {
      setLoading((l) => ({ ...l, spell: false }));
    }
  };

  const checkGrammar = async () => {
    if (!text.trim()) return setError("Please enter some text first.");
    setError("");
    setLoading((l) => ({ ...l, grammar: true }));
    try {
      const headers = await authHeader();
      const response = await axios.post(
        `${API_BASE}/api/grammarcheck`,
        { text },
        { headers }
      );
      setGrammarCheckedText(response.data.correctedText || "");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Grammar check failed. Is server running?");
    } finally {
      setLoading((l) => ({ ...l, grammar: false }));
    }
  };

  const rephraseSentence = async () => {
    if (!selectedSentence) return;
    setError("");
    setLoading((l) => ({ ...l, rephrase: true }));
    try {
      const headers = await authHeader();
      const response = await axios.post(
        `${API_BASE}/api/analyze`,
        { sentence: selectedSentence },
        { headers }
      );
      setRephrasedSentences(response.data.rephrasedSentences || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Rephrase failed.");
    } finally {
      setLoading((l) => ({ ...l, rephrase: false }));
    }
  };

  const addCorrectedSentence = (sentence) => {
    if (!sentence) return;
    setCorrectedSentences((prev) => [...prev, sentence]);
  };

  /* ---- Render ---- */
  return (
    <div className="min-h-screen bg-[#030712] text-white relative overflow-hidden px-4 py-10 md:px-8">
      {/* Aurora Blobs */}
      <div className="absolute top-[-80px] left-[-60px] w-[380px] h-[380px] bg-teal-500 rounded-full blur-[160px] opacity-15 animate-pulse-glow"></div>
      <div className="absolute bottom-[-80px] right-[-60px] w-[320px] h-[320px] bg-violet-600 rounded-full blur-[160px] opacity-12 animate-pulse-glow"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ======== Left Panel — Editor ======== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Writer Card */}
            <div className="glass p-6 md:p-8 shadow-2xl animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-1 aurora-text">
                ErrorLess Write Editor
              </h2>
              <p className="text-slate-500 mb-6 text-sm">
                Write your text below. Select any sentence to rephrase it.
              </p>

              <textarea
                value={text}
                onChange={handleTextChange}
                onMouseUp={handleSentenceSelection}
                placeholder="Start writing here..."
                rows={14}
                className="w-full bg-[#0a0f1a] border border-white/5 rounded-2xl p-5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/30 resize-none transition-all duration-300 text-[15px] leading-relaxed"
              />

              {/* Error */}
              {error && (
                <div className="mt-4 bg-red-500/10 border border-red-500/25 text-red-400 rounded-xl p-4 text-sm">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <ActionBtn
                  onClick={checkSpelling}
                  icon={<FaSpellCheck />}
                  disabled={loading.spell}
                  label={loading.spell ? "Checking..." : "Spell Check"}
                  accent="teal"
                />
                <ActionBtn
                  onClick={checkGrammar}
                  icon={<SiGrammarly />}
                  disabled={loading.grammar}
                  label={loading.grammar ? "Checking..." : "Grammar Check"}
                  accent="emerald"
                />
              </div>
            </div>

            {/* ---- Results ---- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResultCard
                title="Spell Checked"
                text={spellCheckedText}
                onAccept={() => addCorrectedSentence(spellCheckedText)}
                accentColor="text-teal-400"
                icon={<FaSpellCheck className="text-teal-400" />}
              />
              <ResultCard
                title="Grammar Checked"
                text={grammarCheckedText}
                onAccept={() => addCorrectedSentence(grammarCheckedText)}
                accentColor="text-emerald-400"
                icon={<SiGrammarly className="text-emerald-400" />}
              />
            </div>

            {/* ---- Selected Sentence ---- */}
            {selectedSentence && (
              <div className="glass p-6 animate-fade-in-up">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-white">
                  <FaPencilAlt className="text-violet-400" />
                  Selected Text
                </h3>
                <p className="text-slate-400 mb-5 text-sm leading-relaxed bg-white/3 rounded-xl p-4 border border-white/5">
                  "{selectedSentence}"
                </p>
                <ActionBtn
                  onClick={rephraseSentence}
                  icon={<FaSyncAlt />}
                  disabled={loading.rephrase}
                  label={loading.rephrase ? "Rephrasing..." : "Rephrase"}
                  accent="violet"
                />
              </div>
            )}

            {/* ---- Rephrased Sentences ---- */}
            {rephrasedSentences.length > 0 && (
              <div className="glass p-6 animate-fade-in-up">
                <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                  <FaSyncAlt className="text-violet-400" />
                  AI Suggestions
                </h3>
                {rephrasedSentences.map((sentence, index) => (
                  <div
                    key={index}
                    className="mb-4 pb-4 border-b border-white/5 last:border-b-0"
                  >
                    <p className="text-slate-300 mb-3 text-sm leading-relaxed">
                      {sentence}
                    </p>
                    <button
                      onClick={() => addCorrectedSentence(sentence)}
                      className="flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      <FaCheck /> Accept
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ======== Right Sidebar ======== */}
          <div>
            <div className="glass p-6 sticky top-24 shadow-2xl animate-fade-in-up-delay-1">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-white">
                <FaCheck className="text-emerald-400" />
                Approved Text
              </h3>
              <p className="text-slate-500 mb-5 text-xs">
                Accepted corrections appear here.
              </p>

              {correctedSentences.length > 0 ? (
                correctedSentences.map((sentence, index) => (
                  <div
                    key={index}
                    className="mb-3 pb-3 border-b border-white/5 last:border-b-0"
                  >
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {sentence}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-3xl text-slate-700 mb-3">📝</div>
                  <p className="text-slate-600 text-xs italic">
                    No approved text yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---- Footer ---- */}
        <footer className="border-t border-white/5 py-10 text-center mt-10">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} <span className="aurora-text font-semibold">ErrorLess Write</span> — Built by{" "}
            <span className="text-teal-500 font-medium">Parth-js</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

/* ==== Sub-components ==== */

const ActionBtn = ({ onClick, icon, disabled, label, accent }) => {
  const colorMap = {
    teal: "from-teal-600 to-teal-500 shadow-teal-500/20",
    emerald: "from-emerald-600 to-emerald-500 shadow-emerald-500/20",
    violet: "from-violet-600 to-violet-500 shadow-violet-500/20",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white text-sm bg-gradient-to-r ${colorMap[accent] || colorMap.teal} hover:scale-105 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg`}
    >
      {icon}
      {label}
    </button>
  );
};

const ResultCard = ({ title, text, onAccept, icon }) =>
  text ? (
    <div className="glass p-6 hover:border-teal-500/25 transition-all duration-300 animate-fade-in-up">
      <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-white">
        {icon}
        {title}
      </h3>
      <p className="text-slate-400 whitespace-pre-wrap mb-5 text-sm leading-relaxed">
        {text}
      </p>
      <button
        onClick={onAccept}
        className="flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
      >
        <FaCheck /> Accept Correction
      </button>
    </div>
  ) : null;

export default Editor;
