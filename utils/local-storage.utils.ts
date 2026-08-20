import { useEffect, useState } from "react";

export const useLocalStorageArray = <T>(storageKey: string) => {
    const [storageState, setStorageState] = useState<Array<T>>();

    useEffect(() => {
        const storageString = localStorage.getItem(storageKey);
        if (!storageString) {
            setStorageState([]);
        } else {
            const storageObj = JSON.parse(storageString);
            if (Array.isArray(storageObj)) {
                setStorageState(storageObj)
            } else {
                console.error('Could not parse stored array', storageKey, storageString);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(storageState));
    }, [storageState]);


    return [storageState, setStorageState]
}