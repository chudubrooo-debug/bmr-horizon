import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Scene3D from "@/components/three/Scene3D";
import bmrLogo from "@/assets/bmr-logo.png";
import { Eye, EyeOff } from "lucide-react";
import MFAVerify from "@/components/MFAVerify";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [pendingRole, setPendingRole] = useState<string | null>(null);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let success: boolean;
      if (isSignup) {
        success = await signup(name, email, password);
      } else {
        success = await login(email, password);
      }
      if (success) {
        const stored = localStorage.getItem("bmr_user");
        if (stored) {
          const u = JSON.parse(stored);
          if (u.role === "admin") {
            setPendingRole("admin");
            setShowMFA(true);
          } else {
            navigate("/employee");
          }
        }
      } else {
        setError("Invalid credentials. Try admin@bmr.com / admin123 or employee@bmr.com / emp123");
      }
    } catch {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (showMFA) {
    return <MFAVerify onVerified={() => navigate("/admin")} />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - 3D Scene */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-sidebar overflow-hidden">
        <Scene3D showDNA showParticles interactive className="absolute inset-0" />
        <div className="relative z-10 text-center p-12">
          <h2 className="text-3xl font-bold font-display text-sidebar-foreground mb-4">Welcome to BMR</h2>
          <p className="text-sidebar-foreground/60 max-w-md">Secure access to your clinical research dashboard and tools.</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/"><img src={bmrLogo} alt="BMR" className="h-14 mx-auto mb-6" /></Link>
            <h1 className="text-2xl font-bold font-display text-foreground">{isSignup ? "Create Account" : "Sign In"}</h1>
            <p className="text-sm text-muted-foreground mt-2">{isSignup ? "Join BMR's research platform" : "Access your dashboard"}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <input className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition pr-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button type="submit" disabled={loading} className="w-full gradient-bg text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50">
              {loading ? "Please wait..." : isSignup ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="text-center">
            <button onClick={() => { setIsSignup(!isSignup); setError(""); }} className="text-sm text-primary hover:underline">
              {isSignup ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </button>
          </div>

          {!isSignup && (
            <div className="glass-card p-4 text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Demo Credentials:</p>
              <p>Admin: admin@bmr.com / admin123</p>
              <p>Employee: employee@bmr.com / emp123</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
