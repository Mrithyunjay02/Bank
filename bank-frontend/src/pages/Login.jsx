import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import Input from '../components/Input';
import Button from '../components/Button';
import { useToast } from '../components/Toast';

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [form, setForm] = useState({ email: '', password: '' });
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
        if (!form.email.trim()) errs.email = 'Email is required.';
        if (!form.password) errs.password = 'Password is required.';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        setApiError('');
        try {
            const res = await api.post('/api/auth/login', {
                email: form.email.trim(),
                password: form.password,
            });
            localStorage.setItem('token', res.data.token);
            toast('Welcome back!', 'success');
            navigate('/dashboard');
        } catch (err) {
            setApiError(err.response?.data?.error || 'Login failed. Check your credentials.');
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

                <h1 className="auth-heading">Welcome back</h1>
                <p className="auth-sub">Sign in to your account.</p>

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
                        placeholder="Your password"
                        value={form.password}
                        onChange={handleChange}
                        error={errors.password}
                        autoComplete="current-password"
                        required
                    />

                    <Button type="submit" variant="primary" loading={loading} style={{ marginTop: 4 }}>
                        {loading ? 'Signing in…' : 'Sign in'}
                    </Button>
                </form>

                <p className="auth-footer">
                    Don&apos;t have an account?{' '}
                    <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
