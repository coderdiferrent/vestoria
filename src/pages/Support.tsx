
import SecurityWrapper from "@/components/SecurityWrapper";
import AppHeader from "@/components/home/AppHeader";

const Support = () => {
  return (
    <SecurityWrapper requireAuth>
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-center">Suporte</h1>
            
            <div className="text-center text-gray-600">
              <p>Entre em contato conosco para suporte técnico.</p>
            </div>
          </div>
        </main>
      </div>
    </SecurityWrapper>
  );
};

export default Support;
