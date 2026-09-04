'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import SideFilter from '../components/Human-resources/SideFilter';
import RsourcesDataTable from '../components/Human-resources/RsourcesDataTable';

function HumanResourcesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);

    const params = new URLSearchParams(searchParams.toString());
    if (val.trim()) {
      params.set('search', val);
    } else {
      params.delete('search');
    }
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Filters - Left Column */}
        <aside className="w-full lg:w-72 shrink-0">
          <SideFilter />
        </aside>

        {/* Main Content Area - Right Column */}
        <main className="flex-1 min-w-0 flex flex-col gap-5">
          
          {/* Header Row: Title & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-base-content">Waitlist</h1>
            
            {/* Live Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search User"
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-4 pr-10 py-2 bg-base-100 border border-base-300 rounded-lg text-sm text-base-content placeholder:text-base-content/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Sub-Header Tabs */}
          <div className="flex items-center gap-2 border-b border-base-300 pb-1">
            <button className="px-4 py-2 text-sm font-semibold text-base-content bg-base-300 rounded-lg shadow-sm">
              Service Providers
            </button>
            <button className="px-4 py-2 text-sm font-medium text-base-content/60 hover:text-base-content rounded-lg transition-colors">
              Customers
            </button>
          </div>

          {/* Data Table Wrapper */}
          <div className="rounded-xl shadow-sm overflow-hidden">
            <RsourcesDataTable />
          </div>

        </main>

      </div>
    </div>
  );
}

export default function HumanResourcesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base-200 p-6 flex items-center justify-center text-base-content/70">Loading...</div>}>
      <HumanResourcesContent />
    </Suspense>
  );
}