// Only render the SDK on the client side.
"use client";

import { useLocalStorage } from "@/utils/local-storage.utils";
import { setupNutrientConfig, setupNutrientInstance } from "@/utils/nutrient.utils";
import React, { useEffect, useRef } from "react";

export default function nutrientSdk() {
    const containerRef = useRef(null);
    const [localStorage, setLocalStorage] = useLocalStorage<string>('nutrientsdk_xfdf');

    useEffect(() => {
        const container = containerRef.current;
        let cleanup = () => { };

        (async () => {
            const NutrientViewer = (await import("@nutrient-sdk/viewer")).default;

            // Ensure there's only one `NutrientViewer` instance.
            NutrientViewer.unload(container);

            if (container && NutrientViewer) {
                NutrientViewer.load(
                    setupNutrientConfig(container, 'Hello World.pdf', localStorage)
                ).then(async (instance) => {
                    setupNutrientInstance(instance, setLocalStorage);
                });
            }

            cleanup = () => {
                NutrientViewer.unload(container);
            };
        })();

        return cleanup;
    }, []);


    // You must set the container height and width.
    return (
        <div
            ref={containerRef}
            style={{
                height: "100vh",
                width: "100%",
            }}
        />
    );
}