"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = "adhd-planner-break-it-down";

type Priority = "now" | "soon" | "later";

interface Step {
  id: string;
  text: string;
  done: boolean;
  priority: Priority;
}

interface BreakItDownState {
  thingName: string;
  steps: Step[];
}

export default function BreakItDownTool() {
  const [thingName, setThingName] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [newStep, setNewStep] = useState('');
  const [justSaved, setJustSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: BreakItDownState = JSON.parse(saved);
          setThingName(parsed.thingName || '');
          setSteps(parsed.steps || []);
        }
      } catch (error) {
        // Ignore parse errors
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const state: BreakItDownState = {
          thingName,
          steps,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 1500);
      } catch (error) {
        // Ignore save errors
      }
    }
  }, [thingName, steps]);

  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      const step: Step = {
        id: generateId(),
        text: newStep.trim(),
        done: false,
        priority: 'now',
      };
      setSteps([...steps, step]);
      setNewStep('');
    }
  };


  const toggleStepDone = (id: string) => {
    setSteps(steps.map(step =>
      step.id === id ? { ...step, done: !step.done } : step
    ));
  };

  const updateStepPriority = (id: string, priority: Priority) => {
    setSteps(steps.map(step =>
      step.id === id ? { ...step, priority } : step
    ));
  };

  const moveStep = (id: string, direction: 'up' | 'down') => {
    const index = steps.findIndex(s => s.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === steps.length - 1) return;

    const newSteps = [...steps];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[swapIndex]] = [newSteps[swapIndex], newSteps[index]];
    setSteps(newSteps);
  };

  const deleteStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to reset the entire list? This cannot be undone.')) {
      setThingName('');
      setSteps([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  const handleCopy = async () => {
    let text = '';
    if (thingName) {
      text += `Thing: ${thingName}\n\n`;
    }
    steps.forEach(step => {
      const checkbox = step.done ? '[x]' : '[ ]';
      text += `- ${checkbox} ${step.text} (${step.priority})\n`;
    });

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        // Fallback: select text in a textarea
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'now':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'soon':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'later':
        return 'bg-zinc-600/20 text-zinc-400 border-zinc-600/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/energy/stuck/cant-kick-things-off"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 mb-6 transition-colors"
      >
        <span>←</span>
        <span>Back to Can't Kick Things Off tools</span>
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-2">Break It Down</h1>
        <p className="text-lg text-amber-600 dark:text-amber-400">
          Turn one huge, scary task into tiny, doable steps.
        </p>
      </div>

      {/* Main card */}
      <div className="rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 md:p-8 space-y-6">
        {/* Intro */}
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            Breaking a big task into small steps makes it feel less overwhelming. 
            Add as many tiny steps as you can think of—the smaller, the better.
          </p>
        </div>

        {/* Name of The Thing */}
        <div>
          <label htmlFor="thing-name" className="block text-sm font-medium text-foreground mb-2">
            Name of The Thing
          </label>
          <input
            id="thing-name"
            type="text"
            value={thingName}
            onChange={(e) => setThingName(e.target.value)}
            placeholder="Finish ADE revision"
            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:border-transparent"
          />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            This is the big, scary task we're going to shrink.
          </p>
        </div>

        {/* Add step input */}
        <div>
          <label htmlFor="new-step" className="block text-sm font-medium text-foreground mb-2">
            Brain dump tiny steps
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="new-step"
              type="text"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddStep();
                }
              }}
              placeholder="Open lecture notes"
              className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddStep}
              disabled={!newStep.trim()}
              className="px-6 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Add step
            </button>
          </div>
        </div>

        {/* Steps list */}
        <div className="space-y-3">
          {steps.length === 0 ? (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-8">
              Add a couple of tiny steps to get started.
            </p>
          ) : (
            steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-start gap-3 p-4 rounded-lg bg-zinc-800 border border-zinc-700"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={step.done}
                  onChange={() => toggleStepDone(step.id)}
                  id={`step-${step.id}`}
                  className="mt-1 w-5 h-5 rounded border-zinc-300 dark:border-zinc-600 text-amber-500 focus:ring-2 focus:ring-amber-500 cursor-pointer"
                />

                {/* Step text */}
                <label
                  htmlFor={`step-${step.id}`}
                  className={`flex-1 cursor-pointer ${
                    step.done
                      ? 'line-through text-zinc-500 dark:text-zinc-400'
                      : 'text-foreground'
                  }`}
                >
                  {step.text}
                </label>

                {/* Priority selector */}
                <select
                  value={step.priority}
                  onChange={(e) => updateStepPriority(step.id, e.target.value as Priority)}
                  className={`px-3 py-1.5 text-xs font-medium rounded border ${getPriorityColor(step.priority)} focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer bg-zinc-800`}
                >
                  <option value="now" className="bg-zinc-800 text-amber-400">Now</option>
                  <option value="soon" className="bg-zinc-800 text-blue-400">Soon</option>
                  <option value="later" className="bg-zinc-800 text-zinc-400">Later</option>
                </select>

                {/* Reorder buttons */}
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => moveStep(step.id, 'up')}
                    disabled={index === 0}
                    className="px-2 py-1 text-xs text-zinc-400 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveStep(step.id, 'down')}
                    disabled={index === steps.length - 1}
                    className="px-2 py-1 text-xs text-zinc-400 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => deleteStep(step.id)}
                  className="px-2 py-1 text-zinc-400 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
                  aria-label="Delete step"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Actions bar */}
        <div className="pt-4 border-t border-zinc-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {justSaved ? (
              <span className="text-amber-400">Saved ✓</span>
            ) : (
              <span>Auto-saves to this browser</span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-sm rounded-lg border border-zinc-600 text-zinc-400 hover:border-red-500 hover:text-red-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Reset list
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 text-sm rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative"
            >
              Copy steps to clipboard
              {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-amber-400 whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

