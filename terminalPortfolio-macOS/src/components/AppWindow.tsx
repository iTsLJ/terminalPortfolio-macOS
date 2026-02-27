import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { AppInfo } from "./Dock";

interface WindowProps {
  app: AppInfo;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
}

const AppWindow = ({ app, zIndex, onClose, onFocus }: WindowProps) => {
  const [position, setPosition] = useState({ x: 100 + Math.random() * 200, y: 60 + Math.random() * 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      onFocus();
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };

      const handleMove = (ev: MouseEvent) => {
        setPosition({
          x: ev.clientX - dragOffset.current.x,
          y: ev.clientY - dragOffset.current.y,
        });
      };
      const handleUp = () => {
        setIsDragging(false);
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
      };
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
    },
    [position, onFocus]
  );

  return (
    <motion.div
      className="mac-window-surface absolute"
      style={{
        left: position.x,
        top: position.y,
        width: 1000,
        height: 700,
        zIndex,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="mac-window-titlebar h-10 flex items-center px-3 gap-2 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full traffic-light-red hover:brightness-110 transition-all flex items-center justify-center group"
          >
            <X size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="w-3 h-3 rounded-full traffic-light-yellow hover:brightness-110 transition-all flex items-center justify-center group">
            <Minus size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="w-3 h-3 rounded-full traffic-light-green hover:brightness-110 transition-all flex items-center justify-center group">
            <Maximize2 size={7} className="text-black/60 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="flex-1 text-center text-foreground/60 text-sm font-medium flex items-center justify-center gap-2">
          <img src={app.icon} alt={app.label} className="w-4 h-4 rounded" />
          {app.label}
        </div>
        <div className="w-14" />
      </div>

      {/* Content */}
      <div className="p-4 h-[calc(100%-2.5rem)] flex items-center justify-center">
        <div className="text-muted-foreground text-sm text-center">
          <img src={app.icon} alt={app.label} className="w-16 h-16 rounded-xl mx-auto mb-3 opacity-40" />
          <p className="opacity-50">{app.label} — Ready</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AppWindow;
 