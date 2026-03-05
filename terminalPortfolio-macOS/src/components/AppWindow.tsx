import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { AppInfo } from "./Dock";
import TerminalApp from "./TerminalApp";
import ContactsApp from "./ContactsApp";
import SettingsApp from "./SettingsApp";

interface WindowProps {
  app: AppInfo;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
  onOpenApp: (id: string) => void;
}

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null;

const MIN_WIDTH  = 320;
const MIN_HEIGHT = 200;

const AppWindow = ({ app, zIndex, onClose, onFocus, onOpenApp }: WindowProps) => {
  const [position, setPosition] = useState({ x: 100 + Math.random() * 200, y: 60 + Math.random() * 100 });
  const [size, setSize]         = useState({ width: app.width || 1000, height: app.height || 630 });
  const [isMaximized, setIsMaximized] = useState(false);
  const prevSizePos = useRef({ position: { x: 0, y: 0 }, size: { width: 0, height: 0 } });
  const dragOffset  = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, left: 0, top: 0 });

  /* ── Drag ── */
  const handleTitleBarMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return;
      onFocus();
      dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };

      const onMove = (ev: MouseEvent) => {
        setPosition({
          x: ev.clientX - dragOffset.current.x,
          y: Math.max(28, ev.clientY - dragOffset.current.y),
        });
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [position, onFocus, isMaximized]
  );

  /* ── Maximize ── */
  const handleMaximize = useCallback(() => {
    if (!isMaximized) {
      prevSizePos.current = { position: { ...position }, size: { ...size } };
      setPosition({ x: 0, y: 28 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 28 });
      setIsMaximized(true);
    } else {
      setPosition(prevSizePos.current.position);
      setSize(prevSizePos.current.size);
      setIsMaximized(false);
    }
  }, [isMaximized, position, size]);

  /* ── Resize ── */
  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, direction: ResizeDirection) => {
      e.stopPropagation();
      e.preventDefault();
      onFocus();
      resizeStart.current = {
        x:      e.clientX,
        y:      e.clientY,
        width:  size.width,
        height: size.height,
        left:   position.x,
        top:    position.y,
      };

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - resizeStart.current.x;
        const dy = ev.clientY - resizeStart.current.y;

        setSize((prev) => {
          let w = prev.width;
          let h = prev.height;
          if (direction?.includes("e")) w = Math.max(MIN_WIDTH,  resizeStart.current.width  + dx);
          if (direction?.includes("s")) h = Math.max(MIN_HEIGHT, resizeStart.current.height + dy);
          if (direction?.includes("w")) w = Math.max(MIN_WIDTH,  resizeStart.current.width  - dx);
          if (direction?.includes("n")) h = Math.max(MIN_HEIGHT, resizeStart.current.height - dy);
          return { width: w, height: h };
        });

        setPosition((prev) => {
          let x = prev.x;
          let y = prev.y;
          if (direction?.includes("w")) x = Math.min(resizeStart.current.left + dx, resizeStart.current.left + resizeStart.current.width  - MIN_WIDTH);
          if (direction?.includes("n")) y = Math.min(resizeStart.current.top  + dy, resizeStart.current.top  + resizeStart.current.height - MIN_HEIGHT);
          return { x, y: Math.max(28, y) };
        });
      };

      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [size, position, onFocus]
  );

  const EDGE = 6; // px hit area

  const resizeHandles: { dir: ResizeDirection; style: React.CSSProperties; cursor: string }[] = [
    { dir: "n",  cursor: "ns-resize",   style: { top: 0,         left: EDGE,      right: EDGE,     height: EDGE                          } },
    { dir: "s",  cursor: "ns-resize",   style: { bottom: 0,      left: EDGE,      right: EDGE,     height: EDGE                          } },
    { dir: "e",  cursor: "ew-resize",   style: { top: EDGE,      right: 0,        bottom: EDGE,    width: EDGE                           } },
    { dir: "w",  cursor: "ew-resize",   style: { top: EDGE,      left: 0,         bottom: EDGE,    width: EDGE                           } },
    { dir: "ne", cursor: "nesw-resize", style: { top: 0,         right: 0,        width: EDGE * 2, height: EDGE * 2                      } },
    { dir: "nw", cursor: "nwse-resize", style: { top: 0,         left: 0,         width: EDGE * 2, height: EDGE * 2                      } },
    { dir: "se", cursor: "nwse-resize", style: { bottom: 0,      right: 0,        width: EDGE * 2, height: EDGE * 2                      } },
    { dir: "sw", cursor: "nesw-resize", style: { bottom: 0,      left: 0,         width: EDGE * 2, height: EDGE * 2                      } },
  ];

  return (
    <motion.div
      className="mac-window-surface absolute"
      style={{ left: position.x, top: position.y, width: size.width, height: size.height, zIndex }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseDown={onFocus}
    >
      {/* Resize handles */}
      {!isMaximized && resizeHandles.map(({ dir, style, cursor }) => (
        <div
          key={dir}
          style={{ position: "absolute", cursor, zIndex: 10, ...style }}
          onMouseDown={(e) => handleResizeMouseDown(e, dir)}
        />
      ))}

      {/* Title Bar */}
      <div
        className="mac-window-titlebar h-10 flex items-center px-3 gap-2 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleTitleBarMouseDown}
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
          <button
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            className="w-3 h-3 rounded-full traffic-light-green hover:brightness-110 transition-all flex items-center justify-center group"
          >
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
<div className="h-[calc(100%-2.5rem)] overflow-hidden">
  {app.id === "terminal" ? (
    <TerminalApp onOpenApp={onOpenApp} />
  ) : app.id === "contacts" ? (
    <ContactsApp />
  ) : app.id === "settings" ? (
    <SettingsApp />
  ) : (
    <div className="p-4 h-full flex items-center justify-center">
      <div className="text-muted-foreground text-sm text-center">
        <img src={app.icon} alt={app.label} className="w-16 h-16 rounded-xl mx-auto mb-3 opacity-40" />
        <p className="opacity-50">{app.label} — Ready</p>
      </div>
    </div>
  )}
</div>
    </motion.div>
  );
};

export default AppWindow;