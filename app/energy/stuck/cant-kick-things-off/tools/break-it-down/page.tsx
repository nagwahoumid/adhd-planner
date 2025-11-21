"use client";

import BreakItDownTool from "@/components/stuck/tools/BreakItDownTool";

export default function Page() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-4xl mx-auto px-4 py-10">
        <BreakItDownTool />
      </main>
    </div>
  );
}

