import { useState, useRef, useEffect } from "react";
import { Folder, FileText, Code, GitBranch, Cloud, HardDrive } from "lucide-react";

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
  text: string;
}

const HELP_TEXT = `Available commands / Comandos disponíveis:
  help / ajuda                    Show this help message
  about / sobre                   About me
  certificates / certificados     List certificates
  contact / contato               Contact information
  experience / experiencia        Work experience
  clear                           Clear terminal`;

const ABOUT_TEXT = `Sou Caio Resende, estudante de Engenharia de Software na PUC Minas e arquiteto de soluções AWS na ForceOne. Atuo no desenvolvimento de soluções em nuvem com foco em arquitetura eficiente, otimização de custos e boas práticas de infraestrutura. Sou entusiasta de idiomas, fluente em português e inglês, com espanhol avançado e alemão em nível intermediário. Busco sempre aprender novas tecnologias e trazer inovações para o ambiente de trabalho.

I am Caio Resende, a Software Engineering student at PUC Minas and an AWS Solutions Architect at ForceOne. I work on developing cloud solutions with a focus on efficient architecture, cost optimization, and infrastructure best practices. I am an enthusiast of languages, fluent in Portuguese and English, with advanced Spanish and intermediate German. I am always looking to learn new technologies and bring innovations to the work environment.`;

const CERTIFICATES_TEXT = `→ AWS Certified Cloud Practitioner
→ AWS Certified AI Practitioner
→ AWS Certified Solutions Architect - Associate
→ AWS Certified CloudOps Engineer - Associate`;

const CONTATO_TEXT = `Email:    caiosouzamresende@gmail.com
GitHub:   github.com/CaioSResende
LinkedIn: linkedin.com/in/caiosouzaderesende`;

const EXPERIENCE_TEXT = `→ Intern at Educat (jun 2023 - jan 2025)
  → Technical support at SESI implementation project (jun 2023 - jun 2024)
  → Intern as a DevOps, working with OnPremises and AWS Cloud tools (jun 2024 - jan 2025)

→ Intern at ForceOne (jan 2025 - present)
  → Intern as a AWS Cloud Architect`;

const COMMANDS: Record<string, string> = {
  help:         HELP_TEXT,
  ajuda:        HELP_TEXT,
  about:        ABOUT_TEXT,
  sobre:        ABOUT_TEXT,
  certificates: CERTIFICATES_TEXT,
  certificados: CERTIFICATES_TEXT,
  certs:        CERTIFICATES_TEXT,
  contact:      CONTATO_TEXT,
  contato:      CONTATO_TEXT,
  experience:   EXPERIENCE_TEXT,
  experiencia:  EXPERIENCE_TEXT,
  clear:        "__CLEAR__",
};

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  command?: string;
  openApp?: string;
}

interface SidebarGroup {
  section: string;
  items: SidebarItem[];
}

interface TerminalAppProps {
  onOpenApp: (id: string) => void;
}

const TerminalApp = ({ onOpenApp }: TerminalAppProps) => {
  const [activeItem, setActiveItem] = useState("Portfolio_Root");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      type: "output",
      text: `Welcome to Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0).\nType help to see available commands or click files in the sidebar.\nDigite ajuda para ver os comandos disponíveis ou clique nos arquivos na barra lateral.`,
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
        { label: "Portfolio_Root", icon: <Folder   size={13} className="text-[#4fd1c5]" /> },
        { label: "Downloads",      icon: <Folder   size={13} className="text-[#4fd1c5]" /> },
        { label: "iCloud Drive",   icon: <HardDrive size={13} className="text-[#4fd1c5]" /> },
      ],
    },
    {
      section: "PROJECT FILES",
      items: [
        { label: "readme.md",       icon: <FileText  size={13} className="text-[#68d391]" />, command: "about"        },
        { label: "certs.sh",        icon: <Code      size={13} className="text-[#fbd38d]" />, command: "certificates" },
        { label: "experience.json", icon: <HardDrive size={13} className="text-[#76e4f7]" />, command: "experience"   },
        { label: "contact.git",     icon: <GitBranch size={13} className="text-[#fc8181]" />, command: "contact", openApp: "contacts" },
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

    if (trimmed === "clear") { setHistory([]); return; }

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
    if (item.command) handleCommand(item.command);
    if (item.openApp) onOpenApp(item.openApp);
    inputRef.current?.focus();
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
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <div
        className="flex h-full w-full overflow-hidden text-sm"
        style={{ background: "#0d1117", fontFamily: JETBRAINS }}
      >
        {/* Sidebar */}
        <div
          className="w-52 flex-shrink-0 flex flex-col py-3 px-2 gap-1 border-r"
          style={{ background: "#0d1117", borderColor: "#1e2a38" }}
        >
          {sidebarGroups.map((group) => (
            <div key={group.section} className="mb-2">
              <p className="text-[14px] font-semibold tracking-widest mb-1 px-1" style={{ color: "#4a5568" }}>
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
                      color:      isActive ? "#4fd1c5" : "#718096",
                      fontSize:   "14px",
                      cursor:     item.command ? "pointer" : "default",
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
          <div className="px-4 pt-3 pb-1 text-sm" style={{ color: "#4a5568" }}>
            Last login: {new Date().toDateString()} on ttys001
          </div>

          {/* Scrollable output */}
          <div className="flex-1 overflow-y-auto px-4 pb-2" style={{ scrollbarColor: "#2d3748 transparent" }}>
            {/* ASCII Art */}
            <pre
              className="text-xs leading-tight mb-3 select-none"
              style={{
                color:      "#38b2ac",
                textShadow: "0 0 10px rgba(56,178,172,0.5)",
                fontFamily: JETBRAINS,
              }}
            >
              {ASCII_ART}
            </pre>

            {/* History */}
            {history.map((entry, i) => (
              <div key={i} className="mb-1">
                {entry.type === "command" && (
                  <div className="flex items-center gap-1 text-base">
                    <span style={{ color: "#48bb78" }}>user@dev_os:~$</span>
                    <span style={{ color: "#ffffff" }}> {entry.text}</span>
                  </div>
                )}
                {entry.type === "output" && (
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed" style={{ color: "#cecbcb" }}>
                    {entry.text}
                  </pre>
                )}
                {entry.type === "error" && (
                  <pre className="whitespace-pre-wrap text-sm" style={{ color: "#fc8181" }}>
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
              style={{ color: "#e2e8f0", fontFamily: JETBRAINS }}
              spellCheck={false}
              autoComplete="off"
            />
            <span className="w-2 h-4 animate-pulse" style={{ background: "#48bb78", opacity: 0.8 }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TerminalApp;