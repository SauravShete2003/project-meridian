import React, {useState} from 'react';

export default function Navbar(){
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-transparent backdrop-blur-sm py-4">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a className="text-lg font-semibold tracking-tight text-[var(--text)]" href="#">Meridian</a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition" href="#features">Features</a>
          <a className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition" href="#agents">Agents</a>
          <a className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition" href="#upload">Upload</a>
          <a className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white shadow-md hover:shadow-lg transition text-sm" href="#app">Get started</a>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)]"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 mt-3">
          <div className="flex flex-col gap-3">
            <a className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]" href="#features">Features</a>
            <a className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]" href="#agents">Agents</a>
            <a className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]" href="#upload">Upload</a>
            <a className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-center" href="#app">Get started</a>
          </div>
        </div>
      )}
    </nav>
  );
}
