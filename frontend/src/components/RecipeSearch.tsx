"use client";

import { useState } from "react";
import { Search, Plus, X, Loader2, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function RecipeSearch() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [restrictionInput, setRestrictionInput] = useState("");
  const [recipes, setRecipes] = useState("");
  const [loading, setLoading] = useState(false);

  const addIngredient = () => {
    const raw = inputValue.trim();
    if (!raw) return;

    const parts = raw
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    const next = [...ingredients];
    for (const p of parts) {
      if (!next.includes(p)) next.push(p);
    }
    setIngredients(next);
    setInputValue("");
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const addRestriction = () => {
    if (restrictionInput.trim() && !restrictions.includes(restrictionInput.trim())) {
      setRestrictions([...restrictions, restrictionInput.trim()]);
      setRestrictionInput("");
    }
  };

  const removeRestriction = (restriction: string) => {
    setRestrictions(restrictions.filter((r) => r !== restriction));
  };

  const searchRecipes = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setRecipes("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/recipe-search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          dietary_restrictions: restrictions,
        }),
      });

      if (!response.ok) throw new Error("Failed to search recipes");

      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error:", error);
      setRecipes("Sorry, I couldn't find recipes. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    if (loading) return;
    setIngredients([]);
    setRestrictions([]);
    setInputValue("");
    setRestrictionInput("");
    setRecipes("");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      {ingredients.length === 0 && recipes === "" && (
        <div className="cm-card-inner p-5">
          <h3 className="text-base font-semibold text-slate-900 mb-1">Find recipes from ingredients</h3>
          <p className="text-sm text-slate-600 mb-3">
            Add what you have on hand and get recipe ideas with quick steps.
          </p>
          <span className="cm-pill">Example: chicken, rice, broccoli</span>
        </div>
      )}
      
      {/* Ingredients Input */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Available Ingredients
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
            placeholder="e.g., chicken, tomatoes, garlic"
            className="flex-1 px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={addIngredient}
            className="bg-gradient-to-br from-orange-600 to-orange-700 text-white px-4 py-2.5 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 text-xs text-slate-500">Tip: you can paste a comma-separated list.</div>
        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-800 px-3 py-1.5 rounded-full text-sm border border-orange-500/20"
              >
                {ingredient}
                <button onClick={() => removeIngredient(ingredient)} className="hover:bg-orange-100 rounded transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dietary Restrictions */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Dietary Restrictions <span className="text-xs text-slate-500">(optional)</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={restrictionInput}
            onChange={(e) => setRestrictionInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRestriction())}
            placeholder="e.g., vegetarian, gluten-free"
            className="flex-1 px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={addRestriction}
            className="bg-slate-200/70 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {restrictions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {restrictions.map((restriction) => (
              <span
                key={restriction}
                className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-sm border border-slate-200"
              >
                {restriction}
                <button onClick={() => removeRestriction(restriction)} className="hover:bg-gray-200 rounded transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={searchRecipes}
          disabled={loading || ingredients.length === 0}
          className="flex-1 bg-gradient-to-br from-orange-600 to-orange-700 text-white py-3 rounded-xl hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-medium text-sm shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Searching recipes...
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              Search Recipes
            </>
          )}
        </button>
        <button
          type="button"
          onClick={clearAll}
          disabled={loading || (ingredients.length === 0 && restrictions.length === 0 && recipes === "")}
          className="sm:w-40 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="h-4 w-4" />
          Clear
        </button>
      </div>

      {/* Results */}
      {recipes && (
        <div className="cm-card-inner p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4">Recipe suggestions</h3>
          <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-900 prose-li:text-gray-900 prose-strong:font-semibold prose-strong:text-gray-900 [&_*]:text-gray-900">
            <ReactMarkdown>{recipes}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
