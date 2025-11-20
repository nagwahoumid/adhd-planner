"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const MOTIVATIONAL_MESSAGES = [
  "Don't stop to think — just do.",
  "Momentum > Motivation.",
  "You're racing the song, not your worth.",
  "Tiny steps still count.",
  "Move with the beat.",
];

const DURATION_PRESETS = {
  song: 4 * 60, // 4 minutes
  short: 12 * 60, // 12 minutes
  long: 35 * 60, // 35 minutes
};

export default function MusicChallengeTool() {
  const [taskName, setTaskName] = useState('');
  const [durationMode, setDurationMode] = useState<"song" | "short" | "long" | "custom">("song");
  const [customMinutes, setCustomMinutes] = useState(10);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reflection, setReflection] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState<'better' | 'same' | 'worse' | null>(null);
  const [currentMessage, setCurrentMessage] = useState(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalIdRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Cycle motivational messages every 4 seconds
      messageIntervalRef.current = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % MOTIVATIONAL_MESSAGES.length);
      }, 4000);

      return () => {
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
        if (messageIntervalRef.current) {
          clearInterval(messageIntervalRef.current);
        }
      };
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
        messageIntervalRef.current = null;
      }
    }
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getTotalSeconds = () => {
    if (durationMode === 'custom') {
      return customMinutes * 60;
    }
    return DURATION_PRESETS[durationMode];
  };

  const handleStart = () => {
    const totalSeconds = getTotalSeconds();
    setTimeLeft(totalSeconds);
    initialTimeRef.current = totalSeconds;
    setIsRunning(true);
    setIsCompleted(false);
    setCurrentMessage(0);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(0);
    setReflection('');
    setSelectedFeeling(null);
    setCurrentMessage(0);
  };

  const progress = initialTimeRef.current > 0 
    ? ((initialTimeRef.current - timeLeft) / initialTimeRef.current) * 100 
    : 0;

  // Before starting
  if (!isRunning && !isCompleted) {
    return (
      <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="w-full max-w-2xl px-4 py-16">
          <Link
            href="/energy/stuck/cant-kick-things-off"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 mb-6 transition-colors"
          >
            <span>←</span>
            <span>Back to tools</span>
          </Link>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Music Challenge</h1>
              <p className="text-lg text-amber-600 dark:text-amber-400">Use music to create momentum</p>
            </div>

            <div className="space-y-4 p-6 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name The Thing
                </label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="What are you trying to do?"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Choose Duration
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <button
                    onClick={() => setDurationMode("song")}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      durationMode === "song"
                        ? "border-amber-400 bg-amber-400/10 text-foreground"
                        : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground hover:border-amber-400/50"
                    }`}
                  >
                    1 Song (~4 mins)
                  </button>
                  <button
                    onClick={() => setDurationMode("short")}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      durationMode === "short"
                        ? "border-amber-400 bg-amber-400/10 text-foreground"
                        : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground hover:border-amber-400/50"
                    }`}
                  >
                    Short Playlist (~12 mins)
                  </button>
                  <button
                    onClick={() => setDurationMode("long")}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      durationMode === "long"
                        ? "border-amber-400 bg-amber-400/10 text-foreground"
                        : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground hover:border-amber-400/50"
                    }`}
                  >
                    Long Playlist (~35 mins)
                  </button>
                </div>
                <button
                  onClick={() => setDurationMode("custom")}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all mb-3 ${
                    durationMode === "custom"
                      ? "border-amber-400 bg-amber-400/10 text-foreground"
                      : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground hover:border-amber-400/50"
                  }`}
                >
                  Custom
                </button>
                {durationMode === "custom" && (
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={customMinutes}
                      onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 1)}
                      className="w-24 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">minutes</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleStart}
                disabled={!taskName.trim()}
                className="w-full px-6 py-3 rounded-full bg-amber-400 text-black font-semibold text-lg shadow-lg hover:bg-amber-300 hover:shadow-amber-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Challenge
              </button>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 text-center">
                Start your playlist in Spotify or Apple Music manually. The timer is synced in your browser only.
              </p>

              <div className="mt-4 p-4 rounded-lg bg-amber-400/5 border border-amber-400/20">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Start your playlist in Spotify / Apple Music, then press Start Challenge. Your goal is to see how much you can get done before the timer ends.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // During active challenge
  if (isRunning && !isCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="w-full max-w-2xl px-4 py-16 text-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{taskName || "Your Task"}</h2>
              <div className="text-8xl md:text-9xl font-bold text-amber-400 mb-4 font-mono">
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="w-full max-w-md mx-auto">
              <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="min-h-[3rem] flex items-center justify-center">
              <p className="text-xl text-amber-400 font-medium">
                {MOTIVATIONAL_MESSAGES[currentMessage]}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // When completed
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-2xl px-4 py-16">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              The music stopped — you did it 🎉
            </h1>
          </div>

          <div className="space-y-4 p-6 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                What did you manage?
              </label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write about what you accomplished or what you noticed..."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                How do you feel?
              </label>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setSelectedFeeling('better')}
                  className={`text-4xl px-6 py-3 rounded-lg border-2 transition-all ${
                    selectedFeeling === 'better'
                      ? "border-amber-400 bg-amber-400/10"
                      : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 hover:border-amber-400/50"
                  }`}
                >
                  😊
                </button>
                <button
                  onClick={() => setSelectedFeeling('same')}
                  className={`text-4xl px-6 py-3 rounded-lg border-2 transition-all ${
                    selectedFeeling === 'same'
                      ? "border-amber-400 bg-amber-400/10"
                      : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 hover:border-amber-400/50"
                  }`}
                >
                  😐
                </button>
                <button
                  onClick={() => setSelectedFeeling('worse')}
                  className={`text-4xl px-6 py-3 rounded-lg border-2 transition-all ${
                    selectedFeeling === 'worse'
                      ? "border-amber-400 bg-amber-400/10"
                      : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 hover:border-amber-400/50"
                  }`}
                >
                  😞
                </button>
              </div>
              <div className="text-center mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {selectedFeeling === 'better' && 'Better'}
                {selectedFeeling === 'same' && 'Same'}
                {selectedFeeling === 'worse' && 'Worse'}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-3 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-all"
              >
                Start another round
              </button>
              <Link
                href="/energy/stuck/cant-kick-things-off"
                className="flex-1 px-6 py-3 rounded-full border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-foreground font-semibold hover:border-amber-400 transition-all text-center"
              >
                Back to tools
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

