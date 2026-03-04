import { useState, useRef, useEffect } from "react";
import {
  Folder,
  FileText,
  Code,
  GitBranch,
  Cloud,
  HardDrive,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const ASCII_ART = `
 ██╗   ██╗███████╗███████╗██████╗ 
 ██║   ██║██╔════╝██╔════╝██╔══██╗
 ██║   ██║███████╗█████╗  ██████╔╝
 ██║   ██║╚════██║██╔══╝  ██╔══██╗
 ╚██████╔╝███████║███████╗██║  ██║
  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝`.trim();

const JETBRAINS = "'JetBrains Mono', monospace";

interface HistoryEntry {
  type: "output" | "command" | "error";
  text?: string;
  translationKey?: string;
}

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  command?: string;
}

interface SidebarGroup {
  section: string;
  items: SidebarItem[];
}

const TerminalApp = () => {
  const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState("Portfolio_Root");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const VALID_COMMANDS = [
    "help",
    "about",
    "projects",
    "skills",
    "contact",
    "whoami",
    "clear",
  ];

  useEffect(() => {
    setHistory([
      { type: "output", translationKey: "terminal.welcome" },
      { type: "output", translationKey: "terminal.typeHelp" },
    ]);
  }, [t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCommandHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const newEntries: HistoryEntry[] = [
      { type: "command", text: trimmed },
    ];

    if (VALID_COMMANDS.includes(trimmed)) {
      newEntries.push({
        type: "output",
        translationKey: `commands.${trimmed}`,
      });
    } else {
      newEntries.push({
        type: "error",
        translationKey: "terminal.commandNotFound",
        text: trimmed,
      });
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleSidebarClick = (item: SidebarItem) => {
    setActiveItem(item.label);
    if (item.command) {
      handleCommand(item.command);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(next);
      setInput(commandHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? "" : commandHistory[next]);
    }
  };

  const sidebarGroups: SidebarGroup[] = [
    {
      section: t("sidebar.favorites"),
      items: [
        {
          label: "Portfolio_Root",
          icon: <Folder size={13} className="text-[#4fd1c5]" />,
        },
        {
          label: "Downloads",
          icon: <Folder size={13} className="text-[#4fd1c5]" />,
        },
        {
          label: "iCloud Drive",
          icon: <Cloud size={13} className="text-[#4fd1c5]" />,
        },
      ],
    },
    {
      section: t("sidebar.projectFiles"),
      items: [
        {
          label: "readme.md",
          icon: <FileText size={13} className="text-[#68d391]" />,
          command: "about",
        },
        {
          label: "projects.sh",
          icon: <Code size={13} className="text-[#fbd38d]" />,
          command: "projects",
        },
        {
          label: "skills.json",
          icon: <HardDrive size={13} className="text-[#76e4f7]" />,
          command: "skills",
        },
        {
          label: "contact.git",
          icon: <GitBranch size={13} className="text-[#fc8181]" />,
          command: "contact",
        },
      ],
    },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
      />

      <div
        className="flex h-full w-full overflow-hidden text-sm"
        style={{ background: "#0d1117", fontFamily: JETBRAINS }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Sidebar */}
        <div
          className="w-44 flex-shrink-0 flex flex-col py-3 px-2 gap-1 border-r"
          style={{ background: "#0d1117", borderColor: "#1e2a38" }}
        >
          {sidebarGroups.map((group) => (
            <div key={group.section} className="mb-2">
              <p className="text-[10px] font-semibold tracking-widest mb-1 px-1 text-[#4a5568]">
                {group.section}
              </p>

              {group.items.map((item) => {
                const isActive = activeItem === item.label;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleSidebarClick(item)}
                    className="w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-all duration-150"
                    style={{
                      background: isActive
                        ? "rgba(79,209,197,0.1)"
                        : "transparent",
                      color: isActive ? "#4fd1c5" : "#718096",
                      fontSize: "12px",
                    }}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Terminal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 pt-3 pb-1 text-xs text-[#4a5568]">
            {t("terminal.lastLogin")}{" "}
            {new Date().toDateString()} on ttys001
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-2">
            <pre
              className="text-xs leading-tight mb-3 select-none text-[#38b2ac]"
              style={{ fontFamily: JETBRAINS }}
            >
              {ASCII_ART}
            </pre>

            {history.map((entry, i) => (
              <div key={i} className="mb-1">
                {entry.type === "command" && (
                  <div className="flex gap-1">
                    <span className="text-[#48bb78]">
                      user@dev_os:~$
                    </span>
                    <span className="text-[#e2e8f0]">
                      {entry.text}
                    </span>
                  </div>
                )}

                {entry.type === "output" && (
                  <pre className="whitespace-pre-wrap text-xs text-[#a0aec0]">
                    {entry.translationKey
                      ? t(entry.translationKey)
                      : entry.text}
                  </pre>
                )}

                {entry.type === "error" && (
                  <pre className="whitespace-pre-wrap text-xs text-[#fc8181]">
                    {t("terminal.commandNotFound")}{" "}
                    {entry.text}
                  </pre>
                )}
              </div>
            ))}

            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 px-4 py-3 border-t border-[#1e2a38]">
            <span className="text-[#48bb78] select-none">
              user@dev_os:~$
            </span>
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-sm text-[#e2e8f0]"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TerminalApp;