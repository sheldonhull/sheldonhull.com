/**
 * Level-Up Page Data Structure
 *
 * This file contains all achievements, stats, and level data for the RPG life stats page.
 * Update this file to add new achievements or modify existing ones.
 */

export interface AttributeMod {
  name: string;
  value: number;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
  iconStyle: 'solid' | 'brands' | 'regular';
  xp: number;
  attributes: AttributeMod[];
}

export interface YearLevel {
  year: number;
  level: number;
  title: string;
  subtitle: string;
  achievements: Achievement[];
}

/**
 * All life achievements organized by year.
 * Each year represents a level in the RPG journey.
 */
export const yearLevels: YearLevel[] = [
  {
    year: 2003,
    level: 1,
    title: 'The Bold Beginning',
    subtitle: 'Fortune favors the brave (and romantic)',
    achievements: [
      {
        title: 'Mechanical Bull Bravado',
        description: 'Rode the Metal Bull at Corpus Watergarden, demonstrating bravery to fiancée Sarah. Pride intact, dignity questionable.',
        icon: 'horse',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Bravery', value: 4 },
          { name: 'Romance', value: 3 },
          { name: 'Core Strength', value: 2 },
          { name: 'Dignity', value: -1 }
        ]
      }
    ]
  },
  {
    year: 2008,
    level: 2,
    title: 'The Riff Master & Road Warrior',
    subtitle: 'Six strings and two wheels',
    achievements: [
      {
        title: 'Guitar Awakening',
        description: 'Electric and acoustic guitar became an obsession. Neighbors learned patience.',
        icon: 'guitar',
        iconStyle: 'solid',
        xp: 150,
        attributes: [
          { name: 'Music', value: 3 },
          { name: 'Creativity', value: 2 },
          { name: 'Finger Calluses', value: 5 }
        ]
      },
      {
        title: 'Ninja 250 Road Warrior',
        description: 'Sold car, became 1-car family. Commuted 10,000+ miles on Ninja 250 as sole vehicle. Got soaked plenty, Frog Toggs became best friend.',
        icon: 'motorcycle',
        iconStyle: 'solid',
        xp: 200,
        attributes: [
          { name: 'Bravery', value: 4 },
          { name: 'Weather Tolerance', value: 5 },
          { name: 'Fuel Savings', value: 4 },
          { name: 'Comfort', value: -3 },
          { name: 'Dryness', value: -4 }
        ]
      }
    ]
  },
  {
    year: 2010,
    level: 3,
    title: 'Manual Transmission Baptism & Loan Liquidator',
    subtitle: 'Trial by fire, clutch, and corporate travel',
    achievements: [
      {
        title: 'Stick Shift Survivor',
        description: 'Bought a Mazdaspeed3 without knowing manual. Learned on the highway home. Peak anxiety achieved.',
        icon: 'car',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Driving', value: 3 },
          { name: 'Clutch Control', value: 4 },
          { name: 'Sanity', value: -2 },
          { name: 'Confidence', value: 2 }
        ]
      },
      {
        title: 'Freddie Mac Road Warrior',
        description: 'Traveled the country writing off big chunks of loans. California, Florida, DC, LA, Atlanta conquered. Hotel points maximized.',
        icon: 'plane',
        iconStyle: 'solid',
        xp: 175,
        attributes: [
          { name: 'Travel', value: 4 },
          { name: 'Financial Knowledge', value: 3 },
          { name: 'Hotel Points', value: 5 },
          { name: 'Home Time', value: -3 }
        ]
      }
    ]
  },
  {
    year: 2012,
    level: 4,
    title: 'The PowerShell Obsession & Outdoor Explorer',
    subtitle: 'Automating life while hanging in trees',
    achievements: [
      {
        title: 'Script Everything',
        description: 'Obsessively automated with PowerShell. If it could be scripted, it was. If it couldn\'t, made it anyway. GUI? What GUI?',
        icon: 'bolt',
        iconStyle: 'solid',
        xp: 200,
        attributes: [
          { name: 'Scripting', value: 4 },
          { name: 'Automation', value: 5 },
          { name: 'GUI Skills', value: -3 },
          { name: 'Sleep', value: -1 }
        ]
      },
      {
        title: 'Hammock Mastery',
        description: 'Became expert hammock user with best friend Jacoby. Maximum relaxation achieved. Tree selection skills legendary.',
        icon: 'campground',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Relaxation', value: 5 },
          { name: 'Nature', value: 3 },
          { name: 'Friendship', value: 4 },
          { name: 'Productivity', value: -2 }
        ]
      },
      {
        title: 'Disc Golf Tree Magnet',
        description: 'Enthusiastically disc golfed and hit many, many trees. Course landscaping tested thoroughly. Discs sacrificed to forest gods.',
        icon: 'compact-disc',
        iconStyle: 'solid',
        xp: 75,
        attributes: [
          { name: 'Disc Golf', value: 2 },
          { name: 'Tree Accuracy', value: 5 },
          { name: 'Actual Accuracy', value: -2 },
          { name: 'Patience', value: 3 }
        ]
      },
      {
        title: 'Adopted By Ninja Cat',
        description: 'Was adopted by Abby, the lurking ninja cat. Always there, but never seen. Stealth level: maximum.',
        icon: 'cat',
        iconStyle: 'solid',
        xp: 50,
        attributes: [
          { name: 'Cat Ownership', value: 3 },
          { name: 'Vigilance', value: 2 },
          { name: 'Privacy', value: -1 }
        ]
      }
    ]
  },
  {
    year: 2013,
    level: 5,
    title: 'Dad Life & Nature Explorer',
    subtitle: 'Teaching, camping, and creative chaos',
    achievements: [
      {
        title: 'Balance Bike Sensei',
        description: 'Taught son balance bike skills to prepare for single track adventures. Future mountain biker in training.',
        icon: 'bicycle',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Parenting', value: 4 },
          { name: 'Teaching', value: 3 },
          { name: 'Patience', value: 2 }
        ]
      },
      {
        title: 'Primitive Camping Surprise',
        description: 'Celebrated anniversary camping in Sam Houston Park. Remote primitive camping interrupted by cop with lights - apparently escaped convict on the loose! 🤣 Romance level: adventurous.',
        icon: 'tent',
        iconStyle: 'solid',
        xp: 125,
        attributes: [
          { name: 'Adventure', value: 5 },
          { name: 'Romance', value: 3 },
          { name: 'Survival', value: 2 },
          { name: 'Heart Rate', value: -3 }
        ]
      },
      {
        title: 'Disc Golf Dye Master',
        description: 'Custom dyed disc golf discs as creative project. Artistic expression meets flying plastic. Some turned out amazing, others... abstract.',
        icon: 'palette',
        iconStyle: 'solid',
        xp: 75,
        attributes: [
          { name: 'Creativity', value: 3 },
          { name: 'Disc Golf', value: 2 },
          { name: 'Artistic Skills', value: 2 }
        ]
      }
    ]
  },
  {
    year: 2014,
    level: 6,
    title: 'Query Whisperer & Family Adventures',
    subtitle: 'Speaking SQL and Tokyo drifting through life',
    achievements: [
      {
        title: 'Database Deep Dive',
        description: 'Optimized queries that made DBAs weep with joy. Learned to think in JOINs and dream in indexes.',
        icon: 'database',
        iconStyle: 'solid',
        xp: 200,
        attributes: [
          { name: 'Database', value: 4 },
          { name: 'Query Optimization', value: 3 },
          { name: 'Patience', value: 2 }
        ]
      },
      {
        title: 'Fence Painting Tradition',
        description: 'Passed on the ancient tradition of entertaining young son with "painting" fence... using water and a paintbrush. Tom Sawyer approved.',
        icon: 'paintbrush',
        iconStyle: 'solid',
        xp: 50,
        attributes: [
          { name: 'Parenting', value: 3 },
          { name: 'Cleverness', value: 4 },
          { name: 'Free Labor', value: 2 }
        ]
      },
      {
        title: 'Camping with the Boys',
        description: 'Car camped in Sam Houston with Jacoby and son. S\'mores consumed, hammock time maximized, breakfast sausages perfectly charred.',
        icon: 'fire',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Friendship', value: 3 },
          { name: 'Parenting', value: 2 },
          { name: 'Outdoor Cooking', value: 2 },
          { name: 'S\'mores Mastery', value: 4 }
        ]
      },
      {
        title: 'International Photographer',
        description: 'Took family photos of Kiwi family, gaining international photographer credit. New Zealand probably talks about these photos still.',
        icon: 'camera-retro',
        iconStyle: 'solid',
        xp: 75,
        attributes: [
          { name: 'Photography', value: 3 },
          { name: 'International Fame', value: 2 },
          { name: 'Ego', value: 1 }
        ]
      },
      {
        title: 'Santa Fe Food Tour',
        description: 'Enjoyed family travel to Santa Fe, ate delicious southwestern cuisine. Green chile everything. Taste buds expanded.',
        icon: 'utensils',
        iconStyle: 'solid',
        xp: 75,
        attributes: [
          { name: 'Culinary Knowledge', value: 3 },
          { name: 'Travel', value: 2 },
          { name: 'Chile Tolerance', value: 3 }
        ]
      },
      {
        title: 'Tokyo Drift: Mountain Edition',
        description: 'Learned about tire tread safety after emulating Tokyo Drift on Santa Fe mountain roads. Multiple times. Survival instinct kicked in eventually.',
        icon: 'car-burst',
        iconStyle: 'solid',
        xp: 50,
        attributes: [
          { name: 'Driving', value: 1 },
          { name: 'Tire Knowledge', value: 5 },
          { name: 'Risk Assessment', value: -3 },
          { name: 'Luck', value: 4 }
        ]
      },
      {
        title: 'Night Sky Photographer',
        description: 'Did first and last foray into night star photography, overlaying 30 shots to create starscape. Equipment requirements exceeded enthusiasm.',
        icon: 'star',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Photography', value: 3 },
          { name: 'Patience', value: 3 },
          { name: 'Sleep Schedule', value: -2 },
          { name: 'Equipment Lust', value: 2 }
        ]
      },
      {
        title: 'Santa Fe Snowboarder',
        description: 'Snowboarded in Santa Fe mountains. Vertical drop conquered. Pride intact.',
        icon: 'snowflake',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Snowboarding', value: 3 },
          { name: 'Winter Sports', value: 2 },
          { name: 'Bruise Count', value: -2 }
        ]
      },
      {
        title: 'Bug Museum Explorer',
        description: 'Visited The Harrell House Bug Museum. Watched son jump due to very hungry monitor lizard hitting glass. Educational trauma achieved.',
        icon: 'bug',
        iconStyle: 'solid',
        xp: 50,
        attributes: [
          { name: 'Parenting', value: 2 },
          { name: 'Bug Knowledge', value: 3 },
          { name: 'Lizard Awareness', value: 4 },
          { name: 'Son\'s Trust', value: -1 }
        ]
      }
    ]
  },
  {
    year: 2015,
    level: 7,
    title: 'Light Chaser & Church Builder',
    subtitle: 'Capturing moments and drywall disasters',
    achievements: [
      {
        title: 'Photography & Video',
        description: 'Started obsessing over light, composition, and that perfect golden hour shot. Camera gear collection initiated.',
        icon: 'camera',
        iconStyle: 'solid',
        xp: 200,
        attributes: [
          { name: 'Photography', value: 4 },
          { name: 'Creativity', value: 3 },
          { name: 'Wallet', value: -3 }
        ]
      },
      {
        title: 'Sheldon\'s Column',
        description: 'Drywalled a column in church build out, known as Sheldon\'s Column until it was demo\'d years later. Better at painting than drywall. Legacy: temporary.',
        icon: 'building',
        iconStyle: 'solid',
        xp: 75,
        attributes: [
          { name: 'Construction', value: 2 },
          { name: 'Drywall', value: 1 },
          { name: 'Painting', value: 3 },
          { name: 'Pride', value: -2 }
        ]
      },
      {
        title: 'Multi-Tasking Worship Leader',
        description: 'Led worship singing, playing guitar, using feet with reverse pedal on cajon, tambourine and shaker, and running slides from iPad simultaneously with teammate. Maximum chaos coordination achieved.',
        icon: 'music',
        iconStyle: 'solid',
        xp: 150,
        attributes: [
          { name: 'Music', value: 4 },
          { name: 'Multi-tasking', value: 5 },
          { name: 'Coordination', value: 4 },
          { name: 'Foot Independence', value: 3 },
          { name: 'Mental Load', value: -2 }
        ]
      },
      {
        title: 'Cavern Explorer',
        description: 'Explored Natural Bridge Caverns on family trip. Stalactites admired, claustrophobia tested, geology appreciated.',
        icon: 'mountain',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Exploration', value: 3 },
          { name: 'Geology Knowledge', value: 2 },
          { name: 'Claustrophobia Resistance', value: 2 },
          { name: 'Parenting', value: 2 }
        ]
      }
    ]
  },
  {
    year: 2016,
    level: 8,
    title: 'The Producer',
    subtitle: 'DAW wizard in training',
    achievements: [
      {
        title: 'Music Production Journey',
        description: 'Dove into Studio One and digital audio. Spent hours tweaking EQ nobody else could hear.',
        icon: 'sliders',
        iconStyle: 'solid',
        xp: 75,
        attributes: [
          { name: 'Music Production', value: 3 },
          { name: 'Audio Engineering', value: 2 },
          { name: 'Perfectionism', value: 2 }
        ]
      }
    ]
  },
  {
    year: 2017,
    level: 9,
    title: 'Family Archivist',
    subtitle: 'Memories captured, turkey conquered',
    achievements: [
      {
        title: 'Thanksgiving Champion',
        description: 'Hosted family gathering. Filmed everything. Turkey was dry but memories were perfect.',
        icon: 'users',
        iconStyle: 'solid',
        xp: 75,
        attributes: [
          { name: 'Hosting', value: 2 },
          { name: 'Videography', value: 2 },
          { name: 'Cooking', value: -1 }
        ]
      }
    ]
  },
  {
    year: 2018,
    level: 10,
    title: 'The Wardrobe Malfunction',
    subtitle: 'When cats attack your career',
    achievements: [
      {
        title: 'Cat Pee Crisis Management',
        description: 'Showed up at work only to realize cat had peed on dress shirt. First few months on job. Emergency mall run discovered Banana Republic prices are ungodly for a polo. Kohl\'s saved the day for $30.',
        icon: 'shirt',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Crisis Management', value: 5 },
          { name: 'Budget Shopping', value: 4 },
          { name: 'Dignity', value: -3 },
          { name: 'Retail Knowledge', value: 3 },
          { name: 'Cat Trust', value: -2 }
        ]
      }
    ]
  },
  {
    year: 2020,
    level: 11,
    title: 'Go Gopher Initiate',
    subtitle: '100 days of channel confusion',
    achievements: [
      {
        title: 'Go Learning Quest',
        description: 'Started 100 Days of Code with Go. Wrestled with goroutines. Lost to interfaces. Persisted anyway.',
        icon: 'code-branch',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Go', value: 3 },
          { name: 'Concurrency', value: 2 },
          { name: 'DevOps', value: 2 },
          { name: 'Sanity', value: -1 }
        ]
      }
    ]
  },
  {
    year: 2021,
    level: 12,
    title: 'Go Professional',
    subtitle: 'They pay me for this now',
    achievements: [
      {
        title: 'Go Career Unlocked',
        description: 'Landed role using Go professionally. Imposter syndrome at maximum. Actually knew stuff though.',
        icon: 'briefcase',
        iconStyle: 'solid',
        xp: 200,
        attributes: [
          { name: 'Go', value: 3 },
          { name: 'Professional Dev', value: 4 },
          { name: 'Confidence', value: 3 }
        ]
      }
    ]
  },
  {
    year: 2023,
    level: 13,
    title: 'Renaissance Year',
    subtitle: 'Maximum chaos, maximum growth',
    achievements: [
      {
        title: 'Digital Garden Planted',
        description: 'Published personal knowledge base. Now everyone can see my organized chaos.',
        icon: 'seedling',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'Knowledge Management', value: 3 },
          { name: 'Writing', value: 2 }
        ]
      },
      {
        title: 'Manual Truck Redemption',
        description: 'Drove F150 manual without stalling. Growth from 2010 Mazdaspeed3 trauma complete.',
        icon: 'truck',
        iconStyle: 'solid',
        xp: 75,
        attributes: [
          { name: 'Driving', value: 2 },
          { name: 'Confidence', value: 2 }
        ]
      },
      {
        title: 'NYC Survival',
        description: 'Conquered concrete jungle. Won unofficial rat-spotting competition. Subway navigation mastered.',
        icon: 'city',
        iconStyle: 'solid',
        xp: 125,
        attributes: [
          { name: 'Travel', value: 3 },
          { name: 'Urban Navigation', value: 2 },
          { name: 'Rat Recognition', value: 4 }
        ]
      },
      {
        title: 'Parisian Navigator',
        description: 'Led family through Paris metro system without getting lost (much). Croissant consumption maxed.',
        icon: 'map-location-dot',
        iconStyle: 'solid',
        xp: 150,
        attributes: [
          { name: 'Travel', value: 3 },
          { name: 'French', value: 1 },
          { name: 'Metro Skills', value: 3 }
        ]
      },
      {
        title: 'Versailles Wanderer',
        description: 'Walked palace grounds until feet hurt. Gold leaf appreciation intensified.',
        icon: 'crown',
        iconStyle: 'solid',
        xp: 100,
        attributes: [
          { name: 'History', value: 2 },
          { name: 'Walking Endurance', value: 3 }
        ]
      },
      {
        title: 'Chunnel Champion',
        description: 'Crossed under English Channel by train. London pubs thoroughly researched.',
        icon: 'train-subway',
        iconStyle: 'solid',
        xp: 125,
        attributes: [
          { name: 'Travel', value: 2 },
          { name: 'Pub Expertise', value: 3 }
        ]
      },
      {
        title: 'Local AI Tinkerer',
        description: 'Set up Ollama to run llama2:13b on M2 Max. Computer fan became jet engine.',
        icon: 'microchip',
        iconStyle: 'solid',
        xp: 75,
        attributes: [
          { name: 'AI', value: 2 },
          { name: 'DevOps', value: 1 },
          { name: 'Electricity Bill', value: -2 }
        ]
      }
    ]
  },
  {
    year: 2024,
    level: 14,
    title: 'AI Assistant Adopter',
    subtitle: 'ChatGPT is basically my coworker now',
    achievements: [
      {
        title: 'GPT Diagnostics Pro',
        description: 'Started using ChatGPT for troubleshooting. Rubber duck debugging evolved to AI debugging.',
        icon: 'robot',
        iconStyle: 'solid',
        xp: 50,
        attributes: [
          { name: 'AI', value: 2 },
          { name: 'Problem Solving', value: 2 },
          { name: 'Googling', value: -1 }
        ]
      }
    ]
  },
  {
    year: 2025,
    level: 15,
    title: 'Modern Stack Embracer',
    subtitle: 'Hugo was so 2023',
    achievements: [
      {
        title: 'Astro Migration',
        description: 'Migrated entire site to Astro. Modern DX achieved. Component islands everywhere.',
        icon: 'rocket',
        iconStyle: 'solid',
        xp: 150,
        attributes: [
          { name: 'Frontend', value: 3 },
          { name: 'Modern JS', value: 2 },
          { name: 'Static Site Gen', value: 2 }
        ]
      }
    ]
  }
];

/**
 * Stats accumulator interface
 */
export interface Stats {
  [key: string]: number;
}

/**
 * Calculate cumulative stats up to a specific level index.
 * @param upToIndex - The index of the level to calculate up to (inclusive)
 * @returns Object with attribute names as keys and cumulative values
 */
export function calculateCumulativeStats(upToIndex: number): Stats {
  const stats: Stats = {};

  // Iterate through all levels up to the specified index
  for (let i = 0; i <= upToIndex && i < yearLevels.length; i++) {
    const level = yearLevels[i];

    // Process each achievement in this level
    level.achievements.forEach(achievement => {
      achievement.attributes.forEach(attr => {
        // Add to existing value or initialize to 0
        stats[attr.name] = (stats[attr.name] || 0) + attr.value;
      });
    });
  }

  return stats;
}

/**
 * Calculate total XP earned up to a specific level index.
 * @param upToIndex - The index of the level to calculate up to (inclusive)
 * @returns Total XP earned
 */
export function calculateTotalXP(upToIndex: number): number {
  let totalXP = 0;

  for (let i = 0; i <= upToIndex && i < yearLevels.length; i++) {
    const level = yearLevels[i];
    totalXP += level.achievements.reduce((sum, achievement) => sum + achievement.xp, 0);
  }

  return totalXP;
}

/**
 * Get total XP for all levels combined.
 * @returns Total XP for the entire journey
 */
export function getTotalXP(): number {
  return yearLevels.reduce((sum, level) =>
    sum + level.achievements.reduce((achSum, ach) => achSum + ach.xp, 0), 0
  );
}

/**
 * Get final stats after completing all levels.
 * @returns Final cumulative stats
 */
export function getFinalStats(): Stats {
  return calculateCumulativeStats(yearLevels.length - 1);
}

/**
 * Get total number of achievements across all levels.
 * @returns Total achievement count
 */
export function getTotalAchievements(): number {
  return yearLevels.reduce((sum, level) => sum + level.achievements.length, 0);
}

/**
 * Get the top N attributes by absolute value.
 * @param stats - Stats object to extract from
 * @param count - Number of top stats to return (default: 6)
 * @returns Array of [name, value] pairs sorted by absolute value (descending)
 */
export function getTopStats(stats: Stats, count: number = 6): [string, number][] {
  return Object.entries(stats)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, count);
}

// Example usage and verification
if (import.meta.env.DEV) {
  // Verify stats calculation in development
  console.log('=== Level-Up Data Verification ===');
  console.log('Total Levels:', yearLevels.length);
  console.log('Total XP:', getTotalXP());
  console.log('Total Achievements:', getTotalAchievements());
  console.log('Final Stats:', getFinalStats());

  // Test cumulative calculation at each level
  console.log('\n=== Cumulative Stats Per Level ===');
  yearLevels.forEach((level, index) => {
    const stats = calculateCumulativeStats(index);
    const xp = calculateTotalXP(index);
    console.log(`Level ${level.level} (${level.year}):`, {
      xp,
      topStats: getTopStats(stats, 3)
    });
  });
}
