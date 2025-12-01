import { useState, useEffect } from "react"
import SectionModal from "../components/SectionModal"
import axios from "axios"

function SportsSections() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sportType, setSportType] = useState("")
  const [skillLevel, setSkillLevel] = useState("")
  const [ageGroup, setAgeGroup] = useState("")
  const [sections, setSections] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState(null)

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sections")
        setSections(res.data)
      } catch (err) {
        console.error("Failed to fetch sections:", err)
      }
    }
    fetchSections()
  }, [])

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

  const sportTypes = [...new Set(sections.map(s => s.sportType))]
  const skillLevels = [...new Set(sections.map(s => s.skillLevel))]
  const ageGroups = [...new Set(sections.map(s => s.ageGroup))]

  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-bold text-white mb-16 text-center">Sports Sections</h1>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Sport Type</label>
            <select
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Sports</option>
              {sportTypes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Skill Level</label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Levels</option>
              {skillLevels.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Age Group</label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 transition-colors duration-200"
            >
              <option value="">All Ages</option>
              {ageGroups.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <div
                key={section._id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-between gap-6">
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
