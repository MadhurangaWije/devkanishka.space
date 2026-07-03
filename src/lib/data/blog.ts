export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
};

export const posts: Post[] = [];
