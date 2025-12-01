import userService from "../services/userService.js";

export const getProfile = async (req, res) => {
    try {
        const user = await userService.getCurrentUser(req.user.id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedUser = await userService.updateUserProfile(req.user.id, { name, phone, avatar });

        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export const getLoyaltyData = async (req, res) => {
    try {
        const data = await userService.getUserLoyaltyData(req.user.id);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
