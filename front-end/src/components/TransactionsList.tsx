// src/components/ExpenseList.tsx
import { useEffect } from "react";
import {
  fetchTransactions,
  Transaction,
} from "../store/slices/transactionSlice";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import SortedTransactionsTable from "./SortedTransactionsTable";

export interface TransactionsConfig {
  label: string;
  render: (transaction: Transaction) => string;
  sortValue: (transaction: Transaction) => string | number;
  header?: () => Element | JSX.Element;
}

const config: TransactionsConfig[] = [
  {
    label: "Description",
    render: (transaction) => transaction.description,
    sortValue: (transaction) => transaction.description,
  },
  {
    label: "Amount",
    render: (transaction) => `$${transaction.amount.toFixed(2)}`,
    sortValue: (transaction) => transaction.amount,
  },
  {
    label: "Date",
    render: (transaction) => new Date(transaction.date).toLocaleDateString(),
    sortValue: (transaction) => new Date(transaction.date).getTime(),
  },
  {
    label: "Category",
    render: (transaction) => transaction.category.name,
    sortValue: (transaction) => transaction.category.name,
  },
];

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
      <SortedTransactionsTable
        config={config}
        transactions={transactions}
        generateKey={(transaction) => transaction._id}
      />
    </div>
  );
};

export default TransactionsList;
