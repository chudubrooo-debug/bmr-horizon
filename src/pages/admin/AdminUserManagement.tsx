import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { employees } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Edit, Trash2, Shield, UserCheck, UserX, Key,
  ChevronDown, X, Save, AlertTriangle, CheckCircle, Lock
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type Permission = "view_dashboard" | "manage_employees" | "manage_trials" | "manage_attendance" | "manage_finance" | "manage_announcements" | "manage_id_cards" | "view_reports" | "export_data" | "manage_roles";

const ALL_PERMISSIONS: { key: Permission; label: string; description: string }[] = [
  { key: "view_dashboard", label: "View Dashboard", description: "Access main dashboard overview" },
  { key: "manage_employees", label: "Manage Employees", description: "Create, edit, deactivate employee profiles" },
  { key: "manage_trials", label: "Manage Clinical Trials", description: "Create and manage trial projects" },
  { key: "manage_attendance", label: "Manage Attendance", description: "View and manage attendance records" },
  { key: "manage_finance", label: "Manage Finance", description: "Access financial data and reports" },
  { key: "manage_announcements", label: "Manage Announcements", description: "Create and publish announcements" },
  { key: "manage_id_cards", label: "Manage ID Cards", description: "Issue and manage employee ID cards" },
  { key: "view_reports", label: "View Reports", description: "Access analytical reports" },
  { key: "export_data", label: "Export Data", description: "Export data to CSV/PDF" },
  { key: "manage_roles", label: "Manage Roles", description: "Assign roles and permissions" },
];

const ROLE_PRESETS: Record<string, Permission[]> = {
  admin: ALL_PERMISSIONS.map(p => p.key),
  manager: ["view_dashboard", "manage_employees", "manage_trials", "manage_attendance", "manage_announcements", "view_reports"],
  employee: ["view_dashboard", "manage_attendance", "view_reports"],
  intern: ["view_dashboard"],
};

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  employeeId: string;
  status: "active" | "inactive" | "suspended";
  permissions: Permission[];
  mfaEnabled: boolean;
  lastLogin?: string;
  joinDate: string;
}

const AdminUserManagement = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);

  const [users, setUsers] = useState<ManagedUser[]>(() =>
    employees.map((e) => ({
      ...e,
      status: e.status as "active" | "inactive" | "suspended",
      permissions: e.role === "Managing Director" ? ALL_PERMISSIONS.map(p => p.key) : ROLE_PRESETS.employee || [],
      mfaEnabled: e.employeeId === "BMR-001",
      lastLogin: "2026-04-12 09:30",
    }))
  );

  const [formData, setFormData] = useState({
    name: "", email: "", department: "Clinical Operations", role: "CRC-1", employeeId: "",
  });

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role.toLowerCase().includes(filterRole.toLowerCase());
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const handleCreate = () => {
    if (!formData.name || !formData.email) return;
    const newUser: ManagedUser = {
      id: Date.now().toString(),
      ...formData,
      employeeId: `BMR-${Math.floor(Math.random() * 900) + 100}`,
      status: "active",
      permissions: ROLE_PRESETS.employee,
      mfaEnabled: false,
      joinDate: new Date().toISOString().split("T")[0],
    };
    setUsers(prev => [...prev, newUser]);
    setShowCreateModal(false);
    setFormData({ name: "", email: "", department: "Clinical Operations", role: "CRC-1", employeeId: "" });
    toast({ title: "User Created", description: `${newUser.name} has been added successfully.` });
  };

  const handleDeactivate = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u));
    toast({ title: "Status Updated", description: "User status has been changed." });
  };

  const handleDelete = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setShowDeleteConfirm(null);
    toast({ title: "User Deleted", description: "User has been permanently removed.", variant: "destructive" });
  };

  const handlePermissionToggle = (perm: Permission) => {
    if (!selectedUser) return;
    setSelectedUser(prev => {
      if (!prev) return prev;
      const has = prev.permissions.includes(perm);
      return { ...prev, permissions: has ? prev.permissions.filter(p => p !== perm) : [...prev.permissions, perm] };
    });
  };

  const handleRolePreset = (preset: string) => {
    if (!selectedUser) return;
    setSelectedUser(prev => prev ? { ...prev, permissions: ROLE_PRESETS[preset] || [] } : prev);
  };

  const savePermissions = () => {
    if (!selectedUser) return;
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, permissions: selectedUser.permissions } : u));
    setShowPermissionModal(false);
    toast({ title: "Permissions Updated", description: `Permissions for ${selectedUser.name} saved.` });
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast({ title: "Role Updated", description: "Employee role has been changed." });
  };

  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="User Management" subtitle="Create, manage, and control user access">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Users", value: users.length, icon: UserCheck, color: "text-primary" },
            { label: "Active", value: users.filter(u => u.status === "active").length, icon: CheckCircle, color: "text-pharma-green" },
            { label: "Suspended", value: users.filter(u => u.status === "suspended").length, icon: AlertTriangle, color: "text-pharma-red" },
            { label: "MFA Enabled", value: users.filter(u => u.mfaEnabled).length, icon: Shield, color: "text-accent" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-secondary ${s.color}`}><s.icon size={18} /></div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="glass-card p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" placeholder="Search by name, email, or ID..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none">
              <option value="all">All Roles</option>
              <option value="managing director">Managing Director</option>
              <option value="crc">CRC</option>
              <option value="intern">Intern</option>
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
            <button onClick={() => setShowCreateModal(true)} className="gradient-bg text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all whitespace-nowrap">
              <Plus size={16} /> Create User
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Employee", "ID", "Role", "Status", "MFA", "Permissions", "Actions"].map(h => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-sm font-bold">{u.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{u.employeeId}</td>
                    <td className="py-3 px-4">
                      <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)} className="text-sm bg-secondary border border-border rounded px-2 py-1 text-foreground outline-none">
                        <option>Managing Director</option>
                        <option>CRC-1</option>
                        <option>Intern</option>
                        <option>Manager</option>
                        <option>Analyst</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${u.status === "active" ? "bg-pharma-green/10 text-pharma-green" : u.status === "suspended" ? "bg-pharma-red/10 text-pharma-red" : "bg-muted text-muted-foreground"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-pharma-green" : u.status === "suspended" ? "bg-pharma-red" : "bg-muted-foreground"}`} />
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {u.mfaEnabled ? (
                        <span className="inline-flex items-center gap-1 text-xs text-pharma-green"><Shield size={14} /> Enabled</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Lock size={14} /> Disabled</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-muted-foreground">{u.permissions.length}/{ALL_PERMISSIONS.length}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setSelectedUser(u); setShowPermissionModal(true); }} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-primary" title="Manage Permissions"><Key size={14} /></button>
                        <button onClick={() => handleDeactivate(u.id)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title={u.status === "active" ? "Suspend" : "Activate"}>
                          {u.status === "active" ? <UserX size={14} /> : <UserCheck size={14} />}
                        </button>
                        <button onClick={() => setShowDeleteConfirm(u.id)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create User Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Create New User</h3>
                  <button onClick={() => setShowCreateModal(false)} className="p-1 rounded hover:bg-secondary"><X size={18} /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                    <input className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input type="email" className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Department</label>
                    <select className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none" value={formData.department} onChange={e => setFormData(p => ({ ...p, department: e.target.value }))}>
                      <option>Clinical Operations</option>
                      <option>Administration</option>
                      <option>Regulatory</option>
                      <option>Data Management</option>
                      <option>Quality Assurance</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Role</label>
                    <select className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm outline-none" value={formData.role} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}>
                      <option>CRC-1</option>
                      <option>Intern</option>
                      <option>Manager</option>
                      <option>Analyst</option>
                    </select>
                  </div>
                  <button onClick={handleCreate} className="w-full gradient-bg text-primary-foreground py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <Plus size={16} /> Create User
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Permission Modal */}
        <AnimatePresence>
          {showPermissionModal && selectedUser && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPermissionModal(false)}>
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Manage Permissions</h3>
                    <p className="text-sm text-muted-foreground">{selectedUser.name} — {selectedUser.employeeId}</p>
                  </div>
                  <button onClick={() => setShowPermissionModal(false)} className="p-1 rounded hover:bg-secondary"><X size={18} /></button>
                </div>

                {/* Role Presets */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Quick Assign Role Preset</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(ROLE_PRESETS).map(preset => (
                      <button key={preset} onClick={() => handleRolePreset(preset)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary border border-border hover:bg-primary hover:text-primary-foreground transition-colors capitalize">
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Individual Permissions */}
                <div className="space-y-2">
                  {ALL_PERMISSIONS.map(perm => (
                    <label key={perm.key} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedUser.permissions.includes(perm.key)}
                        onChange={() => handlePermissionToggle(perm.key)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{perm.label}</p>
                        <p className="text-xs text-muted-foreground">{perm.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <button onClick={savePermissions} className="w-full mt-4 gradient-bg text-primary-foreground py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <Save size={16} /> Save Permissions
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-sm shadow-xl text-center">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="text-destructive" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Delete User?</h3>
                <p className="text-sm text-muted-foreground mb-6">This action is permanent and cannot be undone. All user data will be removed.</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">Cancel</button>
                  <button onClick={() => handleDelete(showDeleteConfirm)} className="flex-1 py-2.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-all">Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardLayout>
    </>
  );
};

export default AdminUserManagement;
