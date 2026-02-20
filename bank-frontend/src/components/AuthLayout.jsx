import AnimatedBackground from './AnimatedBackground';

const AuthLayout = ({ children }) => (
    <div className="auth-page">
        <AnimatedBackground />
        <div className="auth-page-content">
            <div className="auth-card-v2">
                <div className="auth-card-glow" />
                {children}
            </div>
        </div>
    </div>
);

export default AuthLayout;
