import userRepository from '../repositories/userRepository.js';

class UserService {
    async getCurrentUser(userId) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error('User not found');
        return user;
    }

    async updateUserProfile(userId, { name, phone, avatar }) {
        const updateData = { name, phone };
        if (avatar) updateData.avatar = avatar;

        const updatedUser = await userRepository.updateUserById(userId, updateData);
        if (!updatedUser) throw new Error("Failed to update user profile");
        return updatedUser;
    };

    async getUserLoyaltyData(userId) {
        const user = await userRepository.findUserById(userId);
        if (!user) throw new Error("User not found");

        const bonusHistory = await userRepository.getUserBonusTransactions(userId);

        return {
            bonusPoints: user.bonusPoints,
            bonusHistory,
        };
    };

}

export default new UserService();
