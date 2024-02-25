import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../utils";

export default function useTopSales() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchTopSaleProducts() {
            try {
                setIsLoading(true);
                const res = await axios.get(`${baseUrl}/api/item/top5`);
                if (res.status !== 200) {
                    throw new Error("Fetching top products failed");
                }
                setData(res.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTopSaleProducts();
    }, []);

    return { isLoading, error, data };
}
