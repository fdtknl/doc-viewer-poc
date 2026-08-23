import { useEffect, useRef, useState } from "react";

export const useLocalStorage = <T>(storageKey: string) => {
    const [storageState, setStorageState] = useState<T | undefined>(() => {
        try {
            console.log('Getting local storage item', storageKey);
            const storageString = localStorage.getItem(storageKey);
            console.log('storageString', storageString);
            if (storageString) {
                const storageObj = JSON.parse(storageString);
                return storageObj;
            }
        } catch (err) {
            console.error("Error in useLocalStorage init", storageKey, err);
            return undefined
        }

    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(storageState));
    }, [storageState]);


    return [storageState, setStorageState];
}