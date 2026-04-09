import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { monthlyStats, chartData, projects, announcements } from "@/data/mockData";
import { Users, FolderKanban, CheckCircle, Shield, TrendingUp, AlertCircle, Activity, UserCheck, Building2, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["hsl(211,80%,42%)", "hsl(185,100%,40%)", "hsl(145,60%,45%)", "hsl(35,90%,55%)", "hsl(270,60%,55%)", "hsl(0,70%,55%)"];

const AdminDashboard = () => {
  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Admin Dashboard" subtitle="BMR-SMO Clinical Operations Overview">
        {/* Stats Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <StatCard title="Active Trials" value={monthlyStats.activeProjects} icon={FolderKanban} trend="3 new this quarter" trendUp delay={0} />
          <StatCard title="Recruitment Rate" value={`${monthlyStats.recruitmentRate}%`} icon={UserCheck} trend="8% improvement" trendUp delay={0.1} />
          <StatCard title="Compliance Score" value={`${monthlyStats.complianceScore}%`} icon={Shield} trend="100% inspections passed" trendUp delay={0.2} />
          <StatCard title="Total Staff" value={monthlyStats.totalEmployees} icon={Users} trend="6 active sites" trendUp delay={0.3} />
        </div>

        {/* Stats Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Sites" value={monthlyStats.activeSites} icon={Building2} delay={0.4} />
          <StatCard title="Hospital Beds" value={`${(monthlyStats.totalBeds / 1000).toFixed(1)}K+`} icon={Activity} delay={0.5} />
          <StatCard title="Completed Trials" value={monthlyStats.completedTrials} icon={CheckCircle} trend="2 this month" trendUp delay={0.6} />
          <StatCard title="Pending Reviews" value={monthlyStats.pendingReviews} icon={Target} delay={0.7} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Recruitment Trend */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4">Patient Recruitment Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData.recruitmentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="target" stroke="hsl(var(--border))" fill="hsl(var(--muted))" strokeDasharray="5 5" name="Target" />
                <Area type="monotone" dataKey="actual" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Phase Distribution */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4">Trial Phase Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData.phaseDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                  {chartData.phaseDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Trial Progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4">Trial Progress Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData.projectProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="trials" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Active Trials" />
                <Bar dataKey="completed" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Compliance Metrics */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4">Compliance Metrics</h3>
            <div className="space-y-5 mt-2">
              {chartData.complianceMetrics.map((m) => (
                <div key={m.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{m.name}</span>
                    <span className="text-sm font-bold text-pharma-green">{m.score}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${m.score}%` }} transition={{ delay: 0.8, duration: 1 }} className="h-full gradient-bg rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Active Projects */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> Active Clinical Trials
            </h3>
            <div className="space-y-4">
              {projects.filter(p => p.status === "active").map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-primary font-medium">{p.phase}</span>
                      {p.therapeutic && <span className="text-xs text-muted-foreground">· {p.therapeutic}</span>}
                    </div>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-primary" /> Recent Announcements
            </h3>
            <div className="space-y-4">
              {announcements.slice(0, 4).map((a) => (
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
