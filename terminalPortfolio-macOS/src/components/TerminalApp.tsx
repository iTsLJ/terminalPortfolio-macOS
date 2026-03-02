<<<<<<< Updated upstream
import { useMemo, useState } from "react";
import Terminal, { TerminalOutput } from "react-terminal-ui";
import TerminalSidebar from "@/components/terminal/TerminalSideBar";
import { userData } from "@/data/user";

interface HistoryItem {
  id: number;
  content: string;
}

const initialHistory: HistoryItem[] = [
  { id: 1, content: "Last login: Tue Oct 24 10:41:12 on ttys001" },
  { id: 2, content: 'Digite "help" para listar os comandos disponíveis.' },
  { id: 3, content: "" },
];

const TerminalApp = () => {
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const prompt = useMemo(() => `${userData.username}@${userData.os}`, []);

  const pushLine = (line: string, list: HistoryItem[]) => {
    const nextId = list.length ? list[list.length - 1].id + 1 : 1;
    return [...list, { id: nextId, content: line }];
  };

  const onInput = (rawInput: string) => {
    const command = rawInput.trim().toLowerCase();

    setHistory((prev) => {
      let next = pushLine(`${prompt} $ ${rawInput}`, prev);

      if (command === "clear") {
        return [];
      }

      if (command === "help") {
        next = pushLine("Comandos disponíveis: help, about, clear", next);
        return next;
      }

      if (command === "about") {
        next = pushLine(`${userData.username} - ${userData.role} (${userData.location})`, next);
        return next;
      }

      next = pushLine(`Comando não encontrado: ${rawInput}`, next);
      next = pushLine('Use "help" para ver as opções.', next);
      return next;
    });
  };

  return (
    <div className="h-full flex">
      <TerminalSidebar />
      <div className="flex-1">
        <Terminal name="terminal" prompt={prompt} onInput={onInput}>
          {history.map((line) => (
            <TerminalOutput key={line.id}>{line.content}</TerminalOutput>
          ))}
        </Terminal>
=======
import { useState, useRef, useEffect } from "react";
import { Folder, FileText, Code, GitBranch, Cloud, HardDrive } from "lucide-react";

const ASCII_ART = `
 ██╗   ██╗███████╗███████╗██████╗ 
 ██║   ██║██╔════╝██╔════╝██╔══██╗
 ██║   ██║███████╗█████╗  ██████╔╝
 ██║   ██║╚════██║██╔══╝  ██╔══██╗
 ╚██████╔╝███████║███████╗██║  ██║
  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝`.trim();

interface HistoryEntry {
  type: "output" | "command" | "error";
  text: string;
}

const HELP_TEXT = `Available commands:
  help          Show this help message
  about         About this portfolio
  projects      List projects
  skills        Show skills
  contact       Contact information
  clear         Clear terminal
  whoami        Display current user`;

const COMMANDS: Record<string, string> = {
  help: HELP_TEXT,
  about: "Full-stack developer passionate about clean code and beautiful interfaces.\nBuilding things that matter, one commit at a time.",
  projects: "→ terminalPortfolio-macOS  — This very portfolio!\n→ devOS                    — Custom macOS-like web OS\n→ reactFlow                — Visual workflow builder",
  skills: "Languages:   TypeScript, JavaScript, Python\nFrameworks:  React, Next.js, Node.js\nTools:       Git, Docker, Vite, Tailwind",
  contact: "Email:    user@dev.os\nGitHub:   github.com/iTsLJ\nLinkedIn: linkedin.com/in/user",
  whoami: "user — Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0)",
  clear: "__CLEAR__",
};

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
  const [activeItem, setActiveItem] = useState("Portfolio_Root");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      type: "output",
      text: `Welcome to Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0).\nType help to see available commands or click files in the sidebar.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sidebarGroups: SidebarGroup[] = [
    {
      section: "FAVORITES",
      items: [
        { label: "Portfolio_Root", icon: <Folder size={13} className="text-[#4fd1c5]" /> },
        { label: "Downloads", icon: <Folder size={13} className="text-[#4fd1c5]" /> },
        { label: "iCloud Drive", icon: <Cloud size={13} className="text-[#4fd1c5]" /> },
      ],
    },
    {
      section: "PROJECT FILES",
      items: [
        { label: "readme.md",    icon: <FileText size={13} className="text-[#68d391]" />, command: "about"    },
        { label: "projects.sh",  icon: <Code     size={13} className="text-[#fbd38d]" />, command: "projects" },
        { label: "skills.json",  icon: <HardDrive size={13} className="text-[#76e4f7]" />, command: "skills"   },
        { label: "contact.git",  icon: <GitBranch size={13} className="text-[#fc8181]" />, command: "contact"  },
      ],
    },
  ];

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

    const newEntries: HistoryEntry[] = [{ type: "command", text: trimmed }];

    const response = COMMANDS[trimmed];
    if (response) {
      newEntries.push({ type: "output", text: response });
    } else {
      newEntries.push({
        type: "error",
        text: `command not found: ${trimmed}\nType 'help' for available commands.`,
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

  return (
    <div className="flex h-full w-full overflow-hidden font-mono text-sm" style={{ background: "#0d1117" }}>
      {/* Sidebar */}
      <div
        className="w-44 flex-shrink-0 flex flex-col py-3 px-2 gap-1 border-r"
        style={{ background: "#0d1117", borderColor: "#1e2a38" }}
      >
        {sidebarGroups.map((group) => (
          <div key={group.section} className="mb-2">
            <p className="text-[10px] font-semibold tracking-widest mb-1 px-1" style={{ color: "#4a5568" }}>
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
                    background: isActive ? "rgba(79,209,197,0.1)" : "transparent",
                    color: isActive ? "#4fd1c5" : "#718096",
                    fontSize: "12px",
                    cursor: item.command ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
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
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ background: "#0d1117" }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Last login bar */}
        <div className="px-4 pt-3 pb-1 text-xs" style={{ color: "#4a5568" }}>
          Last login: {new Date().toDateString()} on ttys001
        </div>

        {/* Scrollable output */}
        <div className="flex-1 overflow-y-auto px-4 pb-2" style={{ scrollbarColor: "#2d3748 transparent" }}>
          {/* ASCII Art */}
          <pre
            className="text-xs leading-tight mb-3 select-none"
            style={{
              color: "#38b2ac",
              textShadow: "0 0 10px rgba(56,178,172,0.5)",
              fontFamily: "monospace",
            }}
          >
            {ASCII_ART}
          </pre>

          {/* History */}
          {history.map((entry, i) => (
            <div key={i} className="mb-1">
              {entry.type === "command" && (
                <div className="flex items-center gap-1">
                  <span style={{ color: "#48bb78" }}>user@dev_os:~$</span>
                  <span style={{ color: "#e2e8f0" }}> {entry.text}</span>
                </div>
              )}
              {entry.type === "output" && (
                <pre className="whitespace-pre-wrap text-xs leading-relaxed" style={{ color: "#a0aec0", fontFamily: "inherit" }}>
                  {entry.text}
                </pre>
              )}
              {entry.type === "error" && (
                <pre className="whitespace-pre-wrap text-xs" style={{ color: "#fc8181", fontFamily: "inherit" }}>
                  {entry.text}
                </pre>
              )}
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Input line */}
        <div className="flex items-center gap-2 px-4 py-3 border-t" style={{ borderColor: "#1e2a38" }}>
          <span style={{ color: "#48bb78" }} className="select-none flex-shrink-0">
            user@dev_os:~$
          </span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-sm caret-green-400"
            style={{ color: "#e2e8f0", fontFamily: "inherit" }}
            spellCheck={false}
            autoComplete="off"
          />
          <span className="w-2 h-4 animate-pulse" style={{ background: "#48bb78", opacity: 0.8 }} />
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default TerminalApp;
