import React from "react";
import Image from "next/image";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#D2DCFF]  overflow-x-clip fixed-container mt-16 !py-10">
      <div className="backdrop-blur-md  bg-opacity-20 rounded-xl border border-white  border-opacity-20 shadow-lg  bg-white py-16">
        <div className="relative max-w-[540px] mx-auto">
          <h2 className="section-title"> Join Our Club Today!</h2>
          <p className="section-description mt-5">
            Cultivating a community of innovative thinkers and problem solvers
            who are passionate about leveraging technology to make informed
            decisions and drive impactful change
          </p>
          <Image
            src={"/star.png"}
            alt="star"
            width={360}
            height={360}
            className="absolute -left-[350px] -top-[137px]"
          />
          <Image
            src={"/spring.png"}
            alt="spring"
            width={360}
            height={360}
            className="absolute -right-[331px] -top-[19px]"
          />
          <div className="flex gap-8 mt-10 justify-center">
            <Link
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLSfLyy3a3sSqbep0Hyxx-RYmf7sgK5D-qwkPBwcqpOMlfeAx2g/viewform"
              }
              target="_blank"
            >
              <button className=" bg-black text-white px-10 py-4 rounded-lg font-bold text-[16px] inline-flex items-center justify-center tracking-tighter hover:opacity-60">
                Join Us Today
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
