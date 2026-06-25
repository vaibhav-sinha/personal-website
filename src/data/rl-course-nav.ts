export interface NavItem {
  slug: string;
  title: string;
  children?: NavItem[];
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export function getNavItemHref(slug: string): string {
  return `/rl-course/${slug}`;
}

export function isNavItemActive(item: NavItem, currentSlug?: string): boolean {
  if (!currentSlug) return false;
  if (currentSlug === item.slug) return true;
  return item.children?.some((child) => child.slug === currentSlug) ?? false;
}

/** Flatten nav into leaf-first order for prev/next lesson sequencing. */
export function flattenNav(sections: NavSection[]): NavItem[] {
  const items: NavItem[] = [];
  for (const section of sections) {
    for (const item of section.items) {
      items.push(item);
      if (item.children) items.push(...item.children);
    }
  }
  return items;
}

export const courseMeta = {
  title: "Reinforcement Learning Course",
  description:
    "A practical, developer-focused introduction to reinforcement learning. Focuses on building intuition through exercises, implementing algorithms and interactive examples.",
};

export const rlCourseNav: NavSection[] = [
  {
    section: "Foundations",
    items: [
      { slug: "introduction", title: "Introduction" },
      {
        slug: "markov-decision-processes",
        title: "Markov Decision Processes",
        children: [
          {
            slug: "markov-decision-processes/the-markov-property",
            title: "The Markov Property",
          },
          {
            slug: "markov-decision-processes/grid-world",
            title: "Grid World Intuition",
          },
        ],
      },
    ],
  },
];
