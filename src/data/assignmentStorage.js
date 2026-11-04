const STORAGE_KEY = 'joineazy_assignments'

export function getAssignments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Unable to load assignments:', error)
    return []
  }
}

export function saveAssignments(assignments) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(assignments)
    )
    return true
  } catch (error) {
    console.error('Unable to save assignments:', error)
    return false
  }
}