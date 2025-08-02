import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameState } from "../api/gameApi";
// import GameBoard from "../components/game/GameBoard";
// import PromptModal from "../components/game/GameLog";
import { useGameSocket } from "../hooks/useGameSocket";

const SEATS = ["EAST", "SOUTH", "WEST", "NORTH"];

export default function GamePage() {
    const { roomId } = useParams<{ roomId: string }>();
    const [gameState, setGameState] = useState<any>(null);
    const [prompt, setPrompt] = useState<any>(null);
    const [log, setLog] = useState<string[]>([]);
    const [currentSeat, setCurrentSeat] = useState("SOUTH"); // TODO: determine seat based on user

    const hands = {
        EAST: 13,
        SOUTH: 14,
        WEST: 13,
        NORTH: 13,
    };

    const discards = {
        EAST: [],
        SOUTH: [],
        WEST: [],
        NORTH: [],
    };

    const drawPile = 48;

    useEffect(() => {
        if (roomId) {
            getGameState(roomId).then(setGameState);
        }
    }, [roomId]);

    useGameSocket(roomId!, "You", (msg) => {
        switch (msg.type) {
            case "update":
                // table update
                setGameState(msg.data);
                break;
            // TODO: Handle different prompts
            // case "prompt":
            //    setPrompt(msg.data);
            //    break;
            case "log":
                // game log
                setLog((prev) => [...prev, msg.message]);
                break;
            case "game_start":
                // TODO: Display game start
                break;
            case "game_end":
                // TODO: Display game end, winning hand, scores etc
                break;
            case "session_ended":
                window.location.href = `/room/${roomId}`;
                break;
        }
    });

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Game Room: {roomId}</h1>

            {/* <GameBoard
                players={gameState?.playerNames || {}}
                hands={hands}
                discards={discards}
                drawPile={drawPile}
                currentSeat={currentSeat}
            /> */}

            {/* <PromptModal prompt={prompt?.message} /> */}
            {/* <GameLog log={log} /> */}
        </div>
    );
}
