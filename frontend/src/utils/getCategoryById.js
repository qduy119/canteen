import axios from "axios";
import { baseUrl } from "./index";

export default async function getCategoryById({ params, request }) {
    const { id } = params;
    const res = await axios.get(`${baseUrl}/api/category/${id}`, {
        signal: request.signal,
    });
    if (res.status !== 200) {
        throw new Error("Fetching category failed");
    }
    return res.data;
}
