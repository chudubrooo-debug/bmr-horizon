import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const DashboardLayout = ({ title, subtitle, children }: Props) => {
  return (
    <div className="ml-64 min-h-screen bg-background">
      <header className="sticky top-0 z-30 glass-card border-b border-border/30 px-8 py-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold font-display text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </motion.div>
      </header>
      <main className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;
