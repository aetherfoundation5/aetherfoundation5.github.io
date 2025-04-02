const transactions = [
    { productName: 'Power Up Ticket Ultra Box', quantity: 1, price: 289, date: '2025-03-22' },
    { productName: 'Bug Out Ultra Ticket Box', quantity: 1, price: 59, date: '2025-03-24' },
    { productName: '1300 PokéCoins', quantity: 1, price: 289, date: '2025-03-28' },
    { productName: 'Ultra Raid Box', quantity: 3, price: 149, date: '2025-03-30' },
    { productName: '600 PokéCoins', quantity: 1, price: 149, date: '2025-03-31' },
    { productName: '5,600 PokéCoins', quantity: 1, price: 1170, date: '2025-04-01' },
    { productName: 'GO Rocket Box', quantity: 1, price: 289, date: '2025-04-02' },
];

function loadTransactionHistory() {
    const tableBody = document.getElementById('transaction-history-list');

    transactions.forEach(transaction => {
        const row = document.createElement('tr');

        const total = transaction.price * transaction.quantity;

        row.innerHTML = `
            <td>${transaction.productName}</td>
            <td>${transaction.quantity}</td>
            <td>${transaction.price} Pesos</td>
            <td>${total} Pesos</td>
            <td>${transaction.date}</td>
        `;

        tableBody.appendChild(row);
    });
}

window.onload = loadTransactionHistory;
