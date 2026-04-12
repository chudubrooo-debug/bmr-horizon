import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle, X, Smartphone, Copy, AlertTriangle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

interface MFASetupProps {
  userEmail: string;
  onVerified: () => void;
  onCancel: () => void;
}

const MFASetup = ({ userEmail, onVerified, onCancel }: MFASetupProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"qr" | "verify">("qr");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Mock TOTP secret
  const secret = "JBSWY3DPEHPK3PXP";
  const otpAuthUrl = `otpauth://totp/BMR-SMO:${userEmail}?secret=${secret}&issuer=BMR-SMO&digits=6&period=30`;

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      const next = document.getElementById(`mfa-otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`mfa-otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }
    setVerifying(true);
    // Simulate verification — accept any 6-digit code for demo
    await new Promise(r => setTimeout(r, 1500));
    setVerifying(false);
    toast({ title: "MFA Verified", description: "Two-factor authentication is now active." });
    onVerified();
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    toast({ title: "Copied", description: "Secret key copied to clipboard." });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Shield className="text-primary-foreground" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Setup MFA</h2>
              <p className="text-xs text-muted-foreground">Google Authenticator</p>
            </div>
          </div>
          <button onClick={onCancel} className="p-1 rounded hover:bg-secondary text-muted-foreground"><X size={18} /></button>
        </div>

        <AnimatePresence mode="wait">
          {step === "qr" ? (
            <motion.div key="qr" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Scan this QR code with Google Authenticator or any TOTP app
                </p>
                <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                  <QRCodeSVG value={otpAuthUrl} size={180} level="H" />
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-muted-foreground mb-1">Or enter this secret manually:</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-foreground flex-1 tracking-widest">{secret}</code>
                  <button onClick={copySecret} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Copy size={14} /></button>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-accent/10 border border-accent/20 rounded-lg p-3 mb-6">
                <Smartphone size={16} className="text-accent mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Tip:</strong> Download Google Authenticator from the App Store or Play Store if you haven't already.
                </p>
              </div>

              <button onClick={() => setStep("verify")} className="w-full gradient-bg text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all">
                I've Scanned the QR Code →
              </button>
            </motion.div>
          ) : (
            <motion.div key="verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Enter the 6-digit code from your authenticator app
              </p>

              <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`mfa-otp-${i}`}
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

              <div className="flex gap-3">
                <button onClick={() => { setStep("qr"); setOtp(["", "", "", "", "", ""]); setError(""); }} className="flex-1 py-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                  ← Back
                </button>
                <button onClick={handleVerify} disabled={verifying} className="flex-1 gradient-bg text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {verifying ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} /> Verify
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MFASetup;
