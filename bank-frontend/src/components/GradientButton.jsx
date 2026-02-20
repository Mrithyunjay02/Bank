const GradientButton = ({ children, loading = false, className = '', ...props }) => (
    <button
        className={`gbtn ${loading ? 'gbtn--loading' : ''} ${className}`}
        disabled={loading || props.disabled}
        {...props}
    >
        <span className="gbtn-bg" />
        <span className="gbtn-content">
            {loading && (
                <span className="gbtn-spinner" aria-hidden="true" />
            )}
            <span>{children}</span>
        </span>
    </button>
);

export default GradientButton;
