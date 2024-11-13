import React, { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("unable to fetch data");
                setData(await response.json());
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                console.log(e);
            }
        })();
    }, [url]);

    return { data, isLoading, setData };
};
