import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import bmrLogo from "@/assets/bmr-logo.png";
import ThemeToggle from "@/components/ThemeToggle";
import {
  LayoutDashboard, Users, FolderKanban, CalendarCheck, CreditCard,
  Megaphone, IdCard, LogOut, ClipboardList, FileText, UserCircle, Shield
} from "lucide-react";

const adminLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/employees", icon: Users, label: "Employees" },
  { to: "/admin/projects", icon: FolderKanban, label: "Clinical Trials" },
  { to: "/admin/attendance", icon: CalendarCheck, label: "Attendance" },
  { to: "/admin/announcements", icon: Megaphone, label: "Announcements" },
  { to: "/admin/id-cards", icon: IdCard, label: "ID Cards" },
  { to: "/admin/finance", icon: CreditCard, label: "Finance" },
];

const employeeLinks = [
  { to: "/employee", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/employee/projects", icon: FolderKanban, label: "My Trials" },
  { to: "/employee/attendance", icon: CalendarCheck, label: "Attendance" },
  { to: "/employee/updates", icon: ClipboardList, label: "Work Updates" },
  { to: "/employee/documents", icon: FileText, label: "Documents" },
  { to: "/employee/id-card", icon: IdCard, label: "My ID" },
  { to: "/employee/profile", icon: UserCircle, label: "Profile" },
];

const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = user?.role === "admin" ? adminLinks : employeeLinks;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar flex flex-col z-40">
      <div className="p-5 border-b border-sidebar-border flex items-center justify-between">
        <img src={bmrLogo} alt="BMR-SMO" className="h-10 w-auto brightness-0 invert" />
        <ThemeToggle className="text-sidebar-foreground hover:bg-sidebar-accent" />
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/admin" || link.to === "/employee"}
            className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
          >
            <link.icon size={18} />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-sm font-bold">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/50 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="sidebar-link w-full text-pharma-red/80 hover:text-pharma-red"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
