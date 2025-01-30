import AppHeader from "@/components/home/AppHeader";
import PerformanceChart from "@/components/home/PerformanceChart";
import QuickActions from "@/components/home/QuickActions";
import SupportSection from "@/components/home/SupportSection";
import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Performance Chart Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Rendimentos</h2>
            <PerformanceChart />
          </Card>

          {/* Quick Actions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Ações Rápidas</h2>
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