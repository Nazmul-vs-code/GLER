'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaPencilAlt, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaGlobe, 
  FaCalendarAlt, 
  FaTimes 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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

interface EditModalProps {
  isOpen: boolean;
  user: ServiceProvider | null;
  onClose: () => void;
  onStatusUpdate: (userId: string, newStatus: 'Onboarded' | 'Rejected', updatedNotes: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  user,
  onClose,
  onStatusUpdate,
}) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    if (user) {
      setNoteContent(user.notes || 'No Note Added yet');
      setIsEditingNotes(false);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleAction = (status: 'Onboarded' | 'Rejected') => {
    onStatusUpdate(user.id, status, noteContent);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-base-100 text-base-content rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative border border-base-300 p-6 space-y-5"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-base-content/50 hover:text-base-content p-1 transition-colors cursor-pointer"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base-content/50 text-lg">👤</span>
                <h3 className="text-lg font-bold text-base-content">User Details</h3>
              </div>
              
              <div className="pt-2">
                <h4 className="text-base font-bold text-base-content">{user.name || 'CleanPro Solutions'}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-base-content/50">{user.email}</span>
                  <span className="px-2 py-0.5 bg-base-200 text-base-content/70 text-[10px] rounded-full font-medium">Customer</span>
                  <span className="px-2 py-0.5 bg-base-200 text-base-content/70 text-[10px] rounded-full font-medium">invited</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 pt-1">
              <h5 className="text-xs font-bold text-base-content">Contact Information</h5>
              <div className="grid grid-cols-2 gap-y-2 text-xs text-base-content/70">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-base-content/50 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-base-content/50 shrink-0" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-base-content/50 shrink-0" />
                  <span>{user.country || 'United Kingdom'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-base-content/50 shrink-0" />
                  <span>Signed up {user.signupDate}</span>
                </div>
              </div>
            </div>

            {/* Details & Offerings */}
            <div className="space-y-2">
              <div>
                <h5 className="text-xs font-bold text-gray-800 mb-1">Customer Details</h5>
                <span className="text-xs text-gray-600 capitalize">
                  👤 {user.vendorType === 'Independent' ? 'individual' : 'company'}
                </span>
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-800 mb-1">Service Offerings / Skills</h5>
                <p className="text-xs text-gray-600 capitalize">
                  {Array.isArray(user.serviceOffering) 
                    ? user.serviceOffering.join(' | ') 
                    : user.serviceOffering}
                </p>
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-gray-800">Internal Notes</h5>
                <button
                  type="button"
                  onClick={() => setIsEditingNotes(!isEditingNotes)}
                  className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                >
                  <FaPencilAlt className="w-2.5 h-2.5" />
                  <span>Edit</span>
                </button>
              </div>

              {isEditingNotes ? (
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full h-20 p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              ) : (
                <div className="bg-gray-100/70 p-3 rounded-lg text-xs text-gray-500 min-h-[60px]">
                  {noteContent}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleAction('Onboarded')}
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Onboard
              </button>
              <button
                type="button"
                onClick={() => handleAction('Rejected')}
                className="px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Reject
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;