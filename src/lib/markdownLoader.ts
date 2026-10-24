import * as yaml from 'js-yaml';
import type { DownloadableForm } from '../types';

/**
 * Utility to load markdown content dynamically based on slug
 */

/**
 * Replaces {PLACEHOLDER} tokens using JSON data first, then VITE_ env vars.
 */
function interpolate(
  content: string,
  data: Record<string, unknown> = {}
): string {
  return content.replace(/\{([A-Z0-9_]+)\}/g, (match, key) => {
    if (key in data) return String(data[key]);
    const value = import.meta.env[`VITE_${key}`];
    return value !== undefined ? String(value) : match;
  });
}

export interface MarkdownContent {
  content: string;
  title?: string;
  description?: string;
  forms?: DownloadableForm[];
  data?: Record<string, unknown>;
}

/**
 * Loads markdown content from the appropriate content directory.
 * Also attempts to load a companion JSON file (same slug) for template
 * variable substitution and structured data.
 * @param documentSlug - The document slug (filename without .md extension)
 * @param categorySlug - The category slug (parent directory)
 * @param categoryType - Whether this is a 'service' or 'government' document
 */
export async function loadMarkdownContent(
  documentSlug: string,
  categorySlug: string,
  categoryType: 'service' | 'government'
): Promise<MarkdownContent> {
  try {
    const dir = categoryType === 'government' ? 'government' : 'services';

    // Try to load companion JSON for template data
    let data: Record<string, unknown> = {};
    try {
      const jsonModule = await import(
        `../../content/${dir}/${categorySlug}/${documentSlug}.json`
      );
      data = jsonModule.default;
    } catch {
      // No companion JSON — that's fine
    }

    const module = await import(
      `../../content/${dir}/${categorySlug}/${documentSlug}.md?raw`
    );

    let rawContent = module.default;
    let forms: DownloadableForm[] | undefined = undefined;

    // Check for YAML frontmatter
    if (rawContent.startsWith('---')) {
      const closingIndex = rawContent.indexOf('\n---', 3);
      if (closingIndex !== -1) {
        const frontmatterStr = rawContent.slice(3, closingIndex).trim();
        try {
          const parsed = yaml.load(frontmatterStr) as Record<string, unknown>;
          if (parsed && typeof parsed === 'object') {
            const parsedForms = parsed.forms || parsed.downloadableForms;
            if (Array.isArray(parsedForms)) {
              forms = parsedForms as DownloadableForm[];
            }
          }
        } catch (e) {
          console.warn(`Failed to parse frontmatter in ${documentSlug}:`, e);
        }
        rawContent = rawContent.slice(closingIndex + 4).trimStart();
      }
    }

    // Fallback: check companion JSON data for forms or downloadableForms
    if (!forms) {
      const dataForms = data.forms || data.downloadableForms;
      if (Array.isArray(dataForms)) {
        forms = dataForms as DownloadableForm[];
      }
    }

    const content = interpolate(rawContent, data);

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : undefined;

    const descriptionMatch = content.match(/^#\s+.+$\n\n(.+?)(?:\n\n|$)/s);
    const description = descriptionMatch
      ? descriptionMatch[1].replace(/^>\s*/, '').trim()
      : undefined;

    return { content, title, description, forms, data };
  } catch (error) {
    console.error(
      `Failed to load markdown content for document: ${documentSlug}`,
      error
    );
    throw new Error(`Document not found: ${documentSlug}`, { cause: error });
  }
}
