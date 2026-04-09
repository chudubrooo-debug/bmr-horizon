import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/contexts/AuthContext";
import { projects, announcements } from "@/data/mockData";
import { FolderKanban, CalendarCheck, Bell, ClipboardList, Shield, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const myProjects = projects.filter(p => p.assignees.includes("2"));

  const complianceChecklist = [
    { task: "GCP Training Certificate — Updated", done: true },
    { task: "Protocol Amendment Review — CT-401", done: true },
    { task: "Safety Report Submission — NR-220", done: false },
    { task: "Ethics Committee Documentation", done: false },
    { task: "CRF Completion — Oncology Study", done: true },
  ];

  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title={`Welcome, ${user?.name?.split(" ")[0]}`} subtitle="Clinical Operations Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard title="My Trials" value={myProjects.length} icon={FolderKanban} delay={0} />
          <StatCard title="Attendance" value="96.2%" icon={CalendarCheck} trend="On track" trendUp delay={0.1} />
          <StatCard title="Compliance" value="98%" icon={Shield} trend="All audits passed" trendUp delay={0.2} />
          <StatCard title="Notifications" value={announcements.length} icon={Bell} delay={0.3} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Projects */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4">Assigned Clinical Trials</h3>
            <div className="space-y-4">
              {myProjects.map(p => (
                <div key={p.id} className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground">{p.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${p.status === "active" ? "bg-pharma-green/10 text-pharma-green" : p.status === "completed" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{p.status}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-primary font-medium">{p.phase}</span>
                    {p.therapeutic && <span className="text-xs text-muted-foreground">· {p.therapeutic}</span>}
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full gradient-bg rounded-full" style={{ width: `${p.progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{p.progress}% complete</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Compliance Checklist */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold font-display text-foreground mb-4">Compliance Checklist</h3>
            <div className="space-y-3">
              {complianceChecklist.map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${item.done ? "bg-pharma-green/5" : "bg-destructive/5"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "gradient-bg" : "border-2 border-muted-foreground/30"}`}>
                    {item.done && <span className="text-primary-foreground text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${item.done ? "text-foreground" : "text-muted-foreground"}`}>{item.task}</span>
                  <span className={`ml-auto text-xs font-medium ${item.done ? "text-pharma-green" : "text-destructive"}`}>
                    {item.done ? "Complete" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Activity Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6 mt-6">
          <h3 className="text-lg font-semibold font-display text-foreground mb-4">Recent Activity</h3>
          <div className="grid md:grid-cols-2 gap-x-8">
            <div className="space-y-4">
              {[
                { time: "9:00 AM", action: "Checked in — Aster Prime Hospital site", type: "attendance" },
                { time: "10:30 AM", action: "Submitted patient enrollment data for CT-401", type: "update" },
                { time: "2:00 PM", action: "GCP compliance review meeting — Q2", type: "meeting" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full gradient-bg" />
                    {i < 2 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { time: "3:30 PM", action: "Uploaded safety report for Pulmonology NR-220", type: "document" },
                { time: "4:15 PM", action: "Updated recruitment tracker — 3 new patients screened", type: "recruitment" },
                { time: "5:00 PM", action: "Completed daily CRF entries for Oncology study", type: "data" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full gradient-bg" />
                    {i < 2 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Announcements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6 mt-6">
          <h3 className="text-lg font-semibold font-display text-foreground mb-4">Announcements</h3>
          <div className="space-y-3">
            {announcements.map(a => (
              <div key={a.id} className="p-3 rounded-lg bg-secondary/50 flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.priority === "high" ? "bg-destructive" : a.priority === "medium" ? "bg-pharma-green" : "bg-muted-foreground"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.content}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default EmployeeDashboard;
