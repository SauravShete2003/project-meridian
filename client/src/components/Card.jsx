import React from 'react';

export default function Card({title, children, footer, className = ''}){
  return (
    <article className={`rounded-xl bg-[var(--surface)] shadow-lg p-6 border border-transparent ${className}`}>
      <header className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      </header>
      <div className="mt-3 text-sm text-[var(--text-muted)]">{children}</div>
      {footer && <footer className="mt-4 text-sm">{footer}</footer>}
    </article>
  );
}
