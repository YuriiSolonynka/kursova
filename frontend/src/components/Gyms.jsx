"use client"

import { useState } from "react"

function Gyms() {
  const [searchQuery, setSearchQuery] = useState("")
  const [city, setCity] = useState("")
  const [services, setServices] = useState("")
  const [rating, setRating] = useState("")

  // Sample data for gyms
  const gyms = [
    {
      id: 1,
      name: "SportSpace Central",
      address: "123 Main St, Kyiv",
      services: ["Pool", "Gym", "Yoga Studio", "Sauna"],
      city: "Kyiv",
      rating: "5",
    },
    {
      id: 2,
      name: "SportSpace West",
      address: "456 Oak Avenue, Lviv",
      services: ["CrossFit Zone", "Gym", "Boxing Ring"],
      city: "Lviv",
      rating: "4",
    },
    {
      id: 3,
      name: "SportSpace Elite",
      address: "789 Park Boulevard, Kyiv",
      services: ["Pool", "Sauna", "Spa", "Tennis Courts", "Gym"],
      city: "Kyiv",
      rating: "5",
    },
    {
      id: 4,
      name: "SportSpace North",
      address: "321 River Road, Odesa",
      services: ["Gym", "Pool", "Yoga Studio", "Pilates Studio"],
      city: "Odesa",
      rating: "4",
    },
    {
      id: 5,
      name: "SportSpace Pro",
      address: "654 Victory Street, Kharkiv",
      services: ["CrossFit Zone", "Gym", "Sauna", "Sports Bar"],
      city: "Kharkiv",
      rating: "5",
    },
    {
      id: 6,
      name: "SportSpace Fitness",
      address: "987 Green Lane, Lviv",
      services: ["Gym", "Pool", "Sauna", "Massage Room"],
      city: "Lviv",
      rating: "3",
    },
  ]

  // Filter gyms based on search and filters
  const filteredGyms = gyms.filter((gym) => {
    const matchesSearch =
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = !city || gym.city === city
    const matchesServices = !services || gym.services.includes(services)
    const matchesRating = !rating || gym.rating === rating

    return matchesSearch && matchesCity && matchesServices && matchesRating
  })

  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-16 text-center">Our Gyms</h1>

        {/* Search Bar */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search by address or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-200"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* City */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Cities</option>
              <option value="Kyiv">Kyiv</option>
              <option value="Lviv">Lviv</option>
              <option value="Odesa">Odesa</option>
              <option value="Kharkiv">Kharkiv</option>
            </select>
          </div>

          {/* Available Services */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Available Services</label>
            <select
              value={services}
              onChange={(e) => setServices(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Services</option>
              <option value="Pool">Pool</option>
              <option value="Sauna">Sauna</option>
              <option value="CrossFit Zone">CrossFit Zone</option>
              <option value="Yoga Studio">Yoga Studio</option>
              <option value="Gym">Gym</option>
              <option value="Spa">Spa</option>
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
          {filteredGyms.length > 0 ? (
            filteredGyms.map((gym) => (
              <div
                key={gym.id}
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
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap">
                    View Details
                  </button>
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
    </div>
  )
}

export default Gyms
