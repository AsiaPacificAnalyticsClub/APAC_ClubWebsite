import Hero from "@/sections/Hero";
import ClubShowcase from "@/sections/ClubShowcase";
import FAQ from "@/sections/FAQ";
import Testimonials from "@/sections/Testimonials";
import CallToAction from "@/sections/CallToAction";
import Collaborators from "@/sections/Collborators";

export default function Home() {
  return (
    <>
      <Hero />
      <ClubShowcase />
      <Testimonials />
      <FAQ />
      <Collaborators />
      <CallToAction />
    </>
  );
}
