import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { attendanceRecords } from "@/data/mockData";
import StatCard from "@/components/StatCard";
import { CalendarCheck, UserCheck, Clock, UserX } from "lucide-react";
import { motion } from "framer-motion";

const statusStyles: Record<string, string> = {
  present: "bg-pharma-green/10 text-pharma-green",
  late: "bg-pharma-red/10 text-pharma-red",
  absent: "bg-muted text-muted-foreground",
};

const AdminAttendance = () => {
  const present = attendanceRecords.filter(r => r.status === "present").length;
  const late = attendanceRecords.filter(r => r.status === "late").length;
  const absent = attendanceRecords.filter(r => r.status === "absent").length;

  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Attendance Tracking" subtitle="Daily attendance logs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Records" value={attendanceRecords.length} icon={CalendarCheck} delay={0} />
          <StatCard title="Present" value={present} icon={UserCheck} delay={0.1} />
          <StatCard title="Late" value={late} icon={Clock} delay={0.2} />
          <StatCard title="Absent" value={absent} icon={UserX} delay={0.3} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="text-lg font-semibold font-display text-foreground mb-4">Today's Attendance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Employee</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Check In</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Check Out</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{r.employeeName}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{r.employeeId}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{r.checkIn || "—"}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{r.checkOut || "—"}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[r.status]}`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default AdminAttendance;
