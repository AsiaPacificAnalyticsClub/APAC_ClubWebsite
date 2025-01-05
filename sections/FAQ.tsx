"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import FaqItem from "@/components/FaqItem";

const faqQuestions = [
  {
    id: 1,
    question: "What is the Asia Pacific Analytics Club (APAC)?",
    answer:
      "The Asia Pacific Analytics Club (APAC) at Asia Pacific University is a student-driven organization that focuses on equipping students with essential skills and knowledge in data analytics. The club provides a collaborative platform for students to explore the latest trends in analytics, participate in hands-on projects, and gain practical experience in utilizing tools and techniques for solving real-world data problems.",
  },
  {
    id: 2,
    question: "What activities does APAC conduct?",
    answer:
      "APAC organizes a wide range of activities to enhance learning and engagement. These include workshops on data analytics tools such as Python, Tableau, and Excel, guest lectures by industry professionals, competitions like hackathons and case studies, and collaborative projects that simulate real-world analytics challenges. Additionally, the club hosts networking events and mentorship programs to connect members with peers and experts in the analytics field.",
  },
  {
    id: 3,
    question: "What are the benefits of joining APAC?",
    answer:
      "Joining APAC offers students numerous advantages, including opportunities to develop technical and soft skills essential for careers in data analytics. Members gain access to hands-on training, real-world project experiences, and exposure to industry-standard tools. The club also fosters a supportive community where students can network with peers, mentors, and professionals, opening doors to internships, job opportunities, and personal growth.",
  },
  {
    id: 4,
    question: "How can I stay updated with APAC's activities?",
    answer:
      "To stay updated with APAC's activities, follow the club on its official social media platforms, such as Instagram and LinkedIn, where announcements and event updates are regularly posted. Join the club’s WhatsApp for real-time discussions and updates. Additionally, keep an eye on the university's student portal or the APAC website for newsletters and detailed information about upcoming workshops, events, and initiatives.",
  },
];

const FAQ = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  return (
    <section className="px-12 py-4">
      <div className="flex justify-center mt-10">
        <div className="tag">Frequently Asked Questions</div>
      </div>
      <div className="flex md:flex-row flex-col z-2 py-10  md:gap-[150px]">
        {/*Title*/}
        <div className="h-[300px] flex items-center">
          <div className="sticky min-w-[300px] mt-5  ">
            <h2 className=" section-intro section-title text-5xl max-w-[600px] mb-7 font-robert-medium">
              Curiousity didn't kill the cat 😸, it gave it answers
            </h2>
            <p className="text-xl font-semibold font-robert-regular tracking-wider">
              You've got questions, we've got answers
            </p>
          </div>
        </div>

        {/*FAQs */}
        <motion.div
          className="md:max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {faqQuestions.map((item, index) => (
            <FaqItem
              key={item.id}
              item={item}
              index={index}
              isActive={activeId === item.id}
              onToggle={() =>
                setActiveId(activeId === item.id ? null : item.id)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
