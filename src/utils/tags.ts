import type { CollectionEntry } from 'astro:content';

export interface TagInfo {
  name: string;
  count: number;
  years: Set<number>;
}

export interface TagsByYear {
  [year: number]: {
    [tag: string]: {
      count: number;
      posts: CollectionEntry<'posts'>[];
    };
  };
}

/**
 * Aggregates tags from all posts and groups them by year
 * @param posts - Array of post entries
 * @returns Object with tags grouped by year, including counts and post references
 */
export function getTagsByYear(posts: CollectionEntry<'posts'>[]): TagsByYear {
  const tagsByYear: TagsByYear = {};

  posts.forEach((post) => {
    const year = post.data.date.getFullYear();
    const tags = post.data.tags || [];

    if (!tagsByYear[year]) {
      tagsByYear[year] = {};
    }

    tags.forEach((tag) => {
      if (!tagsByYear[year][tag]) {
        tagsByYear[year][tag] = {
          count: 0,
          posts: [],
        };
      }
      tagsByYear[year][tag].count++;
      tagsByYear[year][tag].posts.push(post);
    });
  });

  return tagsByYear;
}

/**
 * Gets all unique tags with their total counts across all years
 * @param posts - Array of post entries
 * @returns Map of tag names to TagInfo objects
 */
export function getAllTags(posts: CollectionEntry<'posts'>[]): Map<string, TagInfo> {
  const tagsMap = new Map<string, TagInfo>();

  posts.forEach((post) => {
    const year = post.data.date.getFullYear();
    const tags = post.data.tags || [];

    tags.forEach((tag) => {
      if (!tagsMap.has(tag)) {
        tagsMap.set(tag, {
          name: tag,
          count: 0,
          years: new Set(),
        });
      }
      const tagInfo = tagsMap.get(tag)!;
      tagInfo.count++;
      tagInfo.years.add(year);
    });
  });

  return tagsMap;
}

/**
 * Sorts tags by count (descending)
 * @param tags - Object with tag counts
 * @returns Array of [tag, data] tuples sorted by count
 */
export function sortTagsByCount<T extends { count: number }>(
  tags: Record<string, T>
): [string, T][] {
  return Object.entries(tags).sort((a, b) => b[1].count - a[1].count);
}
