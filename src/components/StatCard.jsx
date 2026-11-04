function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>

      <p className="text-slate-500 text-sm mt-4">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-slate-800 mt-1">
        {value}
      </h2>
    </div>
  )
}

export default StatCard