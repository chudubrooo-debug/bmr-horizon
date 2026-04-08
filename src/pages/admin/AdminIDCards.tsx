import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { employees } from "@/data/mockData";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

const AdminIDCards = () => {
  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Digital ID Cards" subtitle="Employee identification">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.filter(e => e.status === "active").map((emp, i) => (
            <motion.div key={emp.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass-card overflow-hidden">
              <div className="gradient-bg p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-card/20 backdrop-blur-sm mx-auto flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {emp.name.charAt(0)}
                </div>
                <h3 className="text-primary-foreground font-semibold mt-2">{emp.name}</h3>
                <p className="text-primary-foreground/70 text-xs">{emp.role}</p>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ID</span>
                  <span className="font-mono font-medium text-foreground">{emp.employeeId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium text-foreground">{emp.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Since</span>
                  <span className="font-medium text-foreground">{emp.joinDate}</span>
                </div>
                <div className="flex justify-center pt-3 border-t border-border">
                  <QRCodeSVG value={`BMR-${emp.employeeId}-${emp.name}`} size={80} level="M" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminIDCards;
