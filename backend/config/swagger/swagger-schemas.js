import mongooseToSwagger from "mongoose-to-swagger";

import User from "../../models/User.js";
import Gym from "../../models/Gym.js";
import Section from "../../models/Section.js";
import Trainer from "../../models/Trainer.js";
import MembershipPlan from "../../models/MembershipPlan.js";
import Membership from "../../models/Membership.js";

export const UserSchema = mongooseToSwagger(User);
export const GymSchema = mongooseToSwagger(Gym);
export const SectionSchema = mongooseToSwagger(Section);
export const TrainerSchema = mongooseToSwagger(Trainer);
export const MembershipPlanSchema = mongooseToSwagger(MembershipPlan);
export const MembershipSchema = mongooseToSwagger(Membership);

export const LoginRequestSchema = {
    type: "object",
    properties: {
        email: { type: "string", example: "user@example.com" },
        password: { type: "string", example: "password123" }
    },
    required: ["email", "password"]
};

export const LoginResponseSchema = {
    type: "object",
    properties: {
        token: { type: "string", example: "jwt-token-here" }
    }
};

export const BuyMembershipRequestSchema = {
    type: "object",
    properties: {
        planId: { type: "string", example: "64e7b8f4c2a1b2d3f4567890" }
    },
    required: ["planId"]
};
