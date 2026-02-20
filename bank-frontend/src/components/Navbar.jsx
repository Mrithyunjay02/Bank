import { useNavigate } from 'react-router-dom';

const LogoutIcon = () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const Navbar = ({ username }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div className="navbar-brand">
                <div className="brand-icon" aria-hidden="true">🏦</div>
                <span className="brand-name">SecureBank</span>
            </div>
            <div className="navbar-right">
                {username && (
                    <span className="navbar-user">
                        {username}
                    </span>
                )}
                <button className="btn-logout" onClick={handleLogout} aria-label="Logout">
                    <LogoutIcon />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
