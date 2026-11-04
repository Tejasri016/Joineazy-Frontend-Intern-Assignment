import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar.jsx'

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <AdminSidebar />

      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout