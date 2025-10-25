import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Trainers from "./components/Trainers"
import TopTrainers from "./components/TopTrainers"
import Hero from "./components/Hero"
import PopularSections from "./components/PopularSections"
import Features from "./components/Features"
import Gyms from "./components/Gyms";
import SportsSections from "./components/SportsSections"
import PersonalCabinet from "./components/PersonalCabinet"

function Home_page() {
  return(
    <><Hero /><main className="bg-gray-950">
      <PopularSections />
      <TopTrainers />
      <Features />
    </main></>
  )
}
function App() {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home_page />}/>
        <Route path="/gyms" element={<Gyms />}/>
        <Route path="/sports" element={<SportsSections />}/>
        <Route path="/trainers" element={<Trainers />}/>
        <Route path="/cabinet" element={<PersonalCabinet />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
