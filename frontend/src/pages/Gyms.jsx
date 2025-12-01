import { useState, useEffect } from "react"
import axios from "axios"

function Gyms() {
  const [gyms, setGyms] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [city, setCity] = useState("")
  const [services, setServices] = useState("")
  const [rating, setRating] = useState("")

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/gyms")
        setGyms(response.data)
      } catch (error) {
        console.error("Error fetching gyms:", error)
      }
    }

    fetchGyms()
  }, [])

  const filteredGyms = gyms.filter((gym) => {
    const matchesSearch =
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = !city || gym.city === city
    const matchesServices = !services || gym.services.includes(services)
    const matchesRating = !rating || String(gym.rating) === rating
    return matchesSearch && matchesCity && matchesServices && matchesRating
  })

  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-bold text-white mb-16 text-center">Our Gyms</h1>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search by address or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div>
            <label className="block text-gray-400 text-sm mb-2">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Cities</option>
              {[...new Set(gyms.map(g => g.city))].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Available Services</label>
            <select
              value={services}
              onChange={(e) => setServices(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Services</option>
              {[...new Set(gyms.flatMap(g => g.services))].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
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
              {[...new Set(gyms.map(g => g.rating))].map(r => (
                <option key={r} value={String(r)}>{r} Stars</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredGyms.length > 0 ? (
            filteredGyms.map((gym) => (
              <div
                key={gym._id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">{gym.name}</h3>
                    <p className="text-gray-400 mb-4">{gym.address}</p>
                    <div className="flex flex-wrap gap-2">
                      {gym.services.map((service, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${gym.city}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap inline-block"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No gyms found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div >
  )
}

export default Gyms
