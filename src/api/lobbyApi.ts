import axios from "axios";
import { getAuthHeader } from "./authHeader";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function getAvailableRooms() {
    const res = await axios.get(`${BASE_URL}/room`, getAuthHeader());
    return res.data;
}

export async function createRoom() {
    const res = await axios.post(`${BASE_URL}/room/create`, {}, getAuthHeader());
    return res.data.roomId;
}

export async function getRoomInfo(roomId: string) {
    const res = await axios.get(`${BASE_URL}/room/${roomId}`, getAuthHeader());
    return res.data;
}

export async function addBot(roomId: string) {
    await axios.post(`${BASE_URL}/room/${roomId}/add-bot`, {}, getAuthHeader());
}

export async function startGame(roomId: string) {
    await axios.post(`${BASE_URL}/room/${roomId}/start`, {}, getAuthHeader());
}

export async function joinRoom(roomId: string, seat: string) {
    const params = new URLSearchParams({ seat });
    await axios.post(`${BASE_URL}/room/${roomId}/join?${params}`, {}, getAuthHeader());
}

export async function leaveRoom(roomId: string) {
    await axios.post(`${BASE_URL}/room/${roomId}/exit`, {}, getAuthHeader());
}
