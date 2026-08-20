// Only render the SDK on the client side.
"use client";

import { useLocalStorageArray } from "@/utils/local-storage.utils";
import React, { useEffect, useRef } from "react";

export default function nutrientSdk() {
    const containerRef = useRef(null);
    const [localStorageArray, setLocalStorageArray] = useLocalStorageArray('nutrientsdk');

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
                    document:
                        "Hello World.pdf",
                }).then(async (instance) => {
                    instance.addEventListener("annotations.load", loadedAnnotations => {
                        console.log("annotations.load", loadedAnnotations);
                    });
                    instance.addEventListener("annotations.willChange", event => {
                        if (event.reason === NutrientViewer.AnnotationsWillChangeReason.DRAW_START) {
                            console.log("The user is drawing...");
                        }
                    });
                    instance.addEventListener("annotations.change", () => {
                        console.log("Something in the annotations has changed.");
                    });
                    instance.addEventListener("annotations.create", createdAnnotations => {
                        console.log("annotations.create", createdAnnotations, instance.annotations);
                    });
                    instance.addEventListener("annotations.update", updatedAnnotations => {
                        console.log("annotations.update", updatedAnnotations);
                    });
                    instance.addEventListener("annotations.delete", deletedAnnotations => {
                        console.log("annotations.delete", deletedAnnotations);
                    });
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