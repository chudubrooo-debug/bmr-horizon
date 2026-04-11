import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { CalendarCheck, UserCheck, Clock, UserX, AlertTriangle, ScanFace, MapPin, ShieldCheck } from "lucide-react";
import StatCard from "@/components/StatCard";
import AttendanceHistoryTable from "@/components/attendance/AttendanceHistoryTable";
import { mockAttendanceHistory, hospitalLocations } from "@/data/attendanceData";

const AdminAttendance = () => {
  const records = mockAttendanceHistory;
  const todayRecords = records.filter((r) => r.date === "2026-04-11");

  const present = todayRecords.filter((r) => r.status === "present").length;
  const late = todayRecords.filter((r) => r.status === "late").length;
  const absent = todayRecords.filter((r) => r.status === "absent").length;
  const halfDay = todayRecords.filter((r) => r.status === "half-day").length;

  const faceVerified = todayRecords.filter((r) => r.faceVerified).length;
  const locationVerified = todayRecords.filter((r) => r.locationVerified).length;

  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Attendance Management" subtitle="Secure biometric & GPS-verified tracking">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Present Today" value={present} icon={UserCheck} delay={0} />
          <StatCard title="Late Arrivals" value={late} icon={Clock} delay={0.1} />
          <StatCard title="Half Day" value={halfDay} icon={AlertTriangle} delay={0.2} />
          <StatCard title="Absent" value={absent} icon={UserX} delay={0.3} />
        </div>

        {/* Security & Hospital panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Security Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold font-display text-foreground flex items-center gap-2 mb-4">
              <ShieldCheck size={18} className="text-accent" />
              Security Controls
            </h3>
            <div className="space-y-3">
              {[
                { label: "Face Recognition", desc: "TensorFlow.js liveness detection", icon: ScanFace, active: true },
                { label: "GPS Geofencing", desc: `${hospitalLocations.length} hospitals • 100-150m radius`, icon: MapPin, active: true },
                { label: "Anti-Spoofing", desc: "Photo/video replay prevention", icon: ShieldCheck, active: true },
                { label: "Device Fingerprint", desc: "Browser-based device tracking", icon: CalendarCheck, active: true },
              ].map((ctrl) => (
                <div key={ctrl.label} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <ctrl.icon size={16} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{ctrl.label}</p>
                    <p className="text-xs text-muted-foreground">{ctrl.desc}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${ctrl.active ? "bg-pharma-green" : "bg-muted-foreground"}`} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Verification Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold font-display text-foreground mb-4">Today's Verification</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground flex items-center gap-1.5"><ScanFace size={14} /> Face Verified</span>
                  <span className="font-medium text-foreground">{faceVerified}/{todayRecords.length}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${todayRecords.length > 0 ? (faceVerified / todayRecords.length) * 100 : 0}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="h-full rounded-full gradient-bg"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground flex items-center gap-1.5"><MapPin size={14} /> Location Verified</span>
                  <span className="font-medium text-foreground">{locationVerified}/{todayRecords.length}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${todayRecords.length > 0 ? (locationVerified / todayRecords.length) * 100 : 0}%` }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="h-full rounded-full bg-accent"
                  />
                </div>
              </div>

              {/* Hospital breakdown */}
              <div className="pt-4 border-t border-border">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Hospital Distribution</h4>
                <div className="space-y-2">
                  {hospitalLocations.map((h) => {
                    const count = todayRecords.filter((r) => r.hospitalId === h.id).length;
                    return (
                      <div key={h.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground truncate mr-2">{h.name}</span>
                        <span className="font-mono text-foreground font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full attendance log */}
        <h3 className="text-lg font-semibold font-display text-foreground mb-4">All Attendance Records</h3>
        <AttendanceHistoryTable records={records} showEmployee />
      </DashboardLayout>
    </>
  );
};

export default AdminAttendance;
