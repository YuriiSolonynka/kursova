const trainers = [
  {
    id: 1,
    name: "Anna Kovalenko",
    specialty: "Fitness & Nutrition",
    avatar: "/professional-female-fitness-trainer.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Strength & Conditioning",
    avatar: "/professional-male-strength-coach.jpg",
  },
  {
    id: 3,
    name: "Sofia Martinez",
    specialty: "Yoga & Mindfulness",
    avatar: "/professional-yoga-instructor.jpg",
  },
]

function TopTrainers() {
  return (
    <section className="py-24 px-6 bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Top-Rated Trainers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-gray-950 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 text-center"
            >
              <img
                src={trainer.avatar || "/placeholder.svg"}
                alt={trainer.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-800"
              />
              <h3 className="text-2xl font-semibold text-white mb-2">{trainer.name}</h3>
              <p className="text-gray-400 text-lg">{trainer.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopTrainers
