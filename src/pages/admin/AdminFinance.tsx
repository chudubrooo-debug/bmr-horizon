import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { DollarSign, TrendingUp, CreditCard, PiggyBank } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const revenueData = [
  { month: "Jan", revenue: 380000, expenses: 220000 },
  { month: "Feb", revenue: 420000, expenses: 250000 },
  { month: "Mar", revenue: 450000, expenses: 230000 },
  { month: "Apr", revenue: 500000, expenses: 260000 },
  { month: "May", revenue: 520000, expenses: 240000 },
  { month: "Jun", revenue: 580000, expenses: 270000 },
];

const AdminFinance = () => {
  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Financial Overview" subtitle="Revenue and expense analytics">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value="$2.85M" icon={DollarSign} trend="12% growth" trendUp delay={0} />
          <StatCard title="Net Profit" value="$1.38M" icon={TrendingUp} trend="8.5% margin" trendUp delay={0.1} />
          <StatCard title="Expenses" value="$1.47M" icon={CreditCard} trend="3% reduced" trendUp delay={0.2} />
          <StatCard title="Budget Left" value="$540K" icon={PiggyBank} trend="Q2 allocation" delay={0.3} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="text-lg font-semibold font-display text-foreground mb-4">Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(211, 80%, 42%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(211, 80%, 42%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(170, 70%, 45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(170, 70%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`$${(v / 1000).toFixed(0)}K`]} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(211, 80%, 42%)" fill="url(#revGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="hsl(170, 70%, 45%)" fill="url(#expGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default AdminFinance;
