"use client";

import { useState } from 'react';

type Phase = "name" | "pieces";

interface Step {
  id: number;
  text: string;
  done: boolean;
  priority: "high" | "medium" | "low";
}

export default function BreakItDownGame() {
  const [phase, setPhase] = useState<Phase>("name");
  const [thingName, setThingName] = useState('');
  const [newPiece, setNewPiece] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);

  const handleStartBreaking = () => {
    if (thingName.trim()) {
      setPhase("pieces");
    }
  };

  const handleAddPiece = () => {
    const trimmed = newPiece.trim();
    if (trimmed) {
      const maxId = steps.length > 0 ? Math.max(...steps.map(s => s.id)) : 0;
      setSteps(prevSteps => [
        ...prevSteps,
        {
          id: maxId + 1,
          text: trimmed,
          done: false,
          priority: "medium",
        },
      ]);
      setNewPiece("");
    }
  };

  const toggleStep = (id: number) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === id ? { ...step, done: !step.done } : step
      )
    );
  };

  const updatePriority = (id: number, priority: "high" | "medium" | "low") => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === id ? { ...step, priority } : step
      )
    );
  };

  const doneCount = steps.filter(step => step.done).length;
  const totalCount = steps.length;
  const progressPercentage = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  if (phase === "name") {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-foreground">Break It Down</h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Your worth is not measured in productivity. We're just making The Thing smaller.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="thing-name" className="block text-sm font-medium mb-2 text-foreground">
              Name of The Thing
            </label>
            <input
              id="thing-name"
              type="text"
              value={thingName}
              onChange={(e) => setThingName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && thingName.trim()) {
                  handleStartBreaking();
                }
              }}
              placeholder="Finish ADE revision"
              className="w-full px-4 py-2 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={handleStartBreaking}
            disabled={!thingName.trim()}
            className="w-full px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white font-medium transition-colors"
          >
            Start breaking it down
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm font-medium text-foreground">
          The Thing: {thingName}
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newPiece}
            onChange={(e) => setNewPiece(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newPiece.trim()) {
                handleAddPiece();
              }
            }}
            placeholder="Write one tiny step…"
            className="flex-1 px-4 py-2 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleAddPiece}
            disabled={!newPiece.trim()}
            className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white font-medium transition-colors"
          >
            Add piece
          </button>
        </div>

        {totalCount > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              {doneCount} of {totalCount} steps done
            </p>
            <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {steps.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/60 p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={step.done}
                  onChange={() => toggleStep(step.id)}
                  className="mt-1 w-5 h-5 rounded border-zinc-300 dark:border-zinc-600 text-amber-500 focus:ring-2 focus:ring-amber-500 cursor-pointer"
                />
                <span
                  className={`flex-1 text-foreground ${
                    step.done
                      ? 'line-through text-zinc-500 dark:text-zinc-500'
                      : ''
                  }`}
                >
                  {step.text}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updatePriority(step.id, "high")}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    step.priority === "high"
                      ? "bg-red-500 text-white"
                      : "border border-red-500 text-red-500 hover:bg-red-500/10"
                  }`}
                >
                  High
                </button>
                <button
                  onClick={() => updatePriority(step.id, "medium")}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    step.priority === "medium"
                      ? "bg-amber-500 text-white"
                      : "border border-amber-500 text-amber-500 hover:bg-amber-500/10"
                  }`}
                >
                  Med
                </button>
                <button
                  onClick={() => updatePriority(step.id, "low")}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    step.priority === "low"
                      ? "bg-emerald-500 text-white"
                      : "border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
                  }`}
                >
                  Low
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

