import React from "react";

export default function GameLog({ log }: { log: string[] }) {
    return (
        <div className="game-log bg-gray-100 p-2 rounded mt-2 h-32 overflow-y-auto text-sm">
            <h3 className="font-bold mb-1">Game Log</h3>
            <ul>
                {log.map((entry, idx) => (
                    <li key={idx}>{entry}</li>
                ))}
            </ul>
        </div>
    );
}
