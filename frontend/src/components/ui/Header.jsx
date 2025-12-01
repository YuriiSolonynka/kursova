
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { token, logout, user } = useAuth();

  const [avatarPreview, setAvatarPreview] = useState("/placeholder-user.jpg");

  useEffect(() => {
    setAvatarPreview(
      user?.avatar
        ? `http://localhost:5000${user.avatar}`
        : "/placeholder-user.jpg"
    );
  }, [user]);


  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="px-6 py-5">
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

          <div className="flex items-center space-x-8">
            {token ? (
              <>
                <Link
                  to="/cabinet"
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <img
                    className="rounded-full w-9 h-9 object-cover"
                    src={avatarPreview}
                    alt="Avatar"
                  />
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
