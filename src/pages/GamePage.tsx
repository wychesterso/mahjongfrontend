import { useParams } from "react-router-dom";

const SEATS = ["EAST", "SOUTH", "WEST", "NORTH"];

// map seat relative to current player's seat
function getRelativeSeat(seat: string, currentSeat: string): "bottom" | "left" | "top" | "right" {
    const order = ["EAST", "SOUTH", "WEST", "NORTH"];
    const currentIndex = order.indexOf(currentSeat);
    const seatIndex = order.indexOf(seat);
    const diff = (seatIndex - currentIndex + 4) % 4;
    switch (diff) {
        case 0: return "bottom";
        case 1: return "right";
        case 2: return "top";
        case 3: return "left";
        default: return "bottom";
    }
}

export default function GamePage() {
    const { roomId } = useParams<{ roomId: string }>();

    // TODO: determine user seat
    const currentSeat = "SOUTH";

    // TODO: use actual player names
    const players = {
        EAST: "Alice",
        SOUTH: "You",
        WEST: "Charlie",
        NORTH: "Diana",
    };

    // TODO: get real hands and tiles
    const dummyHands = {
        EAST: 13,
        SOUTH: 14,
        WEST: 13,
        NORTH: 13,
    };

    // render tiles as simple boxes
    const renderTiles = (count: number, vertical = false) => {
        const tiles = [];
        for (let i = 0; i < count; i++) {
            tiles.push(
                <div
                    key={i}
                    className={`bg-white border border-gray-500 rounded-sm m-0.5`}
                    style={{
                        width: vertical ? 20 : 30,
                        height: vertical ? 30 : 40,
                        display: "inline-block",
                    }}
                />
            );
        }
        return tiles;
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Game Room: {roomId}</h1>

            <div
                className="relative"
                style={{
                    width: 600,
                    height: 600,
                    margin: "auto",
                    border: "2px solid #444",
                    borderRadius: 8,
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gridTemplateRows: "auto 1fr auto",
                    gap: 10,
                    backgroundColor: "#4b7f58",
                }}
            >
                {/* Top (opponent) */}
                <div
                    style={{ gridColumn: 2, gridRow: 1, textAlign: "center", color: "white" }}
                >
                    <div>{players[SEATS[(SEATS.indexOf(currentSeat) + 2) % 4]]}</div>
                    <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                        {renderTiles(dummyHands[SEATS[(SEATS.indexOf(currentSeat) + 2) % 4]], true)}
                    </div>
                </div>

                {/* Left (opponent) */}
                <div
                    style={{ gridColumn: 1, gridRow: 2, display: "flex", flexDirection: "column", alignItems: "center", color: "white" }}
                >
                    <div>{players[SEATS[(SEATS.indexOf(currentSeat) + 3) % 4]]}</div>
                    <div>{renderTiles(dummyHands[SEATS[(SEATS.indexOf(currentSeat) + 3) % 4]], true)}</div>
                </div>

                {/* Center: discard pile and wall */}
                <div
                    style={{
                        gridColumn: 2,
                        gridRow: 2,
                        backgroundColor: "#222",
                        borderRadius: 8,
                        border: "2px solid #ccc",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                    }}
                >
                    <div style={{ marginBottom: 20 }}>Discard Pile</div>
                    <div style={{ border: "1px solid white", padding: 10, borderRadius: 4 }}>
                        Wall (draw pile)
                    </div>
                </div>

                {/* Right (opponent) */}
                <div
                    style={{ gridColumn: 3, gridRow: 2, display: "flex", flexDirection: "column", alignItems: "center", color: "white" }}
                >
                    <div>{players[SEATS[(SEATS.indexOf(currentSeat) + 1) % 4]]}</div>
                    <div>{renderTiles(dummyHands[SEATS[(SEATS.indexOf(currentSeat) + 1) % 4]], true)}</div>
                </div>

                {/* Bottom (own hand) */}
                <div
                    style={{
                        gridColumn: 2,
                        gridRow: 3,
                        textAlign: "center",
                        color: "white",
                    }}
                >
                    <div>{players[currentSeat]} (You)</div>
                    <div>{renderTiles(dummyHands[currentSeat], false)}</div>
                </div>
            </div>
        </div>
    );
}
