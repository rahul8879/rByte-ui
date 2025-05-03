export default function SuccessMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-purple-100">
        <p className="text-4xl font-bold text-purple-600">96%</p>
        <p className="text-sm text-slate-600">Placement Rate</p>
        <p className="text-xs text-slate-500 mt-1">2025 Cohort</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-purple-100">
        <p className="text-4xl font-bold text-pink-600">75+</p>
        <p className="text-sm text-slate-600">Hiring Partners</p>
        <p className="text-xs text-slate-500 mt-1">Including FAANG+</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-purple-100">
        <p className="text-4xl font-bold text-indigo-600">4.5X</p>
        <p className="text-sm text-slate-600">Avg. Salary Hike</p>
        <p className="text-xs text-slate-500 mt-1">Within 3 years</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-purple-100">
        <p className="text-4xl font-bold text-amber-600">21</p>
        <p className="text-sm text-slate-600">Days to Job</p>
        <p className="text-xs text-slate-500 mt-1">For top performers</p>
      </div>

      {/* Additional metrics row */}
      <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-purple-100 col-span-2 md:col-span-1">
        <p className="text-4xl font-bold text-green-600">92%</p>
        <p className="text-sm text-slate-600">Career Satisfaction</p>
        <p className="text-xs text-slate-500 mt-1">Alumni survey</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-purple-100 col-span-2 md:col-span-1">
        <p className="text-4xl font-bold text-blue-600">8.2/10</p>
        <p className="text-sm text-slate-600">Employer Rating</p>
        <p className="text-xs text-slate-500 mt-1">Of our graduates</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-purple-100 col-span-2 md:col-span-2">
        <div className="flex items-center justify-center">
          <div className="h-16 w-full relative">
            {/* Horizontal bar chart */}
            <div className="absolute inset-0 flex items-center">
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <span className="text-xs font-medium text-white">2025</span>
              <span className="text-xs font-medium text-slate-700">85% of graduates in AI leadership roles</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2">Based on alumni who graduated 3+ years ago</p>
      </div>
    </div>
  )
}
