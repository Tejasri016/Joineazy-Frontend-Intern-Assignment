import { useState, useEffect } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  ClipboardList
} from 'lucide-react'

import { useAuth } from '../context/AuthContext.jsx'
import { users } from '../data/users.js'
import {
  getAssignments,
  saveAssignments
} from '../data/assignmentStorage.js'

function AdminAssignments() {
  const { user } = useAuth()
  const students = users.filter(item => item.role === 'student')

  const [assignments, setAssignments] = useState(getAssignments)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [driveLink, setDriveLink] = useState('')
  const [assignmentMode, setAssignmentMode] = useState('all')
  const [selectedStudents, setSelectedStudents] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = saveAssignments(assignments)

    if (!saved) {
      setError('Unable to save assignments. Check browser storage.')
    }
  }, [assignments])

  const myAssignments = assignments.filter(
    item => item.createdBy === user.id
  )

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setDueDate('')
    setDriveLink('')
    setAssignmentMode('all')
    setSelectedStudents([])
    setEditingId(null)
    setError('')
  }

  const handleStudentSelection = id => {
    setSelectedStudents(previous =>
      previous.includes(id)
        ? previous.filter(studentId => studentId !== id)
        : [...previous, id]
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    setError('')

    const assignedTo = assignmentMode === 'all'
      ? students.map(student => student.id)
      : selectedStudents

    if (assignedTo.length === 0) {
      setError('Please select at least one student.')
      return
    }

    const existing = assignments.find(
      item => item.id === editingId
    )

    const submissions = Object.fromEntries(
      assignedTo.map(studentId => [
        studentId,
        existing?.submissions?.[studentId] || 'Pending'
      ])
    )

    const newAssignment = {
      id: editingId || Date.now(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      driveLink: driveLink.trim(),
      createdBy: user.id,
      assignedTo,
      submissions
    }

    if (editingId) {
      setAssignments(previous =>
        previous.map(item =>
          item.id === editingId ? newAssignment : item
        )
      )
    } else {
      setAssignments(previous => [
        ...previous,
        newAssignment
      ])
    }

    resetForm()
  }

  const handleEdit = assignment => {
    setEditingId(assignment.id)
    setTitle(assignment.title)
    setDescription(assignment.description)
    setDueDate(assignment.dueDate)
    setDriveLink(assignment.driveLink)

    const assignedTo = assignment.assignedTo || []

    const allStudentsAssigned = students.every(student =>
      assignedTo.includes(student.id)
    )

    setAssignmentMode(allStudentsAssigned ? 'all' : 'selected')
    setSelectedStudents(assignedTo)
    setError('')

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = id => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this assignment?'
    )

    if (!confirmed) return

    setAssignments(previous =>
      previous.filter(item => item.id !== id)
    )

    if (editingId === id) {
      resetForm()
    }
  }

  const getProgress = assignment => {
    const assignedTo = assignment.assignedTo || []
    const total = assignedTo.length

    if (!total) return 0

    const submitted = assignedTo.filter(
      id => assignment.submissions?.[id] === 'Submitted'
    ).length

    return Math.round((submitted / total) * 100)
  }

  return (
    <div className="max-w-6xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Manage Assignments
        </h1>

        <p className="text-slate-500 mt-2">
          Create assignments and monitor student submissions.
        </p>
      </div>

      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

        <h2 className="text-xl font-bold text-slate-800 mb-6">
          {editingId ? 'Edit Assignment' : 'Create Assignment'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Assignment Title
            </label>

            <input
              type="text"
              required
              value={title}
              onChange={event => setTitle(event.target.value)}
              placeholder="Enter assignment title"
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>

            <textarea
              required
              rows="3"
              value={description}
              onChange={event => setDescription(event.target.value)}
              placeholder="Describe the assignment"
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Due Date
              </label>

              <input
                type="date"
                required
                value={dueDate}
                onChange={event => setDueDate(event.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Google Drive Link
              </label>

              <input
                type="url"
                required
                value={driveLink}
                onChange={event => setDriveLink(event.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full border border-slate-200 rounded-xl p-3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Assign To
            </label>

            <div className="flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="radio"
                  value="all"
                  checked={assignmentMode === 'all'}
                  onChange={() => setAssignmentMode('all')}
                />
                All Students
              </label>

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="radio"
                  value="selected"
                  checked={assignmentMode === 'selected'}
                  onChange={() => setAssignmentMode('selected')}
                />
                Selected Students
              </label>
            </div>

            {assignmentMode === 'selected' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 p-4 bg-slate-50 rounded-xl">
                {students.map(student => (
                  <label
                    key={student.id}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleStudentSelection(student.id)}
                    />

                    {student.name}
                  </label>
                ))}
              </div>
            )}
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
            >
              <Plus size={19} />
              {editingId ? 'Update Assignment' : 'Create Assignment'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-slate-200 text-slate-600 px-6 py-3 rounded-xl hover:bg-slate-50"
              >
                Cancel Edit
              </button>
            )}
          </div>

        </form>
      </section>

      <section className="mt-10">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-slate-800">
            My Assignments
          </h2>

          <span className="text-sm text-slate-500">
            {myAssignments.length} total
          </span>
        </div>

        {myAssignments.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <ClipboardList
              size={40}
              className="mx-auto text-slate-300"
            />

            <p className="font-semibold text-slate-700 mt-4">
              No assignments created yet
            </p>

            <p className="text-sm text-slate-400 mt-2">
              Create your first assignment using the form above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {myAssignments.map(assignment => {
              const assignedStudents = students.filter(student =>
                (assignment.assignedTo || []).includes(student.id)
              )

              return (
                <div
                  key={assignment.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-800">
                    {assignment.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    {assignment.description}
                  </p>

                  <p className="text-xs text-slate-400 mt-3">
                    Due: {assignment.dueDate}
                  </p>

                  <p className="text-sm text-slate-500 mt-3">
                    Assigned to: {assignedStudents.length} students
                  </p>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">
                        Class Completion
                      </span>

                      <span className="font-semibold text-purple-600">
                        {getProgress(assignment)}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-2 rounded-full">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${getProgress(assignment)}%`
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-800">
                        Student Submission Status
                      </h4>

                      <span className="text-xs text-slate-500">
                        {assignedStudents.filter(
                          student =>
                            assignment.submissions?.[student.id] === 'Submitted'
                        ).length} / {assignedStudents.length} submitted
                      </span>
                    </div>

                    {assignedStudents.length === 0 ? (
                      <p className="text-sm text-slate-400">
                        No students assigned.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {assignedStudents.map(student => {
                          const status =
                            assignment.submissions?.[student.id] || 'Pending'

                          return (
                            <div
                              key={student.id}
                              className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl"
                            >
                              <div>
                                <p className="font-medium text-sm text-slate-800">
                                  {student.name}
                                </p>

                                <p className="text-xs text-slate-400 mt-1">
                                  {student.email}
                                </p>
                              </div>

                              <span
                                className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${
                                  status === 'Submitted'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-orange-100 text-orange-700'
                                }`}
                              >
                                {status}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-5 border-t border-slate-100 pt-4">
                    <button
                      onClick={() => handleEdit(assignment)}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(assignment.id)}
                      className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}

          </div>
        )}
      </section>
    </div>
  )
}

export default AdminAssignments