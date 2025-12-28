import Link from 'next/link';

export default function HousePage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-50 bg-zinc-900">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl font-bold">Welcome to the House</h1>
        <p className="text-zinc-400">This is a placeholder page for the house route.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

