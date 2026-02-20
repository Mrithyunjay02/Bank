import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { useToast } from '../components/Toast';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import GradientButton from '../components/GradientButton';

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
        setErrors((prev) => ({ ...prev, [name]: '' }));
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

            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">Join thousands banking securely.</p>

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
                    label="Username"
                    id="reg-username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    error={errors.username}
                    autoComplete="username"
                    required
                    delay={100}
                />
                <InputField
                    label="Email"
                    id="reg-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                    required
                    delay={150}
                />
                <InputField
                    label="Password"
                    id="reg-password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                    autoComplete="new-password"
                    required
                    delay={200}
                />
                <InputField
                    label="Phone (optional)"
                    id="reg-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    delay={250}
                />

                <GradientButton type="submit" loading={loading}>
                    {loading ? 'Creating account…' : 'Create account'}
                </GradientButton>
            </form>

            <p className="auth-switch">
                Already have an account?{' '}
                <Link to="/login" className="auth-switch-link">Sign in</Link>
            </p>
        </AuthLayout>
    );
};

export default Register;
