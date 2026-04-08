import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

const EmployeeIDCard = () => {
  const { user } = useAuth();

  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="My Digital ID" subtitle="Your employee identification card">
        <div className="flex justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card overflow-hidden w-full max-w-sm">
            <div className="gradient-bg p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-card/20 backdrop-blur-sm mx-auto flex items-center justify-center text-primary-foreground text-4xl font-bold">
                {user?.name?.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-primary-foreground mt-4">{user?.name}</h2>
              <p className="text-primary-foreground/70 text-sm">{user?.department}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Employee ID</span>
                <span className="font-mono font-bold text-foreground">{user?.employeeId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-foreground">{user?.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium text-foreground capitalize">{user?.role}</span>
              </div>
              <div className="flex justify-center pt-4 border-t border-border">
                <QRCodeSVG value={`BMR-${user?.employeeId}-${user?.name}`} size={120} level="M" />
              </div>
              <p className="text-center text-xs text-muted-foreground">BMR - Bio Medical Research</p>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default EmployeeIDCard;
