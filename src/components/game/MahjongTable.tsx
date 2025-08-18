export default function MahjongTable({ gameState, onTileClick }) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 h-full w-full p-8 bg-green-700 rounded-xl">
      {/* North */}
      <div className="col-start-2 row-start-1 flex justify-center">
        <PlayerHand
          seat="NORTH"
          tiles={gameState.table.hands.NORTH}
          onTileClick={onTileClick}
          rotated
        />
      </div>

      {/* West */}
      <div className="col-start-1 row-start-2 flex justify-center items-center">
        <PlayerHand
          seat="WEST"
          tiles={gameState.table.hands.WEST}
          onTileClick={onTileClick}
          rotated
        />
      </div>

      {/* Center (discard pile, draw pile) */}
      <div className="col-start-2 row-start-2 flex flex-col items-center justify-center">
        <DiscardPile tiles={gameState.table.discards} />
        <DrawPile remaining={gameState.table.remainingTiles} />
      </div>

      {/* East */}
      <div className="col-start-3 row-start-2 flex justify-center items-center">
        <PlayerHand
          seat="EAST"
          tiles={gameState.table.hands.EAST}
          onTileClick={onTileClick}
          rotated
        />
      </div>

      {/* South */}
      <div className="col-start-2 row-start-3 flex justify-center">
        <PlayerHand
          seat="SOUTH"
          tiles={gameState.table.hands.SOUTH}
          onTileClick={onTileClick}
        />
      </div>
    </div>
  );
}
