import { useState, useEffect } from "react"
import axios from "axios"

function Trainers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [experience, setExperience] = useState("")
  const [rating, setRating] = useState("")
  const [trainers, setTrainers] = useState([])

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trainers")
        setTrainers(res.data)
      } catch (err) {
        console.error("Failed to fetch trainers:", err)
      }
    }
    fetchTrainers()
  }, [])

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialization = !specialization || trainer.specialization.includes(specialization)
    const matchesExperience = !experience || trainer.experience === experience
    const matchesRating = !rating || String(trainer.rating) === rating
    return matchesSearch && matchesSpecialization && matchesExperience && matchesRating
  })

  const specializations = [...new Set(trainers.map(t => t.specialization))]
  const experiences = [...new Set(trainers.map(t => t.experience))]
  const ratings = [...new Set(trainers.map(t => t.rating))]

  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-bold text-white mb-16 text-center">Our Trainers</h1>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Specialization</label>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Specializations</option>
              {specializations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Experience Level</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Levels</option>
              {experiences.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Ratings</option>
              {ratings.map(r => <option key={r} value={String(r)}>{r} Stars</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map(trainer => (
              <div
                key={trainer._id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors duration-200 flex items-center gap-6"
              >
                <img
                  src={trainer.avatar || "/placeholder.svg"}
                  alt={trainer.name}
                  className="w-20 h-20 rounded-full object-cover bg-gray-800 flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">{trainer.name}</h3>
                  <p className="text-gray-400">{trainer.specialization}</p>
                </div>
                <a
                  href="mailto:example@gmail.com"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap inline-block"
                >
                  Send Email
                </a>
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
