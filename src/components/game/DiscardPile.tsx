import React from "react";

export default function DiscardPile({ discards }: { discards: string[] }) {
    return (
        <div className="discard-pile p-2 bg-gray-200 rounded">
            <h3 className="text-center text-sm font-bold">Discard Pile</h3>
            <div className="flex flex-wrap justify-center gap-1 mt-1">
                {discards.map((tile, i) => (
                    <div key={i} className="tile bg-white p-1 border">{tile}</div>
                ))}
            </div>
        </div>
    );
}
