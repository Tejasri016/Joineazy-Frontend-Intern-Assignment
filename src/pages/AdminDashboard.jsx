import { useEffect, useState } from 'react'
import {
  ClipboardList,
  Users,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react'

import { useAuth } from '../context/AuthContext.jsx'
import { users } from '../data/users.js'
import { getAssignments } from '../data/assignmentStorage.js'

function AdminDashboard() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState([])

  const students = users.filter(item => item.role === 'student')

  useEffect(() => {
    setAssignments(
      getAssignments().filter(item => item.createdBy === user.id)
    )
  }, [user.id])

  const totalAssignments = assignments.length

  const totalAssigned = assignments.reduce(
    (total, assignment) =>
      total + (assignment.assignedTo || []).length,
    0
  )

  const totalSubmitted = assignments.reduce(
    (total, assignment) =>
      total + (assignment.assignedTo || []).filter(
        id => assignment.submissions?.[id] === 'Submitted'
      ).length,
    0
  )

  const totalPending = totalAssigned - totalSubmitted

  const completion = totalAssigned === 0
    ? 0
    : Math.round((totalSubmitted / totalAssigned) * 100)

  const stats = [
    {
      title: 'My Assignments',
      value: totalAssignments,
      icon: ClipboardList,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Total Students',
      value: students.length,
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Submissions',
      value: totalSubmitted,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Pending Submissions',
      value: totalPending,
      icon: Clock,
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="text-purple-600 font-semibold text-sm">
          PROFESSOR PORTAL
        </p>

        <h1 className="text-3xl font-bold text-slate-800 mt-2">
          Welcome, {user.name}! 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Here's an overview of your assignment activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className="bg-white p-6 rounded-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
            <TrendingUp size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Overall Class Completion
            </h2>

            <p className="text-sm text-slate-500">
              Submission progress across your assignments
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-slate-600">
            Submitted assignments
          </span>

          <span className="font-bold text-purple-700">
            {totalSubmitted}/{totalAssigned}
          </span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>

        <p className="text-right text-sm font-semibold text-purple-700 mt-3">
          {completion}% completed
        </p>
      </div>
    </div>
  )
}

export default AdminDashboard