import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export const useLocalStorage = <T>(
    storageKey: string,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
    const [storageState, setStorageState] = useState<T | undefined>(() => {
        try {
            if (typeof window === "undefined") {
                return undefined;
            }

            console.log('Getting local storage item', storageKey);
            const storageString = window.localStorage.getItem(storageKey);
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
        window.localStorage.setItem(storageKey, JSON.stringify(storageState));
    }, [storageKey, storageState]);


    return [storageState, setStorageState];
}