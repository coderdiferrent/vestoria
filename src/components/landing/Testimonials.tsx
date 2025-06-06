const testimonials = [
  {
    name: "Roberto Souza",
    text: "Comecei desconfiado, mas em 3 meses já tive retorno melhor do que qualquer CDB que já investi. Hoje reinvisto 80% dos lucros.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Carolina Mendes",
    text: "Trabalho com números o dia todo, então fui criteriosa antes de aplicar. A plataforma entrega exatamente o que promete.",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Marcos Oliveira",
    text: "Não tinha muito dinheiro pra investir, mas com R$ 500 já comecei a ver resultado. Me ajudou até a pagar parte da faculdade.",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    name: "Juliana Costa",
    text: "Uso os rendimentos pra complementar minha renda com a lojinha online. Toda semana vejo o saldo crescer.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
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
