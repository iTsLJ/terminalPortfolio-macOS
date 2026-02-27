import { Cloud, Code2, FileText, Folder, GitCommitHorizontal, TerminalSquare } from "lucide-react";

const favorites = [
  { label: "Portfolio_Root", icon: Folder, iconClass: "text-blue-400" },
  { label: "Downloads", icon: Folder, iconClass: "text-blue-400" },
  { label: "iCloud Drive", icon: Cloud, iconClass: "text-violet-400" },
];

const projectFiles = [
  { label: "readme.md", icon: FileText, iconClass: "text-yellow-400" },
  { label: "projects.sh", icon: TerminalSquare, iconClass: "text-emerald-400" },
  { label: "skills.json", icon: Code2, iconClass: "text-orange-400" },
  { label: "contact.git", icon: GitCommitHorizontal, iconClass: "text-rose-400" },
];

const TerminalSidebar = () => {
  return (
    <aside className="w-56 border-r border-white/10 bg-[#111828]/70 p-3 text-sm text-[#8f9bb8]">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6f7893]">Favorites</p>
      <div className="space-y-1">
        {favorites.map((item, index) => {
          const Icon = item.icon;
          return (
          <button
            key={item.label}
            className={`w-full rounded-md px-3 py-2 text-left transition ${
              index === 0 ? "bg-white/10 text-[#d7def5]" : "hover:bg-white/5"
            }`}
            type="button"
          >
            <span className="flex items-center gap-3">
              <Icon className={`h-4 w-4 ${item.iconClass}`} />
              <span>{item.label}</span>
            </span>
          </button>
          );
        })}
      </div>

      <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wide text-[#6f7893]">Project Files</p>
      <div className="space-y-1">
        {projectFiles.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} className="w-full rounded-md px-3 py-2 text-left transition hover:bg-white/5" type="button">
              <span className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${item.iconClass}`} />
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default TerminalSidebar;
