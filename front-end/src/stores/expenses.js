import { writable } from "svelte/store";

// Initialize the store with some dummy expenses
export const expenses = writable([
  { id: 1, title: "Groceries", amount: 50.25, date: "2024-09-01" },
  { id: 2, title: "Electricity Bill", amount: 100.0, date: "2024-09-03" },
  { id: 3, title: "Internet", amount: 75.0, date: "2024-09-04" },
  { id: 4, title: "Coffee", amount: 5.5, date: "2024-09-05" },
]);

// Function to add a new expense to the store
export const addExpense = (expense) => {
  expenses.update((items) => [...items, expense]);
};

// Function to remove an expense by its id
export const removeExpense = (id) => {
  expenses.update((items) => items.filter((expense) => expense.id !== id));
};
