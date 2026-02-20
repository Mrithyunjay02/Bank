const BalanceCard = ({ balance, username, memberSince }) => {
    const formatted = parseFloat(balance).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="balance-card">
            <div className="balance-card-inner">
                <div className="balance-card-left">
                    <p className="balance-tag">Total Balance</p>
                    <p className="balance-amount">${formatted}</p>
                    <div className="balance-meta">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>{username}</span>
                        <span className="balance-dot">·</span>
                        <span>Member since {memberSince}</span>
                    </div>
                </div>
                <div className="balance-card-actions">
                    <button className="balance-action-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Deposit
                    </button>
                    <button className="balance-action-btn balance-action-btn--outline">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Send Money
                    </button>
                </div>
            </div>
            <div className="balance-card-decoration" />
            <div className="balance-card-decoration-2" />
        </div>
    );
};

export default BalanceCard;
