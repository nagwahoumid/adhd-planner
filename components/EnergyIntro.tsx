import { EnergyConfig } from '@/lib/energyConfig';

interface EnergyIntroProps {
  energy: EnergyConfig;
}

export default function EnergyIntro({ energy }: EnergyIntroProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-5xl">{energy.icon}</span>
        <div>
          <h1 className="text-4xl font-bold text-foreground">{energy.label}</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">{energy.tagline}</p>
        </div>
      </div>
      <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
        {energy.description}
      </p>
    </div>
  );
}

