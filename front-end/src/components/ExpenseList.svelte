<script>
   import { expenses } from '../stores/expenses.js';
</script>

<style>
    /* Basic styling for the expense list */
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        background-color: #f4f4f4;
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .expense-title {
        font-weight: bold;
    }

    .expense-amount {
        color: green;
        font-weight: bold;
    }

    .expense-date {
        color: #666;
        font-size: 0.9em;
    }
</style>

<ul>
    {#each $expenses as expense (expense.id)}
        <li>
            <span class="expense-title">{expense.title}</span>
            <span class="expense-date">{expense.date}</span>
            <span class="expense-amount">${expense.amount.toFixed(2)}</span>
        </li>
    {/each}
</ul>