import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Upload, FileText, Download } from "lucide-react";

const docs = [
  { name: "CT-401 Safety Report Q1.pdf", size: "2.4 MB", date: "2026-04-05", type: "Report" },
  { name: "Patient Enrollment Data.xlsx", size: "1.1 MB", date: "2026-04-03", type: "Data" },
  { name: "Protocol Amendment v3.docx", size: "890 KB", date: "2026-03-28", type: "Protocol" },
];

const EmployeeDocuments = () => {
  return (
    <>
      <DashboardSidebar />
      <DashboardLayout title="Documents" subtitle="Upload and manage research documents">
        <div className="flex justify-end mb-6">
          <button className="gradient-bg text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all">
            <Upload size={16} /> Upload Document
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <div className="space-y-3">
            {docs.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.size} · {d.type} · {d.date}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default EmployeeDocuments;
