
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

function StudentLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">

      <Sidebar />

      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10">
        <Outlet />
      </main>

    </div>
  )
}

export default StudentLayout
