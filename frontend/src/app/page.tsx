"use client";

import { useEffect, useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import RecipeSearch from "@/components/RecipeSearch";
import SubstitutionFinder from "@/components/SubstitutionFinder";
import { ChefHat, Search, Shuffle } from "lucide-react";

type TabType = "chat" | "recipes" | "substitutions";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("chat");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("chefmate.activeTab") as TabType | null;
      if (saved === "chat" || saved === "recipes" || saved === "substitutions") {
        setActiveTab(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("chefmate.activeTab", activeTab);
    } catch {
      // ignore
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 p-2.5 shadow-sm">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div className="leading-tight">
                <h1 className="text-lg font-semibold text-slate-900">ChefMate</h1>
                <p className="text-xs text-slate-500">AI cooking assistant</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="cm-pill">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Live
              </span>
              <span className="cm-pill">Fast • Clean • Practical</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Cook smarter with what you already have.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
            Chat for cooking guidance, discover recipes from your ingredients, and get accurate substitutions with ratios.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="cm-pill">
              <ChefHat className="h-4 w-4 text-orange-600" /> Chat
            </span>
            <span className="cm-pill">
              <Search className="h-4 w-4 text-sky-600" /> Recipes
            </span>
            <span className="cm-pill">
              <Shuffle className="h-4 w-4 text-violet-600" /> Substitutions
            </span>
          </div>
        </div>

        <div className="cm-card overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-slate-200/60 bg-white/60">
            <div className="p-3">
              <nav className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-100/70 p-2">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                    activeTab === "chat"
                      ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/70"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ChefHat className="h-4 w-4" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab("recipes")}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                    activeTab === "recipes"
                      ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/70"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Search className="h-4 w-4" />
                  <span>Recipes</span>
                </button>
                <button
                  onClick={() => setActiveTab("substitutions")}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                    activeTab === "substitutions"
                      ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/70"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Shuffle className="h-4 w-4" />
                  <span>Substitutions</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {activeTab === "chat" && <ChatInterface />}
            {activeTab === "recipes" && <RecipeSearch />}
            {activeTab === "substitutions" && <SubstitutionFinder />}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span>Powered by</span>
          <span className="font-medium text-slate-700">Pydantic AI</span>
          <span>and</span>
          <span className="font-medium text-slate-700">OpenRouter</span>
        </div>
      </main>
    </div>
  );
}
