import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertTriangle } from "lucide-react";
import bmrLogo from "@/assets/bmr-logo.png";

interface MFAVerifyProps {
  onVerified: () => void;
}

const MFAVerify = ({ onVerified }: MFAVerifyProps) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      document.getElementById(`verify-otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`verify-otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }
    setVerifying(true);
    await new Promise(r => setTimeout(r, 1200));
    setVerifying(false);
    // Accept any 6-digit code for demo
    onVerified();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src={bmrLogo} alt="BMR" className="h-12 mx-auto mb-4" />
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <Shield className="text-primary-foreground" size={28} />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground">Two-Factor Authentication</h1>
          <p className="text-sm text-muted-foreground mt-2">Enter the code from your Google Authenticator app</p>
        </div>

        <div className="glass-card p-8">
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`verify-otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-lg bg-secondary border-2 border-border text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm mb-4 justify-center">
              <AlertTriangle size={14} /> {error}
            </div>
          )}

          <button
            onClick={handleVerify}
            disabled={verifying}
            className="w-full gradient-bg text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {verifying ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle size={16} /> Verify & Continue
              </>
            )}
          </button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Open Google Authenticator on your phone to get the verification code.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MFAVerify;
