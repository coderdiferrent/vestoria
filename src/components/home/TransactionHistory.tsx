import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { useTransactions } from "@/hooks/use-transactions";

const TransactionHistory = () => {
  const { data: transactions } = useTransactions();

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

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'investment':
        return '+';
      case 'earning':
        return '+';
      case 'withdrawal':
        return '-';
      default:
        return '';
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Histórico de Transações</h2>
      <div className="space-y-4">
        {transactions?.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            Nenhuma transação encontrada
          </p>
        )}
        {transactions?.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <span className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                {getTransactionIcon(transaction.type)}
              </span>
              <div>
                <p className="font-medium text-gray-900">
                  {transaction.description || transaction.type}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(transaction.created_at), 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
            </div>
            <span className={`font-semibold ${getTransactionColor(transaction.type)}`}>
              R$ {transaction.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionHistory;