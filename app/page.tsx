import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-zinc-50">
      <main className="w-full max-w-3xl px-4 text-center space-y-10">
        <p className="text-xs tracking-[0.3em] uppercase text-amber-400">
          ADHD Based planner
        </p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight landing-fade-in">
          YOU ARE NOT A BURDEN FOR STRUGGLING
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 landing-fade-in-delayed">
          Doing 10% of something is still better than 0% of nothing
        </p>
        <p className="text-sm text-zinc-400 landing-fade-in-delayed-2">
          you're safe here
          <span className="landing-dots">
            <span className="dot dot-1" />
            <span className="dot dot-2" />
            <span className="dot dot-3" />
          </span>
        </p>
        <div className="landing-fade-in-delayed-2">
          <Link
            href="/energy"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-amber-400 text-black font-semibold text-lg shadow-lg hover:bg-amber-300 hover:shadow-amber-500/40 transition-all"
          >
            Start
          </Link>
        </div>
      </main>
    </div>
  );
}
