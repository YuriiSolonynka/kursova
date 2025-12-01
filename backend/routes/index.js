import authRoutes from './auth.js';
import sectionRoutes from './section.js';
import profileRoutes from './profile.js';
import bookingsRoutes from './bookings.js';
import membershipsRoutes from './memberships.js';
import loyaltyRoutes from './loyalty.js';
import gymRoutes from './gymRoutes.js';
import trainerRoutes from './trainer.js';

export const register = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/sections', sectionRoutes);
    app.use('/api/profile', profileRoutes);
    app.use('/api/bookings', bookingsRoutes);
    app.use('/api/memberships', membershipsRoutes);
    app.use('/api/loyalty', loyaltyRoutes);
    app.use('/api/gyms', gymRoutes);
    app.use('/api/trainers', trainerRoutes);
};
