import TaskList from '@/components/TaskList';

export default function TasksPage() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col">
        <TaskList />
      </main>
    </div>
  );
}

