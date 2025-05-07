
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { useTransactions } from "@/hooks/use-transactions";
import { ArrowUpRight, ArrowDownRight, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const TransactionHistory = () => {
  const { data: transactions } = useTransactions();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'investment':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'earning':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'withdrawal':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'investment':
        return 'text-green-400';
      case 'earning':
        return 'text-green-400';
      case 'withdrawal':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTransactionTitle = (type: string) => {
    switch (type) {
      case 'investment':
        return 'Investimento';
      case 'earning':
        return 'Rendimento';
      case 'withdrawal':
        return 'Saque';
      default:
        return type;
    }
  };

  return (
    <Card className="p-6 bg-[#1A1F2C] rounded-2xl border-[#333] border shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">Histórico de Transações</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm text-green-400 bg-[#222] px-3 py-1 rounded-full border border-green-400/20">
            Todas
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-2 text-green-400 hover:text-green-300 hover:bg-[#333]"
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <div className={`space-y-4 transition-all duration-300 ${isCollapsed ? 'hidden' : ''}`}>
        {transactions?.length === 0 && (
          <p className="text-gray-400 text-center py-4">
            Nenhuma transação encontrada
          </p>
        )}
        {transactions?.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-[#222] rounded-xl hover:bg-[#2a2a2a] transition-colors border border-green-400/10"
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center border border-green-400/20">
                {getTransactionIcon(transaction.type)}
              </div>
              <div>
                <p className="font-medium text-white">
                  {getTransactionTitle(transaction.type)}
                </p>
                <p className="text-sm text-gray-400">
                  {format(new Date(transaction.created_at), 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
            </div>
            <span className={`font-semibold ${getTransactionColor(transaction.type)}`}>
              {transaction.type === 'withdrawal' ? '- ' : '+ '}
              R$ {transaction.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionHistory;
