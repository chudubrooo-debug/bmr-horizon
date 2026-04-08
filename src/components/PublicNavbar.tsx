import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import bmrLogo from "@/assets/bmr-logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const PublicNavbar = () => {
  const { isAuthenticated, user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30"
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={bmrLogo} alt="BMR Logo" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="nav-link">About</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#contact" className="nav-link">Contact</a>
          {isAuthenticated ? (
            <Link to={user?.role === "admin" ? "/admin" : "/employee"} className="gradient-bg text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="gradient-bg text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90">
              Sign In
            </Link>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden glass-card border-t border-border/30 px-6 py-4 space-y-3">
          <a href="#about" className="block nav-link" onClick={() => setOpen(false)}>About</a>
          <a href="#services" className="block nav-link" onClick={() => setOpen(false)}>Services</a>
          <a href="#contact" className="block nav-link" onClick={() => setOpen(false)}>Contact</a>
          <Link to={isAuthenticated ? (user?.role === "admin" ? "/admin" : "/employee") : "/login"} className="block gradient-bg text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold text-center" onClick={() => setOpen(false)}>
            {isAuthenticated ? "Dashboard" : "Sign In"}
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default PublicNavbar;
