import {
  UserSchema, GymSchema, SectionSchema, TrainerSchema,
  MembershipPlanSchema, MembershipSchema,
  LoginRequestSchema, LoginResponseSchema, BuyMembershipRequestSchema
} from './swagger-schemas.js';

const doc = {
  openapi: "3.0.0",
  info: { title: "Gym API", version: "1.0.0" },
  servers: [{ url: "http://localhost:5000" }],
  tags: [
    { name: "Auth" },
    { name: "Gyms" },
    { name: "Sections" },
    { name: "Trainers" },
    { name: "Users" },
    { name: "Memberships" },
    { name: "Loyalty" }
  ],
  components: {
    schemas: {
      User: UserSchema,
      Gym: GymSchema,
      Section: SectionSchema,
      Trainer: TrainerSchema,
      MembershipPlan: MembershipPlanSchema,
      Membership: MembershipSchema,
      LoginRequest: LoginRequestSchema,
      LoginResponse: LoginResponseSchema,
      BuyMembershipRequest: BuyMembershipRequestSchema
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } }
        },
        responses: { "200": { description: "User registered" } }
      }
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } } } },
        responses: {
          "200": { description: "JWT token", content: { "application/json": { schema: { $ref: "#/components/schemas/LoginResponse" } } } },
          "401": { description: "Invalid credentials" }
        }
      }
    },
    "/api/profile/me": {
      get: {
        tags: ["Users"],
        summary: "Get current logged-in user",
        security: [{ BearerAuth: [] }],
        responses: { "200": { description: "User info", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } } }
      }
    },
    "/api/gyms": {
      get: {
        tags: ["Gyms"],
        responses: { "200": { description: "List of gyms", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Gym" } } } } } }
      }
    },
    "/api/sections": {
      get: {
        tags: ["Sections"],
        responses: { "200": { description: "List of sections", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Section" } } } } } }
      }
    },
    "/api/trainers": {
      get: {
        tags: ["Trainers"],
        responses: { "200": { description: "List of trainers", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Trainer" } } } } } }
      }
    },
    "/api/memberships/plans": {
      get: {
        tags: ["Memberships"],
        responses: { "200": { description: "Membership plans", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/MembershipPlan" } } } } } }
      }
    },
    "/api/memberships/my": {
      get: {
        tags: ["Memberships"],
        security: [{ BearerAuth: [] }],
        responses: { "200": { description: "User memberships", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Membership" } } } } } }
      }
    },
    "/api/memberships/buy": {
      post: {
        tags: ["Memberships"],
        security: [{ BearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/BuyMembershipRequest" } } } },
        responses: { "200": { description: "Membership purchased", content: { "application/json": { schema: { $ref: "#/components/schemas/Membership" } } } } }
      }
    },
    "/api/memberships/:id": {
      delete: {
        tags: ["Memberships"],
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: { "200": { description: "Membership canceled" } }
      }
    },
    "/api/loyalty": {
      get: {
        tags: ["Loyalty"],
        security: [{ BearerAuth: [] }],
        responses: { "200": { description: "User loyalty points", content: { "application/json": { schema: { type: "object", properties: { bonusPoints: { type: "number" }, bonusHistory: { type: "array", items: { type: "object" } } } } } } } }
      }
    }
  }
};

export default doc;
