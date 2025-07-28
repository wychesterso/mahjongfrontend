import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getAvailableRooms, getRoomInfo, createRoom, joinRoom } from "../api/lobbyApi";
import { getUserSeat } from "../utils/roomHelpers";

export default function LobbyPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
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

    const handleCreateRoom = async () => {
        try {
            const roomId = await createRoom();
            navigate(`/room/${roomId}`);
        } catch (e) {
            console.error("Error creating room: ", e);
            alert("Failed to create room!");
        }
    }

    const handleJoinRoom = async (roomId: string) => {
        try {
            const room = await getRoomInfo(roomId);
            const playerSeat = getUserSeat(room.playerNames, user?.username);

            if (playerSeat === null) {
                const allSeats = ["EAST", "SOUTH", "WEST", "NORTH"];
                const takenSeats = Object.keys(room.playerNames);
                const availableSeats = allSeats.filter(seat => !takenSeats.includes(seat));

                if (availableSeats.length === 0) {
                    alert("Room full!");
                    return;
                }

                const randomSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)];
                await joinRoom(roomId, randomSeat);
            }

            navigate(`/room/${roomId}`);
        } catch (e) {
            console.error("Failed to join room: ", e);
            alert("Failed to join room!");
        }
    };

    if (!user) return <div>Loading...</div>

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleCreateRoom}
            >
                Create Room
            </button>

            <ul>
                {rooms.map((room) => {
                    const playerSeat = getUserSeat(room.playerNames, user?.username);

                    return (
                        <li
                            key={room.roomId}
                            className="mb-2 p-2 border rounded cursor-pointer hover:bg-gray-100"
                        >
                            <div><strong>Room ID:</strong> {room.roomId}</div>
                            <div><strong>Host:</strong> {room.host}</div>
                            <div><strong>Available Seats:</strong> {room.availableSeats}</div>
                            <div className="mt-2 flex gap-2">
                                {playerSeat ? (
                                    <button
                                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => navigate(`/room/${room.roomId}`)}
                                    >
                                        Rejoin
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            onClick={() => navigate(`/room/${room.roomId}`)}
                                        >
                                            View
                                        </button>
                                        {room.availableSeats > 0 && (
                                            <button
                                                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                onClick={() => handleJoinRoom(room.roomId)}
                                            >
                                                Join
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
