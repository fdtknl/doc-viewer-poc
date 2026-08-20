"use client";
// https://api.onlyoffice.com/docs/docs-api/get-started/frontend-frameworks/react/
import {DocumentEditor} from "@onlyoffice/document-editor-react";

const documentServerUrl = process.env.NEXT_PUBLIC_ONLYOFFICE_URL ?? "http://localhost:80/";
const documentUrl = process.env.NEXT_PUBLIC_DOCUMENT_URL ?? "http://localhost:3000/Hello%20World.pdf";

function onDocumentReady(event: object) {
  console.log("Document is loaded");
}

function onLoadComponentError(errorCode: number, errorDescription: string) {
  switch (errorCode) {
  case -1: // Unknown error loading component
    console.log(errorDescription);
    break;

  case -2: // Error load DocsAPI from http://documentserver/
    console.log(errorDescription);
    break;

  case -3: // DocsAPI is not defined
    console.log(errorDescription);
    break;
  }
}

export default function OnlyOffice() {
  return (
    <DocumentEditor
      id="docxEditor"
      documentServerUrl={documentServerUrl}
      config={{
        document: {
          fileType: "pdf",
          key: "Khirz6zTPdfd7",
          title: "Hello World.pdf",
          url: documentUrl,
        },
        documentType: "pdf",
        // editorConfig: {
        //   callbackUrl: "https://example.com/url-to-callback",
        // },
      }}
      events_onDocumentReady={onDocumentReady}
      onLoadComponentError={onLoadComponentError}
    />
  )
}