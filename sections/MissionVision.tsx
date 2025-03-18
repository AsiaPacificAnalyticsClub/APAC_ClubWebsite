import React from "react";
import { Target, EyeIcon, Building } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="min-h-[500px] w-screen bg-white overflow-x-clip fixed-container">
      <div className="fixed-container">
        <div className="flex flex-col justify-center items-center">
          <h1 className="section-title text-center">Our Vision & Mission</h1>
          <p className="max-w-[500px] text-xl font-semibold text-blue-600 mt-7 text-center">
            🌟 Let us strive and achieve excellence 💪
          </p>
        </div>
        <div className="flex md:flex-row flex-col  justify-center mt-10 md:gap-[90px] gap-8">
          <div className="py-10 md:py-4 px-10 md:max-w-[600px] w-full md:min-h-[200px] flex-1 bg-gradient-to-br from-blue-100  to-cyan-200 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="flex justify-between">
              <p className="text-2xl font-semibold text-blue-800 mb-4">
                Vision
              </p>
              <EyeIcon className="text-blue-400 " />
            </div>
            <div>
              <p className="text-blue-900 flex-grow">
                To bring exposure on the potential capabilities of data science
                in our data-driven world to students of APU.
              </p>
            </div>
          </div>
          {/*Second Mission*/}
          <div className="py-10 md:py-4 px-10 max-w-[600px] min-h-[200px] flex-1 bg-gradient-to-bl from-sky-100 to-indigo-200 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="flex justify-between">
              <p className="text-2xl font-semibold text-indigo-800 mb-4">
                Mission
              </p>
              <Building className="text-blue-400" />
            </div>
            <div>
              <p className="text-justify flex-grow text-indigo-900">
                APAC promotes and shares data science knowledge to inspire its
                members and collaborates with industry experts to hold talks,
                workshops as well as competitions to bring interesting insights
                to curious minds who are interested in data science.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
