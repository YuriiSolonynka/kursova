"use client"

import { useState } from "react"
import Toast from "./Toast"

export default function ToastDemo() {
  const [showToast, setShowToast] = useState(false)

  const triggerToast = () => {
    setShowToast(true)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-8">Toast Notification Demo</h1>

        <button
          onClick={triggerToast}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Show Notification
        </button>

        {showToast && (
          <Toast
            title="Upcoming Training"
            message="Yoga at 18:00 today"
            icon="bell"
            onClose={() => setShowToast(false)}
            autoClose={true}
            duration={5000}
          />
        )}
      </div>
    </div>
  )
}
