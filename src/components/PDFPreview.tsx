"use client";

import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

interface PDFPreviewProps {
  pdfUrl: string;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ pdfUrl }) => {
  // Create instances of plugins
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const zoomPluginInstance = zoomPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
      <div
        className="bg-[#444] rounded-lg shadow-lg mb-4 w-full"
        style={{ height: "calc(100vh - 300px)" }}
      >
        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
          <div style={{ height: "100%" }}>
            <Viewer
              fileUrl={pdfUrl}
              plugins={[
                defaultLayoutPluginInstance,
                zoomPluginInstance,
                pageNavigationPluginInstance,
              ]}
              defaultScale={0.5}
              theme={{
                theme: "dark",
              }}
              renderError={(error: Error) => (
                <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg">
                  <p className="text-red-600 mb-2">Error loading PDF</p>
                  <p className="text-sm text-red-500">{error.message}</p>
                </div>
              )}
              renderLoader={(percentages: number) => (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                  <p className="mt-4 text-gray-200">
                    Loading PDF... {Math.round(percentages)}%
                  </p>
                </div>
              )}
            />
          </div>
        </Worker>
      </div>

      <div className="mt-4 text-sm text-gray-500 w-full text-center">
        PDF URL:{" "}
        <code className="bg-gray-100 px-2 py-1 rounded break-all">
          {pdfUrl}
        </code>
      </div>
    </div>
  );
};
