// src/components/TransactionForm.tsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createTransaction } from "../store/slices/transactionSlice";
import { RootState } from "../store";
import { fetchCategories } from "../store/slices/categoriesSlice"; // Assuming you have this
import { useAppDispatch } from "../hooks/useAppDispatch";

const TransactionForm = () => {
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state.categories);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchCategories()); // Load categories on component mount
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !date || !category) {
      alert("Please fill out all fields");
      return;
    }

    const newTransaction = {
      description,
      amount,
      date,
      category: category,
    };

    dispatch(createTransaction(newTransaction));

    // Clear form fields
    setDescription("");
    setAmount(0);
    setDate("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Create New Transaction</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter description"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border rounded"
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Create Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
