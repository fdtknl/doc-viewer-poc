import { useEffect, useState } from "react";

export const useLocalStorageArray = <T>(storageKey: string) => {
    const [storageState, setStorageState] = useState<Array<T>>();

    useEffect(() => {
        try {
            const storageString = localStorage.getItem(storageKey);
            if (!storageString || storageString === undefined) {
                setStorageState([]);
            } else {
                const storageObj = JSON.parse(storageString);
                if (Array.isArray(storageObj)) {
                    setStorageState(storageObj)
                } else {
                    console.error('Could not parse stored array', storageKey, storageString);
                }
            }
        } catch (err) {
            console.error(err);
            setStorageState([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(storageState));
    }, [storageState]);


    return [storageState, setStorageState]
}