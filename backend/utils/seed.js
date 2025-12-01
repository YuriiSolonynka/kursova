import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Gym from '../models/Gym.js';
import Section from '../models/Section.js';
import Trainer from '../models/Trainer.js';
import MembershipPlan from "../models/MembershipPlan.js";

dotenv.config()

const gymsData = [
    { name: "SportSpace Central", address: "123 Main St, Kyiv", services: ["Pool", "Gym", "Yoga Studio", "Sauna"], city: "Kyiv", rating: 5 },
    { name: "SportSpace West", address: "456 Oak Avenue, Lviv", services: ["CrossFit Zone", "Gym", "Boxing Ring"], city: "Lviv", rating: 4 },
    { name: "SportSpace Elite", address: "789 Park Boulevard, Kyiv", services: ["Pool", "Sauna", "Spa", "Tennis Courts", "Gym"], city: "Kyiv", rating: 5 },
    { name: "SportSpace North", address: "321 River Road, Odesa", services: ["Gym", "Pool", "Yoga Studio", "Pilates Studio"], city: "Odesa", rating: 4 },
    { name: "SportSpace Pro", address: "654 Victory Street, Kharkiv", services: ["CrossFit Zone", "Gym", "Sauna", "Sports Bar"], city: "Kharkiv", rating: 5 },
    { name: "SportSpace Fitness", address: "987 Green Lane, Lviv", services: ["Gym", "Pool", "Sauna", "Massage Room"], city: "Lviv", rating: 3 },
];

const sectionsData = [
    {
        name: "Advanced Swimming",
        description: "High-intensity swimming program for competitive athletes.",
        sportType: "Swimming",
        skillLevel: "Advanced",
        ageGroup: "Adults",
        schedule: JSON.stringify([
            { days: ["Mon", "Wed", "Fri"], time: "6:00 AM - 8:00 AM" },
            { days: ["Tue", "Thu"], time: "5:30 PM - 7:30 PM" },
            { days: ["Sat"], time: "9:00 AM - 12:00 PM" }
        ])
    },
    {
        name: "Youth Basketball Fundamentals",
        description: "Learn the basics of basketball including dribbling, shooting, and teamwork.",
        sportType: "Basketball",
        skillLevel: "Beginner",
        ageGroup: "Kids",
        schedule: JSON.stringify([
            { days: ["Tue", "Thu"], time: "4:00 PM - 6:00 PM" }
        ])
    },
    {
        name: "Intermediate Tennis Training",
        description: "Develop your tennis skills with focused training.",
        sportType: "Tennis",
        skillLevel: "Intermediate",
        ageGroup: "Adults",
        schedule: JSON.stringify([
            { days: ["Mon", "Wed"], time: "6:00 PM - 8:00 PM" }
        ])
    },
    {
        name: "Beginner Yoga Flow",
        description: "Gentle introduction to yoga with focus on breathing, flexibility, and mindfulness.",
        sportType: "Yoga",
        skillLevel: "Beginner",
        ageGroup: "All Ages",
        schedule: JSON.stringify([
            { days: ["Tue", "Thu"], time: "7:00 AM - 8:00 AM" }
        ])
    },
    {
        name: "Elite Boxing Program",
        description: "Professional-level boxing training including sparring and conditioning.",
        sportType: "Boxing",
        skillLevel: "Advanced",
        ageGroup: "Adults",
        schedule: JSON.stringify([
            { days: ["Mon", "Fri"], time: "7:00 PM - 9:00 PM" }
        ])
    },
    {
        name: "Teen Soccer Development",
        description: "Comprehensive soccer training for teenagers.",
        sportType: "Soccer",
        skillLevel: "Intermediate",
        ageGroup: "Teens",
        schedule: JSON.stringify([
            { days: ["Wed"], time: "4:00 PM - 6:00 PM" },
            { days: ["Sat"], time: "10:00 AM - 12:00 PM" }
        ])
    }
];


const trainersData = [
    { name: "Anna Kovalenko", specialization: "Yoga Instructor", experience: "Senior", rating: 5, avatar: "/female-yoga-instructor.png" },
    { name: "Dmitry Petrov", specialization: "CrossFit Coach", experience: "Senior", rating: 5, avatar: "/male-crossfit-coach.jpg" },
    { name: "Elena Sokolova", specialization: "Swimming Coach", experience: "Senior", rating: 4, avatar: "/female-swimming-coach.jpg" },
    { name: "Ivan Marchenko", specialization: "Fitness Trainer", experience: "Junior", rating: 4, avatar: "/male-fitness-trainer.png" },
    { name: "Olga Bondarenko", specialization: "Pilates Instructor", experience: "Senior", rating: 5, avatar: "/female-pilates-instructor.png" },
    { name: "Sergey Ivanov", specialization: "Boxing Coach", experience: "Senior", rating: 5, avatar: "/male-boxing-coach.png" },
    { name: "Maria Tkachenko", specialization: "Yoga Instructor", experience: "Junior", rating: 4, avatar: "/female-yoga-instructor-2.jpg" },
    { name: "Viktor Shevchenko", specialization: "CrossFit Coach", experience: "Junior", rating: 3, avatar: "/male-crossfit-coach-2.jpg" },
];

const plans = [
    { name: "Standard", price: 29, features: ["Access to basic facilities", "2 group classes per week"], highlighted: false, durationDays: 30 },
    { name: "Premium", price: 59, features: ["Access to all facilities", "Unlimited group classes", "Priority booking"], highlighted: true, durationDays: 30 },
    { name: "Corporate", price: 99, features: ["All Premium features", "Guest passes (5/month)"], highlighted: false, durationDays: 30 }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');

        await Gym.deleteMany({});
        await Section.deleteMany({});
        await Trainer.deleteMany({});
        await MembershipPlan.deleteMany({});


        const plansDataForInsert = plans.map(plan => ({
            ...plan,
            features: JSON.stringify(plan.features)
        }));

        await MembershipPlan.insertMany(plansDataForInsert);

        const gymsDataForInsert = gymsData.map(gym => ({
            ...gym,
            services: JSON.stringify(gym.services)
        }));

        const gyms = await Gym.insertMany(gymsDataForInsert);

        const sections = [];
        for (let i = 0; i < sectionsData.length; i++) {
            const sectionData = {
                ...sectionsData[i],
                gymId: gyms[i % gyms.length]._id,
                schedule: JSON.stringify(sectionsData[i].schedule)
            };
            const section = await Section.create(sectionData);
            sections.push(section);
        }

        for (let i = 0; i < trainersData.length; i++) {
            const trainerData = trainersData[i];
            await Trainer.create(trainerData);
        }

        console.log('Seed data inserted successfully!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
