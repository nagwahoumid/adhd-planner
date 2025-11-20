export type StuckTopicKey = 
  | 'cant-kick-things-off'
  | 'second-guessing-indecisive'
  | 'perfectionistic'
  | 'mentally-checked-out-distracted';

export type StuckGameKey =
  // Can't Kick Things Off
  | 'music-challenge'
  | 'break-it-down'
  | 'start-anywhere'
  | 'the-5-second-rule'
  | 'procrastination-hit-list'
  // Second-Guessing / Indecisive
  | 'dice-roll'
  | 'coin-spin'
  | 'pros-cons-list'
  // Perfectionistic
  | 'speed-run'
  | 'half-ass-it'
  | 'timer-challenge'
  // Mentally Checked Out / Distracted
  | 'ideal-working-conditions'
  | 'dream-workstation'
  | 'idea-car-park';

export interface StuckGameConfig {
  key: StuckGameKey;
  title: string;
  description: string;
}

export interface StuckTopicConfig {
  key: StuckTopicKey;
  title: string;
  subtitle: string;
  description: string;
  games: StuckGameConfig[];
}

export const STUCK_TOPICS: StuckTopicConfig[] = [
  {
    key: 'cant-kick-things-off',
    title: "Can't Kick Things Off",
    subtitle: 'When starting feels impossible',
    description: 'You know what needs to be done, but taking that first step feels overwhelming. These tools help you break through the initial barrier.',
    games: [
      {
        key: 'music-challenge',
        title: 'Music Challenge',
        description: 'Use music to create momentum and shift your energy state before diving into the task.',
      },
      {
        key: 'break-it-down',
        title: 'Break It Down',
        description: 'Turn one huge, scary task into tiny, doable steps.',
      },
      {
        key: 'start-anywhere',
        title: 'Start Anywhere',
        description: 'Pick the easiest part and just begin. No need to start at the beginning.',
      },
      {
        key: 'the-5-second-rule',
        title: 'The 5 Second Rule',
        description: 'Count down from 5 and take immediate action before your brain talks you out of it.',
      },
      {
        key: 'procrastination-hit-list',
        title: 'Procrastination Hit List',
        description: 'Identify what you\'re actually avoiding and why, then tackle it directly.',
      },
    ],
  },
  {
    key: 'second-guessing-indecisive',
    title: 'Second Guessing and Indecisive',
    subtitle: 'When choices paralyze you',
    description: 'Too many options or fear of making the wrong choice keeps you stuck. These tools help you move forward with confidence.',
    games: [
      {
        key: 'dice-roll',
        title: 'Dice Roll',
        description: 'Let chance decide when you\'re stuck between multiple valid options.',
      },
      {
        key: 'coin-spin',
        title: 'Coin Spin',
        description: 'Flip a coin to make a decision. Notice your reaction—that tells you what you really want.',
      },
      {
        key: 'pros-cons-list',
        title: 'Pros & Cons List',
        description: 'Write out the advantages and disadvantages to clarify your thinking and reduce analysis paralysis.',
      },
    ],
  },
  {
    key: 'perfectionistic',
    title: 'Perfectionistic',
    subtitle: 'When "good enough" feels wrong',
    description: 'The pursuit of perfection prevents you from finishing or even starting. These tools help you embrace progress over perfection.',
    games: [
      {
        key: 'speed-run',
        title: 'Speed Run',
        description: 'Complete the task as quickly as possible with intentional imperfection. Done is better than perfect.',
      },
      {
        key: 'half-ass-it',
        title: 'Half-Ass It',
        description: 'Give yourself permission to do the bare minimum. You can always improve it later.',
      },
      {
        key: 'timer-challenge',
        title: 'Timer Challenge',
        description: 'Set a timer and commit to working only for that duration. Time constraints reduce perfectionism.',
      },
    ],
  },
  {
    key: 'mentally-checked-out-distracted',
    title: 'Mentally Checked Out and Distracted',
    subtitle: 'When focus feels impossible',
    description: 'Your mind is everywhere except the task at hand. These tools help you create the right conditions for concentration.',
    games: [
      {
        key: 'ideal-working-conditions',
        title: 'Ideal Working Conditions',
        description: 'Identify and set up the environmental factors that help you focus best.',
      },
      {
        key: 'dream-workstation',
        title: 'Dream Workstation',
        description: 'Design your ideal workspace setup, even if you can\'t implement it all right now.',
      },
      {
        key: 'idea-car-park',
        title: 'Idea Car Park',
        description: 'Capture distracting thoughts and ideas so you can return to them later without losing them.',
      },
    ],
  },
];

