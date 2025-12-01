import AdminJS from "adminjs"
import * as AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";

AdminJS.registerAdapter(AdminJSMongoose)

import Section from "../../models/Section.js"
import Gym from "../../models/Gym.js"
import Booking from "../../models/Booking.js";
import Membership from "../../models/Membership.js"
import MembershipPlan from "../../models/MembershipPlan.js"
import User from "../../models/User.js"
import Trainer from "../../models/Trainer.js"

const adminJs = new AdminJS({
    resources: [
        { resource: Section },
        { resource: Gym },
        { resource: Booking },
        { resource: Membership },
        { resource: MembershipPlan },
        { resource: User },
        { resource: Trainer },

    ],
    rootPath: "/admin",
    branding: {
        companyName: "Lounge Admin",
        softwareBrothers: false,
        logo: false,
        favicon: false,
    },
})

const ADMIN = {
    email: "",
    password: "",
}

const router = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
        authenticate: async (email, password) => {
            if (email === ADMIN.email && password === ADMIN.password) return ADMIN
            return null
        },
        cookieName: "adminjs",
        cookiePassword: process.env.COOKIE_SECRET || "supersecret",
    },
    null,
    {
        resave: false,
        saveUninitialized: true,
    }
)

export { adminJs, router }
