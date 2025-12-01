import { Route, Routes } from "react-router-dom";
import { ToastProvider } from "./components/ui/ToastContext";
import Header from "./components/ui/Header"
import Trainers from "./pages/Trainers"
import Gyms from "./pages/Gyms";
import SportsSections from "./pages/SportsSections"
import PersonalCabinet from "./pages/PersonalCabinet"
import BookSection from "./pages/BookSection"
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/Home";


function App() {
  return (
    <ToastProvider>
      <div className="bg-black min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes >
            <Route path="/" element={<HomePage />} />
            <Route path="/gyms" element={<Gyms />} />
            <Route path="/sports" element={<SportsSections />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/book-section/:sectionId" element={<BookSection />} />
            <Route path="/cabinet" element={<PersonalCabinet />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </ToastProvider>
  )
}

export default App
