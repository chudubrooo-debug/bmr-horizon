import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const EmployeeProfile = () => {
  const { user } = useAuth();

  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="My Profile" subtitle="Account information">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-3xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-foreground">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.department} · {user?.employeeId}</p>
            </div>
          </div>

          <div className="grid gap-6">
            {[
              { label: "Full Name", value: user?.name },
              { label: "Email Address", value: user?.email },
              { label: "Employee ID", value: user?.employeeId },
              { label: "Department", value: user?.department },
              { label: "Role", value: user?.role, capitalize: true },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{field.label}</label>
                <div className={`px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm ${field.capitalize ? "capitalize" : ""}`}>
                  {field.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default EmployeeProfile;
