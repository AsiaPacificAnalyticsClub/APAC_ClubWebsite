"use client";
import React from 'react'
import Image from 'next/image';
import {motion} from 'framer-motion'

const testimonials = [
    {
      text: "Joining the Asia Pacific Analytic Club was a game-changer. The workshops and mentorship programs are innovative and practical, helping me develop essential data analytics skills.",
      imageSrc: "/man.png",
      name: "Sau Kang",
      username: "@saukang",
    },
    {
      text: "Our productivity in handling data projects has skyrocketed since becoming members of the club. The collaborative environment prepares us to tackle real-world challenges with confidence.",
      imageSrc: "/man.png",
      name: "Jonas",
      username: "@jonas",
    },
    {
      text: "This club has completely transformed how I approach data analysis and project management. The hands-on sessions make complex concepts easy to understand.",
      imageSrc: "/man.png",
      name: "Zhe Shing",
      username: "@zheshing",
    },
    {
      text: "I was amazed at how seamlessly the Asia Pacific Analytic Club integrates industry-level tools and techniques into their events and workshops.",
      imageSrc: "/man.png",
      name: "Yen Kuan",
      username: "@yenkuan",
    },
    {
      text: "The club’s events have helped me understand and apply advanced analytics techniques. It’s a perfect platform to enhance both technical and soft skills.",
      imageSrc: "/woman.png",
      name: "Alexandria",
      username: "@alexandria",
    },
    {
      text: "The variety of resources and projects offered by the Asia Pacific Analytic Club are top-notch. It’s helped me gain hands-on experience in data analytics.",
      imageSrc: "/man.png",
      name: "Kylane",
      username: "@kylane",
    },
    {
      text: "Adopting data analytics through this club has streamlined my approach to research and teamwork. The guidance from seniors and mentors is invaluable.",
      imageSrc: "/woman.png",
      name: "Cindy",
      username: "@cindy",
    },
    {
      text: "With the Asia Pacific Analytic Club, I can work on real-world data problems, collaborate with peers, and learn new tools like Python and Tableau.",
      imageSrc: "/man.png",
      name: "Desmond",
      username: "@desmond",
    },
    {
      text: "Its user-friendly and collaborative environment makes complex analytics concepts easier to grasp. This club has been a crucial part of my university journey.",
      imageSrc: "/woman.png",
      name: "Xin Ru",
      username: "@xinru",
    }
  ];
  

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  const TestimonialsColumn = (props: {
    className?: string;
    testimonials: typeof testimonials;
    duration? : number
  }) => (
    <div className={props.className}>
    <motion.div 
    animate = {{
      translateY : '-50%'
    }}
    transition ={{
      duration: props.duration || 10, 
      repeat: Infinity,
      ease: 'linear',
      repeatType:'loop'
    }}
    className="flex flex-col gap-6 pb-6">
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
            From hands-on workshops to collaborative projects, our club empowers students to unlock their potential in data analytics, equipping them with skills to tackle real-world challenges and succeed in their careers.
            </p> 
          </div>
          <div className='flex items-center justify-center'>
          <div className="max-w-[900px] max-h-[600px] flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]  overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn}
            duration={15} />
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
          </div>
          </div>
        </div>
      </section>
    );
  };

export default Testimonials
