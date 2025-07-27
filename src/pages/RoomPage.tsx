import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getRoomInfo, joinRoom, switchSeat, addBot, removeBot, exitRoom } from "../api/roomApi";

interface RoomInfo {
    roomId: string;
    hostId: string;
    numAvailableSeats: number;
    playerNames: Record<string, string>;
    botStatuses: Record<string, boolean>;
}

const SEATS = ["EAST", "SOUTH", "WEST", "NORTH"];

export default function RoomPage() {
    const { roomId } = useParams<{ roomId: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    const loadRoom = async () => {
        if (!roomId) return;
        try {
            const data = await getRoomInfo(roomId);
            setRoomInfo(data);
        } catch (err) {
            console.error("Error fetching room info: ", err);
            setError("Could not load room info!");
        }
    };

    useEffect(() => {
        if (roomId) {
            loadRoom();
            const interval = setInterval(() => {
                loadRoom();
            }, 2000); // every 2s
            return () => clearInterval(interval);
        }
    }, [roomId]);

    const [isSwitching, setIsSwitching] = useState(false);
    const isSeated = Object.values(roomInfo?.playerNames ?? {}).includes(user?.username ?? "");

    const handleSeatSwitch = async (seat: string) => {
        if (!roomId || isSwitching) return;
        try {
            setIsSwitching(true);
            await switchSeat(roomId, seat);
            await loadRoom();
        } catch (err) {
            console.error("Error switching seat: ", err);
            alert("Failed to switch seat!");
        } finally {
            setIsSwitching(false);
        }
    }

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
            <ul className="mb-4 space-y-2">
                {SEATS.map((seat) => {
                    const occupant = roomInfo.playerNames[seat];
                    const isCurrentUser = occupant === user?.username;
                    const isHost = user?.username === roomInfo.hostId;
                    const bot = roomInfo.botStatuses?.[seat] ?? false;

                    return (
                        <li key={seat}>
                            <strong>{seat}:</strong>{" "}
                            {occupant ? (
                                <>
                                    {occupant}
                                    {isCurrentUser ? " (You)" : ""}
                                    {bot && <span className="text-gray-500 ml-2"> (Bot) </span>}
                                    {bot && isHost && (
                                        <button
                                            onClick={async () => {
                                                await removeBot(roomId!, seat);
                                                await loadRoom();
                                            }}
                                            className="ml-2 text-red-600 hover:underline"
                                        >
                                            Remove Bot
                                        </button>
                                    )}
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={async () => {
                                            if (isSeated) {
                                                await handleSeatSwitch(seat);
                                            } else {
                                                await joinRoom(roomId!, seat);
                                            }
                                            await loadRoom();
                                        }}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Sit Here
                                    </button>
                                    {isHost && (
                                        <button
                                            onClick={async () => {
                                                await addBot(roomId!, seat);
                                                await loadRoom();
                                            }}
                                            className="text-green-600 hover:underline"
                                        >
                                            Add Bot
                                        </button>
                                    )}
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>

            {isSeated && (
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={handleExitRoom}
                >
                    Exit Room
                </button>
            )}
        </div>
    );
}
