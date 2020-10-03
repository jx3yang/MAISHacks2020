import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { notification } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface Notification {
    message: string;
}

const SocketPage: React.FC<{}> = () => {
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

    const openNotification = (msg: string) => {
        notification.open({
            message: msg,
            description: 'Got a message',
        });
    };

    useEffect(() => {
        setSocket(io('http://localhost:5000'));
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            console.log('Successfully connected');
        });

        socket.on('notification', (notification: Notification) => {
            openNotification(notification.message);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected');
        });
    }, [socket]);

    return (
        <PageHeaderWrapper />
    );
};

export default SocketPage;
