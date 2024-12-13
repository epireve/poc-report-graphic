import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface ContentLayoutProps {
  title: string;
  content: string;
  layout: "single-column" | "two-column";
  sections?: Array<{ title: string; pageNumber: number }>;
  onNavigate?: (pageNumber: number) => void;
}

const NavigationMenu: React.FC<{
  sections: Array<{ title: string; pageNumber: number }>;
  onNavigate: (pageNumber: number) => void;
  currentTitle: string;
}> = ({ sections, onNavigate, currentTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 bg-[#2A2A2A] p-2 flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:bg-[#404040] px-3 py-1.5 rounded text-sm flex items-center"
        >
          <span className="mr-1">{currentTitle}</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute left-2 top-10 z-20 mt-2 w-56 rounded bg-[#2A2A2A] shadow-lg">
            <div className="py-1">
              {sections.map((section) => (
                <button
                  key={section.pageNumber}
                  onClick={() => {
                    onNavigate(section.pageNumber);
                    setIsOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-sm text-left ${
                    section.title === currentTitle
                      ? "bg-[#404040] text-white"
                      : "text-gray-300 hover:bg-[#404040] hover:text-white"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  title,
  content,
  layout,
  sections = [],
  onNavigate = () => {},
}) => {
  const mainContent = (
    <div className="h-full">
      <div className="h-12" /> {/* Spacer for the navigation header */}
      <div className="p-16">
        <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          {title}
        </h1>
        {layout === "two-column" ? (
          <div className="grid grid-cols-2 gap-12">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600">
              {content.slice(0, Math.ceil(content.length / 2))}
            </div>
            <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600">
              {content.slice(Math.ceil(content.length / 2))}
            </div>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600">
            {content}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="aspect-[1.4142] bg-white rounded-lg shadow-sm overflow-hidden relative">
      {sections.length > 0 && (
        <NavigationMenu
          sections={sections}
          onNavigate={onNavigate}
          currentTitle={title}
        />
      )}
      <div className="h-full bg-gradient-to-br from-blue-50 to-white">
        {mainContent}
      </div>
    </div>
  );
};
