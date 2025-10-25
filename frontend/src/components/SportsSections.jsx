"use client"

import { useState } from "react"
import SectionModal from "./SectionModal"

function SportsSections() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sportType, setSportType] = useState("")
  const [skillLevel, setSkillLevel] = useState("")
  const [ageGroup, setAgeGroup] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState(null)

  // Sample data for sports sections
  const sections = [
    {
      id: 1,
      name: "Advanced Swimming",
      description:
        "High-intensity swimming program for competitive athletes. Includes technique refinement, endurance training, and race preparation.",
      sportType: "Swimming",
      skillLevel: "Advanced",
      ageGroup: "Adults",
    },
    {
      id: 2,
      name: "Youth Basketball Fundamentals",
      description:
        "Learn the basics of basketball including dribbling, shooting, and teamwork in a fun, supportive environment.",
      sportType: "Basketball",
      skillLevel: "Beginner",
      ageGroup: "Kids",
    },
    {
      id: 3,
      name: "Intermediate Tennis Training",
      description:
        "Develop your tennis skills with focused training on serves, volleys, and match strategy for intermediate players.",
      sportType: "Tennis",
      skillLevel: "Intermediate",
      ageGroup: "Adults",
    },
    {
      id: 4,
      name: "Beginner Yoga Flow",
      description:
        "Gentle introduction to yoga with focus on breathing, flexibility, and mindfulness. Perfect for those new to yoga.",
      sportType: "Yoga",
      skillLevel: "Beginner",
      ageGroup: "All Ages",
    },
    {
      id: 5,
      name: "Elite Boxing Program",
      description:
        "Professional-level boxing training including sparring, conditioning, and advanced techniques for experienced fighters.",
      sportType: "Boxing",
      skillLevel: "Advanced",
      ageGroup: "Adults",
    },
    {
      id: 6,
      name: "Teen Soccer Development",
      description:
        "Comprehensive soccer training for teenagers focusing on skills, tactics, and physical conditioning.",
      sportType: "Soccer",
      skillLevel: "Intermediate",
      ageGroup: "Teens",
    },
  ]

  // Filter sections based on search and filters
  const filteredSections = sections.filter((section) => {
    const matchesSearch =
      section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSportType = !sportType || section.sportType === sportType
    const matchesSkillLevel = !skillLevel || section.skillLevel === skillLevel
    const matchesAgeGroup = !ageGroup || section.ageGroup === ageGroup

    return matchesSearch && matchesSportType && matchesSkillLevel && matchesAgeGroup
  })

  const handleViewDetails = (section) => {
    setSelectedSection(section)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSection(null)
  }

  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-16 text-center">Sports Sections</h1>

        {/* Search Bar */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-200"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Sport Type */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Sport Type</label>
            <select
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Sports</option>
              <option value="Swimming">Swimming</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Yoga">Yoga</option>
              <option value="Boxing">Boxing</option>
              <option value="Soccer">Soccer</option>
            </select>
          </div>

          {/* Skill Level */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Skill Level</label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Age Group */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Age Group</label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Ages</option>
              <option value="Kids">Kids</option>
              <option value="Teens">Teens</option>
              <option value="Adults">Adults</option>
              <option value="All Ages">All Ages</option>
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <div
                key={section.id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">{section.name}</h3>
                    <p className="text-gray-400 leading-relaxed">{section.description}</p>
                  </div>
                  <button
                    onClick={() => handleViewDetails(section)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No sections found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <SectionModal isOpen={isModalOpen} onClose={handleCloseModal} section={selectedSection} />
    </div>
  )
}

export default SportsSections
