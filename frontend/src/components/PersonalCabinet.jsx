import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// --- Малий компонент для форми зміни пароля ---
function ChangePasswordForm() {
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwords.newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    try {
      // Axios знає baseURL та токен з AuthContext
      await axios.post("/api/users/me/change-password", passwords);
      setSuccess("Password changed successfully!");
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data || "Failed to change password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 pt-8 border-t border-gray-800 space-y-4">
      <h3 className="text-2xl font-semibold text-white">Change Password</h3>
      <div>
        <label htmlFor="currentPassword" className="block text-gray-400 mb-2">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-gray-400 mb-2">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
        />
      </div>
      <button type="submit" className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
        Update Password
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
}

// --- Головний компонент кабінету ---
function PersonalCabinet() {
  const [activeTab, setActiveTab] = useState("bookings");
  
  const [profileData, setProfileData] = useState({ name: "", email: "", phone: "" });
  const [bookings, setBookings] = useState([]); // 👈 Початковий стан - масив
  const [loyaltyCard, setLoyaltyCard] = useState({ bonusPoints: 0, cardType: 'Standard' });
  const [subscriptions, setSubscriptions] = useState([]); // 👈 Початковий стан - масив
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  const { token } = useAuth(); 

  useEffect(() => {
    if (!token) {
        setError("Please log in to view your cabinet.");
        setIsLoading(false);
        return;
    }

    const fetchCabinetData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [profileRes, bookingsRes, loyaltyRes, subsRes] = await Promise.all([
          axios.get("/api/users/me"), 
          axios.get("/api/bookings/my-history"),
          axios.get("/api/membershipcard/my-card"),
          axios.get("/api/subscriptions/my-subscriptions")
        ]);

        // --- ВИПРАВЛЕННЯ ТУТ ---
        // Ми перевіряємо, що дані - це об'єкт, перед тим, як їх встановлювати
        if (profileRes.data && typeof profileRes.data === 'object') {
          setProfileData(profileRes.data);
        }
        // Ми ПЕРЕВІРЯЄМО, що 'bookingsRes.data' - це масив
        if (Array.isArray(bookingsRes.data)) {
          setBookings(bookingsRes.data);
        }
        if (loyaltyRes.data && typeof loyaltyRes.data === 'object') {
          setLoyaltyCard(loyaltyRes.data);
        }
        // Ми ПЕРЕВІРЯЄМО, що 'subsRes.data' - це масив
        if (Array.isArray(subsRes.data)) {
          setSubscriptions(subsRes.data);
        }
        // -------------------------

      } catch (err) {
        console.error("Failed to fetch cabinet data:", err);
        setError("Failed to load your data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCabinetData();
  }, [token]);

  // --- Навігація та статичні дані ---
  const navItems = [
    { id: "bookings", label: "My Bookings" },
    { id: "profile", label: "My Profile" },
    { id: "memberships", label: "My Subscriptions" },
    { id: "loyalty", label: "Loyalty Points" },
  ];

  const membershipPlans = [
    { id: "standard", name: "Standard", price: "$29/month", features: ["Access to basic facilities", "2 group classes per week"], highlighted: false },
    { id: "premium", name: "Premium", price: "$59/month", features: ["Access to all facilities", "Unlimited group classes", "Priority booking"], highlighted: true },
    { id: "corporate", name: "Corporate", price: "$99/month", features: ["All Premium features", "Guest passes (5/month)"], highlighted: false },
  ];

  // --- Обробники ---
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaveStatus('Saving...');
    try {
      await axios.put("/api/users/me", {
        name: profileData.name,
        phone: profileData.phone
      });
      setSaveStatus('Saved!');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setSaveStatus('Error saving!');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.delete(`/api/bookings/${bookingId}`);
        setBookings(bookings.filter(b => b.id !== bookingId));
      } catch (err) {
        console.error("Failed to cancel booking:", err);
        alert("Could not cancel booking.");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "text-green-400";
      case "Upcoming": return "text-blue-400";
      case "Confirmed": return "text-blue-400";
      case "Pending": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  // --- Рендер ---
  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-950">
        <div className="flex h-full">
          <aside className="w-64 bg-gray-900 border-r border-gray-800">
            <nav className="p-6 sticky top-20">
              <h2 className="text-white text-xl font-semibold mb-8">Personal Cabinet</h2>
            </nav>
          </aside>
          <main className="flex-1 p-12">
            <h1 className="text-2xl text-white">Loading your data...</h1>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-gray-950">
        <div className="flex h-full">
          <aside className="w-64 bg-gray-900 border-r border-gray-800">
            <nav className="p-6 sticky top-20">
              <h2 className="text-white text-xl font-semibold mb-8">Personal Cabinet</h2>
            </nav>
          </aside>
          <main className="flex-1 p-12">
            <h1 className="text-2xl text-red-500">{error}</h1>
          </main>
        </div>
      </div>
    );
  }

  return (
    // ВИПРАВЛЕННЯ ВЕРСТКИ: 'flex-1' змушує цей 'div' заповнити простір 'flex-grow' з App.jsx
    <div className="bg-gray-950 flex-1"> 
      <div className="flex h-full">
        {/* Sidebar Navigation */}
        {/* ВИПРАВЛЕННЯ ВЕРСТКИ: Видалено 'fixed' та 'min-h-screen' */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800">
          {/* 'sticky top-20' (висота хедера) робить меню "липким" */}
          <nav className="p-6 sticky top-20"> 
            <h2 className="text-white text-xl font-semibold mb-8">Personal Cabinet</h2>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        {/* ВИПРАВЛЕННЯ ВЕРСТКИ: Видалено 'ml-64', додано 'flex-1' та 'overflow-y-auto' */}
        <main className="flex-1 p-12 overflow-y-auto">
          
          {/* ----- My Bookings Tab ----- */}
          {activeTab === "bookings" && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-12">My Bookings</h1>
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left px-6 py-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left px-6 py-4 text-gray-400 font-medium">Service</th>
                      <th className="text-left px-6 py-4 text-gray-400 font-medium">Time</th>
                      <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left px-6 py-4 text-gray-400 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 text-gray-300">{new Date(booking.startTime).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-white">{booking.sectionTitle || booking.hallName || 'N/A'}</td>
                          <td className="px-6 py-4 text-gray-300">{new Date(booking.startTime).toLocaleTimeString()}</td>
                          <td className={`px-6 py-4 font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-500 hover:text-red-400 font-medium"
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">You have no bookings yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ----- My Profile Tab ----- */}
          {activeTab === "profile" && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-12">My Profile</h1>
              <form onSubmit={handleProfileSave} className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-2xl">
                <div className="space-y-8">

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                    />
                  </div>

                  {/* Email Field (Read Only) */}
                  <div>
                    <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-800 text-gray-400 rounded-lg border border-gray-700 cursor-not-allowed"
                    />
                  </div>
                  
                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-gray-400 mb-2">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                    />
                  </div>

                  {/* Save Button */}
                  <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    {saveStatus || 'Save Changes'}
                  </button>
                </div>
              </form>
                  
              {/* Change Password Form */}
              <ChangePasswordForm />
            </div>
          )}

          {/* ----- Memberships Tab ----- */}
          {activeTab === "memberships" && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-12">My Subscriptions</h1>
              
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-2xl">
                <h3 className="text-xl font-semibold text-white mb-6">Your Active Subscriptions</h3>
                {subscriptions.length > 0 ? (
                  subscriptions.map(sub => (
                    <div key={sub.id} className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white text-lg">{sub.type} Plan</p>
                        <p className="text-sm text-gray-400">Valid until: {new Date(sub.validUntil).toLocaleDateString()}</p>
                      </div>
                      <span className="text-green-400 font-medium">Active</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">You have no active subscriptions.</p>
                )}
              </div>
              
              {/* Статичний каталог планів */}
              <h2 className="text-3xl font-bold text-white mt-12 mb-8">Available Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {membershipPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-lg p-8 border transition-all ${
                      plan.highlighted
                        ? "bg-blue-600 border-blue-500 transform scale-105"
                        : "bg-gray-900 border-gray-800"
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="text-center mb-4">
                        <span className="inline-block px-4 py-1 bg-blue-500 text-white text-sm rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-3xl font-bold text-white mb-6">{plan.price}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-white" : "text-blue-400"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className={plan.highlighted ? "text-white" : "text-gray-300"}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${plan.highlighted ? "bg-white text-blue-600 hover:bg-gray-100" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----- Loyalty Points Tab ----- */}
          {activeTab === "loyalty" && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-12">Loyalty Points</h1>
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-2xl">
                <div className="text-center mb-8">
                  <p className="text-gray-400 mb-2">Your Current Balance</p>
                  <p className="text-6xl font-bold text-blue-400 mb-4">{loyaltyCard.bonusPoints || 0}</p>
                  <p className="text-gray-400">points</p>
                </div>

                <div className="border-t border-gray-800 pt-8">
                  <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    <p className="text-gray-500">Transaction history is not available yet.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default PersonalCabinet