import { createDirectus, rest, readItems } from '@directus/sdk';

// Directus API endpoint
const DIRECTUS_URL = import.meta.env.PUBLIC_DIRECTUS_URL || 'http://192.168.1.108:8055';

// Create Directus client
const directus = createDirectus(DIRECTUS_URL).with(rest());

// Types for our content (maps to Directus 'posts' collection)
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status: 'published' | 'draft' | 'archived';
  date_created: string;
  date_updated?: string;
  publish_date?: string;
}

// Backwards compatibility alias
export type Article = Post;

// Fetch all published posts
export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await directus.request(
      readItems('posts', {
        filter: {
          status: { _eq: 'published' }
        },
        sort: ['-date_created'],
        fields: ['id', 'title', 'slug', 'excerpt', 'featured_image', 'date_created']
      })
    );
    return posts as Post[];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

// Backwards compatibility
export const getArticles = getPosts;

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await directus.request(
      readItems('posts', {
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' }
        },
        fields: ['*'],
        limit: 1
      })
    );
    return (posts as Post[])[0] || null;
  } catch (error) {
    console.error(`Failed to fetch post ${slug}:`, error);
    return null;
  }
}

// Backwards compatibility
export const getArticleBySlug = getPostBySlug;

export { directus };
