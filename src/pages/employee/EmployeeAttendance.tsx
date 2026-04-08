import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";

const records = [
  { date: "2026-04-08", checkIn: "08:45", checkOut: "—", status: "present" },
  { date: "2026-04-07", checkIn: "08:30", checkOut: "17:15", status: "present" },
  { date: "2026-04-06", checkIn: "09:10", checkOut: "17:45", status: "late" },
  { date: "2026-04-05", checkIn: "08:50", checkOut: "17:00", status: "present" },
  { date: "2026-04-04", checkIn: "08:35", checkOut: "17:20", status: "present" },
];

const EmployeeAttendance = () => {
  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="My Attendance" subtitle="Track your daily attendance">
        <div className="flex gap-4 mb-8">
          <button className="gradient-bg text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-all">
            <CheckCircle size={18} /> Mark Attendance
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="text-lg font-semibold font-display text-foreground mb-4">Recent Records</h3>
          <div className="space-y-3">
            {records.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.status === "present" ? "bg-pharma-green/10" : "bg-pharma-red/10"}`}>
                    {r.status === "present" ? <CheckCircle size={16} className="text-pharma-green" /> : <Clock size={16} className="text-pharma-red" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.date}</p>
                    <p className="text-xs text-muted-foreground capitalize">{r.status}</p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="text-foreground">In: {r.checkIn}</p>
                  <p className="text-muted-foreground">Out: {r.checkOut}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default EmployeeAttendance;
