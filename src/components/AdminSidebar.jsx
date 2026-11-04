import {
  LayoutDashboard,
  ClipboardList,
  User,
  LogOut,
  GraduationCap
} from 'lucide-react'

import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function AdminSidebar() {
  const { logout, user } = useAuth()

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Manage Assignments',
      path: '/admin/assignments',
      icon: ClipboardList
    },
    {
      name: 'My Profile',
      path: '/admin/profile',
      icon: User
    }
  ]

  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-white border-r border-slate-200 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-purple-600 text-white p-2 rounded-xl">
          <GraduationCap size={25} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Joineazy
          </h2>
          <p className="text-xs text-slate-500">
            Admin Portal
          </p>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs text-slate-400 uppercase font-semibold mb-2">
          Administrator
        </p>
        <p className="font-semibold text-slate-800">
          {user.name}
        </p>
      </div>

      <nav className="space-y-2 flex-1">
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

      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  )
}

export default AdminSidebar