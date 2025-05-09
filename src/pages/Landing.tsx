
import { useEffect, useRef } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import RecentTransactions from "@/components/landing/RecentTransactions";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/landing/Footer";
import AnimationStyles from "@/components/landing/AnimationStyles";

const Landing = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.section-transition').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Header />
      <Hero />
      <HowItWorks />
      <Benefits />
      <RecentTransactions />
      <Testimonials />
      <Footer />
      <AnimationStyles />
    </div>
  );
};

export default Landing;
