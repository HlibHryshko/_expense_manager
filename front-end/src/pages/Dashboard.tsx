// src/pages/Dashboard.tsx
import TransactionsList from "../components/TransactionsList";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Expense Tracker Dashboard</h1>
      <TransactionsList />
    </div>
  );
};

export default Dashboard;
