import membershipRepository from "../repositories/membershipRepository.js";
import { DiscountContext } from "./pricing/discountContext.js";
import { PhoneDiscountStrategy, NoDiscountStrategy } from "./pricing/discountStrategy.js";
import userRepository from "../repositories/userRepository.js";
import SectionService from "./sectionService.js";

class MembershipService {
    async getPlans() {
        return membershipRepository.getPlans();
    }

    async getMyMemberships(userId) {
        const membership = await membershipRepository.getUserMemberships(userId);

        if (!membership) return null;

        if (membership.endDate < new Date() && membership.status === "active") {
            membership.status = "expired";
            await membership.save();
        }

        return membership;
    }

    async buyMembership(userId, planId, sectionIds = []) {
        const plan = await membershipRepository.getPlanById(planId);
        if (!plan) throw new Error("PLAN_NOT_FOUND");

        const user = await userRepository.findUserById(userId);

        let strategy = new NoDiscountStrategy();
        if (user.phone && user.phone.trim() !== "") {
            strategy = new PhoneDiscountStrategy();
        }

        const context = new DiscountContext(strategy);
        const finalPrice = context.apply(plan.price);

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + plan.durationDays);

        let sectionsString = "";

        if (Array.isArray(sectionIds) && sectionIds.length > 0) {
            const sections = await SectionService.getSectionsByIds(sectionIds);
            sectionsString = sections.map(s => s.name).join(', ');
        }

        return membershipRepository.createMembership({
            user: userId,
            plan: plan._id,
            price: finalPrice,
            endDate,
            discountApplied: finalPrice !== plan.price,
            accessibleSections: sectionsString
        });
    }

    async cancelMembership(id, userId) {
        const membership = await membershipRepository.findMembershipById(id, userId);
        if (!membership) throw new Error("NOT_FOUND");

        if (membership.status !== "active") throw new Error("CANNOT_CANCEL");

        membership.status = "canceled";
        await membership.save();
        return membership;
    }
}

export default new MembershipService();
