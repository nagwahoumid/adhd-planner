export type EnergyKey = 'stuck' | 'overwhelmed' | 'unmotivated' | 'disorganized' | 'discouraged';

export interface MiniGame {
  id: string;
  title: string;
  shortDescription: string;
}

export interface EnergyConfig {
  key: EnergyKey;
  label: string;
  color: string;
  icon: string;
  tagline: string;
  description: string;
  miniGames: MiniGame[];
}

export const ENERGY_CONFIG: EnergyConfig[] = [
  {
    key: 'stuck',
    label: 'Stuck',
    color: 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700',
    icon: '🧱',
    tagline: 'When you feel blocked or paralysed',
    description: 'You know what needs to happen, but something is holding you back. The path forward feels unclear or impossible.',
    miniGames: [
      {
        id: 'break-it-down',
        title: 'Break It Down',
        shortDescription: 'Turn one huge, scary task into tiny, doable steps.',
      },
      {
        id: 'stuck-2',
        title: 'Start Anywhere',
        shortDescription: 'Pick the easiest part and just begin',
      },
    ],
  },
  {
    key: 'overwhelmed',
    label: 'Overwhelmed',
    color: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
    icon: '🌊',
    tagline: 'When everything feels like too much',
    description: 'Your brain is flooded with tasks, thoughts, and responsibilities. It\'s hard to see where to start.',
    miniGames: [
      {
        id: 'overwhelmed-1',
        title: 'Brain Dump',
        shortDescription: 'Write everything down to clear your mind',
      },
      {
        id: 'overwhelmed-2',
        title: 'Pick One Thing',
        shortDescription: 'Choose just one small task to focus on',
      },
    ],
  },
  {
    key: 'unmotivated',
    label: 'Unmotivated',
    color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700',
    icon: '💤',
    tagline: 'When you lack the drive to begin',
    description: 'You understand what needs doing, but the spark isn\'t there. Starting feels like pushing through mud.',
    miniGames: [
      {
        id: 'unmotivated-1',
        title: 'Five Minute Rule',
        shortDescription: 'Commit to just five minutes, then decide',
      },
    ],
  },
  {
    key: 'disorganized',
    label: 'Disorganized',
    color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700',
    icon: '🌀',
    tagline: 'When chaos takes over',
    description: 'Things are scattered, plans are unclear, and structure feels out of reach. You need to bring order to the mess.',
    miniGames: [
      {
        id: 'disorganized-1',
        title: 'Quick Sort',
        shortDescription: 'Group similar items together',
      },
      {
        id: 'disorganized-2',
        title: 'Clear One Space',
        shortDescription: 'Tidy just one small area',
      },
    ],
  },
  {
    key: 'discouraged',
    label: 'Discouraged',
    color: 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600',
    icon: '☁️',
    tagline: 'When setbacks weigh you down',
    description: 'Something didn\'t go as planned, or progress feels slow. You need a gentle push to keep moving forward.',
    miniGames: [
      {
        id: 'discouraged-1',
        title: 'Celebrate Small Wins',
        shortDescription: 'Acknowledge what you\'ve already accomplished',
      },
      {
        id: 'discouraged-2',
        title: 'Reframe the Story',
        shortDescription: 'Look at the situation from a different angle',
      },
    ],
  },
];

