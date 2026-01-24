import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-[#131827] border border-[#1E293B] rounded-2xl w-full ${sizeClasses[size]} shadow-2xl animate-in fade-in zoom-in-95 duration-200`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1E293B]">
          <h2 className="text-lg font-semibold text-[#F1F5F9]">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B]/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
