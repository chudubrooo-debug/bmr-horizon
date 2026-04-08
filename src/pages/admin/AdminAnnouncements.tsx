import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { announcements } from "@/data/mockData";
import { motion } from "framer-motion";
import { Plus, Megaphone } from "lucide-react";

const priorityStyles: Record<string, string> = {
  high: "border-l-destructive",
  medium: "border-l-pharma-green",
  low: "border-l-muted-foreground",
};

const AdminAnnouncements = () => {
  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Announcements" subtitle="Company-wide communications">
        <div className="flex justify-end mb-6">
          <button className="gradient-bg text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all">
            <Plus size={16} /> New Announcement
          </button>
        </div>
        <div className="space-y-4">
          {announcements.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card p-6 border-l-4 ${priorityStyles[a.priority]}`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                  <Megaphone size={18} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-foreground">{a.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${a.priority === "high" ? "bg-destructive/10 text-destructive" : a.priority === "medium" ? "bg-pharma-green/10 text-pharma-green" : "bg-muted text-muted-foreground"}`}>{a.priority}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{a.content}</p>
                  <p className="text-xs text-muted-foreground/60">{a.date} · {a.author}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminAnnouncements;
