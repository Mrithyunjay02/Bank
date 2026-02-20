import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import Input from '../components/Input';
import Button from '../components/Button';
import { useToast } from '../components/Toast';

const Register = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [form, setForm] = useState({ username: '', email: '', password: '', phone: '' });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setErrors((e) => ({ ...e, [name]: '' }));
        setApiError('');
    };

    const validate = () => {
        const errs = {};
        if (!form.username.trim()) errs.username = 'Username is required.';
        if (!form.email.trim()) errs.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
        if (!form.password) errs.password = 'Password is required.';
        else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        setApiError('');
        try {
            await api.post('/api/auth/register', {
                username: form.username.trim(),
                email: form.email.trim(),
                password: form.password,
                phone: form.phone.trim() || undefined,
            });
            toast('Account created! Please log in.', 'success');
            navigate('/login');
        } catch (err) {
            setApiError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <div className="auth-logo">
                    <div className="logo-icon" aria-hidden="true">🏦</div>
                    <span className="logo-text">SecureBank</span>
                </div>

                <h1 className="auth-heading">Create account</h1>
                <p className="auth-sub">Join thousands banking securely.</p>

                {apiError && (
                    <div className="alert alert-error" role="alert">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {apiError}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <Input
                        label="Username"
                        id="username"
                        name="username"
                        type="text"
                        placeholder="e.g. johndoe"
                        value={form.username}
                        onChange={handleChange}
                        error={errors.username}
                        autoComplete="username"
                        required
                    />
                    <Input
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                        autoComplete="email"
                        required
                    />
                    <Input
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Min. 6 characters"
                        value={form.password}
                        onChange={handleChange}
                        error={errors.password}
                        autoComplete="new-password"
                        required
                    />
                    <Input
                        label="Phone (optional)"
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                    />

                    <Button type="submit" variant="primary" loading={loading} style={{ marginTop: 4 }}>
                        {loading ? 'Creating account…' : 'Create account'}
                    </Button>
                </form>

                <p className="auth-footer">
                    Already have an account?{' '}
                    <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
