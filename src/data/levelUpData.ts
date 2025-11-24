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
    year: 2008,
    level: 1,
    title: 'The Riff Master',
    subtitle: 'Six strings, endless possibilities',
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
      }
    ]
  },
  {
    year: 2010,
    level: 2,
    title: 'Manual Transmission Baptism',
    subtitle: 'Trial by fire and clutch',
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
      }
    ]
  },
  {
    year: 2012,
    level: 3,
    title: 'The PowerShell Obsession',
    subtitle: 'Making it do things it was never meant to do',
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
      }
    ]
  },
  {
    year: 2014,
    level: 4,
    title: 'Query Whisperer',
    subtitle: 'Speaking fluent SQL',
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
      }
    ]
  },
  {
    year: 2015,
    level: 5,
    title: 'Light Chaser',
    subtitle: 'Capturing moments in pixels',
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
      }
    ]
  },
  {
    year: 2016,
    level: 6,
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
    level: 7,
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
    year: 2020,
    level: 8,
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
    level: 9,
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
    level: 10,
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
    level: 11,
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
    level: 12,
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
