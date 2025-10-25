"use client"

import { useState } from "react"

function PersonalCabinet() {
  const [activeTab, setActiveTab] = useState("bookings")
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    photo: null,
  })

  const navItems = [
    { id: "bookings", label: "My Bookings" },
    { id: "profile", label: "My Profile" },
    { id: "memberships", label: "Memberships" },
    { id: "loyalty", label: "Loyalty Points" },
  ]

  const bookings = [
    { id: 1, date: "2024-01-15", section: "Swimming", trainer: "Sarah Johnson", status: "Completed" },
    { id: 2, date: "2024-01-20", section: "Yoga", trainer: "Mike Chen", status: "Completed" },
    { id: 3, date: "2024-01-25", section: "Tennis", trainer: "Emma Wilson", status: "Upcoming" },
    { id: 4, date: "2024-02-01", section: "Fitness", trainer: "David Brown", status: "Upcoming" },
    { id: 5, date: "2024-02-05", section: "Basketball", trainer: "Lisa Anderson", status: "Pending" },
  ]

  const memberships = [
    {
      id: "standard",
      name: "Standard",
      price: "$29/month",
      features: ["Access to basic facilities", "2 group classes per week", "Locker access", "Mobile app access"],
      highlighted: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$59/month",
      features: [
        "Access to all facilities",
        "Unlimited group classes",
        "Personal trainer (2 sessions/month)",
        "Priority booking",
        "Nutrition consultation",
      ],
      highlighted: true,
    },
    {
      id: "corporate",
      name: "Corporate",
      price: "$99/month",
      features: [
        "All Premium features",
        "Guest passes (5/month)",
        "Corporate wellness program",
        "Dedicated account manager",
        "Team building events",
      ],
      highlighted: false,
    },
  ]

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, photo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-400"
      case "Upcoming":
        return "text-blue-400"
      case "Pending":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-gray-900 min-h-screen border-r border-gray-800 fixed left-0 top-20">
          <nav className="p-6">
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
        <main className="ml-64 flex-1 p-12">
          {/* My Bookings */}
          {activeTab === "bookings" && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-12">My Bookings</h1>
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left px-6 py-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left px-6 py-4 text-gray-400 font-medium">Section</th>
                      <th className="text-left px-6 py-4 text-gray-400 font-medium">Trainer</th>
                      <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                        <td className="px-6 py-4 text-gray-300">{booking.date}</td>
                        <td className="px-6 py-4 text-white">{booking.section}</td>
                        <td className="px-6 py-4 text-gray-300">{booking.trainer}</td>
                        <td className={`px-6 py-4 font-medium ${getStatusColor(booking.status)}`}>{booking.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* My Profile */}
          {activeTab === "profile" && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-12">My Profile</h1>
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-2xl">
                <div className="space-y-8">
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-gray-400 mb-4">Profile Photo</label>
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center">
                        {profileData.photo ? (
                          <img
                            src={profileData.photo || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        )}
                      </div>
                      <label className="cursor-pointer px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        Upload Photo
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Save Button */}
                  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Memberships */}
          {activeTab === "memberships" && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-12">Memberships</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {memberships.map((plan) => (
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
                          <svg
                            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                              plan.highlighted ? "text-white" : "text-blue-400"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className={plan.highlighted ? "text-white" : "text-gray-300"}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                        plan.highlighted
                          ? "bg-white text-blue-600 hover:bg-gray-100"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loyalty Points */}
          {activeTab === "loyalty" && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-12">Loyalty Points</h1>
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-2xl">
                <div className="text-center mb-8">
                  <p className="text-gray-400 mb-2">Your Current Balance</p>
                  <p className="text-6xl font-bold text-blue-400 mb-4">2,450</p>
                  <p className="text-gray-400">points</p>
                </div>

                <div className="border-t border-gray-800 pt-8">
                  <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white">Booking Completed</p>
                        <p className="text-sm text-gray-400">Jan 15, 2024</p>
                      </div>
                      <span className="text-green-400 font-medium">+50 pts</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white">Referral Bonus</p>
                        <p className="text-sm text-gray-400">Jan 10, 2024</p>
                      </div>
                      <span className="text-green-400 font-medium">+200 pts</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white">Redeemed Reward</p>
                        <p className="text-sm text-gray-400">Jan 5, 2024</p>
                      </div>
                      <span className="text-red-400 font-medium">-100 pts</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Redeem Points
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default PersonalCabinet
