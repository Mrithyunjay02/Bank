import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const placeholderData = [
    { month: 'Jan', spending: 1200 },
    { month: 'Feb', spending: 1900 },
    { month: 'Mar', spending: 1500 },
    { month: 'Apr', spending: 2200 },
    { month: 'May', spending: 1800 },
    { month: 'Jun', spending: 2400 },
    { month: 'Jul', spending: 2100 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip">
                <p className="chart-tooltip-label">{label}</p>
                <p className="chart-tooltip-value">${payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

const ChartCard = () => (
    <div className="chart-card">
        <div className="chart-card-header">
            <h3 className="chart-card-title">Spending Overview</h3>
            <span className="chart-card-period">Last 7 months</span>
        </div>
        <div className="chart-card-body">
            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={placeholderData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                        <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                        dataKey="month"
                        stroke="rgba(255,255,255,0.3)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        stroke="rgba(255,255,255,0.3)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="spending"
                        stroke="#818cf8"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#818cf8', strokeWidth: 2, stroke: '#1e1b4b' }}
                        activeDot={{ r: 6, fill: '#a78bfa', stroke: '#1e1b4b', strokeWidth: 2 }}
                        fillOpacity={1}
                        fill="url(#lineGlow)"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default ChartCard;
