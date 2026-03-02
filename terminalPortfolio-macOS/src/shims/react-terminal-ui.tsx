import { FormEvent, ReactNode, useState } from "react";

interface TerminalProps {
  name?: string;
  prompt?: string;
  onInput?: (input: string) => void;
  children?: ReactNode;
}

export const ColorMode = {
  Dark: "dark",
  Light: "light",
} as const;

export const TerminalOutput = ({ children }: { children: ReactNode }) => (
  <div className="whitespace-pre-wrap break-words leading-6">{children}</div>
);

const Terminal = ({ prompt = ">", onInput, children }: TerminalProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = value.trim();
    if (!command) return;
    onInput?.(command);
    setValue("");
  };

  return (
    <div className="h-full w-full bg-[#0d1220] text-[#b6bfdb] font-mono text-sm p-4 overflow-y-auto">
      <div className="space-y-1">{children}</div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
        <span className="text-emerald-400">{prompt} $</span>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="flex-1 bg-transparent text-[#e0e7ff] outline-none"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
