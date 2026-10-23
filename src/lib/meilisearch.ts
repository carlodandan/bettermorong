import { Meilisearch } from 'meilisearch';

const host = import.meta.env.VITE_MEILISEARCH_HOST;

export const isMeilisearchEnabled = Boolean(host);

export const searchClient = host
  ? new Meilisearch({
      host,
      apiKey: import.meta.env.VITE_MEILISEARCH_SEARCH_KEY,
    })
  : null;

export const SEARCH_INDEX = 'content';

export interface SearchHit {
  id: string;
  title: string;
  description: string;
  type: 'service' | 'government';
  category: string;
  categorySlug: string;
  slug: string;
  url: string;
}
