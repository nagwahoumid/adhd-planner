"use client";

import { useState } from 'react';

const DEFAULT_OPTIONS = [
  "Open the thing you'll be working on (tab, file, book).",
  "Set a 2–5 minute timer and promise you can stop when it rings.",
  "Write one messy sentence about what this task is.",
  "Make a 3-item mini checklist for this task.",
  "Do a 10-second tidy of the space you'll work in.",
  "Find the first question / section and just read it once.",
  "Decide what 'done for now' looks like in one sentence.",
];

interface Option {
  id: number;
  label: string;
}

export default function StartAnywhereTool() {
  const [taskName, setTaskName] = useState('');
  const [options, setOptions] = useState<Option[]>(
    DEFAULT_OPTIONS.map((label, index) => ({ id: index + 1, label }))
  );
  const [newOption, setNewOption] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lastChosenIndex, setLastChosenIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [nextId, setNextId] = useState(DEFAULT_OPTIONS.length + 1);

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, { id: nextId, label: newOption.trim() }]);
      setNewOption('');
      setNextId(nextId + 1);
    }
  };

  const handleRemoveOption = (id: number) => {
    setOptions(options.filter(opt => opt.id !== id));
    if (lastChosenIndex !== null && options.findIndex(opt => opt.id === id) === lastChosenIndex) {
      setLastChosenIndex(null);
    }
  };

  const spin = () => {
    if (options.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setLastChosenIndex(null);
    setActiveIndex(0);

    const spinDuration = 1500; // 1.5 seconds
    const spinInterval = 50; // Update every 50ms
    const startTime = Date.now();

    const spinIntervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= spinDuration) {
        // Final choice
        const finalIndex = Math.floor(Math.random() * options.length);
        setActiveIndex(finalIndex);
        setLastChosenIndex(finalIndex);
        setIsSpinning(false);
        clearInterval(spinIntervalId);
      } else {
        // Random index during spin (ensuring it changes each time)
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * options.length);
        } while (randomIndex === activeIndex && options.length > 1);
        setActiveIndex(randomIndex);
      }
    }, spinInterval);
  };

  const chosenOption = lastChosenIndex !== null ? options[lastChosenIndex] : null;

  return (
    <div className="space-y-8">
      {/* Name of The Thing */}
      <div>
        <label htmlFor="task-name" className="block text-sm font-medium text-foreground mb-2">
          Name of The Thing
        </label>
        <input
          id="task-name"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Finish ADE revision"
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:border-transparent"
        />
      </div>

      {/* Add custom option */}
      <div>
        <label htmlFor="new-option" className="block text-sm font-medium text-foreground mb-2">
          Add your own tiny starting point
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="new-option"
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddOption();
              }
            }}
            placeholder="Your custom starting point..."
            className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddOption}
            disabled={!newOption.trim()}
            className="px-6 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Add
          </button>
        </div>
      </div>

      {/* Options grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Tiny starting points</h3>
          <button
            type="button"
            onClick={spin}
            disabled={options.length === 0 || isSpinning}
            className="px-6 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            {isSpinning ? 'Spinning...' : 'Spin to choose for me'}
          </button>
        </div>

        {options.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-8">
            Add some starting points to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.map((option, index) => {
              const isActive = activeIndex === index;
              const isChosen = lastChosenIndex === index && !isSpinning;
              
              return (
                <div
                  key={option.id}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    isChosen
                      ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20'
                      : isActive
                      ? 'border-amber-400/50 bg-amber-400/5'
                      : 'border-zinc-300 dark:border-zinc-600 bg-zinc-800'
                  }`}
                >
                  <p className={`text-sm ${isChosen ? 'text-amber-300 font-medium' : 'text-foreground'}`}>
                    {option.label}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(option.id)}
                    className="absolute top-2 right-2 text-zinc-400 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
                    aria-label="Remove option"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Chosen starting point box */}
      {chosenOption && (
        <div className="rounded-lg border-2 border-amber-400 bg-amber-400/10 p-6 space-y-3">
          <h3 className="text-lg font-semibold text-amber-300">Your starting point</h3>
          <p className="text-base text-foreground">{chosenOption.label}</p>
          {taskName && (
            <p className="text-sm text-zinc-400">
              Ready to start: <span className="font-medium text-amber-300">{taskName}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

