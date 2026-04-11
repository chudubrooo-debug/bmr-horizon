import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, CheckCircle, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import FaceCapturePanel from "./FaceCapturePanel";
import GeofencePanel from "./GeofencePanel";
import { formatTime, generateDeviceId, determineStatus, defaultShift, type HospitalLocation } from "@/data/attendanceData";

type FlowStep = "select" | "face" | "location" | "confirming" | "done" | "failed";
type ActionType = "checkin" | "checkout";

interface AttendanceCheckInFlowProps {
  employeeName: string;
  employeeId: string;
  hasCheckedIn: boolean;
  onComplete: (action: ActionType, data: {
    time: string;
    hospitalName: string;
    hospitalId: string;
    coords: { lat: number; lng: number };
    livenessScore: number;
    deviceId: string;
    status: string;
  }) => void;
}

const AttendanceCheckInFlow = ({ employeeName, employeeId, hasCheckedIn, onComplete }: AttendanceCheckInFlowProps) => {
  const [step, setStep] = useState<FlowStep>("select");
  const [action, setAction] = useState<ActionType>("checkin");
  const [faceScore, setFaceScore] = useState(0);
  const [hospital, setHospital] = useState<HospitalLocation | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [failReason, setFailReason] = useState("");

  const resetFlow = () => {
    setStep("select");
    setFaceScore(0);
    setHospital(null);
    setCoords(null);
    setFailReason("");
  };

  const startFlow = (type: ActionType) => {
    setAction(type);
    setStep("face");
  };

  const handleFaceVerified = (score: number) => {
    setFaceScore(score);
    setTimeout(() => setStep("location"), 800);
  };

  const handleFaceFailed = (reason: string) => {
    setFailReason(`Face verification failed: ${reason}`);
    setStep("failed");
  };

  const handleLocationVerified = (h: HospitalLocation, c: { lat: number; lng: number }) => {
    setHospital(h);
    setCoords(c);
    setStep("confirming");

    // Auto-confirm after 1.5s
    setTimeout(() => {
      const now = new Date();
      const time = formatTime(now);
      const status = action === "checkin"
        ? determineStatus(time, null, defaultShift)
        : "present";

      onComplete(action, {
        time,
        hospitalName: h.name,
        hospitalId: h.id,
        coords: c,
        livenessScore: score,
        deviceId: generateDeviceId(),
        status,
      });
      setStep("done");
    }, 1500);
  };

  const handleLocationFailed = (reason: string) => {
    setFailReason(reason);
    setStep("failed");
  };

  const score = faceScore;

  return (
    <div className="space-y-6">
      {/* Action Selection */}
      <AnimatePresence mode="wait">
        {step === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {employeeName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{employeeName}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{employeeId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startFlow("checkin")}
                  disabled={hasCheckedIn}
                  className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                    hasCheckedIn
                      ? "border-border bg-secondary/30 opacity-50 cursor-not-allowed"
                      : "border-primary/20 hover:border-primary hover:bg-primary/5 cursor-pointer"
                  }`}
                >
                  <LogIn size={32} className={hasCheckedIn ? "text-muted-foreground" : "text-primary"} />
                  <span className="font-semibold text-foreground">Check In</span>
                  <span className="text-xs text-muted-foreground">
                    {hasCheckedIn ? "Already checked in" : "Mark your arrival"}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startFlow("checkout")}
                  disabled={!hasCheckedIn}
                  className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                    !hasCheckedIn
                      ? "border-border bg-secondary/30 opacity-50 cursor-not-allowed"
                      : "border-accent/20 hover:border-accent hover:bg-accent/5 cursor-pointer"
                  }`}
                >
                  <LogOut size={32} className={!hasCheckedIn ? "text-muted-foreground" : "text-accent"} />
                  <span className="font-semibold text-foreground">Check Out</span>
                  <span className="text-xs text-muted-foreground">
                    {!hasCheckedIn ? "Check in first" : "Mark your departure"}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step indicators */}
        {step !== "select" && step !== "done" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            {["face", "location", "confirming"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s
                    ? "gradient-bg text-primary-foreground"
                    : ["face", "location", "confirming"].indexOf(step) > i
                    ? "bg-pharma-green text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {["face", "location", "confirming"].indexOf(step) > i ? "✓" : i + 1}
                </div>
                {i < 2 && <div className={`w-12 h-0.5 ${["face", "location", "confirming"].indexOf(step) > i ? "bg-pharma-green" : "bg-border"}`} />}
              </div>
            ))}
          </motion.div>
        )}

        {step === "face" && (
          <motion.div key="face" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <FaceCapturePanel isActive onVerified={handleFaceVerified} onFailed={handleFaceFailed} />
          </motion.div>
        )}

        {step === "location" && (
          <motion.div key="location" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <GeofencePanel isActive onLocationVerified={handleLocationVerified} onLocationFailed={handleLocationFailed} />
          </motion.div>
        )}

        {step === "confirming" && (
          <motion.div key="confirming" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center space-y-4">
            <motion.div
              className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="font-semibold text-foreground">Processing {action === "checkin" ? "Check-In" : "Check-Out"}...</p>
            <p className="text-sm text-muted-foreground">Validating biometric & location data</p>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle size={64} className="mx-auto text-pharma-green" />
            </motion.div>
            <h3 className="text-xl font-bold text-foreground">
              {action === "checkin" ? "Checked In" : "Checked Out"} Successfully
            </h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{hospital?.name}</p>
              <p>Liveness Score: {(score * 100).toFixed(0)}%</p>
              <p className="font-mono text-xs">{coords?.lat.toFixed(6)}°N, {coords?.lng.toFixed(6)}°E</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-accent">
              <ShieldCheck size={14} />
              Fraud-proof verification complete
            </div>
            <button onClick={resetFlow} className="mt-4 px-6 py-2 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-all">
              Done
            </button>
          </motion.div>
        )}

        {step === "failed" && (
          <motion.div key="failed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center space-y-4">
            <AlertTriangle size={48} className="mx-auto text-pharma-red" />
            <h3 className="text-lg font-bold text-foreground">Verification Failed</h3>
            <p className="text-sm text-muted-foreground">{failReason}</p>
            <button onClick={resetFlow} className="mt-4 px-6 py-2 rounded-xl gradient-bg text-primary-foreground font-medium hover:opacity-90 transition-all">
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AttendanceCheckInFlow;
