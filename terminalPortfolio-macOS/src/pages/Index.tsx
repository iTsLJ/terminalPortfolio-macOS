import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import MenuBar from "@/components/MenuBar";
import Dock, { apps } from "@/components/Dock";
import AppWindow from "@/components/AppWindow";

interface OpenApp {
  id: string;
  zIndex: number;
  minimized: boolean;
}

const Index = () => {
  const [openApps, setOpenApps] = useState<OpenApp[]>([]);
  const [topZ, setTopZ] = useState(10);

  const handleAppClick = useCallback(
    (id: string) => {
      setOpenApps((prev) => {
        const existing = prev.find((a) => a.id === id);
        if (existing) {
          if (existing.minimized) {
            // Restaura se minimizado
            return prev.map((a) => a.id === id ? { ...a, minimized: false } : a);
          }
          // Fecha se já aberto
          return prev.filter((a) => a.id !== id);
        }
        const newZ = topZ + 1;
        setTopZ(newZ);
        return [...prev, { id, zIndex: newZ, minimized: false }];
      });
    },
    [topZ]
  );

  const handleFocus = useCallback(
    (id: string) => {
      const newZ = topZ + 1;
      setTopZ(newZ);
      setOpenApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, zIndex: newZ } : a))
      );
    },
    [topZ]
  );

  const handleClose = useCallback((id: string) => {
    setOpenApps((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const handleMinimize = useCallback((id: string) => {
    setOpenApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, minimized: true } : a))
    );
  }, []);

  return (
    <div className="w-screen h-screen mac-desktop-bg overflow-hidden relative">
      <MenuBar />

      <AnimatePresence>
        {openApps.filter((a) => !a.minimized).map((openApp) => {
          const appInfo = apps.find((a) => a.id === openApp.id);
          if (!appInfo) return null;
          return (
            <AppWindow
              key={openApp.id}
              app={appInfo}
              zIndex={openApp.zIndex}
              onClose={() => handleClose(openApp.id)}
              onFocus={() => handleFocus(openApp.id)}
              onMinimize={() => handleMinimize(openApp.id)}
            />
          );
        })}
      </AnimatePresence>

      <Dock
        activeApps={openApps.map((a) => a.id)}
        minimizedApps={openApps.filter((a) => a.minimized).map((a) => a.id)}
        onAppClick={handleAppClick}
      />
    </div>
  );
};

export default Index;