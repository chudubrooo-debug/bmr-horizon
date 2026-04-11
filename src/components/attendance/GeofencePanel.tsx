import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ShieldAlert, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { hospitalLocations, isWithinGeofence, getDistanceMeters, type HospitalLocation } from "@/data/attendanceData";

interface GeofencePanelProps {
  onLocationVerified: (hospital: HospitalLocation, coords: { lat: number; lng: number }) => void;
  onLocationFailed: (reason: string) => void;
  isActive: boolean;
}

type LocationStatus = "idle" | "fetching" | "verified" | "outside" | "error";

const GeofencePanel = ({ onLocationVerified, onLocationFailed, isActive }: GeofencePanelProps) => {
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestHospital, setNearestHospital] = useState<HospitalLocation | null>(null);
  const [distance, setDistance] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isActive) {
      setStatus("idle");
    }
  }, [isActive]);

  const captureLocation = () => {
    setStatus("fetching");
    setErrorMsg("");

    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMsg("Geolocation not supported on this device.");
      onLocationFailed("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        // Find nearest hospital
        let nearest: HospitalLocation | null = null;
        let minDist = Infinity;

        for (const h of hospitalLocations) {
          const d = getDistanceMeters(latitude, longitude, h.latitude, h.longitude);
          if (d < minDist) {
            minDist = d;
            nearest = h;
          }
        }

        setNearestHospital(nearest);
        setDistance(Math.round(minDist));

        if (nearest) {
          const check = isWithinGeofence(latitude, longitude, nearest);
          if (check.valid) {
            setStatus("verified");
            onLocationVerified(nearest, { lat: latitude, lng: longitude });
          } else {
            setStatus("outside");
            onLocationFailed(`Outside geofence: ${Math.round(check.distance)}m from ${nearest.name}`);
          }
        }
      },
      (err) => {
        setStatus("error");
        const msg = err.code === 1
          ? "Location permission denied. Please enable GPS."
          : "Unable to determine location. Please try again.";
        setErrorMsg(msg);
        onLocationFailed(msg);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Simulate location for demo (use when real GPS isn't available)
  const simulateLocation = () => {
    setStatus("fetching");
    setTimeout(() => {
      // Pick a random hospital and simulate being inside it
      const hospital = hospitalLocations[Math.floor(Math.random() * hospitalLocations.length)];
      const jitter = (Math.random() - 0.5) * 0.001; // ~50m jitter
      const simLat = hospital.latitude + jitter;
      const simLng = hospital.longitude + jitter;
      setCoords({ lat: simLat, lng: simLng });
      setNearestHospital(hospital);
      const d = getDistanceMeters(simLat, simLng, hospital.latitude, hospital.longitude);
      setDistance(Math.round(d));
      setStatus("verified");
      onLocationVerified(hospital, { lat: simLat, lng: simLng });
    }, 1500);
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <MapPin size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="font-semibold font-display text-foreground">Location Verification</h3>
          <p className="text-xs text-muted-foreground">GPS geofencing • 100–150m radius</p>
        </div>
      </div>

      {/* Map Visual */}
      <div className="relative w-full h-48 rounded-xl bg-secondary/50 border border-border overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />

        {/* Hospital markers */}
        {hospitalLocations.map((h, i) => (
          <motion.div
            key={h.id}
            className={`absolute w-3 h-3 rounded-full ${
              nearestHospital?.id === h.id && status === "verified"
                ? "bg-pharma-green"
                : nearestHospital?.id === h.id && status === "outside"
                ? "bg-pharma-red"
                : "bg-primary/40"
            }`}
            style={{
              left: `${15 + i * 16}%`,
              top: `${30 + (i % 3) * 15}%`,
            }}
            animate={nearestHospital?.id === h.id ? { scale: [1, 1.5, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {/* Geofence ring */}
            <div className={`absolute -inset-3 rounded-full border ${
              nearestHospital?.id === h.id && status === "verified"
                ? "border-pharma-green/40"
                : "border-primary/20"
            }`} />
            {/* Label */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-muted-foreground font-medium">
              {h.name.split(" ").slice(0, 2).join(" ")}
            </div>
          </motion.div>
        ))}

        {/* User position */}
        {coords && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute w-4 h-4 bg-primary rounded-full border-2 border-primary-foreground shadow-lg"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            <div className="absolute -inset-2 rounded-full bg-primary/20 animate-ping" />
          </motion.div>
        )}

        {status === "fetching" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
            <Loader2 size={32} className="text-primary animate-spin" />
          </div>
        )}
      </div>

      {/* Status info */}
      {status === "verified" && nearestHospital && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-pharma-green/10 border border-pharma-green/20 space-y-1"
        >
          <div className="flex items-center gap-2 text-pharma-green font-medium text-sm">
            <CheckCircle size={16} />
            Location Verified
          </div>
          <p className="text-xs text-muted-foreground">
            {nearestHospital.name} • {distance}m from center • Within {nearestHospital.radiusMeters}m radius
          </p>
        </motion.div>
      )}

      {status === "outside" && nearestHospital && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-pharma-red/10 border border-pharma-red/20 space-y-1"
        >
          <div className="flex items-center gap-2 text-pharma-red font-medium text-sm">
            <XCircle size={16} />
            Outside Geofence
          </div>
          <p className="text-xs text-muted-foreground">
            {distance}m from {nearestHospital.name} (allowed: {nearestHospital.radiusMeters}m)
          </p>
        </motion.div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-pharma-red/10 text-pharma-red text-sm">
          <ShieldAlert size={16} />
          {errorMsg}
        </div>
      )}

      {/* Buttons */}
      {(status === "idle" || status === "error" || status === "outside") && isActive && (
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={captureLocation}
            className="flex-1 gradient-bg text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          >
            <Navigation size={16} />
            Capture GPS
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={simulateLocation}
            className="px-4 py-3 rounded-xl bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-all border border-border"
          >
            Demo
          </motion.button>
        </div>
      )}

      {/* Coordinates */}
      {coords && (
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span className="font-mono">{coords.lat.toFixed(6)}°N, {coords.lng.toFixed(6)}°E</span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-pharma-green animate-pulse" />
            GPS Active
          </span>
        </div>
      )}
    </div>
  );
};

export default GeofencePanel;
