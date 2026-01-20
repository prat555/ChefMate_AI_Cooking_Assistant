"use client";

import { useState } from "react";
import { Shuffle, Loader2, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function SubstitutionFinder() {
  const [ingredient, setIngredient] = useState("");
  const [context, setContext] = useState("");
  const [substitutions, setSubstitutions] = useState("");
  const [loading, setLoading] = useState(false);

  const findSubstitutions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredient.trim()) return;

    setLoading(true);
    setSubstitutions("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/substitution`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredient: ingredient.trim(),
          context: context.trim() || null,
        }),
      });

      if (!response.ok) throw new Error("Failed to get substitutions");

      const data = await response.json();
      setSubstitutions(data.substitutions);
    } catch (error) {
      console.error("Error:", error);
      setSubstitutions("Sorry, I couldn't find substitutions. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    if (loading) return;
    setIngredient("");
    setContext("");
    setSubstitutions("");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      {!substitutions && (
        <div className="cm-card-inner p-5">
          <h3 className="text-base font-semibold text-slate-900 mb-1">Ingredient substitutions</h3>
          <p className="text-sm text-slate-600 mb-3">
            Get practical alternatives with ratios, taste notes, and best-use tips.
          </p>
          <span className="cm-pill">Example: eggs in baking</span>
        </div>
      )}
      
      <form onSubmit={findSubstitutions} className="space-y-4">
        {/* Ingredient Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Ingredient to Substitute
          </label>
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="e.g., eggs, butter, milk"
            className="w-full px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
            required
          />
        </div>

        {/* Context Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Recipe Context <span className="text-xs text-slate-500">(optional)</span>
          </label>
          <input
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., baking cookies, pasta sauce"
            className="w-full px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
          />
          <p className="text-xs text-slate-500 mt-1.5">
            Providing context helps generate more accurate substitution suggestions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="submit"
            disabled={loading || !ingredient.trim()}
            className="flex-1 bg-gradient-to-br from-orange-600 to-orange-700 text-white py-3 rounded-xl hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-medium text-sm shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Finding substitutions...
              </>
            ) : (
              <>
                <Shuffle className="h-5 w-5" />
                Find Substitutions
              </>
            )}
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={loading || (!ingredient && !context && !substitutions)}
            className="sm:w-40 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </button>
        </div>
      </form>

      {/* Results */}
      {substitutions && (
        <div className="cm-card-inner p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4">
            Substitution Options for {ingredient}
          </h3>
          <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-900 prose-li:text-gray-900 prose-strong:font-semibold prose-strong:text-gray-900 [&_*]:text-gray-900">
            <ReactMarkdown>{substitutions}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
