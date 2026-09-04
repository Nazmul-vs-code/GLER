'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { FaCalendarAlt } from 'react-icons/fa';
import Logo from '../shared/Logo';

interface SideFilterProps {
  onApplyFilters?: (filters: {
    postcode: string;
    status: string[];
    startDate: string;
    endDate: string;
    vendorType: string[];
    serviceOffering: string[];
  }) => void;
  onClearFilters?: () => void;
}

export default function SideFilter({ onApplyFilters, onClearFilters }: SideFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Filter States
  const [postcode, setPostcode] = useState('');
  const [status, setStatus] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vendorType, setVendorType] = useState<string[]>([]);
  const [serviceOffering, setServiceOffering] = useState<string[]>([]);

  // Sync state with URL query params on mount/navigation
  useEffect(() => {
    setPostcode(searchParams.get('postcode') || '');
    
    const statusParam = searchParams.get('status');
    setStatus(statusParam ? statusParam.split(',').filter(Boolean) : []);

    setStartDate(searchParams.get('startDate') || '');
    setEndDate(searchParams.get('endDate') || '');

    const vendorParam = searchParams.get('vendorType');
    setVendorType(vendorParam ? vendorParam.split(',').filter(Boolean) : []);

    const serviceParam = searchParams.get('serviceOffering');
    setServiceOffering(serviceParam ? serviceParam.split(',').filter(Boolean) : []);
  }, [searchParams]);

  const handleCheckboxToggle = (
    value: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Update query params
    if (postcode.trim()) params.set('postcode', postcode.trim());
    else params.delete('postcode');

    if (status.length > 0) params.set('status', status.join(','));
    else params.delete('status');

    if (startDate) params.set('startDate', startDate);
    else params.delete('startDate');

    if (endDate) params.set('endDate', endDate);
    else params.delete('endDate');

    if (vendorType.length > 0) params.set('vendorType', vendorType.join(','));
    else params.delete('vendorType');

    if (serviceOffering.length > 0) params.set('serviceOffering', serviceOffering.join(','));
    else params.delete('serviceOffering');

    // Reset pagination to page 1 when new filters are applied
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);

    if (onApplyFilters) {
      onApplyFilters({
        postcode,
        status,
        startDate,
        endDate,
        vendorType,
        serviceOffering,
      });
    }
  };

  const handleClear = () => {
    setPostcode('');
    setStatus([]);
    setStartDate('');
    setEndDate('');
    setVendorType([]);
    setServiceOffering([]);

    const params = new URLSearchParams(searchParams.toString());
    params.delete('postcode');
    params.delete('status');
    params.delete('startDate');
    params.delete('endDate');
    params.delete('vendorType');
    params.delete('serviceOffering');
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);

    if (onClearFilters) onClearFilters();
  };

  return (
    <div className="bg-base-200 border border-base-300 rounded-2xl p-4 space-y-5 text-base-content text-xs">
      
      {/* Brand Header & Active Section Pill */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <Logo />
          <span className="text-xs font-semibold text-blue-600">✨ Admin Panel</span>
        </div>
        <div className="bg-base-300 text-base-content font-semibold px-3 py-1.5 rounded-lg text-xs text-center shadow-inner">
          User Management
        </div>
      </div>

      {/* Postcode Input */}
      <div className="space-y-1">
        <label className="text-[11px] font-bold text-base-content/80 block">Postcode</label>
        <input
          type="text"
          placeholder="ZIP"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="w-full bg-base-100 border border-base-300 rounded-lg px-2.5 py-1 text-xs text-base-content focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Registration Status */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-base-content/80 block">Registration Status</label>
        <div className="space-y-1.5">
          {['Onboarded', 'Rejected'].map((item) => (
            <label key={item} className="flex items-center gap-2 text-xs text-base-content/80 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={status.includes(item)}
                onChange={() => handleCheckboxToggle(item, status, setStatus)}
                className="checkbox checkbox-xs border-base-content/40 checked:bg-blue-600 rounded"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Registered */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-base-content/80 block">Date Registered</label>
        <div className="grid grid-cols-2 gap-1.5">
          
          {/* Start Date */}
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-base-200 px-1 text-[9px] text-blue-600 font-semibold z-10">
              Start
            </span>
            <div className="flex items-center bg-base-100 border border-blue-400 rounded-lg px-2 py-1">
              <input
                type="text"
                placeholder="MM/DD/YYYY"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-transparent text-[11px] text-base-content placeholder:text-base-content/50 focus:outline-none"
              />
              <FaCalendarAlt className="text-gray-400 text-[10px] shrink-0 ml-1" />
            </div>
          </div>

          {/* End Date */}
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-base-200 px-1 text-[9px] text-blue-600 font-semibold z-10">
              End
            </span>
            <div className="flex items-center bg-base-100 border border-blue-400 rounded-lg px-2 py-1">
              <input
                type="text"
                placeholder="MM/DD/YYYY"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-transparent text-[11px] text-base-content placeholder:text-base-content/50 focus:outline-none"
              />
              <FaCalendarAlt className="text-gray-400 text-[10px] shrink-0 ml-1" />
            </div>
          </div>

        </div>
      </div>

      {/* Vendor Type */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-base-content/80 block">Vendor Type</label>
        <div className="space-y-1.5">
          {['Independent', 'Company'].map((item) => (
            <label key={item} className="flex items-center gap-2 text-xs text-base-content/80 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={vendorType.includes(item)}
                onChange={() => handleCheckboxToggle(item, vendorType, setVendorType)}
                className="checkbox checkbox-xs border-base-content/40 checked:bg-blue-600 rounded"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Service Offering */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-base-content/80 block">Service Offering</label>
        <div className="space-y-1.5">
          {['Housekeeping', 'Window Cleaning', 'Car Valet'].map((item) => (
            <label key={item} className="flex items-center gap-2 text-xs text-base-content/80 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={serviceOffering.includes(item)}
                onChange={() => handleCheckboxToggle(item, serviceOffering, setServiceOffering)}
                className="checkbox checkbox-xs border-base-content/40 checked:bg-blue-600 rounded"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-1 space-y-1.5">
        <button
          type="button"
          onClick={handleApply}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-full text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          Filter
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="w-full text-xs text-base-content/60 hover:text-base-content py-0.5 transition-colors text-center cursor-pointer block"
        >
          Clear Filters
        </button>
      </div>

    </div>
  );
}