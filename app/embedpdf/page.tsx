'use client';

import { useEffect, useRef } from 'react';
import { AnnotationPlugin, PDFViewer } from '@embedpdf/react-pdf-viewer';

export default function EmbedPdfPage() {
  const unsubscribeAnnotationEvents = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => unsubscribeAnnotationEvents.current?.();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <PDFViewer
        // Should include height and width, or pdf won't be visible
        style={{ width: '100%', height: '100%' }}
        config={{
          src: '/Lorem.pdf',
          theme: { preference: 'light' },
          disabledCategories: ['redaction'],
          annotations: {
            annotationAuthor: 'Leia Organa'
          }
        }}
        onReady={(registry) => {
          const annotationPlugin = registry.getPlugin<AnnotationPlugin>('annotation');

          if (!annotationPlugin) {
            console.error('EmbedPDF annotation plugin is unavailable; annotation events cannot be logged.');
            return;
          }

          unsubscribeAnnotationEvents.current?.();
          unsubscribeAnnotationEvents.current = annotationPlugin.provides().onAnnotationEvent((event) => {
            console.log('EmbedPDF annotation event:', event);
          });
        }}
      />
    </div>
  );
}