/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV?: 'local' | 'staging' | 'production' | string;
  readonly VITE_WEB_VERSION?: string;
  readonly VITE_GOVERNMENT_NAME?: string;
  readonly VITE_GOVERNMENT_TYPE?: string;
  readonly VITE_REGION?: string;
  readonly VITE_PROVINCE?: string;
  readonly VITE_WEBSITE_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_TWITTER_HANDLE?: string;
  readonly VITE_SITE_DESCRIPTION?: string;
  readonly VITE_SITE_KEYWORDS?: string;
  readonly VITE_OG_IMAGE_URL?: string;
  readonly VITE_MEILISEARCH_HOST?: string;
  readonly VITE_MEILISEARCH_SEARCH_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
