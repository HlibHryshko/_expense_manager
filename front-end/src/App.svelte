<script>
    import ExpenseList from './components/ExpenseList.svelte';
    import AddExpenseForm from './components/AddExpenseForm.svelte';

    // Import the expense store and addExpense function
    import { expenses, addExpense } from './stores/expenses.js';
</script>

<main>
    <h1>Expense Tracker</h1>
    
    <!-- AddExpenseForm component -->
    <AddExpenseForm />

    <!-- ExpenseList component -->
    <ExpenseList />
</main>

<style>
    main {
        font-family: Arial, sans-serif;
        margin: 20px;
    }

    h1 {
        color: #333;
    }
</style>
