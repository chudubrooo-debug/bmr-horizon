import { motion } from "framer-motion";

interface Props {
  variant?: "hero" | "login" | "dna";
  className?: string;
}

const AnimatedBackground = ({ variant = "hero", className = "" }: Props) => {
  if (variant === "dna") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* DNA Helix CSS animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="dna-helix-container">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="dna-rung" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="dna-dot dna-dot-blue" />
                <div className="dna-bridge" />
                <div className="dna-dot dna-dot-cyan" />
              </div>
            ))}
          </div>
        </div>
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "login") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar to-sidebar" />
        {/* Animated orbs */}
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-accent/15 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "10%", right: "5%" }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/40"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  // Hero variant
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "-10%", right: "-5%" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, 50, 0], scale: [1.2, 0.8, 1.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "5%", left: "-5%" }}
      />
      {/* Floating particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, Math.random() * 15 - 7, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
