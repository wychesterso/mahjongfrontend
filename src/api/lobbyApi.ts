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
