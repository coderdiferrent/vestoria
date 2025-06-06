
import { useEffect, useRef } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import TopInvestors from "@/components/landing/TopInvestors";
import Benefits from "@/components/landing/Benefits";
import RecentTransactions from "@/components/landing/RecentTransactions";
import Testimonials from "@/components/landing/Testimonials";
import UserReviewForm from "@/components/landing/UserReviewForm";
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <Hero />
      <HowItWorks />
      <TopInvestors />
      <Benefits />
      <RecentTransactions />
      <Testimonials />
      <UserReviewForm />
      <Footer />
      <AnimationStyles />
    </div>
  );
};

export default Landing;
