"use client";

import { STUCK_TOPICS, StuckTopicConfig } from '@/lib/stuckConfig';

export default function StuckTopics() {
  return (
    <div className="space-y-12">
      {STUCK_TOPICS.map((topic) => (
        <TopicSection key={topic.key} topic={topic} />
      ))}
    </div>
  );
}

interface TopicSectionProps {
  topic: StuckTopicConfig;
}

function TopicSection({ topic }: TopicSectionProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">{topic.title}</h2>
        <p className="text-lg text-amber-600 dark:text-amber-400 font-medium">{topic.subtitle}</p>
        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl">
          {topic.description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topic.games.map((game) => (
          <GameCard key={game.key} game={game} />
        ))}
      </div>
    </section>
  );
}

interface GameCardProps {
  game: { key: string; title: string; description: string };
}

function GameCard({ game }: GameCardProps) {
  return (
    <button
      className="w-full text-left p-6 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600 transition-all"
      disabled
    >
      <h3 className="text-xl font-semibold mb-2 text-foreground">{game.title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{game.description}</p>
    </button>
  );
}

