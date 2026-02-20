import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { decodeToken, removeToken } from '../utils/auth';
import { SkeletonDashboard } from '../components/Loader';
import BalanceCard from '../components/BalanceCard';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import TransactionList from '../components/TransactionList';

const WalletIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4Z" />
    </svg>
);

const IncomeIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
);

const ExpenseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
    </svg>
);

const SavingsIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
        <path d="M2 9.5h3" /><path d="M15 8h.01" />
    </svg>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/api/bank/me');
                setUser(res.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    removeToken();
                    navigate('/login');
                } else {
                    setError(err.response?.data?.error || 'Failed to load account details.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    if (loading) {
        return <SkeletonDashboard />;
    }

    if (error) {
        return (
            <div className="dash-error-wrap">
                <div className="dash-error-card">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <h2 className="dash-error-title">Something went wrong</h2>
                    <p className="dash-error-msg">{error}</p>
                    <button className="btn btn-primary" onClick={() => { removeToken(); navigate('/login'); }}>
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    const balance = parseFloat(user.balance);

    const formatCurrency = (val) => val.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="dashboard">
            {/* Balance Section */}
            <BalanceCard
                balance={balance}
                username={user.username}
                memberSince={memberSince}
            />

            {/* Stats Row */}
            <div className="stats-row">
                <StatCard
                    icon={<WalletIcon />}
                    label="Total Balance"
                    value={`$${formatCurrency(balance)}`}
                    trend="+2.5%"
                    trendUp
                />
                <StatCard
                    icon={<IncomeIcon />}
                    label="Monthly Income"
                    value="$4,500.00"
                    trend="+12.3%"
                    trendUp
                />
                <StatCard
                    icon={<ExpenseIcon />}
                    label="Monthly Expenses"
                    value="$2,180.50"
                    trend="-3.1%"
                    trendUp={false}
                />
                <StatCard
                    icon={<SavingsIcon />}
                    label="Savings"
                    value="$1,250.00"
                    trend="+8.7%"
                    trendUp
                />
            </div>

            {/* Bottom Grid: Chart + Transactions */}
            <div className="dashboard-bottom">
                <ChartCard />
                <TransactionList />
            </div>
        </div>
    );
};

export default Dashboard;
