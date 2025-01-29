const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* White banner for title */}
      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Vestoria</h1>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Bem-vindo</h2>
            <p className="text-gray-600">
              Este é o seu painel de controle. Aqui você pode gerenciar suas vistorias e acompanhar o status de cada uma delas.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Vistorias Recentes</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Nenhuma vistoria encontrada</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
            <div className="space-y-4">
              <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                Nova Vistoria
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                Ver Relatórios
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © 2024 Vestoria. Todos os direitos reservados
            </div>
            <div className="flex space-x-6">
              <a href="/support" className="text-sm text-gray-600 hover:text-primary">
                Central de Ajuda
              </a>
              <a href="/support" className="text-sm text-gray-600 hover:text-primary">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;