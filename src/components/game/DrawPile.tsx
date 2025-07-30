import React from "react";

export default function DrawPile({ drawPile }: { drawPile: number }) {
    return (
        <div className="wall bg-blue-100 p-2 rounded text-center">
            <h3 className="font-bold">Wall</h3>
            <p>{drawPile} tiles remaining</p>
        </div>
    );
}
