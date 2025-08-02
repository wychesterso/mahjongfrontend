import { useEffect, useRef } from "react";
import { Client, over } from "stompjs";
import SockJS from "sockjs-client";

type MessageHandler = (message: any) => void;

export default function useGameSocket(playerId: string, roomId: string, onMessage: MessageHandler) {
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        const socket = new SockJS("/ws");
        const client = over(socket);
        client.debug = () => {};

        client.connect({}, () => {
            // subscribe to user-specific queue
            client.subscribe("/user/queue/game", (msg) => {
                const payload = JSON.parse(msg.body);
                onMessage(payload);
            });

            // subscribe to room-wide topic
            client.subscribe(`/topic/room/${roomId}`, (msg) => {
                const payload = JSON.parse(msg.body);
                onMessage(payload);
            });
        });

        clientRef.current = client;

        return () => {
            clientRef.current?.disconnect(() => {
                console.log("Disconnected");
            });
        };
    }, [playerId, roomId, onMessage]);

    return {
        send: (destination: string, payload: any) => {
            clientRef.current?.send(destination, {}, JSON.stringify(payload));
        },
    };
}
