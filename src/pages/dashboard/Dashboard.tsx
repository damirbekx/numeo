import { Card, Spin } from 'antd';
import {
  Activity,
  Users as UsersIcon
} from 'lucide-react';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { StatCard } from './components/StatCard';
import { useAnalytics } from './hooks/useAnalytics';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard: React.FC = () => {
  const { data, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const { total_users, active_users, average_age, top_countries, top_occupations } = data || {};

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitoring platform performance and user engagement in real-time.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Users"
          value={total_users?.toLocaleString() || '0'}
          icon={<UsersIcon size={24} />}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Users"
          value={active_users?.toLocaleString() || '0'}
          icon={<Activity size={24} />}
          color="bg-emerald-500"
        />
        <StatCard
          title="Average Age"
          value={average_age?.toString() || '0'}
          icon={<UsersIcon size={24} />}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title={<span className="font-['Outfit'] font-bold text-lg text-slate-700">Top Countries</span>} className="transition-all duration-300 rounded-2xl! border-none overflow-hidden h-full">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={top_countries || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={110}
                  innerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="country"
                  stroke="none"
                >
                  {(top_countries || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="stroke-white stroke-2" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)',
                    padding: '12px 20px'
                  }}
                  itemStyle={{ fontWeight: 600, color: '#475569' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={<span className="font-['Outfit'] font-bold text-lg text-slate-700">Top Occupations</span>} className="transition-all duration-300 rounded-2xl! border-none overflow-hidden h-full">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={top_occupations || []}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis
                  dataKey="occupation"
                  type="category"
                  width={140}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc', radius: 4 }}
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)',
                    padding: '12px 20px'
                  }}
                  itemStyle={{ fontWeight: 600, color: '#475569' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Bar dataKey="count" radius={[0, 10, 10, 0]}>
                  {(top_occupations || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
