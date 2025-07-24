import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomInfo } from "../api/roomApi";

interface RoomInfo {
    roomId: string;
    hostId: string;
    numAvailableSeats: number;
    playerNames: Record<string, string>;
}

export default function RoomPage() {
    const { roomId } = useParams<{ roomId: string }>();
    const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!roomId) return;

        getRoomInfo(roomId)
            .then((data) => {
                setRoomInfo(data);
            })
            .catch((err) => {
                console.error("Failed to fetch room info", err);
                setError("Could not load room info.");
            });
    }, [roomId]);

    if (error) return <div>{error}</div>;
    if (!roomInfo) return <div>Loading room info...</div>;

    return (
        <div>
            <h1>Room: {roomInfo.roomId}</h1>
            <p><strong>Host:</strong> {roomInfo.hostId}</p>
            <p><strong>Available Seats:</strong> {roomInfo.numAvailableSeats}</p>
            <h3>Players:</h3>
            <ul>
                {Object.entries(roomInfo.playerNames).map(([seat, playerName]) => (
                    <li key={seat}>
                        <strong>Seat {seat}:</strong> {playerName}
                    </li>
                ))}
            </ul>
        </div>
    );
}
