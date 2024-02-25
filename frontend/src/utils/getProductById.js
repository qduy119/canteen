import axios from "axios";
import { baseUrl } from "./index";

export default async function getProductById({ params, request }) {
    const { id } = params;
    const res = await axios.get(`${baseUrl}/api/item/${id}`, {
        signal: request.signal,
    });
    if (res.status !== 200) {
        throw new Error("Fetching product failed");
    }
    return res.data;
}
