import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { projects } from "@/data/mockData";
import { motion } from "framer-motion";

const EmployeeProjects = () => {
  const myProjects = projects.filter(p => p.assignees.includes("2"));

  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="My Projects" subtitle="Clinical research assignments">
        <div className="space-y-6">
          {myProjects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold font-display text-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${p.status === "active" ? "bg-pharma-green/10 text-pharma-green" : "bg-primary/10 text-primary"}`}>{p.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div><span className="text-muted-foreground">Phase:</span> <span className="font-medium text-foreground">{p.phase}</span></div>
                <div><span className="text-muted-foreground">Start:</span> <span className="font-medium text-foreground">{p.startDate}</span></div>
                <div><span className="text-muted-foreground">End:</span> <span className="font-medium text-foreground">{p.endDate}</span></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-bold text-foreground">{p.progress}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full gradient-bg rounded-full transition-all" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
};

export default EmployeeProjects;
