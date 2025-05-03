"use client"

import { LineChart, BarChart3, TrendingUp, BrainCircuit } from "lucide-react"

export default function FutureJobMarketPredictions() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-6">
        <h3 className="text-xl font-bold text-white">AI Job Market Forecast (2025-2030)</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <LineChart className="h-5 w-5 text-blue-500 mr-2" />
              Emerging AI Specializations (2025-2030)
            </h4>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">AI Agent Engineering</span>
                  <span className="text-sm font-medium text-green-600">+312%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Projected growth by 2030</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Multimodal AI Systems</span>
                  <span className="text-sm font-medium text-green-600">+275%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Projected growth by 2030</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">AI Ethics & Governance</span>
                  <span className="text-sm font-medium text-green-600">+218%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Projected growth by 2030</p>
              </div>
            </div>

            {/* Industry Adoption Chart */}
            <div className="mt-6 bg-white p-4 rounded-lg border border-slate-200">
              <h5 className="text-sm font-semibold mb-3">Industry AI Adoption (2025-2030)</h5>
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
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
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

                {/* Healthcare line */}
                <svg className="absolute inset-0 mt-2 ml-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                  <path
                    d="M0,100 L60,80 L120,60 L180,40 L240,25 L300,15"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="100" r="3" fill="#06b6d4" />
                  <circle cx="60" cy="80" r="3" fill="#06b6d4" />
                  <circle cx="120" cy="60" r="3" fill="#06b6d4" />
                  <circle cx="180" cy="40" r="3" fill="#06b6d4" />
                  <circle cx="240" cy="25" r="3" fill="#06b6d4" />
                  <circle cx="300" cy="15" r="3" fill="#06b6d4" />
                </svg>

                {/* Manufacturing line */}
                <svg className="absolute inset-0 mt-2 ml-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                  <path
                    d="M0,120 L60,100 L120,80 L180,60 L240,40 L300,25"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="120" r="3" fill="#f59e0b" />
                  <circle cx="60" cy="100" r="3" fill="#f59e0b" />
                  <circle cx="120" cy="80" r="3" fill="#f59e0b" />
                  <circle cx="180" cy="60" r="3" fill="#f59e0b" />
                  <circle cx="240" cy="40" r="3" fill="#f59e0b" />
                  <circle cx="300" cy="25" r="3" fill="#f59e0b" />
                </svg>

                {/* Finance line */}
                <svg className="absolute inset-0 mt-2 ml-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                  <path d="M0,80 L60,60 L120,40 L180,30 L240,20 L300,10" fill="none" stroke="#10b981" strokeWidth="2" />
                  <circle cx="0" cy="80" r="3" fill="#10b981" />
                  <circle cx="60" cy="60" r="3" fill="#10b981" />
                  <circle cx="120" cy="40" r="3" fill="#10b981" />
                  <circle cx="180" cy="30" r="3" fill="#10b981" />
                  <circle cx="240" cy="20" r="3" fill="#10b981" />
                  <circle cx="300" cy="10" r="3" fill="#10b981" />
                </svg>

                {/* Chart content remains the same */}
              </div>
              {/* Legend - moved below the chart */}
              <div className="flex justify-center items-center gap-6 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>Finance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-cyan-500 rounded-full mr-2"></div>
                  <span>Healthcare</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
                  <span>Manufacturing</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <BrainCircuit className="h-5 w-5 text-purple-500 mr-2" />
              AI Skills Demand Forecast (2025-2030)
            </h4>

            <div className="space-y-6">
              {/* Skills demand chart */}
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700">LLM Fine-tuning</span>
                      <span className="text-xs font-medium text-slate-700">92%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700">RAG Systems</span>
                      <span className="text-xs font-medium text-slate-700">88%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700">AI Agents</span>
                      <span className="text-xs font-medium text-slate-700">95%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700">Multimodal AI</span>
                      <span className="text-xs font-medium text-slate-700">87%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700">AI Deployment</span>
                      <span className="text-xs font-medium text-slate-700">90%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-slate-500 mt-4">
                  Percentage of AI job postings requiring these skills by 2030
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-md">
                <p className="text-sm text-amber-800">
                  <span className="font-bold">Key Insight:</span> By 2028, over 75% of Fortune 1000 companies will have
                  dedicated AI engineering departments with specialized teams.
                </p>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded-r-md">
                <p className="text-sm text-indigo-800">
                  <span className="font-bold">Salary Projection:</span> AI engineering specialists are projected to
                  command ₹60-80 LPA by 2030, with senior roles exceeding ₹1.2 Cr.
                </p>
              </div>
            </div>

            {/* Regional Growth Chart */}
            <div className="mt-6 bg-white p-4 rounded-lg border border-slate-200">
              <h5 className="text-sm font-semibold mb-3 flex items-center">
                <BarChart3 className="h-4 w-4 text-purple-500 mr-1" />
                Regional AI Job Growth (2025-2030)
              </h5>
              <div className="h-64 relative">
                {/* Horizontal bar chart */}
                <div className="absolute inset-0 flex flex-col justify-around pl-16">
                  <div className="flex items-center h-8">
                    <span className="absolute left-0 text-xs text-slate-600">Bangalore</span>
                    <div
                      className="h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"
                      style={{ width: "85%" }}
                    ></div>
                    <span className="ml-2 text-xs font-medium">+320%</span>
                  </div>

                  <div className="flex items-center h-8">
                    <span className="absolute left-0 text-xs text-slate-600">Hyderabad</span>
                    <div
                      className="h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"
                      style={{ width: "75%" }}
                    ></div>
                    <span className="ml-2 text-xs font-medium">+280%</span>
                  </div>

                  <div className="flex items-center h-8">
                    <span className="absolute left-0 text-xs text-slate-600">Mumbai</span>
                    <div
                      className="h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"
                      style={{ width: "65%" }}
                    ></div>
                    <span className="ml-2 text-xs font-medium">+240%</span>
                  </div>

                  <div className="flex items-center h-8">
                    <span className="absolute left-0 text-xs text-slate-600">Delhi NCR</span>
                    <div
                      className="h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"
                      style={{ width: "60%" }}
                    ></div>
                    <span className="ml-2 text-xs font-medium">+220%</span>
                  </div>

                  <div className="flex items-center h-8">
                    <span className="absolute left-0 text-xs text-slate-600">Pune</span>
                    <div
                      className="h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"
                      style={{ width: "55%" }}
                    ></div>
                    <span className="ml-2 text-xs font-medium">+200%</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center text-slate-500 mt-2">
                Projected growth in AI engineering jobs by region (2025-2030)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">5.2M+</p>
            <p className="text-xs text-slate-600">Global AI jobs by 2030</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">42%</p>
            <p className="text-xs text-slate-600">of tech jobs will be AI-focused</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">₹75L+</p>
            <p className="text-xs text-slate-600">avg. senior AI engineer salary by 2030</p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
          <h5 className="text-sm font-semibold mb-2">2030 AI Engineering Landscape</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-medium">AI-Native Companies:</span> By 2030, over 30% of new startups will be
                "AI-native" with AI engineering at their core rather than as an add-on capability.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BarChart3 className="h-3 w-3 text-blue-600" />
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-medium">Skill Evolution:</span> AI engineers will need to master both technical
                skills and domain expertise, with specialized AI roles becoming increasingly common.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <LineChart className="h-3 w-3 text-amber-600" />
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-medium">Global Competition:</span> India is projected to become the second-largest
                AI talent hub globally by 2030, with specialized AI engineering centers in major cities.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BrainCircuit className="h-3 w-3 text-purple-600" />
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-medium">Education Shift:</span> Traditional computer science degrees will be
                supplemented or replaced by specialized AI engineering programs and certifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
