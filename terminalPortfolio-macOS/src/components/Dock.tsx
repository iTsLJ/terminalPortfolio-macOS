import { useState, useRef } from "react";
import DockItem from "./DockItem";

import finderIcon from "@/assets/finder.png";
import safariIcon from "@/assets/safari.png";
import terminalIcon from "@/assets/terminal.png";
import vscodeIcon from "@/assets/vscode.png";
import settingsIcon from "@/assets/settings.png";
import contactsIcon from "@/assets/contacts.png";

export interface AppInfo {
  id: string;
  label: string;
  icon: string;
  width?: number;
  height?: number;
}

export const apps: AppInfo[] = [
  { id: "finder", label: "Finder", icon: finderIcon },
  { id: "safari", label: "Safari", icon: safariIcon },
  { id: "terminal", label: "Terminal", icon: terminalIcon, width: 1000, height: 630 },
  { id: "vscode", label: "VS Code", icon: vscodeIcon },
  { id: "settings", label: "Settings", icon: settingsIcon },
  { id: "contacts", label: "Contacts", icon: contactsIcon, width: 500, height: 600 },
];

interface DockProps {
  activeApps: string[];
  onAppClick: (id: string) => void;
}

const Dock = ({ activeApps, onAppClick }: DockProps) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9999] mac-dock-glass px-2 pb-1.5 pt-1.5 flex items-end gap-1"
      onMouseMove={(e) => setMouseX(e.clientX)}
      onMouseLeave={() => setMouseX(null)}
    >
      {apps.map((app, i) => (
        <DockItem
          key={app.id}
          icon={app.icon}
          label={app.label}
          isActive={activeApps.includes(app.id)}
          mouseX={mouseX}
          index={i}
          totalItems={apps.length}
          onClick={() => onAppClick(app.id)}
          itemRefs={itemRefs}
        />
      ))}
    </div>
  );
};

export default Dock;
