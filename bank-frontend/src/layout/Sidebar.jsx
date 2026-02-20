import { NavLink, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
            <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <div className="sidebar-logo">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="6" width="20" height="14" rx="2" />
                                <path d="M2 10h20" />
                                <path d="M6 14h.01" />
                                <path d="M10 14h4" />
                            </svg>
                        </div>
                        <span className="sidebar-brand-text">SecureBank</span>
                    </div>
                    <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <span className="sidebar-section-label">Menu</span>
                    <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`} onClick={onClose}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                        Dashboard
                    </NavLink>
                    <a className="sidebar-link sidebar-link--disabled" href="#" onClick={e => e.preventDefault()}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                        Analytics
                        <span className="sidebar-badge">Soon</span>
                    </a>
                    <a className="sidebar-link sidebar-link--disabled" href="#" onClick={e => e.preventDefault()}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        Transactions
                        <span className="sidebar-badge">Soon</span>
                    </a>
                    <a className="sidebar-link sidebar-link--disabled" href="#" onClick={e => e.preventDefault()}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6m5.66-14.66l-4.24 4.24m-2.83 2.83l-4.24 4.24m14.66 0l-4.24-4.24m-2.83-2.83L5.1 5.1" />
                        </svg>
                        Settings
                        <span className="sidebar-badge">Soon</span>
                    </a>
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-logout" onClick={handleLogout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
