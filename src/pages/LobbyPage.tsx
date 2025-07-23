import { useEffect, useState } from "react";
import { getAvailableRooms, getLobbyState, addBot, startGame, leaveRoom } from "../api/lobbyApi";
import { useAuth } from "../auth/AuthContext";

export default function LobbyPage() {
    const { user } = useAuth();
    const [rooms, setRooms] = useState<any[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await getAvailableRooms();
                console.log("Fetched rooms: ", data);
                setRooms(data);
            } catch (e) {
                console.error("Error fetching rooms: ", e);
                console.error("Error details:", JSON.stringify(e, Object.getOwnPropertyNames(e)));
                alert("Failed to load available rooms!");
            }
        };

        if (user) {
            fetchRooms();
            const interval = setInterval(fetchRooms, 2000); // every 2s
            return () => clearInterval(interval);
            }
    }, [user]);

    const handleJoinRoom = (roomId: string) => {
        navigate(`/room/${roomId}`);
    };

    if (!user) return <div>Loading...</div>

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room.roomId} className="mb-2 p-2 border rounded">
                        <div><strong>Room ID:</strong> {room.roomId}</div>
                        <div><strong>Host:</strong> {room.host}</div>
                        <div><strong>Available Seats:</strong> {room.availableSeats}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
