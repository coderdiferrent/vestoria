
const testimonials = [
  {
    name: "Roberto Souza",
    text: "Comecei com cautela, investindo apenas R$ 500. Em dois meses tive um retorno de 15%. O suporte respondeu todas as minhas dúvidas rapidamente.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Carolina Mendes",
    text: "Confesso que entrei com pé atrás, mas a transparência da plataforma me conquistou. Já recomendei para amigos e familiares.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Marcos Oliveira",
    text: "A interface é intuitiva e os relatórios são claros. Consegui diversificar minha carteira com facilidade e o rendimento tem sido consistente.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Juliana Costa",
    text: "Investi R$ 2.000 há 3 meses e acompanho diariamente o crescimento. O que mais gosto é a facilidade para sacar quando precisei.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
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
