import React from "react";
import { Building } from "lucide-react";

export default function MissionCard() {
  return (
    <div 
      className="
        flex-1
        max-w-[600px] min-h-[200px]
        py-10 md:py-4 px-10
        bg-gradient-to-bl from-sky-100 to-indigo-200 
        rounded-2xl shadow-lg overflow-hidden 
        transition-transform duration-300 hover:scale-105
      "
    >
      <div className="flex justify-between">
        <p className="mb-4 text-2xl font-semibold text-indigo-800">
          Mission
        </p>
        <Building className="text-blue-400" />
      </div>
      <div>
        <p className="flex-grow text-justify text-indigo-900">
          APAC promotes and shares data science knowledge to inspire its
          members and collaborates with industry experts to hold talks,
          workshops as well as competitions to bring interesting insights
          to curious minds who are interested in data science.
        </p>
      </div>
    </div>
  );
}