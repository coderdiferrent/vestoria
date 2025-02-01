import AppHeader from "@/components/home/AppHeader";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SupportSection from "@/components/home/SupportSection";

const FAQs = [
  {
    question: "Como faço para investir?",
    answer: "Para investir, acesse a página de Investimentos, escolha o valor desejado e siga as instruções para completar o depósito via PIX."
  },
  {
    question: "Qual o valor mínimo para investir?",
    answer: "O valor mínimo para investimento é de R$ 100,00."
  },
  {
    question: "Como funciona o programa de indicação?",
    answer: "Ao indicar amigos, você recebe uma comissão sobre os investimentos realizados por eles. Acesse a página de Indicação para mais detalhes."
  },
  {
    question: "Como faço para sacar meus rendimentos?",
    answer: "Na página de Saque, você pode solicitar a retirada dos seus rendimentos para sua conta PIX cadastrada."
  }
];

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">Central de Ajuda</h1>
          
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
          
          <SupportSection />
        </div>
      </main>
    </div>
  );
};

export default Support;