import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { projects, employees } from "@/data/mockData";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  active: "bg-pharma-green/10 text-pharma-green",
  completed: "bg-primary/10 text-primary",
  "on-hold": "bg-pharma-red/10 text-pharma-red",
};

const AdminProjects = () => {
  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Project Management" subtitle="Track clinical research projects">
        <div className="grid gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold font-display text-foreground">{p.name}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[p.status]}`}>{p.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>Phase: <strong className="text-foreground">{p.phase}</strong></span>
                    <span>Start: {p.startDate}</span>
                    <span>End: {p.endDate}</span>
                  </div>
                </div>
                <div className="w-full sm:w-48">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-sm font-bold text-foreground">{p.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full gradient-bg rounded-full transition-all" style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="flex -space-x-2 mt-3">
                    {p.assignees.map(id => {
                      const emp = employees.find(e => e.id === id);
                      return emp ? (
                        <div key={id} className="w-7 h-7 rounded-full gradient-bg border-2 border-card flex items-center justify-center text-primary-foreground text-xs font-bold" title={emp.name}>
                          {emp.name.charAt(0)}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminProjects;
