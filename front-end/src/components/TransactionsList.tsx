// src/components/ExpenseList.tsx
import { useEffect } from "react";
import { fetchTransactions } from "../store/slices/transactionSlice";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useSelector } from "react-redux";

const TransactionsList = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
    // Fetch expenses when component mounts
  }, [dispatch]);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Transactions List</h2>
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
                <td className="py-2 px-4 border-b">
                  {transaction.description}
                </td>
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
    </div>
  );
};

export default TransactionsList;
