export const SEATS = ["EAST", "SOUTH", "WEST", "NORTH"];

export function getUserSeat(playerNames: Record<string, string>, username: string | undefined): string | null {
    if (!username) return null;
    return Object.entries(playerNames).find(([, name]) => name === username)?.[0] ?? null;
}

export function getAvailableSeats(playerNames: Record<string, string>): string[] {
    return SEATS.filter(seat => !(seat in playerNames));
}
