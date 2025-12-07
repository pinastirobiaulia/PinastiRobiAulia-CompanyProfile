export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(`${baseUrl}${endpoint}`, options)

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Server error' }))
    throw new Error(errorData.message || 'API Error')
  }

  return res.json()
}