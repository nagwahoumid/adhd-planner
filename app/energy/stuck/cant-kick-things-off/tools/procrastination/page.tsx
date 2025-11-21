"use client";

import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-4xl mx-auto px-4 py-10">
        <Link
          href="/energy/stuck/cant-kick-things-off"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 mb-6 transition-colors"
        >
          <span>←</span>
          <span>Back to Can't Kick Things Off tools</span>
        </Link>

        <div className="mb-8 space-y-3">
          <h1 className="text-4xl font-bold text-foreground">Procrastination Hit List</h1>
          <p className="text-lg text-amber-600 dark:text-amber-400">
            Identify what you're actually avoiding and why, then tackle it directly.
          </p>
        </div>

        <div className="rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 md:p-8">
          <p className="text-zinc-600 dark:text-zinc-400">
            This tool is coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}

