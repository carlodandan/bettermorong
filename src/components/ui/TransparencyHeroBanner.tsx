import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export interface TransparencyTag {
  label: string;
  highlight?: boolean;
}

export interface TransparencyHeroBannerProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description?: string;
  tags?: TransparencyTag[];
  action?: {
    label: string;
    href: string;
    external?: boolean;
  };
  className?: string;
}

export default function TransparencyHeroBanner({
  badge = 'Transparency & Public Accountability',
  badgeIcon,
  title,
  description,
  tags = [
    { label: 'Municipality of Morong, Rizal' },
    { label: 'Full Disclosure Policy' },
    { label: 'Official Public Record', highlight: true },
  ],
  action,
  className = '',
}: TransparencyHeroBannerProps) {
  return (
    <div
      className={`bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden mb-8 ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-200 mb-3 border border-white/10">
          {badgeIcon || <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />}
          <span>{badge}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-blue-200/90 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}

        {/* Bottom Tags / Meta & Action */}
        {(tags.length > 0 || action) && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-5 pt-4 border-t border-white/10 text-xs text-blue-200">
            {tags.map((tag, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-md ${
                  tag.highlight
                    ? 'bg-blue-500/20 text-white font-semibold border border-blue-400/30'
                    : 'bg-white/10 text-blue-200'
                }`}
              >
                {tag.label}
              </span>
            ))}

            {action && (
              <a
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1 text-blue-300 hover:text-white transition-colors underline ml-auto font-medium"
              >
                <span>{action.label}</span>
                {action.external && <ExternalLink className="w-3 h-3" />}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
