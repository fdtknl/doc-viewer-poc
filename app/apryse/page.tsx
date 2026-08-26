// Runs only on the client
'use client';

import { useLocalStorage } from '@/utils/local-storage.utils';
import { log } from 'console';
//https://docs.apryse.com/web/guides/get-started/nextjs
// Import React hooks
import { useEffect, useRef } from 'react';

export default function WebViewer() {
    // Create a ref to hold div where WebViewer is mounted
    const viewer = useRef<HTMLDivElement>(null);
    const [localStorage, setLocalStorage] = useLocalStorage<string>('apryse_xfdf');

    // Run once after the component is mounted
    useEffect(() => {
        // Dynamically import WebViewer to avoid SSR issues
        import('@pdftron/webviewer').then((module) => {
            // Access the default export from the module
            const WebViewer = module.default;
            const viewerElement = viewer.current;

            if (!viewerElement) {
                return;
            }

            // Initialize WebViewer
            WebViewer(
                {
                    annotationUser: 'apryse poc user',
                    // Path to the WebViewer lib assets
                    path: '/lib/webviewer',
                    // Replace with your Apryse license key
                    licenseKey: process.env.APRYSE_LICENSE_KEY,
                    // Initial document to load into the viewer
                    initialDoc: '/Hello%20World.pdf',
                    documentXFDFRetriever: () => new Promise((resolve) => resolve(localStorage ?? '')),
                },
                // DOM element where WebViewer will be rendered
                viewerElement,
            ).then((instance) => {
                // Destructure the documentViewer from the Core API
                const { documentViewer, annotationManager } = instance.Core;
                annotationManager.addEventListener('annotationChanged', async (annotations, action, { imported }) => {
                    console.log('imported', imported);
                    console.log('annotations', annotations);
                    console.log('action', action)

                    // imported indicates if the annotations were imported via a process, mainly XFDF
                    if (imported) {
                        return;
                    }
                    // do event handling
                    const xfdf = await annotationManager.exportAnnotations()
                    console.log('xfdf', xfdf)
                    setLocalStorage(xfdf);
                });
                // WebViewer APIs can now be used here
                // Example: documentViewer.addEventListener(...)
            });
        });

        // Empty dependency array ensures this runs once
    }, [localStorage]);

    // Render the container that WebViewer mounts into
    return (
        <div
            className='webviewer'
            ref={viewer}
            style={{ width: '100%', height: '100vh', margin: '0 auto' }}
        />
    );
}