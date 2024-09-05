<script>
    // Example expense data, will be replaced later with dynamic data.
    let expenses = [
        { id: 1, title: 'Groceries', amount: 50.25, date: '2024-09-01' },
        { id: 2, title: 'Electricity Bill', amount: 100.00, date: '2024-09-03' },
        { id: 3, title: 'Internet', amount: 75.00, date: '2024-09-04' },
        { id: 4, title: 'Coffee', amount: 5.50, date: '2024-09-05' }
    ];
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
    {#each expenses as expense}
        <li>
            <span class="expense-title">{expense.title}</span>
            <span class="expense-date">{expense.date}</span>
            <span class="expense-amount">${expense.amount.toFixed(2)}</span>
        </li>
    {/each}
</ul>