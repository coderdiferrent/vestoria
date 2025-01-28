import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Vestoria</h1>
      <p className="text-xl text-gray-600 mb-8">Duplique seus ganhos em 40 dias!</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
      >
        Voltar para Login
      </button>
    </div>
  );
};

export default Home;