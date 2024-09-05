<script>
    import { addExpense } from '../stores/expenses.js';

    let title = '';
    let amount = '';
    let date = '';
    
    function submitExpense() {
        if (title && amount && date) {
            // Create a new expense object
            const newExpense = {
                id: Date.now(),
                title,
                amount: parseFloat(amount),
                date
            };
            
            addExpense(newExpense);

            title = '';
            amount = '';
            date = '';
        } else {
            alert('Please fill out all fields.');
        }
    }
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
    }

    input {
        padding: 8px;
        font-size: 1em;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    button {
        padding: 10px;
        background-color: #28a745;
        color: white;
        font-size: 1em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #218838;
    }
</style>

<form on:submit|preventDefault={submitExpense}>
    <input 
        type="text" 
        placeholder="Expense Title" 
        bind:value={title} 
        required 
    />
    <input 
        type="number" 
        step="0.01" 
        placeholder="Amount" 
        bind:value={amount} 
        required 
    />
    <input 
        type="date" 
        bind:value={date} 
        required 
    />
    <button type="submit">Add Expense</button>
</form>