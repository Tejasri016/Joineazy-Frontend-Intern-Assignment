import { User, Mail, ShieldCheck, GraduationCap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function StudentProfile() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>
        <p className="text-slate-500 mt-2">
          View your account information.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-purple-700">
            <User size={40} />
          </div>

          <h2 className="text-2xl font-bold text-white mt-4">
            {user.name}
          </h2>

          <p className="text-purple-100 mt-1">
            Student Account
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <User className="text-purple-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="font-semibold text-slate-800">
                {user.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Mail className="text-blue-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Email Address</p>
              <p className="font-semibold text-slate-800">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <GraduationCap className="text-green-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Account Type</p>
              <p className="font-semibold text-slate-800">
                Student
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <ShieldCheck className="text-orange-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Account Status</p>
              <p className="font-semibold text-green-600">
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile