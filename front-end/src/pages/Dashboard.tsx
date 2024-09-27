// src/pages/Dashboard.tsx
import ExpenseList from "../components/ExpenseList";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Expense Tracker Dashboard</h1>
      <ExpenseList />
    </div>
  );
};

export default Dashboard;
