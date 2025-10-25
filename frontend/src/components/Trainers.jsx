"use client"

import { useState } from "react"

function Trainers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [experience, setExperience] = useState("")
  const [rating, setRating] = useState("")

  // Sample data for trainers
  const trainers = [
    {
      id: 1,
      name: "Anna Kovalenko",
      specialization: "Yoga Instructor",
      experience: "Senior",
      rating: "5",
      avatar: "/female-yoga-instructor.png",
    },
    {
      id: 2,
      name: "Dmitry Petrov",
      specialization: "CrossFit Coach",
      experience: "Senior",
      rating: "5",
      avatar: "/male-crossfit-coach.jpg",
    },
    {
      id: 3,
      name: "Elena Sokolova",
      specialization: "Swimming Coach",
      experience: "Senior",
      rating: "4",
      avatar: "/female-swimming-coach.jpg",
    },
    {
      id: 4,
      name: "Ivan Marchenko",
      specialization: "Fitness Trainer",
      experience: "Junior",
      rating: "4",
      avatar: "/male-fitness-trainer.png",
    },
    {
      id: 5,
      name: "Olga Bondarenko",
      specialization: "Pilates Instructor",
      experience: "Senior",
      rating: "5",
      avatar: "/female-pilates-instructor.png",
    },
    {
      id: 6,
      name: "Sergey Ivanov",
      specialization: "Boxing Coach",
      experience: "Senior",
      rating: "5",
      avatar: "/male-boxing-coach.png",
    },
    {
      id: 7,
      name: "Maria Tkachenko",
      specialization: "Yoga Instructor",
      experience: "Junior",
      rating: "4",
      avatar: "/female-yoga-instructor-2.jpg",
    },
    {
      id: 8,
      name: "Viktor Shevchenko",
      specialization: "CrossFit Coach",
      experience: "Junior",
      rating: "3",
      avatar: "/male-crossfit-coach-2.jpg",
    },
  ]

  // Filter trainers based on search and filters
  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialization = !specialization || trainer.specialization.includes(specialization)
    const matchesExperience = !experience || trainer.experience === experience
    const matchesRating = !rating || trainer.rating === rating

    return matchesSearch && matchesSpecialization && matchesExperience && matchesRating
  })

  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-16 text-center">Our Trainers</h1>

        {/* Search Bar */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-200"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Specialization */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Specialization</label>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Specializations</option>
              <option value="Yoga">Yoga</option>
              <option value="Fitness">Fitness</option>
              <option value="Swimming">Swimming</option>
              <option value="CrossFit">CrossFit</option>
              <option value="Pilates">Pilates</option>
              <option value="Boxing">Boxing</option>
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Experience Level</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Levels</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src={trainer.avatar || "/placeholder.svg"}
                      alt={trainer.name}
                      className="w-20 h-20 rounded-full object-cover bg-gray-800"
                    />
                  </div>

                  {/* Trainer Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{trainer.name}</h3>
                    <p className="text-gray-400">{trainer.specialization}</p>
                  </div>

                  {/* View Profile Button */}
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap">
                    View Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No trainers found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Trainers
