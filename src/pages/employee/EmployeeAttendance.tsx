import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, CheckCircle, AlertTriangle, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AttendanceCheckInFlow from "@/components/attendance/AttendanceCheckInFlow";
import AttendanceHistoryTable from "@/components/attendance/AttendanceHistoryTable";
import StatCard from "@/components/StatCard";
import { mockAttendanceHistory } from "@/data/attendanceData";

const EmployeeAttendance = () => {
  const { user } = useAuth();
  const empId = user?.employeeId || "BMR-132";
  const empName = user?.name || "Employee";

  const myRecords = mockAttendanceHistory.filter((r) => r.employeeId === empId);
  const todayRecord = myRecords.find((r) => r.date === new Date().toISOString().slice(0, 10));

  const [hasCheckedIn, setHasCheckedIn] = useState(!!todayRecord?.checkIn);
  const [checkedOut, setCheckedOut] = useState(!!todayRecord?.checkOut);
  const [localRecords, setLocalRecords] = useState(myRecords);

  const totalDays = localRecords.length;
  const presentDays = localRecords.filter((r) => r.status === "present").length;
  const lateDays = localRecords.filter((r) => r.status === "late").length;
  const attendanceRate = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : "0";

  const handleComplete = (action: "checkin" | "checkout", data: any) => {
    if (action === "checkin") {
      setHasCheckedIn(true);
      setLocalRecords((prev) => [
        {
          id: `local-${Date.now()}`,
          employeeId: empId,
          employeeName: empName,
          date: new Date().toISOString().slice(0, 10),
          checkIn: data.time,
          checkOut: null,
          checkInLocation: data.coords,
          checkOutLocation: null,
          hospitalId: data.hospitalId,
          hospitalName: data.hospitalName,
          deviceId: data.deviceId,
          status: data.status,
          faceVerified: true,
          locationVerified: true,
          livenessScore: data.livenessScore,
        },
        ...prev,
      ]);
    } else {
      setCheckedOut(true);
      setLocalRecords((prev) =>
        prev.map((r) =>
          r.employeeId === empId && r.date === new Date().toISOString().slice(0, 10) && !r.checkOut
            ? { ...r, checkOut: data.time, checkOutLocation: data.coords }
            : r
        )
      );
    }
  };

  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="My Attendance" subtitle="Secure biometric & GPS-verified attendance">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Days" value={totalDays} icon={CalendarCheck} delay={0} />
          <StatCard title="Present" value={presentDays} icon={CheckCircle} delay={0.1} />
          <StatCard title="Late Arrivals" value={lateDays} icon={Clock} delay={0.2} />
          <StatCard title="Attendance Rate" value={`${attendanceRate}%`} icon={Shield} delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Check-in / Check-out flow */}
          <div>
            <AttendanceCheckInFlow
              employeeName={empName}
              employeeId={empId}
              hasCheckedIn={hasCheckedIn && !checkedOut}
              onComplete={handleComplete}
            />
          </div>

          {/* Today's status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 space-y-4"
          >
            <h3 className="font-semibold font-display text-foreground flex items-center gap-2">
              <CalendarCheck size={18} className="text-primary" />
              Today's Status
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Check-In</span>
                <span className="text-sm font-mono font-medium text-foreground">
                  {hasCheckedIn ? (localRecords[0]?.checkIn || "Recorded") : "Not yet"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Check-Out</span>
                <span className="text-sm font-mono font-medium text-foreground">
                  {checkedOut ? (localRecords[0]?.checkOut || "Recorded") : "Pending"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className={`text-sm font-medium capitalize ${
                  hasCheckedIn ? "text-pharma-green" : "text-muted-foreground"
                }`}>
                  {hasCheckedIn ? (localRecords[0]?.status || "Present") : "Awaiting"}
                </span>
              </div>
            </div>

            {/* Security info */}
            <div className="pt-4 border-t border-border space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Security Verification</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Face ID", verified: hasCheckedIn },
                  { label: "Liveness", verified: hasCheckedIn },
                  { label: "GPS Lock", verified: hasCheckedIn },
                  { label: "Anti-Spoof", verified: hasCheckedIn },
                ].map((v) => (
                  <div key={v.label} className="flex items-center gap-2 text-xs">
                    {v.verified ? (
                      <CheckCircle size={12} className="text-pharma-green" />
                    ) : (
                      <AlertTriangle size={12} className="text-muted-foreground/40" />
                    )}
                    <span className={v.verified ? "text-foreground" : "text-muted-foreground"}>{v.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* History */}
        <h3 className="text-lg font-semibold font-display text-foreground mb-4">Attendance History</h3>
        <AttendanceHistoryTable records={localRecords} showEmployee={false} />
      </DashboardLayout>
    </>
  );
};

export default EmployeeAttendance;
