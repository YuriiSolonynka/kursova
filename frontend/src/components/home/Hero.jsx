import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen flex items-center justify-center">
      <img
        src="/modern-premium-gym-interior-with-equipment.jpg"
        alt="Modern gym"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
          Your Fitness Journey Reimagined
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto">
          Experience world-class facilities, expert trainers, and a community dedicated to helping you achieve your
          fitness goals.
        </p>
        <button onClick={() => navigate("/gyms")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-full text-lg transition-colors duration-200">
          Explore Sections
        </button>
      </div>
    </section>
  )
}

export default Hero
