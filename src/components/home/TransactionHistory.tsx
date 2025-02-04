import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { useTransactions } from "@/hooks/use-transactions";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

const TransactionHistory = () => {
  const { data: transactions } = useTransactions();

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'investment':
        return <ArrowUpRight className="w-4 h-4 text-blue-600" />;
      case 'earning':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'investment':
        return 'text-blue-600';
      case 'earning':
        return 'text-green-600';
      case 'withdrawal':
        return 'text-red-600';
      default:
        return 'text-gray-600';
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
    <Card className="p-6 bg-white rounded-2xl border-none shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Histórico de Transações</h2>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Todas
        </div>
      </div>
      
      <div className="space-y-4">
        {transactions?.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            Nenhuma transação encontrada
          </p>
        )}
        {transactions?.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {getTransactionIcon(transaction.type)}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {getTransactionTitle(transaction.type)}
                </p>
                <p className="text-sm text-gray-500">
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