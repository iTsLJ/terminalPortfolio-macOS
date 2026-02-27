import { motion } from "framer-motion";

interface DockItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  mouseX: number | null;
  index: number;
  totalItems: number;
  onClick: () => void;
  itemRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

const BASE_SIZE = 45;
const MAX_SIZE = 65;

const DockItem = ({
  icon,
  label,
  isActive,
  mouseX,
  index,
  onClick,
  itemRefs,
}: DockItemProps) => {
  let scale = 1;

  if (mouseX !== null && itemRefs.current) {
    const el = itemRefs.current[index];
    if (el) {
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - center);
      const maxDist = 130;
      if (dist < maxDist) {
        const ratio = 1 - dist / maxDist;
        scale = 1 + ratio * ((MAX_SIZE - BASE_SIZE) / BASE_SIZE);
      }
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center relative group cursor-default"
      ref={(el) => {
        if (itemRefs.current) itemRefs.current[index] = el;
      }}
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
    >
      <motion.div
        className="rounded-[12px] overflow-hidden"
        style={{ width: BASE_SIZE, height: BASE_SIZE }}
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
      >
        <img
          src={icon}
          alt={label}
          className="w-full h-full object-contain pointer-events-none"
          draggable={false}
        />
      </motion.div>

      {/* Tooltip */}
      <div className="absolute -top-9 px-2.5 py-1 rounded-md bg-secondary/90 backdrop-blur-md text-foreground text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
        {label}
      </div>

      {/* Active dot */}
      <div className="h-1.5 flex items-center justify-center">
        {isActive && (
          <motion.div
            className="w-1 h-1 rounded-full bg-foreground/70"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default DockItem;
