import axios from "axios";
import { getAuthHeader } from "./authHeader";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function getRoomInfo(roomId: string) {
    const res = await axios.get(`${BASE_URL}/room/${roomId}`, getAuthHeader());
    return res.data;
}

export async function switchSeat(roomId: string, newSeat: string) {
    await axios.post(
        `${BASE_URL}/room/${roomId}/seat`, 
        null, 
        {
            params: { newSeat },
            ...getAuthHeader()
        }
    );
}

export async function exitRoom(roomId: string) {
    await axios.post(`${BASE_URL}/room/${roomId}/exit`, {}, getAuthHeader());
}
