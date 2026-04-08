import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";

const updates = [
  { id: "1", date: "2026-04-08", content: "Completed patient enrollment for CT-401 cohort 3. All vitals recorded.", status: "submitted" },
  { id: "2", date: "2026-04-07", content: "Reviewed safety data from week 12. No adverse events reported.", status: "submitted" },
  { id: "3", date: "2026-04-06", content: "Prepared interim analysis report for regulatory submission.", status: "reviewed" },
];

const EmployeeUpdates = () => {
  const [newUpdate, setNewUpdate] = useState("");

  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Work Updates" subtitle="Submit daily progress reports">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
          <h3 className="text-lg font-semibold font-display text-foreground mb-4">Submit Update</h3>
          <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition resize-none mb-4" placeholder="What did you work on today?" value={newUpdate} onChange={(e) => setNewUpdate(e.target.value)} />
          <button className="gradient-bg text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all">
            <Send size={16} /> Submit Update
          </button>
        </motion.div>

        <div className="space-y-4">
          {updates.map((u, i) => (
            <motion.div key={u.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">{u.date}</p>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${u.status === "reviewed" ? "bg-pharma-green/10 text-pharma-green" : "bg-primary/10 text-primary"}`}>{u.status}</span>
              </div>
              <p className="text-sm text-muted-foreground">{u.content}</p>
            </motion.div>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
};

export default EmployeeUpdates;
