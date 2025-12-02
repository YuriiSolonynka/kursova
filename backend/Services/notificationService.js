import cron from 'node-cron';
import bookingRepository from '../repositories/bookingRepository.js';

class NotificationService {
    init(ioInstance) {
        this.io = ioInstance;
        console.log("Notification Service started...");

        cron.schedule('* * * * *', async () => {
            await this.checkAndNotify();
        });
    }

    async checkAndNotify() {
        try {
            const now = new Date();

            const todayStr = now.toISOString().split('T')[0];

            const bookings = await bookingRepository.findConfirmedBookingsByDate(todayStr);

            for (const booking of bookings) {
                const workoutDate = this.getWorkoutStartDate(booking.date, booking.time);

                if (!workoutDate) continue;

                const notificationTime = new Date(workoutDate.getTime() - 60 * 60 * 2000);

                if (this.isSameMinute(now, notificationTime)) {
                    this.sendNotification(booking, workoutDate);
                }
            }

        } catch (error) {
            console.error("Error in notification scheduler:", error);
        }
    }

    getWorkoutStartDate(dateStr, timeStr) {
        try {
            let startTimeString = timeStr.split('-')[0].trim();

            const timeParts = startTimeString.match(/(\d+):(\d+)\s?(AM|PM)?/i);

            if (!timeParts) return null;

            let hours = parseInt(timeParts[1], 10);
            let minutes = parseInt(timeParts[2], 10);
            const modifier = timeParts[3] ? timeParts[3].toUpperCase() : null;

            if (modifier === 'PM' && hours < 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;

            const [year, month, day] = dateStr.split('-').map(Number);
            const resultDate = new Date();
            resultDate.setFullYear(year);
            resultDate.setMonth(month - 1);
            resultDate.setDate(day);
            resultDate.setHours(hours);
            resultDate.setMinutes(minutes);
            resultDate.setSeconds(0);
            resultDate.setMilliseconds(0);

            return resultDate;

        } catch (e) {
            console.error(`Failed to parse date/time: ${dateStr} ${timeStr}`, e);
            return null;
        }
    }

    isSameMinute(date1, date2) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate() &&
            date1.getHours() === date2.getHours() &&
            date1.getMinutes() === date2.getMinutes()
        );
    }

    sendNotification(booking, workoutDate) {
        const timeString = workoutDate.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
        const sectionName = booking.section ? booking.section.name : "Тренування";
        const userId = booking.user._id.toString();

        const message = `Reminder! "${sectionName}" starts at ${timeString} (in 2 hour)`;

        if (this.io) {
            this.io.to(userId).emit('notification', {
                message: message,
                type: 'info'
            });
        } else {
            console.error("Socket.io not initialized in NotificationService");
        }
    }
}

export default new NotificationService();