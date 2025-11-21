import { notFound } from 'next/navigation';
import Link from 'next/link';
import { STUCK_TOPICS, StuckTopicKey } from '@/lib/stuckConfig';

interface TopicDetailPageProps {
  params: Promise<{ topicKey: string }>;
}

export default async function TopicDetailPage({ params }: TopicDetailPageProps) {
  const { topicKey } = await params;
  const topic = STUCK_TOPICS.find(t => t.key === topicKey as StuckTopicKey);

  if (!topic) {
    notFound();
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col px-4 py-16">
        
        {/* Back link */}
        <Link
          href="/energy/stuck"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 mb-6 transition-colors"
        >
          <span>←</span>
          <span>Back to Stuck Overview</span>
        </Link>

        {/* Topic Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">{topic.title}</h1>
          <p className="text-lg text-amber-600 dark:text-amber-400 font-medium">{topic.subtitle}</p>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl">
            {topic.description}
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topic.games.map((game) => (
            <GameCard key={game.key} game={game} topicKey={topic.key} />
          ))}
        </div>
      </main>
    </div>
  );
}

interface GameCardProps {
  game: { key: string; title: string; description: string };
  topicKey: StuckTopicKey;
}

function GameCard({ game, topicKey }: GameCardProps) {
  // Music Challenge and Break It Down are only available for "Can't Kick Things Off"
  const isMusicChallenge = game.key === 'music-challenge' && topicKey === 'cant-kick-things-off';
  const isBreakItDown = game.key === 'break-it-down' && topicKey === 'cant-kick-things-off';
  
  if (isMusicChallenge) {
    return (
      <Link
        href="/energy/stuck/cant-kick-things-off/tools/music"
        className="block w-full text-left p-6 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600 transition-all"
      >
        <h3 className="text-xl font-semibold mb-2 text-foreground">{game.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{game.description}</p>
      </Link>
    );
  }

  if (isBreakItDown) {
    return (
      <Link
        href="/energy/stuck/cant-kick-things-off/tools/break-it-down"
        className="block w-full text-left p-6 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600 transition-all"
      >
        <h3 className="text-xl font-semibold mb-2 text-foreground">{game.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{game.description}</p>
      </Link>
    );
  }
  
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

