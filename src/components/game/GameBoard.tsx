import React from "react";
import PlayerHand from "./PlayerHand";
import DiscardPile from "./DiscardPile";
import Wall from "./Wall";
import GameLog from "./GameLog";
import PromptModal from "./PromptModal";

export default function GameBoard({ gameState, user }) {
  return (
    <div className="relative w-full h-full grid grid-rows-3 grid-cols-3 gap-2">
      <div className="col-span-3 text-center">Opponent (Across)</div>

      <div className="flex flex-col items-center justify-center">
        <div>Opponent (Left)</div>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Wall drawPile={gameState.wall} />
        <DiscardPile discards={gameState.discardPile} />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div>Opponent (Right)</div>
      </div>

      <div className="col-span-3">
        <PlayerHand tiles={gameState.playerHands[user.seat]} />
      </div>

      <GameLog log={gameState.log} />
      <PromptModal prompt={gameState.prompt} />
    </div>
  );
}
