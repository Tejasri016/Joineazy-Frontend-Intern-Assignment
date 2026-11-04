import { AuthProvider, useAuth } from './context/AuthContext'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'

import StudentDashboard from './pages/StudentDashboard'
import StudentAssignments from './pages/StudentAssignments'
import StudentProfile from './pages/StudentProfile'
import StudentLayout from './components/StudentLayout'

import AdminDashboard from './pages/AdminDashboard'
import AdminAssignments from './pages/AdminAssignments'
import AdminProfile from './pages/AdminProfile'
import AdminLayout from './components/AdminLayout'

function AppRoutes() {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  if (user.role === 'admin') {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="assignments"
            element={<AdminAssignments />}
          />

          <Route
            path="profile"
            element={<AdminProfile />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/admin/dashboard" replace />}
        />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/student" element={<StudentLayout />}>
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="assignments"
          element={<StudentAssignments />}
        />

        <Route
          path="profile"
          element={<StudentProfile />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/student/dashboard" replace />}
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App