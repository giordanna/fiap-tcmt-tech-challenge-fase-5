import { Brain, AlertTriangle, Send } from 'lucide-react';

export function AICopilotWidget() {
  return (
    <div 
      className="rounded-2xl p-6 border border-[#A855F7]/20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(0, 217, 255, 0.05) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(168, 85, 247, 0.15)',
      }}
    >
      {/* Glassmorphism overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[#F1F5F9] font-semibold">Agile Copilot</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
              <span className="text-xs text-[#94A3B8]">Active Monitoring</span>
            </div>
          </div>
        </div>

        {/* Alert Card */}
        <div className="bg-[#0A0E1A]/40 backdrop-blur-sm border border-[#F59E0B]/30 rounded-xl p-4 mb-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#F1F5F9] mb-1">
                <span className="text-[#F59E0B]">Silent Impediment Detected</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Card <span className="text-[#00D9FF] font-mono">AB#402</span> has been stalled for <span className="text-[#F59E0B]">48h</span> with no updates
              </p>
            </div>
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="bg-[#A855F7]/10 backdrop-blur-sm border border-[#A855F7]/30 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7] mt-1.5"></div>
            <div>
              <span className="text-xs text-[#A855F7] font-semibold">AI SUGGESTION</span>
            </div>
          </div>
          <p className="text-sm text-[#F1F5F9] pl-3.5">
            Notify Tech Lead <span className="text-[#00D9FF]">@rafael.costa</span> about potential blocker. Similar issues took avg. 3.2 days to resolve.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            <span className="text-sm">Send Notification</span>
          </button>
          <button className="px-4 py-2.5 border border-[#1E293B] hover:border-[#94A3B8] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors text-sm">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
