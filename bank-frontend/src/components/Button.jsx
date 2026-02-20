const Button = ({ children, variant = 'primary', loading = false, className = '', ...props }) => {
    const cls = variant === 'primary' ? 'btn btn-primary' : 'btn btn-ghost';
    return (
        <button className={`${cls} ${className}`} disabled={loading || props.disabled} {...props}>
            {loading && (
                <span className="spinner spinner-sm" style={{ borderTopColor: '#fff' }} aria-hidden="true" />
            )}
            {children}
        </button>
    );
};

export default Button;
