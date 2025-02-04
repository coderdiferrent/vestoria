import AppHeader from "@/components/home/AppHeader";
import PerformanceChart from "@/components/home/PerformanceChart";
import QuickActions from "@/components/home/QuickActions";
import SupportSection from "@/components/home/SupportSection";
import TransactionHistory from "@/components/home/TransactionHistory";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Visão Geral
              </h1>
              <p className="text-gray-600 mt-1">
                Acompanhe seus investimentos
              </p>
            </div>
            <div className="flex gap-4">
              <QuickActions />
            </div>
          </div>

          {/* Performance Chart Section */}
          <section>
            <PerformanceChart />
          </section>

          {/* Transaction History */}
          <section className="mt-8">
            <TransactionHistory />
          </section>

          {/* Support Section */}
          <section className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
            <SupportSection />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;