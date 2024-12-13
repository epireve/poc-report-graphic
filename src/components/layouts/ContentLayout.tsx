import React from "react";

interface ContentLayoutProps {
  title: string;
  content: string;
  layout: "single-column" | "two-column";
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  title,
  content,
  layout,
}) => {
  if (layout === "two-column") {
    const midPoint = Math.ceil(content.length / 2);
    const firstColumn = content.slice(0, midPoint);
    const secondColumn = content.slice(midPoint);

    return (
      <div className="aspect-[1.4142] bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-full p-16 bg-gradient-to-br from-blue-50 to-white">
          <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="grid grid-cols-2 gap-12">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600">
              {firstColumn}
            </div>
            <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600">
              {secondColumn}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-[1.4142] bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-full p-16 bg-gradient-to-br from-blue-50 to-white">
        <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600">
          {content}
        </div>
      </div>
    </div>
  );
};
