import React from "react";

export default function PlayerHand({ tiles }: { tiles: string[] }) {
    return (
        <div className="flex justify-center mt-4 space-x-2">
            {tiles.map((tiles, idx) => (
                <div key={idx} className="tile border p-2 bg-white">
                    {tile}
                </div>
            ))}
        </div>
    );
}
