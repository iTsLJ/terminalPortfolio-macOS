const sidebarButtons = ["Portfolio_Root", "Downloads", "readme.md", "projects.sh", "contact.git"];

const TerminalSidebar = () => {
  return (
    <aside className="w-56 border-r border-white/10 bg-[#111828]/70 p-3 text-sm text-[#8f9bb8]">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6f7893]">Favorites</p>
      <div className="space-y-1">
        {sidebarButtons.map((button, index) => (
          <button
            key={button}
            className={`w-full rounded-md px-3 py-2 text-left transition ${
              index === 0 ? "bg-white/10 text-[#d7def5]" : "hover:bg-white/5"
            }`}
            type="button"
          >
            {button}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default TerminalSidebar;
