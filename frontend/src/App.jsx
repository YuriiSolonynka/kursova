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
import Register from "./components/Register";
import Login from "./components/Login";

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
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes >
          <Route path="/" element={<Home_page />}/>
          <Route path="/gyms" element={<Gyms />}/>
          <Route path="/sports" element={<SportsSections />}/>
          <Route path="/trainers" element={<Trainers />}/>
          <Route path="/cabinet" element={<PersonalCabinet />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
        </Routes> 
      </main>
      <Footer />
    </div>
  )
}

export default App
