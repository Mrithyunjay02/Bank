const placeholderTransactions = [
    { id: 1, name: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: 'Today' },
    { id: 2, name: 'Salary Deposit', category: 'Income', amount: 4500.00, date: 'Yesterday' },
    { id: 3, name: 'Amazon Purchase', category: 'Shopping', amount: -89.50, date: 'Feb 18' },
    { id: 4, name: 'Uber Ride', category: 'Transport', amount: -24.30, date: 'Feb 17' },
    { id: 5, name: 'Freelance Payment', category: 'Income', amount: 750.00, date: 'Feb 16' },
];

const categoryIcons = {
    Entertainment: '🎬',
    Income: '💰',
    Shopping: '🛒',
    Transport: '🚗',
};

const TransactionList = () => (
    <div className="txn-card">
        <div className="txn-header">
            <h3 className="txn-title">Recent Transactions</h3>
            <span className="txn-view-all">View All</span>
        </div>
        <div className="txn-list">
            {placeholderTransactions.map((txn) => (
                <div key={txn.id} className="txn-item">
                    <div className="txn-icon">{categoryIcons[txn.category] || '📄'}</div>
                    <div className="txn-info">
                        <p className="txn-name">{txn.name}</p>
                        <p className="txn-category">{txn.category}</p>
                    </div>
                    <div className="txn-right">
                        <p className={`txn-amount ${txn.amount > 0 ? 'txn-amount--positive' : ''}`}>
                            {txn.amount > 0 ? '+' : ''}{txn.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </p>
                        <p className="txn-date">{txn.date}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default TransactionList;
