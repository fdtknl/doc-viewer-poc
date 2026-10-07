'use client';

import { PDFViewer } from '@embedpdf/react-pdf-viewer';

export default function EmbedPdfPage() {
  return (
    <div style={{ height: '100vh' }}>
      <PDFViewer
        // Should include height and width, or pdf won't be visible
        style={{ width: '100%', height: '100%' }}
        config={{
          src: '/Lorem.pdf',
          theme: { preference: 'light' },
        }}
      />
    </div>
  );
}