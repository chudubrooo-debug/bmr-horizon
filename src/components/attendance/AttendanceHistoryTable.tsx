import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, AlertTriangle, ScanFace, MapPin, Filter, Search } from "lucide-react";
import type { AttendanceEntry, AttendanceStatus } from "@/data/attendanceData";

interface AttendanceHistoryTableProps {
  records: AttendanceEntry[];
  showEmployee?: boolean;
}

const statusConfig: Record<AttendanceStatus, { icon: typeof CheckCircle; color: string; bg: string }> = {
  present: { icon: CheckCircle, color: "text-pharma-green", bg: "bg-pharma-green/10" },
  late: { icon: Clock, color: "text-pharma-red", bg: "bg-pharma-red/10" },
  "half-day": { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  absent: { icon: XCircle, color: "text-muted-foreground", bg: "bg-muted" },
};

const AttendanceHistoryTable = ({ records, showEmployee = true }: AttendanceHistoryTableProps) => {
  const [filterStatus, setFilterStatus] = useState<AttendanceStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = records.filter((r) => {
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    if (search && !r.employeeName.toLowerCase().includes(search.toLowerCase()) && !r.employeeId.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statuses: (AttendanceStatus | "all")[] = ["all", "present", "late", "half-day", "absent"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-4"
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-muted-foreground" />
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                filterStatus === s
                  ? "gradient-bg text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {showEmployee && (
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 w-52"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {showEmployee && <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-3">Employee</th>}
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-3">Date</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-3">Check In</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-3">Check Out</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-3">Hospital</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-3">Verification</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const cfg = statusConfig[r.status];
              const Icon = cfg.icon;
              return (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                >
                  {showEmployee && (
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {r.employeeName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{r.employeeName}</p>
                          <p className="text-xs text-muted-foreground font-mono">{r.employeeId}</p>
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="py-3 px-3 text-sm text-foreground">{r.date}</td>
                  <td className="py-3 px-3 text-sm font-mono text-foreground">{r.checkIn || "—"}</td>
                  <td className="py-3 px-3 text-sm font-mono text-muted-foreground">{r.checkOut || "—"}</td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">{r.hospitalName}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <ScanFace size={14} className={r.faceVerified ? "text-pharma-green" : "text-muted-foreground/30"} />
                      <MapPin size={14} className={r.locationVerified ? "text-pharma-green" : "text-muted-foreground/30"} />
                      {r.livenessScore > 0 && (
                        <span className="text-[10px] font-mono text-muted-foreground">{(r.livenessScore * 100).toFixed(0)}%</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${cfg.bg} ${cfg.color}`}>
                      <Icon size={12} />
                      {r.status}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground text-sm">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-muted-foreground text-right">
        Showing {filtered.length} of {records.length} records
      </div>
    </motion.div>
  );
};

export default AttendanceHistoryTable;
