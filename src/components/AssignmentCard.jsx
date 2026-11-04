function AssignmentCard({ assignment, onSubmitRequest }) {
  const submitted = assignment.status === 'Submitted'

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-800 text-lg">
            {assignment.title}
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            {assignment.description}
          </p>

          <p className="text-xs text-slate-400 mt-3">
            Due date: {assignment.dueDate}
          </p>
        </div>

        <span className={`text-xs font-semibold px-3 py-2 rounded-full w-fit ${
          submitted
            ? 'bg-green-100 text-green-700'
            : 'bg-orange-100 text-orange-700'
        }`}>
          {assignment.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-purple-600 font-semibold hover:underline"
        >
          View Assignment ↗
        </a>

        {!submitted && (
          <button
            onClick={() => onSubmitRequest(assignment)}
            className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Yes, I have submitted
          </button>
        )}

        {submitted && (
          <span className="text-sm text-green-600 font-medium">
            <span aria-hidden="true">✓</span> Submission complete
          </span>
        )}
      </div>
    </div>
  )
}

export default AssignmentCard