export interface SocialLink {
  label: string;
  href: string;
}

export interface LinkItem {
  title: string;
  description: string;
  href: string;
}

export const profile = {
  name: "Vaibhav Sinha",
  tagline: "Software engineer",
  photo: "/images/profile.svg",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/vaibhavsinha" },
  { label: "LinkedIn", href: "https://linkedin.com/in/vaibhavsinha" },
  { label: "X", href: "https://x.com/vaibhavsinha" },
];

export const openSource: LinkItem[] = [
  {
    title: "example-library",
    description: "A small utility library for common patterns.",
    href: "https://github.com/vaibhavsinha/example-library",
  },
  {
    title: "dev-tools",
    description: "CLI helpers for local development workflows.",
    href: "https://github.com/vaibhavsinha/dev-tools",
  },
];

export const products: LinkItem[] = [
  {
    title: "Product One",
    description: "A developer tool that solves a focused problem.",
    href: "https://example.com/product-one",
  },
  {
    title: "Product Two",
    description: "An API service for building faster.",
    href: "https://example.com/product-two",
  },
];

export const resources: LinkItem[] = [
  {
    title: "RL Course",
    description: "A practical introduction to reinforcement learning.",
    href: "/rl-course",
  },
  {
    title: "Getting Started with X",
    description: "A short tutorial series on a core topic.",
    href: "https://example.com/tutorial",
  },
];
