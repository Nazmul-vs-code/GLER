'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { 
  FaPencilAlt, 
  FaSort, 
  FaSortUp, 
  FaSortDown 
} from 'react-icons/fa';
import EditModal from './EditModal';
import Pagination from './Pagination';

export interface ServiceProvider {
  id: string;
  name?: string;
  email: string;
  phone: string;
  postcode: string;
  vendorType: 'Independent' | 'Company';
  serviceOffering: string[];
  signupDate: string;
  status: 'Onboarded' | 'Rejected' | 'Pending';
  country?: string;
  notes?: string;
}

type SortKey = keyof ServiceProvider;

interface RsourcesDataTableProps {
  onEditUser?: (user: ServiceProvider) => void;
  itemsPerPage?: number;
}

export default function RsourcesDataTable({ 
  onEditUser, 
  itemsPerPage = 8 
}: RsourcesDataTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);

  // Modal State
  const [activeUser, setActiveUser] = useState<ServiceProvider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Read current page from URL search parameters
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get('page');
    const parsedPage = pageParam ? parseInt(pageParam, 10) : 1;
    return isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  }, [searchParams]);

  // Fetch initial data
  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load table data:', err);
        setLoading(false);
      });
  }, []);

  // Filter Data based on Query Parameters
  const filteredData = useMemo(() => {
    const searchQuery = searchParams.get('search')?.toLowerCase().trim() || '';
    const postcodeFilter = searchParams.get('postcode')?.toLowerCase().trim() || '';
    const statusFilter = searchParams.get('status')?.split(',').filter(Boolean) || [];
    const vendorFilter = searchParams.get('vendorType')?.split(',').filter(Boolean) || [];
    const serviceFilter = searchParams.get('serviceOffering')?.split(',').filter(Boolean) || [];
    const startDateStr = searchParams.get('startDate') || '';
    const endDateStr = searchParams.get('endDate') || '';

    return data.filter((item) => {
      // Search Filter (matches email, phone, or name)
      if (searchQuery) {
        const matchesEmail = item.email.toLowerCase().includes(searchQuery);
        const matchesPhone = item.phone.toLowerCase().includes(searchQuery);
        const matchesName = item.name ? item.name.toLowerCase().includes(searchQuery) : false;
        if (!matchesEmail && !matchesPhone && !matchesName) return false;
      }

      // Postcode Filter
      if (postcodeFilter && !item.postcode.toLowerCase().includes(postcodeFilter)) {
        return false;
      }

      // Registration Status Filter
      if (statusFilter.length > 0 && !statusFilter.includes(item.status)) {
        return false;
      }

      // Vendor Type Filter
      if (vendorFilter.length > 0 && !vendorFilter.includes(item.vendorType)) {
        return false;
      }

      // Service Offering Filter
      if (serviceFilter.length > 0) {
        const offerings = Array.isArray(item.serviceOffering) ? item.serviceOffering : [item.serviceOffering];
        const hasServiceMatch = serviceFilter.some((service) => offerings.includes(service));
        if (!hasServiceMatch) return false;
      }

      // Date Range Filter
      if (startDateStr || endDateStr) {
        const itemTime = new Date(item.signupDate).getTime();

        if (startDateStr) {
          const startTime = new Date(startDateStr).getTime();
          if (!isNaN(startTime) && itemTime < startTime) return false;
        }

        if (endDateStr) {
          const endTime = new Date(endDateStr).getTime();
          if (!isNaN(endTime) && itemTime > endTime) return false;
        }
      }

      return true;
    });
  }, [data, searchParams]);

  // Sorting Handler
  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Processed Sorted Data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? '';
      const bVal = b[sortConfig.key] ?? '';

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Dynamic Pagination Calculations
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  }, [sortedData.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  // URL Query Handler for Page Changes
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Select All Handlers (Current Page Only)
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const currentPageIds = paginatedData.map((item) => item.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    } else {
      const currentPageIds = new Set(paginatedData.map((item) => item.id));
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.has(id)));
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedIds.includes(item.id));

  // Modal Handlers
  const handleOpenModal = (user: ServiceProvider) => {
    setActiveUser(user);
    setIsModalOpen(true);
    if (onEditUser) {
      onEditUser(user);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveUser(null);
  };

  const handleStatusUpdate = (userId: string, newStatus: 'Onboarded' | 'Rejected', updatedNotes: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === userId ? { ...item, status: newStatus, notes: updatedNotes } : item
      )
    );
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortConfig?.key !== key) return <FaSort className="inline text-base-content/30 ml-1 text-[10px]" />;
    return sortConfig.direction === 'asc' ? (
      <FaSortUp className="inline text-blue-600 ml-1 text-[10px]" />
    ) : (
      <FaSortDown className="inline text-blue-600 ml-1 text-[10px]" />
    );
  };

  if (loading) {
    return <div className="p-8 text-center text-base-content/60 text-xs font-medium">Loading service providers...</div>;
  }

  return (
    <div className="w-full h-full max-h-[calc(100vh-140px)] flex flex-col bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
      
      {/* Scrollable Table Area */}
      <div className="flex-1 overflow-auto min-h-0">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-base-200 border-b border-base-300 z-10">
            <tr className="text-[11px] font-semibold text-base-content/80 whitespace-nowrap">
              <th className="px-3 py-2.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="checkbox checkbox-xs border-base-content/40 rounded cursor-pointer"
                />
              </th>
              <th className="px-3 py-2.5 cursor-pointer select-none hover:text-base-content transition-colors" onClick={() => handleSort('email')}>
                Email {renderSortIcon('email')}
              </th>
              <th className="px-3 py-2.5 cursor-pointer select-none hover:text-base-content transition-colors" onClick={() => handleSort('phone')}>
                Phone Number {renderSortIcon('phone')}
              </th>
              <th className="px-3 py-2.5 cursor-pointer select-none hover:text-base-content transition-colors" onClick={() => handleSort('postcode')}>
                Postcode {renderSortIcon('postcode')}
              </th>
              <th className="px-3 py-2.5 cursor-pointer select-none hover:text-base-content transition-colors" onClick={() => handleSort('vendorType')}>
                Vendor Type {renderSortIcon('vendorType')}
              </th>
              <th className="px-3 py-2.5">Service Offering</th>
              <th className="px-3 py-2.5 cursor-pointer select-none hover:text-base-content transition-colors" onClick={() => handleSort('signupDate')}>
                Signup Date {renderSortIcon('signupDate')}
              </th>
              <th className="px-3 py-2.5 cursor-pointer select-none hover:text-base-content transition-colors" onClick={() => handleSort('status')}>
                Status {renderSortIcon('status')}
              </th>
              <th className="px-3 py-2.5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-300 text-[11px] text-base-content/80">
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-blue-50/40 transition-colors ${
                      isSelected ? 'bg-blue-500/10' : ''
                    }`}
                  >
                    <td className="px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(row.id)}
                        className="checkbox checkbox-xs border-base-content/40 rounded cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-2 font-medium text-base-content whitespace-nowrap">{row.email}</td>
                    <td className="px-3 py-2 text-base-content/70 whitespace-nowrap">{row.phone}</td>
                    <td className="px-3 py-2 font-semibold uppercase whitespace-nowrap">{row.postcode}</td>
                    <td className="px-3 py-2 text-base-content/70 whitespace-nowrap">{row.vendorType}</td>
                    <td className="px-3 py-2 max-w-[220px] truncate" title={Array.isArray(row.serviceOffering) ? row.serviceOffering.join(' | ') : row.serviceOffering}>
                      {Array.isArray(row.serviceOffering) 
                        ? row.serviceOffering.join(' | ') 
                        : row.serviceOffering}
                    </td>
                    <td className="px-3 py-2 text-base-content/70 whitespace-nowrap">{row.signupDate}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {row.status === 'Onboarded' && <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Onboarded</span>}
                      {row.status === 'Rejected' && <span className="font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">Rejected</span>}
                      {row.status !== 'Onboarded' && row.status !== 'Rejected' && <span className="text-base-content/40">-</span>}
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(row)}
                        className="p-1 text-base-content/60 hover:text-blue-600 hover:bg-blue-500/10 rounded-full transition-all cursor-pointer"
                        title="Edit / View Details"
                      >
                        <FaPencilAlt className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-8 text-base-content/50 text-xs font-medium">
                  No service providers match the current filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal Component */}
      <EditModal
        isOpen={isModalOpen}
        user={activeUser}
        onClose={handleCloseModal}
        onStatusUpdate={handleStatusUpdate}
      />

      {/* Pinned Bottom Pagination */}
      <div className="shrink-0 border-t border-base-300 bg-base-100">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}