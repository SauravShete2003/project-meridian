import React from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Home(){
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <header className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern agent dashboard with premium, minimal UI
            </h1>
            <p className="mt-4 text-base text-gray-600 max-w-xl font-medium">
              Fast, clean, and responsive interface that focuses on clarity and speed — glassy surfaces, soft shadows and a single accent color to guide user actions.
            </p>



            <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white shadow-lg flex items-center justify-center font-bold text-blue-600">A</div>
                <div>
                  <div className="font-semibold text-gray-800">1000+ Agents</div>
                  <div className="text-xs">Deployed worldwide</div>
                </div>
              </div>
            </div>
          </div>

          <div>
          <div className="grid grid-cols-1 gap-4 animate-fade-in delay-200">
              <Card title="Active assignments">
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Assignment #2384</div>
                      <div className="text-xs text-gray-500">Due: Sep 30</div>
                    </div>
                    <div className="text-sm text-blue-600 font-semibold">In progress</div>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Assignment #2379</div>
                      <div className="text-xs text-gray-500">Due: Oct 2</div>
                    </div>
                    <div className="text-sm text-gray-500">Queued</div>
                  </li>
                </ul>
              </Card>

              <Card title="Quick upload">
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-gray-600">Drag & drop files or click to upload agent data</p>
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

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Core features</h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto text-center">A lightweight suite of tools to manage agents, assign tasks, and monitor progress.</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Fast assignment">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span className="font-semibold">Lightning Fast</span>
              </div>
              Auto-distribute tasks with confidence scoring.
            </Card>
            <Card title="Secure uploads">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span className="font-semibold">Secure & Safe</span>
              </div>
              Encrypted file uploads with resumable support.
            </Card>
            <Card title="Real-time insights">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <span className="font-semibold">Live Analytics</span>
              </div>
              Live dashboards and agent telemetry.
            </Card>
          </div>
        </div>
      </section>


    </div>
  );
}
