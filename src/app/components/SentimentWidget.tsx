import { Smile, Meh, Frown } from 'lucide-react';

export function SentimentWidget() {
  const sentiments = [
    { label: 'Positive', value: 68, color: '#10B981', icon: Smile },
    { label: 'Neutral', value: 24, color: '#F59E0B', icon: Meh },
    { label: 'Negative', value: 8, color: '#EF4444', icon: Frown },
  ];

  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[#F1F5F9] font-semibold mb-1">Sentination</h3>
        <p className="text-xs text-[#94A3B8]">Team Sentiment Score: <span className="text-[#10B981]">8/10</span></p>
      </div>

      {/* Sentiment Bars */}
      <div className="space-y-3 mb-4">
        {sentiments.map((sentiment, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <sentiment.icon className="w-4 h-4" style={{ color: sentiment.color }} />
                <span className="text-sm text-[#F1F5F9]">{sentiment.label}</span>
              </div>
              <span className="text-sm font-semibold" style={{ color: sentiment.color }}>
                {sentiment.value}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${sentiment.value}%`,
                  backgroundColor: sentiment.color,
                  boxShadow: `0 0 8px ${sentiment.color}40`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      <div className="pt-4 border-t border-[#1E293B]">
        <div className="flex items-start gap-2 text-xs text-[#94A3B8]">
          <span>💬</span>
          <p className="italic">"Smokes are much smoother!"</p>
        </div>
      </div>
    </div>
  );
}
