"use client";

import React, { useState } from "react";
import { ReportContent } from "../types/report";
import { CoverLayout } from "./layouts/CoverLayout";
import { TableOfContents } from "./layouts/TableOfContents";
import { ContentLayout } from "./layouts/ContentLayout";

interface ReportPreviewProps {
  report: ReportContent;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ report }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPage = () => {
    const section = report.sections[currentPage];

    switch (section.layout) {
      case "cover":
        return <CoverLayout title={report.title} />;
      case "toc":
        return (
          <TableOfContents
            sections={report.sections.filter((s) => s.layout !== "toc")}
            onNavigate={handlePageChange}
          />
        );
      default:
        return (
          <ContentLayout
            title={section.title}
            content={section.content}
            layout={section.layout}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Preview area with paper-like background */}
      <div className="relative w-full max-w-5xl bg-gray-100 p-8 rounded-lg">
        {/* Paper shadow effect */}
        <div className="absolute inset-0 shadow-xl rounded-lg pointer-events-none" />

        {/* Page preview with scale effect */}
        <div className="transform scale-90 origin-top">{renderPage()}</div>

        {/* Page navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white px-6 py-2 rounded-full shadow-lg">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-600">
            Page {currentPage + 1} of {report.sections.length}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === report.sections.length - 1}
            className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Zoom controls (optional) */}
      <div className="mt-4 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
        <button className="p-1 hover:text-blue-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
            />
          </svg>
        </button>
        <span className="text-sm font-medium text-gray-600">100%</span>
        <button className="p-1 hover:text-blue-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
