const Loader = ({ fullPage = false }) => {
    if (fullPage) {
        return (
            <div className="loader-full" role="status" aria-label="Loading">
                <div className="spinner" />
            </div>
        );
    }
    return <div className="spinner" role="status" aria-label="Loading" />;
};

export const SkeletonDashboard = () => (
    <div style={{ padding: '40px 24px', maxWidth: 860, margin: '0 auto' }}>
        <div className="skeleton skel-balance" />
        <div className="skeleton skel-card" />
    </div>
);

export default Loader;
