import { MiniGame } from '@/lib/energyConfig';

interface MiniGameCardProps {
  miniGame: MiniGame;
  isActive?: boolean;
  onClick?: () => void;
}

export default function MiniGameCard({ miniGame, isActive = false, onClick }: MiniGameCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
        isActive
          ? 'border-amber-500 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/20 shadow-md'
          : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:shadow-md'
      }`}
    >
      <h3 className="text-xl font-semibold mb-2 text-foreground">{miniGame.title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{miniGame.shortDescription}</p>
    </button>
  );
}

