import Link from 'next/link';
import { STUCK_TOPICS, StuckTopicConfig } from '@/lib/stuckConfig';

export default function StuckTopics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {STUCK_TOPICS.map((topic) => (
        <TopicCard key={topic.key} topic={topic} />
      ))}
    </div>
  );
}

interface TopicCardProps {
  topic: StuckTopicConfig;
}

function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      href={`/energy/stuck/${topic.key}`}
      className="block text-left rounded-2xl border-2 p-6 bg-white dark:bg-zinc-900/60 hover:border-amber-400 dark:hover:border-amber-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-700 transition-colors"
    >
      <h2 className="text-2xl font-bold mb-2 text-foreground">{topic.title}</h2>
      <p className="text-base text-amber-600 dark:text-amber-400 font-medium mb-2">{topic.subtitle}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{topic.description}</p>
    </Link>
  );
}

