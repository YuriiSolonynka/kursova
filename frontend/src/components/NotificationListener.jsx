import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useToast } from './ui/ToastContext';

const NotificationListener = () => {
    const { addToast } = useToast();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        const userId = user._id || user.id;

        if (!userId) return;

        const socket = io('http://localhost:5000');

        socket.emit('join', userId);


        socket.on('notification', (data) => {
            addToast(data.message, data.type || 'info');
        });

        return () => {
            socket.disconnect();
        };
    }, [addToast]);

    return null;
};

export default NotificationListener;