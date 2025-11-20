import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { token, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">SportSpace</Link>
          
          <nav className="hidden md:flex items-center space-x-10">
            <Link to="/gyms" className="text-gray-300 hover:text-white transition-colors duration-200">
              Gyms
            </Link>
            <Link to="/sports" className="text-gray-300 hover:text-white transition-colors duration-200">
              Sports
            </Link>
            <Link to="/trainers" className="text-gray-300 hover:text-white transition-colors duration-200">
              Trainers
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link
                  to="/cabinet"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="hidden md:inline">Personal Cabinet</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
        </div>
      </div>
    </header>
  )
}

export default Header