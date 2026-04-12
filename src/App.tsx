import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminIDCards from "./pages/admin/AdminIDCards";
import AdminFinance from "./pages/admin/AdminFinance";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeProjects from "./pages/employee/EmployeeProjects";
import EmployeeAttendance from "./pages/employee/EmployeeAttendance";
import EmployeeUpdates from "./pages/employee/EmployeeUpdates";
import EmployeeDocuments from "./pages/employee/EmployeeDocuments";
import EmployeeIDCard from "./pages/employee/EmployeeIDCard";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/employees" element={<ProtectedRoute allowedRoles={["admin"]}><AdminEmployees /></ProtectedRoute>} />
            <Route path="/admin/projects" element={<ProtectedRoute allowedRoles={["admin"]}><AdminProjects /></ProtectedRoute>} />
            <Route path="/admin/attendance" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAttendance /></ProtectedRoute>} />
            <Route path="/admin/announcements" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAnnouncements /></ProtectedRoute>} />
            <Route path="/admin/id-cards" element={<ProtectedRoute allowedRoles={["admin"]}><AdminIDCards /></ProtectedRoute>} />
            <Route path="/admin/finance" element={<ProtectedRoute allowedRoles={["admin"]}><AdminFinance /></ProtectedRoute>} />
            <Route path="/admin/user-management" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUserManagement /></ProtectedRoute>} />

            {/* Employee Routes */}
            <Route path="/employee" element={<ProtectedRoute allowedRoles={["employee"]}><EmployeeDashboard /></ProtectedRoute>} />
            <Route path="/employee/projects" element={<ProtectedRoute allowedRoles={["employee"]}><EmployeeProjects /></ProtectedRoute>} />
            <Route path="/employee/attendance" element={<ProtectedRoute allowedRoles={["employee"]}><EmployeeAttendance /></ProtectedRoute>} />
            <Route path="/employee/updates" element={<ProtectedRoute allowedRoles={["employee"]}><EmployeeUpdates /></ProtectedRoute>} />
            <Route path="/employee/documents" element={<ProtectedRoute allowedRoles={["employee"]}><EmployeeDocuments /></ProtectedRoute>} />
            <Route path="/employee/id-card" element={<ProtectedRoute allowedRoles={["employee"]}><EmployeeIDCard /></ProtectedRoute>} />
            <Route path="/employee/profile" element={<ProtectedRoute allowedRoles={["employee"]}><EmployeeProfile /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
