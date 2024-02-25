import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../utils";

export default function useCategories() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                setIsLoading(true);
                const res = await axios.get(`${baseUrl}/api/category`);
                if (res.status !== 200) {
                    throw new Error("Fetching categories failed");
                }
                setData(res.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return { isLoading, error, data };
}
