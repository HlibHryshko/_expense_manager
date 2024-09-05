<script>
    import ExpenseList from './components/ExpenseList.svelte';
    import AddExpenseForm from './components/AddExpenseForm.svelte';

    // State to hold the expenses list
    let expenses = [
        { id: 1, title: 'Groceries', amount: 50.25, date: '2024-09-01' },
        { id: 2, title: 'Electricity Bill', amount: 100.00, date: '2024-09-03' },
        { id: 3, title: 'Internet', amount: 75.00, date: '2024-09-04' },
        { id: 4, title: 'Coffee', amount: 5.50, date: '2024-09-05' }
    ];

    // Function to handle adding a new expense
    function addExpense(newExpense) {
        expenses = [...expenses, newExpense];
    }
</script>

<main>
    <h1>Expense Tracker</h1>
    
    <!-- AddExpenseForm component -->
    <AddExpenseForm onAddExpense={addExpense} />

    <!-- ExpenseList component -->
    <ExpenseList {expenses} />
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
