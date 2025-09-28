import React from 'react';

export default function Button({children, variant='primary', className='', ...props}){
  const base = "inline-flex items-center justify-center rounded-xl font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-[var(--accent)] text-white shadow-md hover:shadow-lg px-4 py-2",
    outline: "border border-[var(--muted)] text-[var(--accent)] bg-transparent px-4 py-2",
    ghost: "bg-transparent text-[var(--text)] hover:bg-[var(--muted)]/60 px-3 py-2"
  };
  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
