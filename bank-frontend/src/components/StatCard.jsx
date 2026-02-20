const StatCard = ({ icon, label, value, trend, trendUp }) => (
    <div className="stat-card">
        <div className="stat-card-icon">{icon}</div>
        <div className="stat-card-body">
            <p className="stat-card-label">{label}</p>
            <p className="stat-card-value">{value}</p>
            {trend && (
                <p className={`stat-card-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {trendUp
                            ? <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            : <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                        }
                    </svg>
                    {trend}
                </p>
            )}
        </div>
    </div>
);

export default StatCard;
