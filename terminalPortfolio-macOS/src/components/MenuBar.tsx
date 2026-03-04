import { useState, useEffect } from "react";
import { Wifi, Battery, Search, SlidersHorizontal } from "lucide-react";
import { SiApple } from "react-icons/si";
import { useTranslation } from "react-i18next";

const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
const leftMenus = [
  t("menu.file"),
  t("menu.edit"),
  t("menu.view"),
  t("menu.window"),
  t("menu.help"),
];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-7 mac-menubar-glass flex items-center justify-between px-4 text-foreground/90 text-[13px] font-medium">
      <div className="flex items-center gap-4">
        <SiApple size={14} className="opacity-90" />
        <span className="font-semibold">Terminal</span>
        {leftMenus.map((menu) => (
          <button
            key={menu}
            className="opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-default"
          >
            {menu}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Wifi size={14} className="opacity-80" />
        <Battery size={14} className="opacity-80" />
        <span className="opacity-80">
          {formattedDate} {formattedTime}
        </span>
        <Search size={14} className="opacity-80" />
        <SlidersHorizontal size={14} className="opacity-80" />
        <button
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "pt" : "en")
          }
          className="opacity-80 hover:opacity-100"
        >
          {i18n.language === "en" ? "🇧🇷 PT" : "🇺🇸 EN"}
        </button>
      </div>
    </header>
  );
};

export default MenuBar;