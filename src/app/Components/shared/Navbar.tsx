'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBell } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { nav: 'Service Dashboard', href: '/service-dashboard' },
  { nav: 'Finance Forecast', href: '/finance-forecast' },
  { nav: 'Human Resources', href: '/human-resources' },
  { nav: 'Users', href: '/users' },
  { nav: 'Compliances & Verification', href: '/compliances-and-verification' },
];

export default function Navbar() {
  const pathname = usePathname();

  const handleUnderDevelopment = (featureName: string) => {
    toast(`${featureName} : feature is under development! 🛠️`);
  };

  return (
    <header className="w-full bg-base-100 border-b border-base-300 px-6 py-3">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img 
            src="/Logo.png" 
            alt="gler logo" 
            className="h-8 w-auto object-contain" 
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors duration-150 ${
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-base-content/70 hover:text-base-content font-medium'
                }`}
              >
                {item.nav}
              </Link>
            );
          })}
        </nav>

        {/* User Actions & Profile */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => handleUnderDevelopment('Notifications')}
            className="p-2 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-full transition-colors cursor-pointer"
          >
            <FaBell className="w-4 h-4" />
          </button>

          <button
            type="button"
            aria-label="Messages"
            onClick={() => handleUnderDevelopment('Messages')}
            className="p-2 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-full transition-colors cursor-pointer"
          >
            <FaMessage className="w-4 h-4" />
          </button>

          {/* User Profile Info */}
          <div className="flex items-center gap-3 pl-2">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-base-200 border border-base-300">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                alt="Max Smith profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs font-bold text-base-content">Max Smith</p>
              <p className="text-[10px] text-base-content/60">London, UK</p>
            </div>
          </div>
        </div>

        {/* Toggle themeing */}
        <ThemeToggle />
      </div>
    </header>
  );
}