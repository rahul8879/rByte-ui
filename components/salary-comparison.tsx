import { ArrowRight, BarChart3 } from "lucide-react"

export default function SalaryComparison() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-6">
        <h3 className="text-xl font-bold text-white">AI Engineering Career ROI (2025)</h3>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="bg-slate-50 p-4 rounded-lg text-center w-full md:w-1/3">
            <p className="text-sm text-slate-500 mb-1">Average Non-AI Developer</p>
            <p className="text-3xl font-bold text-slate-700">₹12-18 LPA</p>
          </div>
          <div className="hidden md:block">
            <ArrowRight className="h-8 w-8 text-purple-500" />
          </div>
          <div className="block md:hidden">
            <ArrowRight className="h-8 w-8 text-purple-500 transform rotate-90" />
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg text-center border-2 border-purple-200 w-full md:w-1/3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full py-1 px-2 inline-block mb-1">
              After Our Course
            </div>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              ₹25-45+ LPA
            </p>
            <p className="text-sm text-purple-700 mt-1">AI/ML Engineer</p>
          </div>
        </div>

        {/* Salary Growth Chart */}
        <div className="mt-6 bg-white p-4 rounded-lg border border-slate-200">
          <h5 className="text-sm font-semibold mb-3 flex items-center">
            <BarChart3 className="h-4 w-4 text-purple-500 mr-1" />
            Salary Progression After Course Completion
          </h5>
          <div className="h-64 relative">
            {/* Chart background */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-5">
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border-t border-l border-slate-100"></div>
                ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500 py-2">
              <span>₹50L</span>
              <span>₹40L</span>
              <span>₹30L</span>
              <span>₹20L</span>
              <span>₹10L</span>
              <span>₹0</span>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-10 right-0 flex justify-between text-xs text-slate-500">
              <span>
                Course
                <br />
                Completion
              </span>
              <span>
                6<br />
                Months
              </span>
              <span>
                12
                <br />
                Months
              </span>
              <span>
                24
                <br />
                Months
              </span>
              <span>
                36
                <br />
                Months
              </span>
            </div>

            {/* Bars */}
            <div className="absolute left-10 right-0 bottom-6 top-2 flex justify-around items-end">
              <div className="w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm" style={{ height: "30%" }}>
                <div className="text-xs text-center mt-2 text-white font-medium">₹15L</div>
              </div>
              <div className="w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm" style={{ height: "50%" }}>
                <div className="text-xs text-center mt-2 text-white font-medium">₹25L</div>
              </div>
              <div className="w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm" style={{ height: "66%" }}>
                <div className="text-xs text-center mt-2 text-white font-medium">₹33L</div>
              </div>
              <div className="w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm" style={{ height: "76%" }}>
                <div className="text-xs text-center mt-2 text-white font-medium">₹38L</div>
              </div>
              <div className="w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm" style={{ height: "90%" }}>
                <div className="text-xs text-center mt-2 text-white font-medium">₹45L</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-center text-slate-500 mt-2">
            Average salary progression based on 2023-2025 alumni data
          </div>
        </div>

        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-3 rounded-r-md">
          <p className="text-sm text-green-800">
            <span className="font-bold">2025 ROI:</span> Your ₹24,999 investment can yield a{" "}
            <span className="font-bold">5-15X salary increase</span> within 36 months of completion.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xl font-bold text-purple-700">6-9 months</p>
            <p className="text-xs text-slate-600">Average time to first AI role</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xl font-bold text-purple-700">67%</p>
            <p className="text-xs text-slate-600">Receive multiple offers</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xl font-bold text-purple-700">₹12L+</p>
            <p className="text-xs text-slate-600">Average first-year bonus</p>
          </div>
        </div>
      </div>
    </div>
  )
}
