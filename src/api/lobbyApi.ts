import axios from "axios";
import { getAuthHeader } from "./authHeader";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function getAvailableRooms() {
    const res = await axios.get(`${BASE_URL}/room`, getAuthHeader());
    return res.data;
}

export async function getLobbyState(roomId: string) {
    const res = await axios.get(`${BASE_URL}/rooms/${roomId}`, getAuthHeader());
    return res.data;
}

export async function addBot(roomId: string) {
    await axios.post(`${BASE_URL}/rooms/${roomId}/add-bot`, {}, getAuthHeader());
}

export async function startGame(roomId: string) {
    await axios.post(`${BASE_URL}/rooms/${roomId}/start`, {}, getAuthHeader());
}

export async function leaveRoom(roomId: string) {
    await axios.post(`${BASE_URL}/rooms/${roomId}/exit`, {}, getAuthHeader());
}
