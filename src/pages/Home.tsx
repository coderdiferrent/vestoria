
import SecurityWrapper from "@/components/SecurityWrapper";
import AppHeader from "@/components/home/AppHeader";
import QuickActions from "@/components/home/QuickActions";
import PerformanceChart from "@/components/home/PerformanceChart";
import TransactionHistory from "@/components/home/TransactionHistory";
import TopInvestorsCarousel from "@/components/home/TopInvestorsCarousel";
import SupportSection from "@/components/home/SupportSection";

const Home = () => {
  return (
    <SecurityWrapper requireAuth>
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        
        <main className="container mx-auto px-4 py-8 space-y-8">
          <QuickActions />
          <PerformanceChart />
          <TransactionHistory />
          <TopInvestorsCarousel />
          <SupportSection />
        </main>
      </div>
    </SecurityWrapper>
  );
};

export default Home;
