import membershipService from "../services/membershipService.js";

export const getPlans = async (req, res) => {
    const plans = await membershipService.getPlans();
    res.json(plans);
}

export const getMyMemberships = async (req, res) => {
    const memberships = await membershipService.getMyMemberships(req.user.id);
    res.json(memberships);
}

export const buy = async (req, res) => {
    try {
        const membership = await membershipService.buyMembership(
            req.user.id,
            req.body.planId
        );
        res.json(membership);
    } catch (err) {
        if (err.message === "PLAN_NOT_FOUND")
            return res.status(404).json({ error: "Plan not found" });

        console.error(err);
        res.status(500).json({ error: "Failed to buy membership" });
    }
}

export const cancel = async (req, res) => {
    try {
        const membership = await membershipService.cancelMembership(
            req.params.id,
            req.user.id
        );
        res.json({ message: "Membership canceled", membership });
    } catch (err) {
        if (err.message === "NOT_FOUND")
            return res.status(404).json({ error: "Membership not found" });

        if (err.message === "CANNOT_CANCEL")
            return res.status(400).json({ error: "This membership cannot be canceled" });

        console.error(err);
        res.status(500).json({ error: "Failed to cancel membership" });
    }
}
