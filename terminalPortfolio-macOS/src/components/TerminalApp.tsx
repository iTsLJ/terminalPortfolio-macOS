import { useState, useRef, useEffect } from "react";
import { Folder, FileText, Code, GitBranch, HardDrive } from "lucide-react";

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

type Lang = "en" | "pt";

const CONTENT = {
  en: {
    welcome:      `Welcome to Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0).\nType help to see available commands or click files in the sidebar.`,
    notFound:     (cmd: string) => `command not found: ${cmd}\nType 'help' for available commands.`,
    help: `Available commands:
  help          Show this help message
  about         About me
  certificates  List certificates
  contact       Contact information
  experience    Work experience
  clear         Clear terminal`,
    about: `I am Caio Resende, a Software Engineering student at PUC Minas and an AWS Solutions Architect at ForceOne. I work on developing cloud solutions with a focus on efficient architecture, cost optimization, and infrastructure best practices. I am an enthusiast of languages, fluent in Portuguese and English, with advanced Spanish and intermediate German. I am always looking to learn new technologies and bring innovations to the work environment.\n\nSou Caio Resende, estudante de Engenharia de Software na PUC Minas e arquiteto de soluções AWS na ForceOne. Atuo no desenvolvimento de soluções em nuvem com foco em arquitetura eficiente, otimização de custos e boas práticas de infraestrutura. Sou entusiasta de idiomas, fluente em português e inglês, com espanhol avançado e alemão em nível intermediário. Busco sempre aprender novas tecnologias e trazer inovações para o ambiente de trabalho.`,
    certificates: `→ AWS Certified Cloud Practitioner
→ AWS Certified AI Practitioner
→ AWS Certified Solutions Architect - Associate
→ AWS Certified CloudOps Engineer - Associate`,
    contact: `Email:    caiosouzamresende@gmail.com
GitHub:   github.com/CaioSResende
LinkedIn: linkedin.com/in/caiosouzaderesende`,
    experience: `→ Intern at Educat (jun 2023 - jan 2025)
  → Technical support at SESI implementation project (jun 2023 - jun 2024)
  → Intern as a DevOps, working with OnPremises and AWS Cloud tools (jun 2024 - jan 2025)

→ Intern at ForceOne (jan 2025 - present)
  → Intern as a AWS Cloud Architect`,
    commands: ["help", "about", "certificates", "contact", "experience", "clear"],
  },
  pt: {
    welcome:      `Bem-vindo ao Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0).\nDigite ajuda para ver os comandos disponíveis ou clique nos arquivos na barra lateral.`,
    notFound:     (cmd: string) => `comando não encontrado: ${cmd}\nDigite 'ajuda' para ver os comandos disponíveis.`,
    help: `Comandos disponíveis:
  ajuda         Mostrar esta mensagem de ajuda
  sobre         Sobre mim
  certificados  Listar certificados
  contato       Informações de contato
  experiencia   Experiência profissional
  clear         Limpar terminal`,
    about: `Sou Caio Resende, estudante de Engenharia de Software na PUC Minas e arquiteto de soluções AWS na ForceOne. Atuo no desenvolvimento de soluções em nuvem com foco em arquitetura eficiente, otimização de custos e boas práticas de infraestrutura. Sou entusiasta de idiomas, fluente em português e inglês, com espanhol avançado e alemão em nível intermediário. Busco sempre aprender novas tecnologias e trazer inovações para o ambiente de trabalho.\n\nI am Caio Resende, a Software Engineering student at PUC Minas and an AWS Solutions Architect at ForceOne. I work on developing cloud solutions with a focus on efficient architecture, cost optimization, and infrastructure best practices. I am an enthusiast of languages, fluent in Portuguese and English, with advanced Spanish and intermediate German. I am always looking to learn new technologies and bring innovations to the work environment.`,
    certificates: `→ AWS Certified Cloud Practitioner
→ AWS Certified AI Practitioner
→ AWS Certified Solutions Architect - Associate
→ AWS Certified CloudOps Engineer - Associate`,
    contact: `Email:    caiosouzamresende@gmail.com
GitHub:   github.com/CaioSResende
LinkedIn: linkedin.com/in/caiosouzaderesende`,
    experience: `→ Estágio na Educat (jun 2023 - jan 2025)
  → Suporte técnico no projeto de implantação SESI (jun 2023 - jun 2024)
  → Estágio como DevOps, trabalhando com ferramentas OnPremises e AWS Cloud (jun 2024 - jan 2025)

→ Estágio na ForceOne (jan 2025 - presente)
  → Estágio como Arquiteto de Soluções AWS`,
    commands: ["ajuda", "sobre", "certificados", "contato", "experiencia", "clear"],
  },
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
  const [lang, setLang] = useState<Lang>("en");
  const [activeItem, setActiveItem] = useState("Portfolio_Root");
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "output", text: CONTENT.en.welcome },
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
        { label: "Portfolio_Root", icon: <Folder    size={13} className="text-[#4fd1c5]" /> },
        { label: "Downloads",      icon: <Folder    size={13} className="text-[#4fd1c5]" /> },
        { label: "iCloud Drive",   icon: <HardDrive size={13} className="text-[#4fd1c5]" /> },
      ],
    },
    {
      section: "PROJECT FILES",
      items: [
        { label: "readme.md",       icon: <FileText  size={13} className="text-[#68d391]" />, command: lang === "en" ? "about"        : "sobre"        },
        { label: "certs.sh",        icon: <Code      size={13} className="text-[#fbd38d]" />, command: lang === "en" ? "certificates" : "certificados" },
        { label: "experience.json", icon: <HardDrive size={13} className="text-[#76e4f7]" />, command: lang === "en" ? "experience"   : "experiencia"  },
        { label: "contact.git",     icon: <GitBranch size={13} className="text-[#fc8181]" />, command: lang === "en" ? "contact"      : "contato", openApp: "contacts" },
      ],
    },
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const getCommands = (l: Lang): Record<string, string> => ({
    help:         CONTENT[l].help,
    ajuda:        CONTENT[l].help,
    about:        CONTENT[l].about,
    sobre:        CONTENT[l].about,
    certificates: CONTENT[l].certificates,
    certificados: CONTENT[l].certificates,
    certs:        CONTENT[l].certificates,
    contact:      CONTENT[l].contact,
    contato:      CONTENT[l].contact,
    experience:   CONTENT[l].experience,
    experiencia:  CONTENT[l].experience,
  });

  const handleLangSwitch = (newLang: Lang) => {
    setLang(newLang);
    setHistory([{ type: "output", text: CONTENT[newLang].welcome }]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCommandHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    if (trimmed === "clear") { setHistory([]); return; }

    const newEntries: HistoryEntry[] = [{ type: "command", text: trimmed }];
    const commands = getCommands(lang);
    const response = commands[trimmed];
    if (response) {
      newEntries.push({ type: "output", text: response });
    } else {
      newEntries.push({ type: "error", text: CONTENT[lang].notFound(trimmed) });
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
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-4 pt-3 pb-1 text-sm"
            style={{ color: "#4a5568" }}
          >
            <span>Last login: {new Date().toDateString()} on ttys001</span>

            {/* Lang toggle */}
            <div
              className="flex items-center gap-1 rounded px-1 py-0.5"
              style={{ background: "#1e2a38" }}
              onClick={(e) => e.stopPropagation()}
            >
              {(["en", "pt"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangSwitch(l)}
                  className="px-2 py-0.5 rounded text-xs font-semibold transition-all"
                  style={{
                    background: lang === l ? "#38b2ac" : "transparent",
                    color:      lang === l ? "#0d1117" : "#4a5568",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable output */}
          <div className="flex-1 overflow-y-auto px-4 pb-2" style={{ scrollbarColor: "#2d3748 transparent" }}>
            <pre
              className="text-xs leading-tight mb-3 select-none"
              style={{ color: "#38b2ac", textShadow: "0 0 10px rgba(56,178,172,0.5)", fontFamily: JETBRAINS }}
            >
              {ASCII_ART}
            </pre>

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