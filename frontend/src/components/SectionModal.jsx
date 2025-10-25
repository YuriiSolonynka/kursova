"use client"

function SectionModal({ isOpen, onClose, section }) {
  if (!isOpen || !section) return null

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Close modal on Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container - Almost Full Screen */}
      <div className="relative w-full max-w-4xl max-h-[95vh] bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[95vh]">
          {/* Large Image */}
          <div className="w-full h-80 bg-gray-800">
            <img
              src={`/.jpg?height=400&width=800&query=${section.sportType} training facility`}
              alt={section.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-12">
            {/* Section Title */}
            <h2 className="text-4xl font-bold text-white mb-8">{section.name}</h2>

            {/* Full Description */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-4">About This Section</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-4">{section.description}</p>
              <p className="text-gray-400 leading-relaxed text-lg mb-4">
                Our {section.name.toLowerCase()} program is designed to help you achieve your fitness goals in a
                supportive and professional environment. Whether you're looking to improve your technique, build
                strength, or compete at a higher level, our experienced trainers will guide you every step of the way.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                We provide state-of-the-art facilities and equipment, ensuring you have everything you need to succeed.
                Join a community of like-minded individuals who share your passion for {section.sportType.toLowerCase()}{" "}
                and take your skills to the next level.
              </p>
            </div>

            {/* Schedule Section */}
            <div className="mb-10 p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Schedule</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex justify-between">
                  <span>Monday - Wednesday - Friday</span>
                  <span className="text-white">6:00 AM - 8:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Tuesday - Thursday</span>
                  <span className="text-white">5:30 PM - 7:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-white">9:00 AM - 12:00 PM</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Skill Level</p>
                <p className="text-white font-semibold">{section.skillLevel}</p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Age Group</p>
                <p className="text-white font-semibold">{section.ageGroup}</p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Sport Type</p>
                <p className="text-white font-semibold">{section.sportType}</p>
              </div>
            </div>

            {/* Book Now Button */}
            <button className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionModal
