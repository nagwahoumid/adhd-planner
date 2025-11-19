"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ENERGY_CONFIG } from '@/lib/energyConfig';
import EnergyIntro from '@/components/EnergyIntro';
import MiniGameCard from '@/components/MiniGameCard';
import BreakItDownGame from '@/components/games/BreakItDownGame';

export default function EnergyStatePage() {
  const params = useParams();
  const state = params?.state as string;
  const energy = ENERGY_CONFIG.find((e) => e.key === state);
  const [selectedMiniGameId, setSelectedMiniGameId] = useState<string | null>(null);

  useEffect(() => {
    if (energy && energy.miniGames.length > 0) {
      setSelectedMiniGameId(energy.miniGames[0]?.id);
    }
  }, [energy]);

  if (!energy) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Energy state not found</h1>
          <p className="text-zinc-600 dark:text-zinc-400">The energy state "{state}" doesn't exist.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col px-4 py-16">
        <EnergyIntro energy={energy} />
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Activities to Try</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {energy.miniGames.map((miniGame) => (
            <MiniGameCard
              key={miniGame.id}
              miniGame={miniGame}
              isActive={miniGame.id === selectedMiniGameId}
              onClick={() => setSelectedMiniGameId(miniGame.id)}
            />
          ))}
        </div>

        <div className="mt-8">
          {energy.key === 'stuck' && selectedMiniGameId === 'break-it-down' ? (
            <BreakItDownGame />
          ) : (
            <div className="p-8 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-center">
              <p className="text-zinc-600 dark:text-zinc-400">
                This activity is coming soon.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

