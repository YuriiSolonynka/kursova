import Membership from "../models/Membership.js";
import MembershipPlan from "../models/MembershipPlan.js";

class MembershipRepository {
    async getPlans() {
        const plans = await MembershipPlan.find();

        return plans.map(plan => ({
            ...plan.toObject(),
            features: JSON.parse(plan.features || "[]")
        }));
    }

    async getPlanById(id) {
        return MembershipPlan.findById(id);
    }

    async getPlanName(id) {
        const plan = await MembershipPlan.findById(id);
        return plan?.name || null;
    }

    async getUserMemberships(userId) {
        const membership = await Membership.findOne({ user: userId })
            .sort({ _id: -1 });

        if (!membership) return null;

        const planName = await this.getPlanName(membership.plan);

        return {
            ...membership.toObject(),
            planName
        };
    }

    async createMembership(data) {
        return Membership.create(data);
    }

    async findMembershipById(id, userId) {
        return Membership.findOne({ _id: id, user: userId });
    }
}

export default new MembershipRepository();
