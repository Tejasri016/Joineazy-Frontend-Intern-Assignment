
import {
  LayoutDashboard,
  BookOpen,
  User,
  LogOut,
  GraduationCap
} from 'lucide-react'

import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Sidebar() {
  const { logout, user } = useAuth()

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/student/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'My Assignments',
      path: '/student/assignments',
      icon: BookOpen
    },
    {
      name: 'My Profile',
      path: '/student/profile',
      icon: User
    }
  ]

  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-white border-r border-slate-200 p-6 flex flex-col">

      <div className="flex items-center gap-3 mb-10">
        <div className="bg-purple-600 text-white p-2 rounded-xl">
          <GraduationCap size={25} />
        </div>

        <h1 className="text-2xl font-bold text-slate-800">
          Joineazy
        </h1>
      </div>

      <div className="mb-6">
        <p className="font-semibold text-slate-800">
          {user?.name}
        </p>

        <p className="text-xs text-slate-400">
          Student Account
        </p>
      </div>

      <p className="text-xs font-semibold text-slate-400 mb-4">
        MENU
      </p>

      <nav className="space-y-2">

        {menuItems.map(item => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition ${
                  isActive
                    ? 'bg-purple-100 text-purple-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          )
        })}

      </nav>

      <div className="mt-auto pt-8">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-500 hover:text-red-700"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  )
}

export default Sidebar
