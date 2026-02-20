import { decodeToken } from '../utils/auth';

const TopNavbar = ({ onMenuToggle }) => {
    const decoded = decodeToken();
    const username = decoded?.username || 'User';

    return (
        <header className="topnav">
            <div className="topnav-left">
                <button className="topnav-menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <div className="topnav-greeting">
                    <h1 className="topnav-title">Welcome back, <span className="topnav-username">{username}</span></h1>
                    <p className="topnav-subtitle">Here's your financial overview</p>
                </div>
            </div>
            <div className="topnav-right">
                <button className="topnav-icon-btn" aria-label="Notifications">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="topnav-notif-dot" />
                </button>
                <div className="topnav-avatar">
                    {username.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
