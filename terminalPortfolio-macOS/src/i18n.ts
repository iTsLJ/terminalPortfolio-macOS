import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
    en: {
        translation: {
            menu: {
                file: "File",
                edit: "Edit",
                view: "View",
                window: "Window",
                help: "Help",
                language: "Language",
            },

            terminal: {
                welcome:
                    "Welcome to Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0).",
                lastLogin: "Last login:",
                typeHelp:
                    "Type 'help' to see available commands or click files in the sidebar.",
                commandNotFound: "Command not found:",
                typeHelpHint: "Type 'help' for available commands.",
            },

            commands: {
                help: `Available commands:
  help          Show help
  about         About this portfolio
  projects      List projects
  skills        Show skills
  contact       Contact info
  clear         Clear terminal
  whoami        Display current user`,
                about:
                    "Full-stack developer passionate about clean code and beautiful interfaces.\nBuilding things that matter, one commit at a time.",
                projects:
                    "→ terminalPortfolio-macOS — This very portfolio!\n→ devOS — Custom macOS-like web OS\n→ reactFlow — Visual workflow builder",
                skills:
                    "Languages: TypeScript, JavaScript, Python\nFrameworks: React, Next.js, Node.js\nTools: Git, Docker, Vite, Tailwind",
                contact:
                    "Email: user@dev.os\nGitHub: github.com/iTsLJ\nLinkedIn: linkedin.com/in/user",
                whoami: "user — Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0)",
            },

            sidebar: {
                favorites: "FAVORITES",
                projectFiles: "PROJECT FILES",
            },
        },
    },

    pt: {
        translation: {
            menu: {
                file: "Arquivo",
                edit: "Editar",
                view: "Visualizar",
                window: "Janela",
                help: "Ajuda",
                language: "Idioma",
            },

            terminal: {
                welcome:
                    "Bem-vindo ao Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0).",
                lastLogin: "Último login:",
                typeHelp:
                    "Digite 'help' para ver os comandos disponíveis ou clique nos arquivos na barra lateral.",
                commandNotFound: "Comando não reconhecido:",
                typeHelpHint: "Digite 'help' para ver os comandos.",
            },

            commands: {
                help: `Comandos disponíveis:
  help          Mostrar ajuda
  about         Sobre o portfólio
  projects      Listar projetos
  skills        Mostrar habilidades
  contact       Contato
  clear         Limpar terminal
  whoami        Mostrar usuário`,
                about:
                    "Desenvolvedor Full-stack apaixonado por código limpo e interfaces bonitas.\nConstruindo coisas que importam, um commit por vez.",
                projects:
                    "→ terminalPortfolio-macOS — Este portfólio!\n→ devOS — Sistema web estilo macOS\n→ reactFlow — Construtor visual de fluxos",
                skills:
                    "Linguagens: TypeScript, JavaScript, Python\nFrameworks: React, Next.js, Node.js\nFerramentas: Git, Docker, Vite, Tailwind",
                contact:
                    "Email: user@dev.os\nGitHub: github.com/iTsLJ\nLinkedIn: linkedin.com/in/user",
                whoami: "user — Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0)",
            },

            sidebar: {
                favorites: "FAVORITOS",
                projectFiles: "ARQUIVOS DO PROJETO",
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;