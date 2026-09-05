// Generic persistence hook used for simple values (theme, budget draft state
// etc). Transaction CRUD goes through utils/storage.js directly in App.jsx
// because it needs custom merge/validation logic beyond a plain get/set.

import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(`Could not persist "${key}"`, err)
    }
  }, [key, value])

  return [value, setValue]
}
