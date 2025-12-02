import { useState, useEffect } from "react";
import axiosInstance from "../lib/axiosInstance";
import Sidebar from "../components/profileSections/Sidebar";
import BookingsTab from "../components/profileSections/BookingsTab";
import ProfileTab from "../components/profileSections/ProfileTab";
import MembershipsTab from "../components/profileSections/MembershipsTab";
import LoyaltyTab from "../components/profileSections/LoyaltyTab";
import { LoaderCircle } from 'lucide-react';
import { useAuth } from "../context/AuthContext";

function PersonalCabinet() {
  const [activeTab, setActiveTab] = useState("bookings");
  const { updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: ""
  });

  const [bookings, setBookings] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({});
  const [membershipPlans, setMembershipPlans] = useState([]);

  // 1. Стейт для списку всіх секцій (для Corporate плану)
  const [allSections, setAllSections] = useState([]);

  const [loyaltyCard, setLoyaltyCard] = useState({ bonusPoints: 0, bonusHistory: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // 2. Додаємо запит за секціями: axiosInstance.get("/sections")
        const [profileRes, bookingsRes, subsRes, plansRes, loyaltyRes, sectionsRes] = await Promise.all([
          axiosInstance.get("/profile/me"),
          axiosInstance.get("/bookings/my"),
          axiosInstance.get("/memberships/my"),
          axiosInstance.get("/memberships/plans"),
          axiosInstance.get("/loyalty"),
          axiosInstance.get("/sections") // <--- Отримуємо список секцій з бекенду
        ]);

        setProfileData({
          ...profileRes.data,
          avatar: profileRes.data.avatar ? `http://localhost:5000${profileRes.data.avatar}` : ""
        });

        setBookings(bookingsRes.data);
        setCurrentPlan(subsRes.data);
        setMembershipPlans(plansRes.data);
        setLoyaltyCard(loyaltyRes.data);

        // Зберігаємо секції в стейт
        setAllSections(sectionsRes.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "text-green-400";
      case "canceled": return "text-red-500";
      case "pending": return "text-yellow-400";
      default: return "text-gray-300";
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axiosInstance.delete(`/bookings/${id}`);
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: "canceled" } : b)));
      alert("Booking successfully canceled!");
    } catch (err) {
      console.error("Cancel failed", err);
      alert("Error: failed to cancel booking.");
    }
  };

  const handleProfileSave = async (formData, setSaveStatus) => {
    setSaveStatus("Saving...");
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      if (formData.avatarFile) data.append("avatar", formData.avatarFile);

      const res = await axiosInstance.put("/profile/me", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfileData({
        ...res.data,
        avatar: res.data.avatar ? `http://localhost:5000${res.data.avatar}` : "",
      });
      setSaveStatus("Saved!");
      setTimeout(() => setSaveStatus(""), 2000);
      return res.data;
    } catch (err) {
      console.error(err);
      setSaveStatus("Error!");
      return null;
    }
  };

  const handleBuyMembership = async (planId, sectionIds = []) => {
    try {
      await axiosInstance.post("/memberships/buy", { planId, sectionIds });

      alert("Membership purchased!");

      const res = await axiosInstance.get("/memberships/my");
      setCurrentPlan(res.data);
      updateUser({ subscription: res.data });

    } catch (err) {
      console.error(err);
      alert("Failed to purchase membership.");
      throw err;
    }
  };

  const handleCancelMembership = async (id) => {
    if (!window.confirm("Cancel this membership?")) return;
    try {
      await axiosInstance.delete(`/memberships/${id}`);
      alert("Membership canceled!");
      const updatedPlan = { ...currentPlan, status: "canceled" };
      setCurrentPlan(updatedPlan);
      updateUser({ subscription: updatedPlan });
    } catch (err) {
      console.error(err);
      alert("Failed to cancel membership.");
    }
  };

  const navItems = [
    { id: "bookings", label: "My Bookings" },
    { id: "profile", label: "My Profile" },
    { id: "memberships", label: "My Subscriptions" },
  ];

  return (
    <div className="bg-gray-950 flex-1">
      <div className="flex justify-center min-h-[calc(100vh-77px)]">
        <Sidebar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-12 overflow-y-auto">
          {isLoading ? (
            <div className="w-full mt-20 flex justify-center items-center">
              <LoaderCircle className="animate-spin text-white w-12 h-12" />
            </div>
          ) : error ? (
            <div className="p-12 text-red-500">{error}</div>
          ) : (
            <>
              {activeTab === "bookings" && (
                <BookingsTab
                  bookings={bookings}
                  handleCancelBooking={handleCancelBooking}
                  getStatusColor={getStatusColor}
                />
              )}

              {activeTab === "profile" && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <ProfileTab profileData={profileData} handleProfileSave={handleProfileSave} />
                  </div>
                  <div className="flex-1">
                    <LoyaltyTab loyaltyCard={loyaltyCard} />
                  </div>
                </div>
              )}

              {activeTab === "memberships" && (
                <MembershipsTab
                  currentPlan={currentPlan}
                  membershipPlans={membershipPlans}
                  onBuyMembership={handleBuyMembership}
                  onCancelMembership={handleCancelMembership}
                  profile={profileData}
                  allSections={allSections}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default PersonalCabinet;