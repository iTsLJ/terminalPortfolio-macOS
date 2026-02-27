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
      </div>
    </div>
  );
};

export default TerminalApp;
