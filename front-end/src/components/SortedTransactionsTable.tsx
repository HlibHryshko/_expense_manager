import { Transaction } from "../store/slices/transactionSlice";
import { TransactionsConfig } from "./TransactionsList";

interface SortedTransactionsTableProps {
  transactions: Transaction[];
  config: TransactionsConfig[];
}

const SortedTransactionsTable = ({
  transactions,
}: SortedTransactionsTableProps) => {
  return (
    <table className="min-w-full bg-white border-collapse">
      <thead>
        <tr>
          <th className="py-2 border-b">Description</th>
          <th className="py-2 border-b">Amount</th>
          <th className="py-2 border-b">Date</th>
          <th className="py-2 border-b">Category</th>
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="py-2 px-4 border-b">{transaction.description}</td>
              <td className="py-2 px-4 border-b">
                ${transaction.amount.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {transaction.category.name}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SortedTransactionsTable;
