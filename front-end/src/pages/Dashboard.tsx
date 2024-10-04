// src/pages/Dashboard.tsx
import LogoutButton from "../components/LogoutButton";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <LogoutButton />
      <h1 className="text-3xl font-bold mb-8">Expense Tracker Dashboard</h1>
      <TransactionsList />
      <TransactionForm />
    </div>
  );
};

export default Dashboard;
