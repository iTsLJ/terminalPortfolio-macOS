import { useState, useEffect } from "react";
import { Plus, RotateCcw, ChevronLeft, ChevronRight, Share, BookOpen, Grid2x2, Search, Construction } from "lucide-react";

type Tab = { id: string; label: string; url: string; favicon: string };

const PLAYLISTS = [
  { id: "3CO75u5aBRCa8TQiEeMA0H", label: "Playlist 1" },
  { id: "4XEJvjfOw4HTHeXUKvRaOF", label: "Playlist 2" },
  { id: "0V0Z7qf9IYgFjiQlW3UtRh", label: "Playlist 3" },
  { id: "0aOUnuAPwijYiP7RSALDDI", label: "Playlist 4" },
];

const INITIAL_TABS: Tab[] = [
  { id: "home",      label: "New Page",  url: "newtab",             favicon: "🏠" },
  { id: "spotify",   label: "Spotify",   url: "open.spotify.com",   favicon: "🎵" },
];

const FAVORITES = [
  { label: "GitHub",    url: "https://github.com/CaioSResende",                          icon: "🐙", color: "#24292e" },
  { label: "LinkedIn",  url: "https://linkedin.com/in/caiosouzaderesende",               icon: "💼", color: "#0077b5" },
  { label: "Credly",    url: "https://www.credly.com/users/caiosresende",                icon: "🏅", color: "#ff6b00" },
  { label: "Spotify",   url: "https://open.spotify.com/user/21w20r0s2ima7smacfr3sl5gv",  icon: "🎵", color: "#1db954" },
  { label: "Instagram", url: "https://instagram.com/caiosresende_",                      icon: "📸", color: "#e1306c" },
];

const TBtn = ({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
    style={{ color: disabled ? "#555" : "#ccc" }}
    onMouseEnter={(e) => { if (!disabled) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
  >
    {children}
  </button>
);

const HomePage = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div
      className="flex flex-col items-center w-full h-full overflow-y-auto"
      style={{ background: "linear-gradient(160deg, #1a2535 0%, #1e2d42 50%, #172233 100%)", fontFamily: "system-ui, sans-serif" }}
    >
      <div className="flex flex-col items-center pt-12 pb-8 w-full px-8">
        <p className="text-4xl font-semibold mb-1" style={{ color: "#e2e8f0" }}>
          {greeting}, Caio 👋
        </p>
        <p className="text-sm mt-1" style={{ color: "#4a5568" }}>
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <div
          className="flex items-center gap-2 mt-8 w-full max-w-xl px-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", height: "44px" }}
        >
          <Search size={16} style={{ color: "#6b7280", flexShrink: 0 }} />
          <span style={{ color: "#4a5568", fontSize: "14px" }}>Search or enter website name</span>
        </div>
      </div>

      <div className="w-full max-w-2xl px-8 mb-10">
        <p className="text-xs font-semibold mb-4 tracking-widest uppercase" style={{ color: "#4a5568" }}>Favourites</p>
        <div className="flex flex-wrap justify-center gap-6">
          {FAVORITES.map((fav) => (
            <a
              key={fav.label}
              href={fav.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110"
                style={{ background: `${fav.color}22`, border: `1px solid ${fav.color}44` }}
              >
                {fav.icon}
              </div>
              <span className="text-xs text-center truncate w-full" style={{ color: "#6b7280" }}>{fav.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl px-8 mb-8">
        <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      <div className="w-full max-w-2xl px-8 pb-12">
        <p className="text-xs font-semibold mb-4 tracking-widest uppercase" style={{ color: "#4a5568" }}>News</p>
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-2xl py-12"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.08)" }}
        >
          <Construction size={32} style={{ color: "#4a5568" }} />
          <p className="text-sm font-medium" style={{ color: "#6b7280" }}>Under Construction</p>
          <p className="text-xs text-center max-w-xs" style={{ color: "#374151" }}>
            Something fun is coming here soon. Stay tuned. 🚧
          </p>
        </div>
      </div>
    </div>
  );
};

const SpotifyPage = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col w-full h-full" style={{ background: "#121212" }}>
      {/* Playlist tabs */}
      <div
        className="flex items-center gap-2 px-4 py-3 overflow-x-auto"
        style={{ background: "#181818", borderBottom: "1px solid #282828", flexShrink: 0 }}
      >
        {PLAYLISTS.map((pl, i) => (
          <button
            key={pl.id}
            onClick={() => setActive(i)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
            style={{
              background: active === i ? "#1db954" : "rgba(255,255,255,0.08)",
              color:      active === i ? "#000"    : "#b3b3b3",
            }}
          >
            🎵 {pl.label}
          </button>
        ))}
      </div>

      {/* Embed */}
      <div className="flex-1 p-4">
        <iframe
          key={PLAYLISTS[active].id}
          style={{ borderRadius: "12px", width: "100%", height: "100%", border: "none" }}
          src={`https://open.spotify.com/embed/playlist/${PLAYLISTS[active].id}?utm_source=generator&theme=0`}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default function SafariApp() {
  const [tabs, setTabs]           = useState<Tab[]>(INITIAL_TABS);
  const [activeTab, setActiveTab] = useState("home");

  const current = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  const addTab = () => {
    const id = `tab-${Date.now()}`;
    setTabs((p) => [...p, { id, label: "New Page", url: "newtab", favicon: "🏠" }]);
    setActiveTab(id);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = tabs.filter((t) => t.id !== id);
    if (!remaining.length) return;
    setTabs(remaining);
    if (activeTab === id) setActiveTab(remaining[remaining.length - 1].id);
  };

  return (
    <div
      className="flex flex-col h-full w-full overflow-hidden"
      style={{ background: "#2c2c2e", fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* Tab Bar */}
      <div
        className="flex items-center px-2 gap-0.5 overflow-x-auto"
        style={{ background: "#4a4a4c", height: "36px", flexShrink: 0, borderBottom: "1px solid #5a5a5c" }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3 rounded-lg cursor-pointer group transition-all flex-shrink-0"
              style={{ height: "28px", background: isActive ? "#5a5a5c" : "transparent", maxWidth: "160px", minWidth: "80px" }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <span style={{ fontSize: "12px", flexShrink: 0 }}>{tab.favicon}</span>
              <span className="truncate flex-1" style={{ fontSize: "12px", color: isActive ? "#fff" : "#888", minWidth: 0 }}>
                {tab.label}
              </span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 rounded hover:bg-white/10 flex items-center justify-center"
                  style={{ width: "16px", height: "16px", color: "#888" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M5 4.293L8.146 1.146l.708.708L5.707 5l3.147 3.146-.708.708L5 5.707 1.854 8.854l-.708-.708L4.293 5 1.146 1.854l.708-.708L5 4.293z"/>
                  </svg>
                </button>
              )}
            </div>
          );
        })}
        <button
          onClick={addTab}
          className="flex items-center justify-center w-7 h-7 rounded-lg ml-1 transition-colors flex-shrink-0"
          style={{ color: "#888" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center gap-1 px-3"
        style={{ background: "#2c2c2e", height: "44px", flexShrink: 0, borderBottom: "1px solid #4a4a4c" }}
      >
        <TBtn disabled><ChevronLeft size={16} /></TBtn>
        <TBtn disabled><ChevronRight size={16} /></TBtn>
        <TBtn><RotateCcw size={14} /></TBtn>
        <div
          className="flex-1 flex items-center gap-2 px-3 mx-2 rounded-lg"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", height: "30px" }}
        >
          <svg width="11" height="13" viewBox="0 0 11 13" fill="#6b7280" style={{ flexShrink: 0 }}>
            <path d="M9 5V4a3.5 3.5 0 0 0-7 0v1H1v8h9V5H9zm-6 0V4a2.5 2.5 0 0 1 5 0v1H3z"/>
          </svg>
          <span
            className="flex-1 text-center truncate"
            style={{ fontSize: "12px", color: current.url === "newtab" ? "#4a5568" : "#d1d5db" }}
          >
            {current.url === "newtab" ? "New Page" : current.url}
          </span>
        </div>
        <TBtn><Share size={14} /></TBtn>
        <TBtn><BookOpen size={14} /></TBtn>
        <TBtn><Grid2x2 size={14} /></TBtn>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {current.url === "newtab"           && <HomePage />}
        {current.url === "open.spotify.com" && <SpotifyPage />}
      </div>
    </div>
  );
}
