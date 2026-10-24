/* eslint-disable react-refresh/only-export-components */
/**
 * ReactMarkdown components with configurable typography themes
 */

import { type TypographyTheme } from './typographyThemes';
import { useEffect, type ReactNode, type HTMLAttributes } from 'react';
import { TableWithToggle } from './TableWithToggle';
import { Check } from 'lucide-react';
import { useChecklist } from '../context/ChecklistContext';

function extractTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractTextContent).join(' ');
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const el = node as { props?: { children?: ReactNode } };
    return extractTextContent(el.props?.children);
  }
  return '';
}

function InteractiveTaskListItem({
  children,
  className,
  isNested,
  ...props
}: {
  children?: ReactNode;
  className?: string;
  isNested?: boolean;
} & HTMLAttributes<HTMLLIElement>) {
  const { slug, checkedItems, toggleItem, registerItem, unregisterItem } =
    useChecklist();

  // Strip standard GFM checkbox inputs to replace with our accessible button
  const cleanChildren = Array.isArray(children)
    ? children.filter(child => {
        if (typeof child === 'object' && child !== null && 'props' in child) {
          const el = child as { props?: { type?: string } };
          return el.props?.type !== 'checkbox';
        }
        return true;
      })
    : children;

  const rawText = extractTextContent(cleanChildren).replace(/\s+/g, ' ').trim();
  const itemId = slug
    ? `${slug}:${rawText.slice(0, 50)}`
    : `item:${rawText.slice(0, 50)}`;

  useEffect(() => {
    if (itemId) {
      registerItem(itemId);
      return () => unregisterItem(itemId);
    }
  }, [itemId, registerItem, unregisterItem]);

  const isChecked = !!checkedItems[itemId];

  return (
    <li
      className={`task-list-item group flex items-start gap-3 py-2 px-3 rounded-xl transition-all duration-150 border cursor-pointer select-none my-1.5 ${
        isNested ? 'ml-6' : ''
      } ${
        isChecked
          ? 'bg-emerald-50/70 border-emerald-200/80 text-gray-700'
          : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-900'
      } ${className || ''}`}
      onClick={() => toggleItem(itemId)}
      {...props}
    >
      {/* Printed state (black & white on paper) */}
      <span
        className="print-only hidden font-mono font-bold text-sm mr-1 text-black shrink-0"
        aria-hidden="true"
      >
        {isChecked ? '[x]' : '[ ]'}
      </span>

      {/* Screen button (hidden on print) */}
      <button
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        aria-label={`Mark as ${isChecked ? 'not ready' : 'ready'}: ${rawText}`}
        tabIndex={0}
        onClick={e => {
          e.stopPropagation();
          toggleItem(itemId);
        }}
        onKeyDown={e => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(itemId);
          }
        }}
        className={`print:hidden mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${
          isChecked
            ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
            : 'border-gray-300 bg-white hover:border-emerald-500 text-transparent'
        }`}
      >
        <Check
          className={`w-3.5 h-3.5 stroke-[3] ${isChecked ? 'block' : 'hidden'}`}
        />
      </button>

      <div
        className={`flex-1 text-sm md:text-base leading-relaxed ${
          isChecked
            ? 'line-through text-gray-500 print:text-black print:no-underline'
            : 'text-gray-900'
        }`}
      >
        {cleanChildren}
      </div>
    </li>
  );
}

// Extended theme type to include dynamic component keys
type ExtendedTheme = TypographyTheme & {
  components: TypographyTheme['components'] & {
    [key: string]: string | undefined;
  };
};

/**
 * Creates ReactMarkdown components with custom styling based on typography theme
 */
export function createMarkdownComponents(theme: TypographyTheme) {
  const extendedTheme = theme as ExtendedTheme;
  return {
    h1: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className={theme.components.h1} {...props}>
        {children}
      </h1>
    ),
    h2: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className={theme.components.h2} {...props}>
        {children}
      </h2>
    ),
    h3: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className={theme.components.h3} {...props}>
        {children}
      </h3>
    ),
    h4: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
      <h4 className={theme.components.h4} {...props}>
        {children}
      </h4>
    ),
    h5: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
      <h5 className={theme.components.h5} {...props}>
        {children}
      </h5>
    ),
    h6: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
      <h6 className={theme.components.h6} {...props}>
        {children}
      </h6>
    ),
    p: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLParagraphElement>) => (
      <p className={theme.components.p} {...props}>
        {children}
      </p>
    ),
    small: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLElement>) => (
      <small className={theme.components.small} {...props}>
        {children}
      </small>
    ),
    ul: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLUListElement>) => {
      // Check if this ul contains task list items
      const hasTaskItems =
        Array.isArray(children) &&
        children.some(
          child =>
            typeof child === 'object' &&
            child !== null &&
            'props' in child &&
            (
              child as { props?: { className?: string } }
            )?.props?.className?.includes('task-list-item')
        );

      if (hasTaskItems) {
        return (
          <ul className="space-y-1.5 my-4 list-none p-0" role="list" {...props}>
            {children}
          </ul>
        );
      }

      // For regular lists, use the theme styling
      return (
        <ul className={theme.components.ul} {...props}>
          {children}
        </ul>
      );
    },
    ol: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLOListElement>) => (
      <ol
        className={`${theme.components.ol} [counter-reset:list-item]`}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLLIElement>) => {
      // Check if this is a nested list item
      const isNested = props.className?.includes('nested') || false;

      // Use the appropriate li class based on context
      const liClass = theme.components.li || '';
      const orderedLiClass = extendedTheme.components['li.ordered'] || liClass;
      const taskLiClass =
        extendedTheme.components['li.task-list-item'] || liClass;

      // Detect if this is a task list item
      const isTaskList = props.className?.includes('task-list-item');

      if (isTaskList) {
        return (
          <InteractiveTaskListItem
            isNested={isNested}
            className={taskLiClass}
            {...props}
          >
            {children}
          </InteractiveTaskListItem>
        );
      }

      const isOrderedList = props.className?.includes('ordered') || false;
      const finalClassName = isOrderedList ? orderedLiClass : liClass;

      return (
        <li
          className={`${finalClassName} ${isNested ? 'ml-4' : ''}`}
          {...props}
        >
          {children}
        </li>
      );
    },
    blockquote: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote className={theme.components.blockquote} {...props}>
        {children}
      </blockquote>
    ),
    code: ({
      children,
      className,
      ...props
    }: {
      children?: ReactNode;
      className?: string;
    } & HTMLAttributes<HTMLElement>) => {
      // Check if it's inline code or code block
      const isInline = !className?.includes('language-');
      return isInline ? (
        <code className={theme.components.code} {...props}>
          {children}
        </code>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    pre: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLPreElement>) => (
      <pre className={theme.components.pre} {...props}>
        {children}
      </pre>
    ),
    a: ({
      children,
      href,
      ...props
    }: {
      children?: ReactNode;
      href?: string;
    } & HTMLAttributes<HTMLAnchorElement>) => {
      // Check if it's an external link
      const isExternal =
        href && (href.startsWith('http://') || href.startsWith('https://'));

      return (
        <a
          href={href}
          className={theme.components.a}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    strong: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLElement>) => (
      <strong className={theme.components.strong} {...props}>
        {children}
      </strong>
    ),
    em: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLElement>) => (
      <em className={theme.components.em} {...props}>
        {children}
      </em>
    ),
    hr: ({ ...props }: HTMLAttributes<HTMLHRElement>) => (
      <hr className={theme.components.hr} {...props} />
    ),
    table: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLTableElement>) => (
      <TableWithToggle theme={theme} {...props}>
        {children}
      </TableWithToggle>
    ),
    thead: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLTableSectionElement>) => (
      <thead className={theme.components.thead} {...props}>
        {children}
      </thead>
    ),
    tbody: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody className={theme.components.tbody} {...props}>
        {children}
      </tbody>
    ),
    tr: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLTableRowElement>) => (
      <tr className={theme.components.tr} {...props}>
        {children}
      </tr>
    ),
    th: ({
      children,
      ...props
    }: {
      children?: ReactNode;
    } & HTMLAttributes<HTMLTableHeaderCellElement>) => (
      <th className={theme.components.th} {...props}>
        {replaceBrString(children)}
      </th>
    ),
    td: ({
      children,
      ...props
    }: { children?: ReactNode } & HTMLAttributes<HTMLTableDataCellElement>) => (
      <td className={theme.components.td} {...props}>
        {replaceBrString(children)}
      </td>
    ),
    br: () => <br />,
  };
}

function replaceBrString(node: ReactNode): ReactNode {
  if (typeof node === 'string') {
    if (!/<br\s*\/?>/i.test(node)) {
      return node;
    }
    const parts = node.split(/<br\s*\/?>/gi);
    return parts.map((part, index) => (
      <span key={index}>
        {index > 0 && <br />}
        {part}
      </span>
    ));
  }
  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <span key={index}>{replaceBrString(child)}</span>
    ));
  }
  return node;
}
