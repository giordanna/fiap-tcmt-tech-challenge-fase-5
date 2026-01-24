import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  };

  const colors = {
    success: { bg: 'bg-[#10B981]/10', border: 'border-[#10B981]/30', text: 'text-[#10B981]' },
    error: { bg: 'bg-[#EF4444]/10', border: 'border-[#EF4444]/30', text: 'text-[#EF4444]' },
    info: { bg: 'bg-[#00D9FF]/10', border: 'border-[#00D9FF]/30', text: 'text-[#00D9FF]' },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => {
          const Icon = icons[toast.type];
          const color = colors[toast.type];
          
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border ${color.bg} ${color.border} shadow-lg animate-in slide-in-from-right fade-in duration-300`}
            >
              <Icon className={`w-5 h-5 ${color.text}`} />
              <span className="text-sm text-[#F1F5F9]">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
