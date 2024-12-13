import React from "react";
import { ReportSection } from "../../types/report";

interface TableOfContentsProps {
  sections: ReportSection[];
  onNavigate: (pageNumber: number) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  onNavigate,
}) => {
  return (
    <div className="aspect-[1.4142] bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-full p-16 bg-gradient-to-br from-blue-50 to-white">
        <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Table of Contents
        </h1>
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => onNavigate(section.pageNumber)}
            >
              <div className="flex items-center gap-4">
                <span className="text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                  {section.title}
                </span>
                <div className="flex-1 border-b border-gray-200 border-dashed mx-4 group-hover:border-blue-200 transition-colors" />
                <span className="text-lg text-gray-500 group-hover:text-blue-600 transition-colors">
                  {section.pageNumber}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
