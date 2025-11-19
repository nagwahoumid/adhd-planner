interface TaskListProps {
  energyKey?: string;
}

export default function TaskList({ energyKey }: TaskListProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Your Tasks</h2>
      <div className="p-8 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          {energyKey 
            ? `Tasks for ${energyKey} energy state will appear here`
            : 'Your tasks will appear here'}
        </p>
      </div>
    </div>
  );
}

