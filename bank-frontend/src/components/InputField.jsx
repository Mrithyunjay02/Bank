import { useState } from 'react';

const EyeIcon = () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const InputField = ({
    label,
    id,
    type = 'text',
    error,
    className = '',
    delay = 0,
    ...props
}) => {
    const [showPw, setShowPw] = useState(false);
    const [focused, setFocused] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPw ? 'text' : 'password') : type;

    return (
        <div
            className={`ifield ${focused ? 'ifield--focused' : ''} ${error ? 'ifield--error' : ''} ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="ifield-inner">
                <input
                    id={id}
                    type={inputType}
                    className={`ifield-input ${props.value ? 'ifield-input--filled' : ''}`}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder=" "
                    {...props}
                />
                {label && <label htmlFor={id} className="ifield-label">{label}</label>}
                {isPassword && (
                    <button
                        type="button"
                        className="ifield-toggle"
                        onClick={() => setShowPw((v) => !v)}
                        tabIndex={-1}
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                    >
                        {showPw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                )}
                <div className="ifield-border" />
            </div>
            {error && (
                <span className="ifield-error" role="alert">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                </span>
            )}
        </div>
    );
};

export default InputField;
