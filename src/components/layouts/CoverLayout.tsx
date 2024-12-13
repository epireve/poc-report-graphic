import React from "react";

interface CoverLayoutProps {
  title: string;
  subtitle?: string;
  date?: string;
}

export const CoverLayout: React.FC<CoverLayoutProps> = ({
  title,
  subtitle,
  date,
}) => {
  return (
    <div className="aspect-[1.4142] bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-full flex flex-col justify-center items-center p-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="space-y-8 text-center max-w-3xl">
          <div className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {title}
          </div>
          {subtitle && (
            <div className="text-2xl text-gray-600 font-medium">{subtitle}</div>
          )}
          {date && <div className="text-xl text-gray-500 mt-8">{date}</div>}
        </div>
      </div>
    </div>
  );
};
