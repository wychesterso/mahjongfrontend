import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

export function useGameSocket(roomId: string, playerId: string, onMessage: (msg: any) => void) {
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        const client = new Client({
            brokerURL: `ws://${location.host}/ws`,
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
