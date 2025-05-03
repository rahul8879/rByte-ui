import { ArrowRight, TrendingUp, BarChart3, LineChart } from "lucide-react"

export default function JobMarketTrends() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-6">
        <h3 className="text-xl font-bold text-white">2025 AI Job Market Analysis</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              Job Market Transformation (2020-2025)
            </h4>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Traditional Data Science Roles</span>
                  <span className="text-sm font-medium text-red-600">-42%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Significant decline since 2020</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">GenAI Engineering Roles</span>
                  <span className="text-sm font-medium text-green-600">+287%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Explosive growth since 2022</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Companies Adopting GenAI</span>
                  <span className="text-sm font-medium text-purple-600">89%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "89%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Of Fortune 500 companies in 2025</p>
              </div>
            </div>

            {/* Job Growth Chart */}
            <div className="mt-6 bg-white p-4 rounded-lg border border-slate-200">
              <h5 className="text-sm font-semibold mb-3">AI Job Growth (2020-2025)</h5>
              <div className="h-64 relative">
                {/* Chart background grid */}
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                  {Array(25)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="border-t border-l border-slate-100"></div>
                    ))}
                </div>

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500 py-2">
                  <span>300%</span>
                  <span>225%</span>
                  <span>150%</span>
                  <span>75%</span>
                  <span>0%</span>
                </div>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-10 right-0 flex justify-between text-xs text-slate-500">
                  <span>2020</span>
                  <span>2021</span>
                  <span>2022</span>
                  <span>2023</span>
                  <span>2024</span>
                  <span>2025</span>
                </div>

                {/* Traditional Data Science line */}
                <svg className="absolute inset-0 mt-2 ml-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                  <path
                    d="M0,100 L60,90 L120,85 L180,75 L240,65 L300,58"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="100" r="3" fill="#ef4444" />
                  <circle cx="60" cy="90" r="3" fill="#ef4444" />
                  <circle cx="120" cy="85" r="3" fill="#ef4444" />
                  <circle cx="180" cy="75" r="3" fill="#ef4444" />
                  <circle cx="240" cy="65" r="3" fill="#ef4444" />
                  <circle cx="300" cy="58" r="3" fill="#ef4444" />
                </svg>

                {/* GenAI Engineering line */}
                <svg className="absolute inset-0 mt-2 ml-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                  <path
                    d="M0,180 L60,170 L120,140 L180,80 L240,30 L300,10"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="180" r="3" fill="#22c55e" />
                  <circle cx="60" cy="170" r="3" fill="#22c55e" />
                  <circle cx="120" cy="140" r="3" fill="#22c55e" />
                  <circle cx="180" cy="80" r="3" fill="#22c55e" />
                  <circle cx="240" cy="30" r="3" fill="#22c55e" />
                  <circle cx="300" cy="10" r="3" fill="#22c55e" />
                </svg>
              </div>
              {/* Legend - moved below the chart */}
              <div className="flex justify-center items-center gap-6 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>GenAI</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span>Traditional</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
              Skill Demand & Compensation (2025)
            </h4>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Traditional ML Skills</span>
                  <span className="text-sm font-medium text-slate-700">GenAI Skills</span>
                </div>
                <div className="relative pt-8">
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">₹15-22 LPA</div>
                    <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                      ₹25-45 LPA
                    </div>
                  </div>
                  <p className="text-xs text-center text-slate-500 mt-2">Average salary comparison in 2025</p>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-md">
                <p className="text-sm text-amber-800">
                  <span className="font-bold">Key Insight:</span> 92% of data scientists report needing to upskill in
                  GenAI to remain competitive in the 2025 job market.
                </p>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded-r-md">
                <p className="text-sm text-indigo-800">
                  <span className="font-bold">Industry Trend:</span> Companies are replacing traditional ML pipelines
                  with GenAI solutions at a rate of 5:1 in 2025.
                </p>
              </div>
            </div>

            {/* Future Predictions Chart */}
            <div className="mt-6 bg-white p-4 rounded-lg border border-slate-200">
              <h5 className="text-sm font-semibold mb-3 flex items-center">
                <LineChart className="h-4 w-4 text-purple-500 mr-1" />
                AI Job Market Forecast (2025-2030)
              </h5>
              <div className="h-64 relative">
                {/* Chart background grid */}
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                  {Array(25)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="border-t border-l border-slate-100"></div>
                    ))}
                </div>

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500 py-2">
                  <span>500%</span>
                  <span>375%</span>
                  <span>250%</span>
                  <span>125%</span>
                  <span>0%</span>
                </div>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-10 right-0 flex justify-between text-xs text-slate-500">
                  <span>2025</span>
                  <span>2026</span>
                  <span>2027</span>
                  <span>2028</span>
                  <span>2029</span>
                  <span>2030</span>
                </div>

                {/* Forecast line */}
                <svg className="absolute inset-0 mt-2 ml-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                  <path d="M0,80 L60,60 L120,40 L180,25 L240,15 L300,10" fill="none" stroke="#a855f7" strokeWidth="2" />
                  <circle cx="0" cy="80" r="3" fill="#a855f7" />
                  <circle cx="60" cy="60" r="3" fill="#a855f7" />
                  <circle cx="120" cy="40" r="3" fill="#a855f7" />
                  <circle cx="180" cy="25" r="3" fill="#a855f7" />
                  <circle cx="240" cy="15" r="3" fill="#a855f7" />
                  <circle cx="300" cy="10" r="3" fill="#a855f7" />

                  {/* Forecast area */}
                  <path
                    d="M0,80 L60,60 L120,40 L180,25 L240,15 L300,10 L300,200 L0,200 Z"
                    fill="url(#purpleGradient)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Forecast uncertainty range */}
                <svg className="absolute inset-0 mt-2 ml-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                  <path
                    d="M0,90 L60,75 L120,55 L180,40 L240,30 L300,25"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  <path
                    d="M0,70 L60,45 L120,25 L180,15 L240,10 L300,5"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                </svg>
              </div>
              <div className="text-xs text-center text-slate-500 mt-2">
                Projected growth of GenAI engineering roles with uncertainty range (dashed lines)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">98%</p>
            <p className="text-xs text-slate-600">of AI job postings now require GenAI skills</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">4.2x</p>
            <p className="text-xs text-slate-600">faster interview callbacks for GenAI skills</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">78%</p>
            <p className="text-xs text-slate-600">of data scientists transitioning to GenAI roles</p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
          <h5 className="text-sm font-semibold mb-2">2025 Industry Insights</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-medium">Specialized AI Roles:</span> The market has shifted from generalist AI
                roles to specialized positions in RAG systems, LLM fine-tuning, and AI agents development.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BarChart3 className="h-3 w-3 text-blue-600" />
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-medium">Compensation Trends:</span> Companies are offering 30-50% premium for
                professionals with proven GenAI engineering experience compared to traditional ML roles.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <LineChart className="h-3 w-3 text-amber-600" />
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-medium">Future Outlook:</span> By 2030, AI engineering is projected to be among
                the top 3 highest-paid technical roles across all industries.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <LineChart className="h-3 w-3 text-purple-600" />
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-medium">Emerging Sectors:</span> Healthcare, legal, and manufacturing sectors are
                showing the fastest growth in AI engineering hiring in 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
