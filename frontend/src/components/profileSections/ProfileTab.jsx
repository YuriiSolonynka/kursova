import { useState, useEffect } from "react";
import { useToast } from "../ui/ToastContext";
import { useAuth } from "../../context/AuthContext";

export default function ProfileTab({ profileData, handleProfileSave }) {
    const { addToast } = useToast();
    const { updateUser } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        avatar: "",
        avatarFile: null
    });
    const [avatarPreview, setAvatarPreview] = useState("/placeholder-user.jpg");
    const [saveStatus, setSaveStatus] = useState("");

    useEffect(() => {
        if (profileData) {
            setFormData({
                name: profileData.name || "",
                phone: profileData.phone || "",
                avatar: profileData.avatar || "",
                avatarFile: null
            });
            setAvatarPreview(profileData.avatar ? `${profileData.avatar}` : "/placeholder-user.jpg");
        }
    }, [profileData]);

    useEffect(() => {
        if (formData.avatarFile) {
            const objectUrl = URL.createObjectURL(formData.avatarFile);
            setAvatarPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setAvatarPreview(formData.avatar || "/placeholder-user.jpg");
        }
    }, [formData.avatarFile, formData.avatar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFormData(prev => ({ ...prev, avatarFile: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const savedData = await handleProfileSave(formData, setSaveStatus);

        if (savedData && savedData.avatar) {
            updateUser({ avatar: savedData.avatar });
        }

        if (savedData && savedData.name) {
            updateUser({ name: savedData.name });
        }

        if (formData.phone && formData.phone.trim() !== "" && !profileData.phone) {
            addToast("You have activated the promotion! 5% discount on all subscriptions!", "success");
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-12">My Profile</h1>
            <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-3xl space-y-6">

                <div className="flex items-center gap-6">
                    <img
                        src={avatarPreview}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border border-gray-700"
                    />
                    <input type="file" accept="image/*" onChange={handleFileChange} className="text-gray-400" />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="user12345"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input
                        type="email"
                        value={profileData.email}
                        readOnly
                        className="w-full px-4 py-3 bg-gray-800 text-gray-400 rounded-lg border border-gray-700 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                        placeholder="+380XXXXXXXXX"
                        pattern="\+380\d{9}"
                        title="+380XXXXXXXXX"
                    />
                </div>

                <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    {saveStatus || "Save Changes"}
                </button>
            </form>

        </div>
    );
}
