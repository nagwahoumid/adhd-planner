import Link from 'next/link';
import { ENERGY_CONFIG } from '@/lib/energyConfig';

export default function EnergySelector() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-foreground">How are you feeling?</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Choose the energy state that matches where you are right now
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ENERGY_CONFIG.map((energy) => (
          <Link
            key={energy.key}
            href={`/energy/${energy.key}`}
            className={`block p-6 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-lg ${energy.color}`}
          >
            <div className="text-4xl mb-3">{energy.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">{energy.label}</h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{energy.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

