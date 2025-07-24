import axios from "axios";
import { getAuthHeader } from "./authHeader";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function getRoomInfo(roomId: string) {
    const res = await axios.get(`${BASE_URL}/room/${roomId}`, getAuthHeader());
    return res.data;
}
