"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Being a part of the APAC event team is an amazing experience! It' is awesome to be a part of bringing fresh, new ideas to life and organizing events that help members grow and network!",
    imageSrc: "/man.png",
    name: "Ammar Ibrahim ",
    username: "@ammaribrahim",
  },
  {
    text: "After joining APAC as an committee, I learned alot on how the workflow is like in an organization. Active communication, coordination, and teamwork are required to create a enforced team. All of the committees are very friendly and helpful. I've done and learned a lot of new activities that I never though I can do, of course with the help of others.",
    imageSrc: "/man.png",
    name: "Gregorius Brian Tedjo",
    username: "@gregoriusbriantedjo",
  },
  {
    text: "APAC is a great club 😀.",
    imageSrc: "/man.png",
    name: "Aiden Ashvor Antoney ",
    username: "@aidenashvorantoney ",
  },
  {
    text: "I was amazed at how seamlessly the Asia Pacific Analytics Club integrates industry-level tools and techniques into their events and workshops.",
    imageSrc: "/man.png",
    name: "Yen Kuan",
    username: "@yenkuan",
  },
  {
    text: "Grateful to be part of APAC’s Tech Team —it’s been a journey full of learning, growth, and great memories! Hehe :)",
    imageSrc: "/woman.png",
    name: "Bowie Chong",
    username: "@bowie",
  },
  {
    text: "Best and only option to stay in the loop on anything happening related to Data Analysis and similar topics at APU.",
    imageSrc: "/man.png",
    name: "Ivans",
    username: "@ivans",
  },
  {
    text: "Where insights spark innovation, and innovation drives progress.",
    imageSrc: "/woman.png",
    name: "Kong Yi Wen",
    username: "@kongyiwen",
  },
  {
    text: "I really value about the supportive culture in APAC club is capable to provide . The seniors are always willing to guide us juniors with patience and share their time to expose us to new experiences and knowledge. Their mentorship creates a welcoming space where we can learn, grow, and feel more confident in contributing.",
    imageSrc: "/woman.png",
    name: "Suen Tung",
    username: "@chansuentung",
  },
  {
    text: "Turning analytics into action, and action into impact.",
    imageSrc: "/woman.png",
    name: "Angelina Liew",
    username: "@liewjiaxin",
  },
  {
    text: "I’ve been in APAC for about two years now, starting from the bottom and working my way up. Along the way, I’ve gained incredible experiences and exposure that have really shaped my journey here.If you’re looking to expand your network, share some good vibes, and pick up new experiences along the way, come join us!😉.",
    imageSrc: "/man.png",
    name: "Kylan",
    username: "@kylan",
  },
  {
    text: "Having the opportunity to meet students and professionals in the data industry through this club has been amazing. ",
    imageSrc: "/man.png",
    name: "Amir Zuhaily Zaily",
    username: "@amir",
  },
  {
    text: "APAC gives me the chance to explore new experiences and step out of my comfort, whether through workshops, hackathons, or meeting new people.",
    imageSrc: "/woman.png",
    name: "Jennifer Colleen",
    username: "@jennifer",
  },
  {
    text: "For me, APAC feels like a chill club where you can learn new skills, gain variety of experience, meet a lot of cool people, and teamwork that's solid and dependable.",
    imageSrc: "/man.png",
    name: "Bill Davidson",
    username: "@billdavidson",
  },
  {
    text: "Analyze today, shape tomorrow. ",
    imageSrc: "/woman.png",
    name: "Xiu Xiang",
    username: "@lokexiuxiang",
  },
  {
    text: "APAC could organize more hands-on workshops and projects where members committee can join to gain more knowledge.",
    imageSrc: "/man.png",
    name: "Juan Andrew Djajadi",
    username: "@juanandrewdjajadi",
  },
  {
    text: "Very friendly hardworking environment that makes things possible. ",
    imageSrc: "/woman.png",
    name: "Aley",
    username: "@aleyelboraie",
  },
  {
    text: "APAC became a window to the real world for me—opening doors to opportunities, challenges, and growth I never expected.",
    imageSrc: "/man.png",
    name: "Gehad Abdelrazik ",
    username: "@gehadabdelrazik",
  },
  {
    text: "Very friendly hardworking environment that makes things possible. ",
    imageSrc: "/woman.png",
    name: "Aley",
    username: "@aleyelboraie",
  },
];

const firstColumn = testimonials.slice(0, 5);
const secondColumn = testimonials.slice(5, 9);
const thirdColumn = testimonials.slice(9, 12);
const fourthColumn = testimonials.slice(12, 18);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {/* Duplicate testimonials */}
      {[...Array(2)].map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, imageSrc, name, username }) => (
            <div className="card" key={`${username}-${index}`}>
              <div>{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <Image
                  width={40}
                  height={40}
                  src={imageSrc}
                  alt={name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight leading-5">
                    {name}
                  </div>
                  <div className="leading-5 tracking-tight">{username}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="bg-white">
      <div className="fixed-container flex flex-col justify-center items-center">
        <div className="max-w-[900px]">
          <div className="flex justify-center items-center">
            <div className="tag">Testimonials</div>
          </div>
          <h2 className="section-title mt-5">What our club members say</h2>
          <p className="section-description mt-5">
            From hands-on workshops to collaborative projects, our club empowers
            students to unlock their potential in data analytics, equipping them
            with skills to tackle real-world challenges and succeed in their
            careers.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="max-w-[900px] max-h-[600px] flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]  overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={16} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={19}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
            />
            <TestimonialsColumn
              testimonials={fourthColumn}
              className="hidden md:block"
              duration={19}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
