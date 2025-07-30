import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function useGameSocket(roomId: string, playerId: string, onMessage: (msg: any) => void) {
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        const sock = new SockJS("/ws");
        const client = new Client({
            webSocketFactory: () => sock,
            debug: console.log,
            onConnect: () => {
                client.subscribe(`/user/queue/game`, (message) => {
                    onMessage(JSON.parse(message.body));
                });

                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    onMessage(JSON.parse(message.body));
                });
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [roomId, playerId]);
}
