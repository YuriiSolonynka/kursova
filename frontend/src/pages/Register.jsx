import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const API_URL = 'http://localhost:5000/api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);
    setIsLoading(true);

    try {
      await axios.post(`${API_URL}/auth/register`, formData);

      await login(formData.email, formData.password);

      setIsSuccess(true);

      setTimeout(() => {
        navigate('/cabinet');
      }, 1000);
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors).flat().join(' ');
          setError(`Validation Error: ${errorMessages}`);
        } else if (typeof err.response.data === 'string') {
          setError(err.response.data);
        } else {
          setError('Unknown error.');
        }
      } else {
        setError('Network error or server is not responding.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-gray-900 rounded-lg border border-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Register</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold disabled:bg-gray-500"
        >
          {isSuccess ? 'Success!' : (isLoading ? 'Registering...' : 'Register')}
        </button>
      </form>

      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

      <p className="mt-6 text-center text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default Register;