// Only render the SDK on the client side.
"use client";

import { useLocalStorage } from "@/utils/local-storage.utils";
import { setupNutrientInstance } from "@/utils/nutrient.utils";
import React, { useEffect, useRef } from "react";

export default function NutrientSdk() {
    const containerRef = useRef(null);
    const [localStorage, setLocalStorage] = useLocalStorage<string>('nutrientsdk_xfdf_docx');

    useEffect(() => {
        const container = containerRef.current;
        let cleanup = () => { };

        (async () => {
            const NutrientViewer = (await import("@nutrient-sdk/viewer")).default;

            // Ensure there's only one `NutrientViewer` instance.
            NutrientViewer.unload(container);

            if (container && NutrientViewer) {
                NutrientViewer.load({
                    container,
                    useCDN: true,
                    document: "/Hello%20world.docx",
                    XFDF: localStorage,
                    // instantJSON: localStorage
                }).then(async (instance) => {
                    setupNutrientInstance(instance, setLocalStorage);
                }).catch((error) => {
                    console.error("Failed to load the DOCX document", error);
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