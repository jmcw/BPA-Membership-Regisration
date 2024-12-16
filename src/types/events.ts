export interface TrialEvent {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedDuration: string;
  minPlayers: number;
  maxPlayers: number;
}

// Define categories first
export const EVENT_CATEGORIES = [
  'Thematic',
'Family',
'Dice',
'Strategy',
'Card Game',
'Abstract',
'Deck-Building',
'Party',
'Cooperative',
'Push-Your-Luck',
'Engine-Building',
] as const;

export type EventCategory = typeof EVENT_CATEGORIES[number];

export const TRIAL_EVENTS: TrialEvent[] = [
   {
    id: 'cascadia',
    name: 'Cascadia',
    description: 'Build a diverse ecosystem in the Pacific Northwest',
    category: 'Strategy',
    estimatedDuration: '30-45 minutes',
    minPlayers: 1,
    maxPlayers: 4
  },
  {
    id: 'wingspan',
    name: 'Wingspan',
    description: 'A card-driven engine-building game about birds',
    category: 'Strategy',
    estimatedDuration: '40-70 minutes',
    minPlayers: 1,
    maxPlayers: 5
  },
  {
    id: 'terraforming_mars',
    name: 'Terraforming Mars',
    description: 'Compete to make Mars habitable and build your corporation',
    category: 'Strategy',
    estimatedDuration: '120-150 minutes',
    minPlayers: 1,
    maxPlayers: 5
  },
  {
    id: 'azul',
    name: 'Azul',
    description: 'Draft tiles to create beautiful patterns',
    category: 'Abstract',
    estimatedDuration: '30-45 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'catan',
    name: 'Catan',
    description: 'Build settlements, trade resources, and compete for points',
    category: 'Strategy',
    estimatedDuration: '60-120 minutes',
    minPlayers: 3,
    maxPlayers: 4
  },
  {
    id: 'splendor',
    name: 'Splendor',
    description: 'Collect gems and build your trade empire',
    category: 'Strategy',
    estimatedDuration: '30 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'carcassonne',
    name: 'Carcassonne',
    description: 'Place tiles to build cities and roads in medieval France',
    category: 'Strategy',
    estimatedDuration: '35-45 minutes',
    minPlayers: 2,
    maxPlayers: 5
  },
  {
    id: 'ticket_to_ride',
    name: 'Ticket to Ride',
    description: 'Build train routes across a map of North America',
    category: 'Family',
    estimatedDuration: '45-60 minutes',
    minPlayers: 2,
    maxPlayers: 5
  },
  {
    id: 'dominion',
    name: 'Dominion',
    description: 'Build your deck to outmaneuver opponents',
    category: 'Deck-Building',
    estimatedDuration: '30 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'pandemic',
    name: 'Pandemic',
    description: 'Work together to stop global outbreaks',
    category: 'Cooperative',
    estimatedDuration: '45 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'root',
    name: 'Root',
    description: 'An asymmetric game of woodland warfare',
    category: 'Strategy',
    estimatedDuration: '60-90 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'gloomhaven',
    name: 'Gloomhaven',
    description: 'An epic cooperative dungeon-crawler',
    category: 'Cooperative',
    estimatedDuration: '60-120 minutes',
    minPlayers: 1,
    maxPlayers: 4
  },
  {
    id: 'spirit_island',
    name: 'Spirit Island',
    description: 'Defend your island from colonial invaders',
    category: 'Cooperative',
    estimatedDuration: '90-120 minutes',
    minPlayers: 1,
    maxPlayers: 4
  },
  {
    id: '7_wonders',
    name: '7 Wonders',
    description: 'Draft cards to build an ancient civilization',
    category: 'Strategy',
    estimatedDuration: '30 minutes',
    minPlayers: 2,
    maxPlayers: 7
  },
  {
    id: 'code_names',
    name: 'Codenames',
    description: 'Give clues to your teammates to guess words',
    category: 'Party',
    estimatedDuration: '15-30 minutes',
    minPlayers: 4,
    maxPlayers: 8
  },
  {
    id: 'dixit',
    name: 'Dixit',
    description: 'A storytelling game with beautiful illustrations',
    category: 'Party',
    estimatedDuration: '30 minutes',
    minPlayers: 3,
    maxPlayers: 6
  },
  {
    id: 'scythe',
    name: 'Scythe',
    description: 'Compete for resources and control in an alternate history',
    category: 'Strategy',
    estimatedDuration: '90-115 minutes',
    minPlayers: 1,
    maxPlayers: 5
  },
  {
    id: 'betrayal_at_house_on_the_hill',
    name: 'Betrayal at House on the Hill',
    description: 'Explore a haunted house where one player becomes a traitor',
    category: 'Thematic',
    estimatedDuration: '60 minutes',
    minPlayers: 3,
    maxPlayers: 6
  },
  {
    id: 'great_western_trail',
    name: 'Great Western Trail',
    description: 'Manage cattle and deliver them to Kansas City',
    category: 'Strategy',
    estimatedDuration: '75-150 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'kingdomino',
    name: 'Kingdomino',
    description: 'Build a kingdom by matching tiles',
    category: 'Family',
    estimatedDuration: '15-20 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'small_world',
    name: 'Small World',
    description: 'Compete for control of a world too small to share',
    category: 'Strategy',
    estimatedDuration: '40-80 minutes',
    minPlayers: 2,
    maxPlayers: 5
  },
  {
    id: 'the_crew',
    name: 'The Crew',
    description: 'A cooperative trick-taking game set in space',
    category: 'Cooperative',
    estimatedDuration: '20 minutes',
    minPlayers: 2,
    maxPlayers: 5
  },
  {
    id: 'quacks_of_quedlinburg',
    name: 'The Quacks of Quedlinburg',
    description: 'Create potions by drawing ingredients from a bag',
    category: 'Push-Your-Luck',
    estimatedDuration: '45 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'clank',
    name: 'Clank!',
    description: 'Sneak through a dungeon to steal treasure without alerting the dragon',
    category: 'Deck-Building',
    estimatedDuration: '60 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    description: 'Trade and collect goods in this 2-player game',
    category: 'Card Game',
    estimatedDuration: '30 minutes',
    minPlayers: 2,
    maxPlayers: 2
  },
  {
    id: 'everdell',
    name: 'Everdell',
    description: 'Build a woodland city in a charming valley',
    category: 'Strategy',
    estimatedDuration: '40-80 minutes',
    minPlayers: 1,
    maxPlayers: 4
  },
  {
    id: 'parks',
    name: 'PARKS',
    description: 'Hike trails and visit National Parks',
    category: 'Strategy',
    estimatedDuration: '30-60 minutes',
    minPlayers: 1,
    maxPlayers: 5
  },
  {
    id: 'lost_ruins_of_arnak',
    name: 'Lost Ruins of Arnak',
    description: 'Explore ruins and discover artifacts in this adventure game',
    category: 'Strategy',
    estimatedDuration: '90 minutes',
    minPlayers: 1,
    maxPlayers: 4
  },
  {
    id: 'mystic_vale',
    name: 'Mystic Vale',
    description: 'Card crafting and deck-building with a nature theme',
    category: 'Deck-Building',
    estimatedDuration: '45 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'isle_of_cats',
    name: 'The Isle of Cats',
    description: 'Rescue cats and fit them into your boat',
    category: 'Strategy',
    estimatedDuration: '60-90 minutes',
    minPlayers: 1,
    maxPlayers: 4
  },
  {
    id: 'zombicide',
    name: 'Zombicide',
    description: 'Survive a zombie apocalypse in this cooperative game',
    category: 'Cooperative',
    estimatedDuration: '60 minutes',
    minPlayers: 1,
    maxPlayers: 6
  },
  {
    id: 'horrified',
    name: 'Horrified',
    description: 'Work together to defeat classic movie monsters',
    category: 'Cooperative',
    estimatedDuration: '45-60 minutes',
    minPlayers: 1,
    maxPlayers: 5
  },
  {
    id: 'gizmos',
    name: 'Gizmos',
    description: 'Build a machine to earn energy points',
    category: 'Engine-Building',
    estimatedDuration: '40-50 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'patchwork',
    name: 'Patchwork',
    description: 'Compete to build the best quilt in this 2-player game',
    category: 'Abstract',
    estimatedDuration: '30 minutes',
    minPlayers: 2,
    maxPlayers: 2
  },
  {
    id: 'viticulture',
    name: 'Viticulture',
    description: 'Run a vineyard and produce fine wine',
    category: 'Strategy',
    estimatedDuration: '45-90 minutes',
    minPlayers: 1,
    maxPlayers: 6
  },
  {
    id: 'brass_birmingham',
    name: 'Brass: Birmingham',
    description: 'Build industries and trade in the Industrial Revolution',
    category: 'Strategy',
    estimatedDuration: '60-120 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'dune_imperium',
    name: 'Dune: Imperium',
    description: 'Combine deck-building and worker placement in the Dune universe',
    category: 'Strategy',
    estimatedDuration: '60-120 minutes',
    minPlayers: 1,
    maxPlayers: 4
  },
  {
    id: 'blood_rage',
    name: 'Blood Rage',
    description: 'Compete for glory in the Norse apocalypse',
    category: 'Strategy',
    estimatedDuration: '60-90 minutes',
    minPlayers: 2,
    maxPlayers: 4
  },
  {
    id: 'castle_of_mad_king_ludwig',
    name: 'The Castles of Mad King Ludwig',
    description: 'Build the wackiest castle for the King',
    category: 'Strategy',
    estimatedDuration: '60-90 minutes',
    minPlayers: 1,
    maxPlayers: 4
  },
  {
    id: 'meeple_circus',
    name: 'Meeple Circus',
    description: 'Stack meeples to create a fun circus performance',
    category: 'Party',
    estimatedDuration: '45 minutes',
    minPlayers: 2,
    maxPlayers: 5
  },
  {
    id: 'ghost_stories',
    name: 'Ghost Stories',
    description: 'Defend your village from a ghostly invasion',
    category: 'Cooperative',
    estimatedDuration: '60 minutes',
    minPlayers: 1,
    maxPlayers: 4
  },
  {
    id: 'rolling_realms',
    name: 'Rolling Realms',
    description: 'A roll-and-write game set in the Stonemaier universe',
    category: 'Dice',
    estimatedDuration: '30-45 minutes',
    minPlayers: 1,
    maxPlayers: 6
  },
  {
    id: 'architects_of_west_kingdom',
    name: 'Architects of the West Kingdom',
    description: 'Build and maintain a kingdom in medieval Europe',
    category: 'Strategy',
    estimatedDuration: '60-80 minutes',
    minPlayers: 1,
    maxPlayers: 5
  },
  {
    id: 'decrypto',
    name: 'Decrypto',
    description: 'Send coded messages to your team without letting opponents intercept',
    category: 'Party',
    estimatedDuration: '15-30 minutes',
    minPlayers: 3,
    maxPlayers: 8
  },
  {
    id: 'terraforming_mars_ares',
    name: 'Terraforming Mars: Ares Expedition',
    description: 'A streamlined version of Terraforming Mars',
    category: 'Strategy',
    estimatedDuration: '45-90 minutes',
    minPlayers: 1,
    maxPlayers: 4
  },
  {
    id: 'coup',
    name: 'Coup',
    description: 'A bluffing game of deduction and power',
    category: 'Party',
    estimatedDuration: '15 minutes',
    minPlayers: 2,
    maxPlayers: 6
  },
  {
    id: 'just_one',
    name: 'Just One',
    description: 'A cooperative party word game',
    category: 'Party',
    estimatedDuration: '20 minutes',
    minPlayers: 3,
    maxPlayers: 7
  }
];