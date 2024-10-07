import { Fragment } from "react/jsx-runtime";
import { Transaction } from "../store/slices/transactionSlice";
import { TransactionsConfig } from "./TransactionsList";
import { ReactNode } from "react";

interface TransactionsTableProps {
  transactions: Transaction[];
  config: TransactionsConfig[];
  generateKey: (transaction: Transaction) => string;
}

const TransactionsTable = ({
  transactions,
  config,
  generateKey,
}: TransactionsTableProps) => {
  return (
    <table className="min-w-full bg-white border-collapse">
      <thead>
        <tr>
          {config.map((configData) => {
            if (configData.header) {
              return (
                <Fragment key={configData.label}>
                  {configData.header() as ReactNode}
                </Fragment>
              );
            }

            return (
              <th key={configData.label} className="py-2 border-b">
                {configData.label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions.map((transaction) => (
            <tr key={generateKey(transaction)}>
              {config.map((configData) => {
                return (
                  <td className="py-2 px-4 border-b">
                    {configData.render(transaction)}
                  </td>
                );
              })}
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

export default TransactionsTable;
