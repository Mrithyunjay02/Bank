import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import Navbar from '../components/Navbar';
import { SkeletonDashboard } from '../components/Loader';

const UserIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
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
                    localStorage.removeItem('token');
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
        return (
            <div className="dash-wrap">
                <Navbar />
                <SkeletonDashboard />
            </div>
        );
    }

    if (error) {
        return (
            <div className="dash-wrap">
                <Navbar />
                <div className="dash-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <div className="alert alert-error" style={{ maxWidth: 420 }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                    </div>
                    <button
                        className="btn btn-ghost"
                        style={{ marginTop: 16 }}
                        onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    const balance = parseFloat(user.balance).toLocaleString('en-US', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    });

    return (
        <div className="dash-wrap">
            <Navbar username={user.username} />

            <main className="dash-body">
                {/* Balance card */}
                <section className="balance-card" aria-label="Account balance">
                    <p className="balance-tag">Available Balance</p>
                    <p className="balance-amount">${balance}</p>
                    <div className="balance-meta">
                        <UserIcon />
                        <span>{user.username}</span>
                        <span style={{ opacity: 0.5, margin: '0 6px' }}>·</span>
                        <span>Member since {memberSince}</span>
                    </div>
                </section>

                {/* Profile card */}
                <section className="profile-card" aria-label="Account details">
                    <h2 className="profile-card-header">Account Details</h2>
                    <div className="profile-grid">
                        <div className="profile-item">
                            <p className="profile-label">Username</p>
                            <p className="profile-value">{user.username}</p>
                        </div>
                        <div className="profile-item">
                            <p className="profile-label">Email</p>
                            <p className="profile-value">{user.email}</p>
                        </div>
                        <div className="profile-item">
                            <p className="profile-label">Phone</p>
                            <p className="profile-value">{user.phone || <span style={{ color: 'var(--text-muted)' }}>Not provided</span>}</p>
                        </div>
                        <div className="profile-item">
                            <p className="profile-label">Account ID</p>
                            <p className="profile-value" style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                #{String(user.id).padStart(6, '0')}
                            </p>
                        </div>
                        <div className="profile-item">
                            <p className="profile-label">Member Since</p>
                            <p className="profile-value">{memberSince}</p>
                        </div>
                        <div className="profile-item">
                            <p className="profile-label">Account Status</p>
                            <p className="profile-value">
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '2px 10px', borderRadius: 99,
                                    background: '#f0fdf4', color: '#15803d',
                                    fontSize: '0.82rem', fontWeight: 600,
                                }}>
                                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                                    Active
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
