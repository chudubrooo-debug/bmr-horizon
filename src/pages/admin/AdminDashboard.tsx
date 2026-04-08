import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { monthlyStats, chartData, projects, announcements } from "@/data/mockData";
import { Users, FolderKanban, CheckCircle, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#8b5cf6"];

const AdminDashboard = () => {
  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Admin Dashboard" subtitle="Overview of BMR operations">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Employees" value={monthlyStats.totalEmployees} icon={Users} trend="12% from last month" trendUp delay={0} />
          <StatCard title="Active Projects" value={monthlyStats.activeProjects} icon={FolderKanban} trend="3 new this quarter" trendUp delay={0.1} />
          <StatCard title="Completed Trials" value={monthlyStats.completedTrials} icon={CheckCircle} trend="2 this month" trendUp delay={0.2} />
          <StatCard title="Revenue" value={`$${(monthlyStats.revenue / 1000000).toFixed(1)}M`} icon={DollarSign} trend="8.5% growth" trendUp delay={0.3} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4">Trial Progress</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData.projectProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="trials" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4">Department Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData.departmentDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                  {chartData.departmentDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> Active Projects
            </h3>
            <div className="space-y-4">
              {projects.filter(p => p.status === "active").map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.phase}</p>
                  </div>
                  <div className="w-24">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full gradient-bg rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">{p.progress}%</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Announcements */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-primary" /> Recent Announcements
            </h3>
            <div className="space-y-4">
              {announcements.map((a) => (
                <div key={a.id} className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${a.priority === "high" ? "bg-destructive" : a.priority === "medium" ? "bg-pharma-green" : "bg-muted-foreground"}`} />
                    <p className="text-sm font-medium text-foreground">{a.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{a.content}</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">{a.date} · {a.author}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminDashboard;
