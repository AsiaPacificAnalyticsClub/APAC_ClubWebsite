import React from "react";

type Career = {
  position: string;
  department: string;
  company: string;
  contact: string;
  details: string;
  moreDetails: string;
};

const Resources = () => {
  // Career opportunities data
  // add the career opportunities you want to display here
  const careers: Career[] = [
    {
      position: "Intern",
      department: "Data Office",
      company: "Allianz",
      contact: "mailto:koh.kayxin@allianz.com.my",
      details: "Accpeting applications",
      moreDetails:
        "Work on real-world data analysis and support the Data Office team.",
    },
    // {
    //   position: "Internship / Part-time Positions",
    //   department: "Research and Development",
    //   company: "Asia Pacific University",
    //   contact: "mailto:hema.krishna@apu.edu.my",
    //   details: "Application closed",
    //   moreDetails:
    //     "Involved in R&D projects such as machine learning, simulations, and 3D imaging.",
    // },
  ];

  return (
    <div className="p-8 min-h-screen">
      {careers.length > 0 && (
        <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
          Career Opportunities
        </h1>
      )}
      <div className="flex flex-col gap-6 items-center">
        {careers.length > 0 ? (
          careers.map((career, index) => (
            <div
              key={index}
              className="relative group w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 border border-gray-200 transform transition-transform duration-700"
            >
              {/* Original Card Content */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {career.position}
                </h2>
                <p className="text-gray-600 mb-1">
                  <strong>Department:</strong> {career.department}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Company:</strong> {career.company}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>Details:</strong> {career.details}
                </p>
                {career.details !== "Application closed" && (
                  <a
                    href={career.contact}
                    className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Contact Us
                  </a>
                )}
              </div>

              {/* Hover Details Section */}
              <div className="absolute top-0 right-0 w-full md:w-2/5 h-full bg-blue-50 rounded-r-lg p-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[100%] transition-all duration-700 pointer-events-none">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  More Details
                </h3>
                <p className="text-gray-700">{career.moreDetails}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Career Opportunities Available
            </h2>
            <p className="text-gray-600">
              We are currently not accepting any new opportunities. Please check
              back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
