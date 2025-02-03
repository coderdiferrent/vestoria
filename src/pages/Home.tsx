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
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo à Vestoria
            </h1>
            <p className="text-gray-600">
              Acompanhe seus investimentos e veja seu dinheiro crescer
            </p>
          </div>

          {/* Performance Chart Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <PerformanceChart />
          </div>

          {/* Transaction History */}
          <section className="space-y-4">
            <TransactionHistory />
          </section>

          {/* Quick Actions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Ações Rápidas</h2>
            <QuickActions />
          </section>

          {/* Support Section */}
          <section className="mt-12">
            <SupportSection />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;