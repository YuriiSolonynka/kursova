const sections = [
  {
    id: 1,
    title: "Yoga",
    description: "Find balance and flexibility with expert-led yoga classes",
    image: "/yoga-studio-with-mats.jpg",
  },
  {
    id: 2,
    title: "Swimming",
    description: "Olympic-sized pools with professional coaching available",
    image: "/modern-swimming-pool.jpg",
  },
  {
    id: 3,
    title: "CrossFit",
    description: "High-intensity training for maximum results",
    image: "/crossfit-gym-equipment.jpg",
  },
]

function PopularSections() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Popular Sections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20"
            >
              <img
                src={section.image || "/placeholder.svg"}
                alt={section.title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{section.title}</h3>
                <p className="text-gray-400 leading-relaxed">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularSections
