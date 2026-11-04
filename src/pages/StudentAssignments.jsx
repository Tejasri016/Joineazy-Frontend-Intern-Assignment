import { useEffect, useState } from 'react'
import { Search, X, BookOpen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getAssignments, saveAssignments } from '../data/assignmentStorage'
import AssignmentCard from '../components/AssignmentCard'

function StudentAssignments() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState([])
  const [search, setSearch] = useState('')
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  const loadAssignments = () => {
    const allAssignments = getAssignments()

    const studentAssignments = allAssignments
      .filter(assignment => assignment.assignedTo.includes(user.id))
      .map(assignment => ({
        ...assignment,
        status: assignment.submissions?.[user.id] || 'Pending'
      }))

    setAssignments(studentAssignments)
  }

  useEffect(() => {
    loadAssignments()
  }, [user.id])

  const handleSubmitRequest = assignment => {
    setSelectedAssignment(assignment)
  }

  const confirmSubmission = () => {
    if (!selectedAssignment) return

    const allAssignments = getAssignments()

    const updatedAssignments = allAssignments.map(assignment => {
      if (assignment.id === selectedAssignment.id) {
        return {
          ...assignment,
          submissions: {
            ...assignment.submissions,
            [user.id]: 'Submitted'
          }
        }
      }

      return assignment
    })

    const saved = saveAssignments(updatedAssignments)

    if (saved) {
      setSelectedAssignment(null)
      loadAssignments()
    }
  }

  const filteredAssignments = assignments.filter(assignment =>
    `${assignment.title} ${assignment.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          My Assignments
        </h1>

        <p className="text-slate-500 mt-2">
          View and manage all your assigned work.
        </p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search assignments..."
          value={search}
          onChange={event => setSearch(event.target.value)}
          className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
        />

        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {filteredAssignments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredAssignments.map(assignment => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onSubmitRequest={handleSubmitRequest}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <BookOpen
            size={40}
            className="mx-auto text-slate-300 mb-4"
          />

          <h3 className="text-lg font-semibold text-slate-700">
            {search ? 'No assignments found' : 'No assignments yet'}
          </h3>

          <p className="text-slate-500 mt-2">
            {search
              ? 'Try searching with a different keyword.'
              : 'Your professor has not assigned any work yet.'}
          </p>
        </div>
      )}

      {selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="bg-white rounded-2xl p-7 max-w-md w-full shadow-xl"
          >
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={26} />
              </div>

              <h2
                id="confirm-title"
                className="text-xl font-bold text-slate-800"
              >
                Confirm Submission
              </h2>

              <p className="text-slate-500 mt-3">
                Have you completed and submitted
                {' '}
                <strong className="text-slate-700">
                  {selectedAssignment.title}
                </strong>
                ?
              </p>

              <p className="text-sm text-slate-400 mt-2">
                Once confirmed, your status will change to Submitted.
              </p>
            </div>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setSelectedAssignment(null)}
                className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmSubmission}
                className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentAssignments