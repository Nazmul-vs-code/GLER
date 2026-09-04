'use client';

import Link from 'next/link';
import { useState } from 'react';

const FUNNY_EXCUSES = [
  "A cosmic ray flipped a bit on our servers.",
  "The dog ate this URL.",
  "A developer forgot to push to production.",
  "This page is currently on a tea break in London.",
  "You typed fast enough to break the space-time continuum.",
  "Error 404: Page went to buy milk and never returned."
];

export default function NotFound() {
  const [excuseIndex, setExcuseIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const triggerPanic = () => {
    setIsShaking(true);
    setExcuseIndex((prev) => (prev + 1) % FUNNY_EXCUSES.length);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <main className={`min-h-screen bg-base-100 text-base-content flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ${isShaking ? 'animate-bounce' : ''}`}>
      
      {/* Floating 404 Header */}
      <div className="relative mb-6">
        <h1 className="text-8xl sm:text-9xl font-black text-primary tracking-widest animate-pulse select-none drop-shadow-lg">
          404
        </h1>
        <span className="absolute -top-3 -right-6 bg-secondary text-secondary-content text-xs font-extrabold px-3 py-1 rounded-full rotate-12 shadow-md">
          LOST IN SPACE!
        </span>
      </div>

      {/* Funny Animated Meme Container */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-4 border-primary shadow-2xl mb-8 group hover:scale-105 transition-transform duration-300 bg-base-200">
        <img
          src="https://media.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif"
          alt="Confused John Travolta looking around"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-transparent to-transparent flex items-end justify-center pb-3">
          <p className="text-xs font-semibold text-base-content/80 bg-base-100/90 px-3 py-1 rounded-full backdrop-blur-sm border border-base-300">
            Where is this page supposed to be?
          </p>
        </div>
      </div>

      {/* Dynamic Excuse Card */}
      <div className="max-w-md w-full bg-base-200 border border-base-300 rounded-xl p-5 shadow-lg mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
          Official Status Reason
        </p>
        <p className="text-base font-medium text-base-content italic min-h-[3rem] flex items-center justify-center">
          "{FUNNY_EXCUSES[excuseIndex]}"
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="btn btn-primary px-6 shadow-lg hover:shadow-primary/40 transition-all font-bold"
        >
          🚀 Take Me Home
        </Link>

        <button
          type="button"
          onClick={triggerPanic}
          className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content transition-all font-bold"
        >
          🚨 Blame the Developer
        </button>
      </div>

    </main>
  );
}