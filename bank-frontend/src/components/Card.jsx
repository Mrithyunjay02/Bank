const Card = ({ children, className = '', ...props }) => (
    <div className={`profile-card ${className}`} {...props}>
        {children}
    </div>
);

export default Card;
