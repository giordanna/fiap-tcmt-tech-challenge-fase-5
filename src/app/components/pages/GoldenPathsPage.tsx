import { Workflow, Rocket, Database, Code, Shield, Zap } from 'lucide-react';

export function GoldenPathsPage() {
  const paths = [
    {
      name: 'Kubernetes Cluster',
      description: 'Self-service K8s cluster with Istio and monitoring',
      icon: Database,
      color: '#00D9FF',
      uses: 47,
      avgTime: '12 min',
    },
    {
      name: 'API Gateway',
      description: 'Kong-based API gateway with OAuth2 and rate limiting',
      icon: Code,
      color: '#A855F7',
      uses: 34,
      avgTime: '8 min',
    },
    {
      name: 'Microservice Template',
      description: 'Node.js microservice with CI/CD and observability',
      icon: Zap,
      color: '#10B981',
      uses: 89,
      avgTime: '15 min',
    },
    {
      name: 'Secure Database',
      description: 'PostgreSQL with encryption and automated backups',
      icon: Shield,
      color: '#F59E0B',
      uses: 56,
      avgTime: '10 min',
    },
  ];

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center">
              <Workflow className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Golden Paths</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Infrastructure self-service catalog</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#A855F7] hover:bg-[#9333EA] text-white rounded-lg transition-colors flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            <span>Create New Path</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Golden Paths', value: '24', color: '#A855F7' },
          { label: 'Active Deployments', value: '142', color: '#00D9FF' },
          { label: 'Avg Deploy Time', value: '11m', color: '#10B981' },
          { label: 'Success Rate', value: '99.2%', color: '#F59E0B' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
            <div className="text-sm text-[#94A3B8] mb-2">{stat.label}</div>
            <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Golden Paths Grid */}
      <div className="grid grid-cols-2 gap-6">
        {paths.map((path, i) => (
          <div 
            key={i} 
            className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6 hover:border-[#94A3B8]/50 transition-all group cursor-pointer"
          >
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${path.color}20` }}
              >
                <path.icon className="w-7 h-7" style={{ color: path.color }} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-[#F1F5F9] font-semibold mb-1 group-hover:text-[#00D9FF] transition-colors">
                  {path.name}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {path.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-[#1E293B]">
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">Uses</div>
                <div className="text-lg text-[#F1F5F9] font-semibold">{path.uses}</div>
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">Avg Time</div>
                <div className="text-lg text-[#F1F5F9] font-semibold">{path.avgTime}</div>
              </div>
              <button 
                className="ml-auto px-4 py-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: `${path.color}20`,
                  color: path.color
                }}
              >
                Deploy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
