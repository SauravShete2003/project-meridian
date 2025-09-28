import React from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Home(){
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <header className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Modern agent dashboard with premium, minimal UI
            </h1>
            <p className="mt-4 text-base text-[var(--text-muted)] max-w-xl">
              Fast, clean, and responsive interface that focuses on clarity and speed — glassy surfaces, soft shadows and a single accent color to guide user actions.
            </p>

            <div className="mt-6 flex gap-4">
              <Button variant="primary">Get started</Button>
              <Button variant="outline">Documentation</Button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--surface)] shadow-sm flex items-center justify-center">A</div>
                <div>
                  <div className="font-medium text-[var(--text)]">1000+ Agents</div>
                  <div className="text-xs">Deployed worldwide</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-4">
              <Card title="Active assignments">
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Assignment #2384</div>
                      <div className="text-xs text-[var(--text-muted)]">Due: Sep 30</div>
                    </div>
                    <div className="text-sm text-[var(--accent)]">In progress</div>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Assignment #2379</div>
                      <div className="text-xs text-[var(--text-muted)]">Due: Oct 2</div>
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">Queued</div>
                  </li>
                </ul>
              </Card>

              <Card title="Quick upload">
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-[var(--text-muted)]">Drag & drop files or click to upload agent data</p>
                  <div className="flex items-center gap-3">
                    <Button variant="primary">Upload file</Button>
                    <Button variant="ghost">From URL</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-[var(--text)]">Core features</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)] max-w-2xl">A lightweight suite of tools to manage agents, assign tasks, and monitor progress.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Fast assignment">Auto-distribute tasks with confidence scoring.</Card>
            <Card title="Secure uploads">Encrypted file uploads with resumable support.</Card>
            <Card title="Real-time insights">Live dashboards and agent telemetry.</Card>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-xl p-8 bg-[var(--surface)] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-lg font-semibold">Ready to modernize your workflow?</div>
              <div className="text-sm text-[var(--text-muted)] mt-1">Start a free trial or explore the docs to learn more.</div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Contact sales</Button>
              <Button variant="primary">Start free trial</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
