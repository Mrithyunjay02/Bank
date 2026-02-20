import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { setToken } from '../utils/auth';
import { useToast } from '../components/Toast';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import GradientButton from '../components/GradientButton';

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
        setErrors((prev) => ({ ...prev, [name]: '' }));
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
            setToken(res.data.token);
            toast('Welcome back!', 'success');
            navigate('/dashboard');
        } catch (err) {
            setApiError(err.response?.data?.error || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="auth-brand">
                <div className="auth-brand-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="14" rx="2" />
                        <path d="M2 10h20" /><path d="M6 14h.01" /><path d="M10 14h4" />
                    </svg>
                </div>
                <span className="auth-brand-name">SecureBank</span>
            </div>

            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to your account to continue.</p>

            {apiError && (
                <div className="auth-alert" role="alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{apiError}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="auth-form">
                <InputField
                    label="Email"
                    id="login-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                    required
                    delay={100}
                />
                <InputField
                    label="Password"
                    id="login-password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                    autoComplete="current-password"
                    required
                    delay={200}
                />

                <GradientButton type="submit" loading={loading}>
                    {loading ? 'Signing in…' : 'Sign in'}
                </GradientButton>
            </form>

            <p className="auth-switch">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="auth-switch-link">Create one</Link>
            </p>
        </AuthLayout>
    );
};

export default Login;
