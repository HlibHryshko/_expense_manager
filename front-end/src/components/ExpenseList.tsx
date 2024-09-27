// src/components/ExpenseList.tsx
import React, { useEffect } from "react";
import { fetchExpenses } from "../store/slices/expensesSlice";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useSelector } from "react-redux";

const ExpenseList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { expenses, loading, error } = useSelector(
    (state: RootState) => state.expenses
  );

  useEffect(() => {
    dispatch(fetchExpenses());
    // Fetch expenses when component mounts
  }, [dispatch]);

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(expenses);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Expense List</h2>
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
          {expenses &&
            expenses.map((expense) => (
              <tr key={expense._id}>
                <td className="py-2 px-4 border-b">{expense.description}</td>
                <td className="py-2 px-4 border-b">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{expense.category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
