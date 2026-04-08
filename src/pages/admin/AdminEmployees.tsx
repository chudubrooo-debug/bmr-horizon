import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { employees } from "@/data/mockData";
import { motion } from "framer-motion";
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const AdminEmployees = () => {
  const [search, setSearch] = useState("");
  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Employee Management" subtitle="Manage your research team">
        <div className="glass-card p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" placeholder="Search employees..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button className="gradient-bg text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all">
              <Plus size={16} /> Add Employee
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Employee</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Department</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Role</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp, i) => (
                  <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-sm font-bold">{emp.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{emp.employeeId}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{emp.department}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{emp.role}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${emp.status === "active" ? "bg-pharma-green/10 text-pharma-green" : "bg-muted text-muted-foreground"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "active" ? "bg-pharma-green" : "bg-muted-foreground"}`} />
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"><Edit size={14} /></button>
                        <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminEmployees;
