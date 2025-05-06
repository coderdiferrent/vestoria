
const testimonials = [
  {
    name: "Roberto Souza",
    text: "Estava cético no começo, mas após investir R$ 1.000 consegui um retorno razoável de 8% em três meses. A plataforma é simples de usar e transparente quanto às taxas.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Carolina Mendes",
    text: "Confesso que entrei com pé atrás, mas a transparência da plataforma me conquistou. Já recomendei para amigos e familiares.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Marcos Oliveira",
    text: "A interface é intuitiva e os relatórios são claros. Consegui diversificar minha carteira com facilidade e o rendimento tem sido consistente.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Juliana Costa",
    text: "Investi R$ 2.000 há 3 meses e acompanho diariamente o crescimento. O que mais gosto é a facilidade para sacar quando precisei.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 section-transition">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          O que nossos usuários dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="p-6 bg-white rounded-lg shadow-lg hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col items-center text-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-lg mb-2">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
