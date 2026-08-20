// Only render the SDK on the client side.
"use client";

import { useLocalStorage } from "@/utils/local-storage.utils";
import { InstantJSON } from "@nutrient-sdk/viewer";
import React, { useEffect, useRef } from "react";

export default function nutrientSdk() {
    const containerRef = useRef(null);
    const [localStorage, setLocalStorage] = useLocalStorage<InstantJSON>('nutrientsdk');

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
                    instantJSON: localStorage
                }).then(async (instance) => {
                    instance.addEventListener("annotations.create", async createdAnnotations => {
                        console.log("annotations.create", createdAnnotations, instance.annotations);
                        const exportedInstantJson = await instance.exportInstantJSON();
                        console.log("exportedInstantJson", exportedInstantJson)
                        setLocalStorage(exportedInstantJson);
                    });
                    instance.addEventListener("annotations.update", async updatedAnnotations => {
                        console.log("annotations.update", updatedAnnotations);
                        const exportedInstantJson = await instance.exportInstantJSON();
                        console.log("exportedInstantJson", exportedInstantJson)
                        setLocalStorage(exportedInstantJson);
                    });
                    instance.addEventListener("annotations.delete", async deletedAnnotations => {
                        console.log("annotations.update", deletedAnnotations);
                        const exportedInstantJson = await instance.exportInstantJSON();
                        console.log("exportedInstantJson", exportedInstantJson)
                        setLocalStorage(exportedInstantJson);
                    });
                    instance.addEventListener("comments.create", async createdComments => {
                        console.log("comments.create", createdComments);
                        const exportedInstantJson = await instance.exportInstantJSON();
                        console.log("exportedInstantJson", exportedInstantJson)
                        setLocalStorage(exportedInstantJson);
                    });
                    instance.addEventListener("comments.update", async updatedComments => {
                        console.log("comments.update", updatedComments);
                        const exportedInstantJson = await instance.exportInstantJSON();
                        console.log("exportedInstantJson", exportedInstantJson)
                        setLocalStorage(exportedInstantJson);
                    });
                    instance.addEventListener("comments.delete", async deletedComments => {
                        console.log("comments.update", deletedComments);
                        const exportedInstantJson = await instance.exportInstantJSON();
                        console.log("exportedInstantJson", exportedInstantJson)
                        setLocalStorage(exportedInstantJson);
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