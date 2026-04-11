import { useState, useCallback } from "react";

export default function useHttp() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // const settings = {
    //     url: "",
    //     method: "GET",
    //     body: null,
    //     headers: {"content-type": "application/json"}
    // }

    const request = useCallback(async (url) => {
        setLoading(true);
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`)
            }
            const data = await res.json();
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])
    return { loading, error, request, clearError };
}