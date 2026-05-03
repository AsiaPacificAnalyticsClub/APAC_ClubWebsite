import React from "react";
import { EyeIcon } from "lucide-react";

export default function VisionCard() {
	return (
		<div
			className="
        flex-1 
        w-full md:max-w-[600px] md:min-h-[200px]
        py-10 md:py-4 px-10
        bg-gradient-to-br from-blue-100 to-cyan-200
        rounded-2xl shadow-lg overflow-hidden
        transition-transform duration-300 hover:scale-105
      "
		>
			<div className="flex justify-between">
				<p className="mb-4 text-2xl font-semibold text-blue-800">
					Vision
				</p>
				<EyeIcon className="text-blue-400" />
			</div>

			<div>
				<p className="flex-grow text-blue-900">
					To bring exposure on the potential capabilities of data science
					in our data-driven world to students of APU.
				</p>
			</div>

		</div>
	);
}