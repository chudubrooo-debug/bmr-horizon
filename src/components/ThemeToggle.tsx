import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-secondary ${className}`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} className="text-foreground" /> : <Moon size={18} className="text-foreground" />}
    </button>
  );
};

export default ThemeToggle;
