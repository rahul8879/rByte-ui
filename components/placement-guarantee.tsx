import { CheckCircle, Award, Briefcase, Users } from "lucide-react"

export default function PlacementGuarantee() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-purple-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-8 w-8 text-purple-500" />
          <h3 className="text-xl font-bold text-slate-800">Complete Placement Assistance</h3>
        </div>

        <p className="text-slate-600 mb-6">
          We don't just teach you AI skills - we help you land your dream AI role with our comprehensive placement
          support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Briefcase className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-800">Resume & Portfolio Building</p>
              <p className="text-sm text-slate-600">Expert guidance to showcase your AI projects</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-800">Industry Connections</p>
              <p className="text-sm text-slate-600">Direct referrals to our hiring partners</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-800">Interview Preparation</p>
              <p className="text-sm text-slate-600">Mock interviews with AI industry experts</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-800">Career Transition Support</p>
              <p className="text-sm text-slate-600">Personalized guidance for switching to AI</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2">
            <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-purple-200">
              Our Promise
            </span>
          </div>
          <p className="text-slate-700 mt-2">
            We provide ongoing support until you successfully transition to an AI role. Our commitment doesn't end with
            the course.
          </p>
        </div>
      </div>
    </div>
  )
}
