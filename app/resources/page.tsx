"use client";

import React, { useEffect, useState } from "react";

type Career = {
  _id: string;
  title: string;
  organization: string;
  description: string;
  requiredSkills?: string[];
  currentProjects?: { name: string; status: string; description?: string }[];
  contactName: string;
  contactEmail: string;
  applicationInstructions: string;
  isActive: boolean;
};

const Resources = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCareers() {
      try {
        const res = await fetch("/api/careerOpportunities");
        const json = await res.json();
        if (json.success) {
          setCareers(json.data.filter((c: Career) => c.isActive));
        }
      } catch (error) {
        console.error("Failed to fetch careers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCareers();
  }, []);

  if (loading) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading career opportunities...</p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen">
      {careers.length > 0 && (
        <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
          Career Opportunities
        </h1>
      )}
      <div className="flex flex-col gap-6 items-center">
        {careers.length > 0 ? (
          careers.map((career) => (
            <div key={career._id} className="relative group w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 border border-gray-200 transform transition-transform duration-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{career.title}</h2>
                <p className="text-gray-600 mb-1"><strong>Organization:</strong> {career.organization}</p>
                <p className="text-gray-600 mb-3">{career.description}</p>
                {career.requiredSkills && career.requiredSkills.length > 0 && (
                  <div className="mb-3">
                    <strong className="text-gray-600">Required Skills:</strong>
                    <ul className="mt-1 flex flex-col gap-1">
                      {career.requiredSkills.map((skill, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <span className="text-green-500 font-bold">✓</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {career.currentProjects && career.currentProjects.length > 0 && (
                  <div className="mb-3">
                    <strong className="text-gray-600">Projects:</strong>
                    <ul className="mt-1 flex flex-col gap-1">
                      {career.currentProjects.map((project, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${project.status === "active" ? "bg-green-100 text-green-800" : project.status === "research" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-700"}`}>
                            {project.status}
                          </span>
                          {project.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <a
                  href={`mailto:${career.contactEmail}?subject=Application&body=Dear ${encodeURIComponent(career.contactName)}, Please find attached my CV and cover letter. Thank you.`}
                  className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 mt-2"
                >
                  Email {career.contactName}
                </a>
              </div>
              <div className="absolute top-0 right-0 w-full md:w-2/5 h-full bg-blue-50 rounded-r-lg p-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[100%] transition-all duration-700 pointer-events-none">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">How to Apply</h3>
                <p className="text-gray-700">{career.applicationInstructions}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Career Opportunities Available</h2>
            <p className="text-gray-600">We are currently not accepting any new opportunities. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;