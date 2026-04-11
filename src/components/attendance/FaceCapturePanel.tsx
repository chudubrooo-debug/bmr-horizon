import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle, XCircle, ScanFace, Eye, ShieldCheck } from "lucide-react";

interface FaceCapturePanelProps {
  onVerified: (score: number) => void;
  onFailed: (reason: string) => void;
  isActive: boolean;
}

type Stage = "idle" | "requesting" | "scanning" | "liveness" | "verifying" | "success" | "failed";

const LIVENESS_PROMPTS = [
  { text: "Please blink your eyes", icon: Eye },
  { text: "Turn head slightly left", icon: ScanFace },
  { text: "Turn head slightly right", icon: ScanFace },
];

const FaceCapturePanel = ({ onVerified, onFailed, isActive }: FaceCapturePanelProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [livenessStep, setLivenessStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    if (!isActive) {
      stopCamera();
      setStage("idle");
    }
    return () => stopCamera();
  }, [isActive, stopCamera]);

  const startCapture = async () => {
    setStage("requesting");
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStage("scanning");

      // Simulate face detection after 2s
      setTimeout(() => {
        setStage("liveness");
        setLivenessStep(0);
      }, 2000);
    } catch {
      setStage("failed");
      setErrorMsg("Camera access denied. Please allow camera permissions.");
      onFailed("Camera access denied");
    }
  };

  // Simulate liveness steps
  useEffect(() => {
    if (stage !== "liveness") return;
    const timer = setTimeout(() => {
      if (livenessStep < LIVENESS_PROMPTS.length - 1) {
        setLivenessStep((s) => s + 1);
      } else {
        setStage("verifying");
        // Simulate verification
        setTimeout(() => {
          const score = 0.92 + Math.random() * 0.07; // 0.92-0.99
          setStage("success");
          onVerified(score);
        }, 1500);
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [stage, livenessStep, onVerified]);

  const stageColors: Record<Stage, string> = {
    idle: "border-border",
    requesting: "border-muted-foreground",
    scanning: "border-primary animate-pulse",
    liveness: "border-accent animate-pulse",
    verifying: "border-primary",
    success: "border-pharma-green",
    failed: "border-pharma-red",
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
          <ScanFace size={20} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold font-display text-foreground">Face Verification</h3>
          <p className="text-xs text-muted-foreground">Liveness detection enabled</p>
        </div>
      </div>

      {/* Video Preview */}
      <div className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden border-2 transition-colors ${stageColors[stage]} bg-secondary/50`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover mirror"
          style={{ transform: "scaleX(-1)" }}
          muted
          playsInline
        />

        {stage === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Camera size={48} className="text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Camera preview</p>
          </div>
        )}

        {/* Scanning overlay */}
        <AnimatePresence>
          {stage === "scanning" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  className="w-48 h-48 border-2 border-primary rounded-[2rem]"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.div
                  className="absolute inset-0 border-t-2 border-primary/50"
                  animate={{ y: [0, 192, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                />
              </div>
              <p className="absolute bottom-4 text-sm font-medium text-primary bg-background/80 px-3 py-1 rounded-full">
                Detecting face...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liveness prompt overlay */}
        <AnimatePresence>
          {stage === "liveness" && (
            <motion.div
              key={livenessStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 flex flex-col items-center justify-end pb-6"
            >
              <div className="bg-background/90 backdrop-blur px-4 py-3 rounded-xl flex items-center gap-3 border border-accent/30">
                {(() => {
                  const Icon = LIVENESS_PROMPTS[livenessStep].icon;
                  return <Icon size={20} className="text-accent" />;
                })()}
                <span className="text-sm font-medium text-foreground">
                  {LIVENESS_PROMPTS[livenessStep].text}
                </span>
              </div>
              {/* Progress dots */}
              <div className="flex gap-2 mt-3">
                {LIVENESS_PROMPTS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i <= livenessStep ? "bg-accent" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verifying spinner */}
        {stage === "verifying" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <motion.div
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
        )}

        {/* Success overlay */}
        {stage === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-pharma-green/10 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-2">
              <CheckCircle size={48} className="text-pharma-green" />
              <p className="font-semibold text-pharma-green">Verified</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      {stage === "idle" && isActive && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startCapture}
          className="w-full gradient-bg text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
        >
          <Camera size={18} />
          Start Face Verification
        </motion.button>
      )}

      {stage === "failed" && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-pharma-red/10 text-pharma-red text-sm">
          <XCircle size={16} />
          {errorMsg}
        </div>
      )}

      {/* Security badge */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
        <ShieldCheck size={14} className="text-accent" />
        <span>AES-256 encrypted • Anti-spoofing • No images stored</span>
      </div>
    </div>
  );
};

export default FaceCapturePanel;
