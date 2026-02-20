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
    <div className="skel-dashboard">
        <div className="skeleton skel-balance" />
        <div className="skel-stats-row">
            <div className="skeleton skel-stat" />
            <div className="skeleton skel-stat" />
            <div className="skeleton skel-stat" />
            <div className="skeleton skel-stat" />
        </div>
        <div className="skel-bottom-row">
            <div className="skeleton skel-chart" />
            <div className="skeleton skel-txn" />
        </div>
    </div>
);

export default Loader;
