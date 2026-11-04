import { useEffect, useState } from 'react'
import {
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'
import { getAssignments } from '../data/assignmentStorage'

function StudentDashboard() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    const allAssignments = getAssignments()

    const studentAssignments = allAssignments
      .filter(assignment => assignment.assignedTo.includes(user.id))
      .map(assignment => ({
        ...assignment,
        status: assignment.submissions?.[user.id] || 'Pending'
      }))

    setAssignments(studentAssignments)
  }, [user.id])

  const total = assignments.length

  const submitted = assignments.filter(
    assignment => assignment.status === 'Submitted'
  ).length

  const pending = assignments.filter(
    assignment => assignment.status === 'Pending'
  ).length

  const overdue = assignments.filter(
    assignment =>
      assignment.status !== 'Submitted' &&
      new Date(assignment.dueDate) < new Date()
  ).length

  const progress = total === 0
    ? 0
    : Math.round((submitted / total) * 100)

  const stats = [
    {
      title: 'Total Assignments',
      value: total,
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Submitted',
      value: submitted,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Pending',
      value: pending,
      icon: Clock,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Overdue',
      value: overdue,
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome back, {user.name}! 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Here's an overview of your assignment progress.
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
              Overall Progress
            </h2>

            <p className="text-sm text-slate-500">
              Your assignment completion status
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-600">
            Completed assignments
          </span>

          <span className="font-bold text-purple-700">
            {submitted}/{total}
          </span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-right text-sm font-semibold text-purple-700 mt-3">
          {progress}% completed
        </p>

        {total === 0 && (
          <p className="text-sm text-slate-500 mt-4">
            Your progress will appear here once assignments are assigned.
          </p>
        )}
      </div>
    </div>
  )
}

export default StudentDashboard