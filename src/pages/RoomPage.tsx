import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getRoomInfo, exitRoom } from "../api/roomApi";

interface RoomInfo {
    roomId: string;
    hostId: string;
    numAvailableSeats: number;
    playerNames: Record<string, string>;
}

export default function RoomPage() {
    const { roomId } = useParams<{ roomId: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!roomId) return;

        getRoomInfo(roomId)
            .then((data) => {
                setRoomInfo(data);
            })
            .catch((err) => {
                console.error("Error fetching room info: ", err);
                setError("Could not load room info!");
            });
    }, [roomId]);

    const handleExitRoom = async () => {
        if (!roomId) return;
        try {
            await exitRoom(roomId);
            navigate("/lobby");
        } catch (err) {
            console.error("Error exiting room: ", err);
            alert("Failed to exit room!");
        }
    };

    if (error) return <div>{error}</div>;
    if (!roomInfo) return <div>Loading room info...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Room: {roomInfo.roomId}</h1>
            <p><strong>Host:</strong> {roomInfo.hostId}</p>
            <p><strong>Available Seats:</strong> {roomInfo.numAvailableSeats}</p>

            <h3 className="text-lg font-semibold mt-4">Players:</h3>
            <ul className="mb-4">
                {Object.entries(roomInfo.playerNames).map(([seat, playerName]) => (
                    <li key={seat}>
                        <strong>Seat {seat}:</strong> {playerName}
                    </li>
                ))}
            </ul>

            <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleExitRoom}
            >
                Exit Room
            </button>
        </div>
    );
}
