import EnergySelector from '@/components/EnergySelector';

export default function EnergyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-16">
        <EnergySelector />
      </main>
    </div>
  );
}

