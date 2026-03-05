import { useState } from "react";
import { Files, Search, GitBranch, Settings2 } from "lucide-react";

type Lang   = "en" | "pt";
type FileId = "main.tf" | "Dockerfile" | "pipeline.yml" | "README.md";

/* ─────────────────────────── EXACT VS CODE DARK+ COLOURS ─────────────────────────── */
const VS = {
  // chrome
  activityBar:      "#333333",
  activityBarFg:    "#ffffff",
  activityBarIcon:  "#858585",
  sidebarBg:        "#252526",
  sidebarFg:        "#cccccc",
  sidebarHover:     "#2a2d2e",
  sidebarActive:    "#094771",
  tabBarBg:         "#2d2d2d",
  tabActiveBg:      "#1e1e1e",
  tabInactiveBg:    "#2d2d2d",
  tabInactiveFg:    "#969696",
  tabActiveFg:      "#ffffff",
  tabActiveTopBorder: "#007acc",
  editorBg:         "#1e1e1e",
  editorFg:         "#d4d4d4",
  lineNumFg:        "#858585",
  lineNumActiveFg:  "#c6c6c6",
  scrollbarBg:      "#424242",
  borderColor:      "#3c3c3c",
  breadcrumbBg:     "#1e1e1e",
  breadcrumbFg:     "#858585",
  statusBarBg:      "#007acc",
  statusBarFg:      "#ffffff",
  // syntax — exactly VS Code Dark+
  syn_keyword:      "#569cd6",   // blue     — terraform, FROM, RUN, etc.
  syn_type:         "#4ec9b0",   // teal     — types, engineer:
  syn_string:       "#ce9178",   // orange   — quoted strings
  syn_number:       "#b5cea8",   // green    — numbers
  syn_comment:      "#6a9955",   // green    — comments
  syn_variable:     "#9cdcfe",   // light blue — identifiers/keys
  syn_function:     "#dcdcaa",   // yellow   — function names / stage ids
  syn_operator:     "#d4d4d4",   // white    — punctuation
  syn_heading:      "#569cd6",   // blue     — markdown headings
  syn_link:         "#4ec9b0",   // teal     — urls
  syn_tag:          "#f44747",   // red      — tags
  syn_bold:         "#ffffff",
  syn_code:         "#ce9178",   // inline code in markdown
};

/* ─────────────────────────── TOKEN TYPES ─────────────────────────── */
type Token = { t: string; c: string; b?: boolean };
type Line  = Token[];
const tk  = (t: string, c: string, b?: boolean): Token => ({ t, c, b });
const EMPTY: Line = [];

/* ─────────────────────────── main.tf ─────────────────────────── */
const mainTF = (l: Lang): Line[] => [
  [tk("# main.tf — Caio Resende · Cloud Portfolio", VS.syn_comment)],
  EMPTY,
  [tk("terraform", VS.syn_keyword), tk(" {", VS.syn_operator)],
  [tk("  required_version", VS.syn_variable), tk(" = ", VS.syn_operator), tk('"~> 1.0"', VS.syn_string)],
  [tk("}", VS.syn_operator)],
  EMPTY,
  [tk("resource", VS.syn_keyword), tk(' "aws_developer"', VS.syn_string), tk(' "caio"', VS.syn_string), tk(" {", VS.syn_operator)],
  [tk("  name       ", VS.syn_variable), tk("= ", VS.syn_operator), tk('"Caio Souza de Resende"', VS.syn_string)],
  [tk("  age        ", VS.syn_variable), tk("= ", VS.syn_operator), tk("21", VS.syn_number)],
  [tk("  role       ", VS.syn_variable), tk("= ", VS.syn_operator), tk(`"${l === "en" ? "Junior Cloud Architect" : "Arquiteto Cloud Júnior"}"`, VS.syn_string)],
  [tk("  company    ", VS.syn_variable), tk("= ", VS.syn_operator), tk('"ForceOne"', VS.syn_string)],
  [tk("  university ", VS.syn_variable), tk("= ", VS.syn_operator), tk('"PUC Minas"', VS.syn_string)],
  EMPTY,
  [tk(`  # ${l === "en" ? "Languages spoken" : "Idiomas falados"}`, VS.syn_comment)],
  [tk("  languages", VS.syn_variable), tk(" = [", VS.syn_operator)],
  [tk('    "Portuguese"', VS.syn_string), tk(",", VS.syn_operator), tk(" # native",       VS.syn_comment)],
  [tk('    "English"',    VS.syn_string), tk(",", VS.syn_operator), tk(" # fluent",        VS.syn_comment)],
  [tk('    "Spanish"',    VS.syn_string), tk(",", VS.syn_operator), tk(" # advanced",      VS.syn_comment)],
  [tk('    "German"',     VS.syn_string), tk(",", VS.syn_operator), tk("  # intermediate", VS.syn_comment)],
  [tk("  ]", VS.syn_operator)],
  EMPTY,
  [tk("  tags", VS.syn_variable), tk(" = {", VS.syn_operator)],
  [tk('    Environment ', VS.syn_variable), tk("= ", VS.syn_operator), tk('"production"',                              VS.syn_string)],
  [tk('    Owner       ', VS.syn_variable), tk("= ", VS.syn_operator), tk('"caiosouzamresende@gmail.com"',              VS.syn_string)],
  [tk('    GitHub      ', VS.syn_variable), tk("= ", VS.syn_operator), tk('"github.com/CaioSResende"',                  VS.syn_string)],
  [tk('    LinkedIn    ', VS.syn_variable), tk("= ", VS.syn_operator), tk('"linkedin.com/in/caiosouzaderesende"',        VS.syn_string)],
  [tk("  }", VS.syn_operator)],
  [tk("}", VS.syn_operator)],
  EMPTY,
  [tk("output", VS.syn_keyword), tk(' "availability"', VS.syn_string), tk(" {", VS.syn_operator)],
  [tk("  value", VS.syn_variable), tk(" = ", VS.syn_operator), tk(`"${l === "en" ? "Open to opportunities" : "Aberto a oportunidades"}"`, VS.syn_string)],
  [tk("}", VS.syn_operator)],
];

/* ─────────────────────────── Dockerfile ─────────────────────────── */
const dockerfile = (l: Lang): Line[] => [
  [tk("# Dockerfile — Tech Stack", VS.syn_comment)],
  EMPTY,
  [tk("FROM ", VS.syn_keyword), tk("engineer", VS.syn_type), tk(":", VS.syn_operator), tk("junior-cloud", VS.syn_string)],
  EMPTY,
  [tk("LABEL ", VS.syn_keyword), tk("maintainer", VS.syn_variable), tk('="Caio Resende"',                                                   VS.syn_string)],
  [tk("LABEL ", VS.syn_keyword), tk("role",        VS.syn_variable), tk(`="${l === "en" ? "Cloud Architect" : "Arquiteto Cloud"}"`,           VS.syn_string)],
  EMPTY,
  [tk(`# ${l === "en" ? "Cloud & Infrastructure" : "Cloud & Infraestrutura"}`, VS.syn_comment)],
  [tk("RUN ", VS.syn_keyword), tk("apt install ", VS.syn_function), tk("aws-cli terraform kubernetes docker",   VS.syn_variable)],
  [tk("RUN ", VS.syn_keyword), tk("apt install ", VS.syn_function), tk("jenkins gitlab-ci github-actions",     VS.syn_variable)],
  EMPTY,
  [tk(`# ${l === "en" ? "AWS Services" : "Serviços AWS"}`, VS.syn_comment)],
  [tk("ENV ", VS.syn_keyword), tk("AWS_SERVICES", VS.syn_variable), tk(' "EC2 EKS RDS S3 IAM CloudFront WAF Route53 CodePipeline ECR"', VS.syn_string)],
  EMPTY,
  [tk(`# ${l === "en" ? "Other Tools" : "Outras Ferramentas"}`, VS.syn_comment)],
  [tk("RUN ", VS.syn_keyword), tk("apt install ", VS.syn_function), tk("proxmox nginx firebase linux-ubuntu",  VS.syn_variable)],
  EMPTY,
  [tk(`# ${l === "en" ? "Certifications" : "Certificações"}`, VS.syn_comment)],
  [tk("COPY ", VS.syn_keyword), tk("./certs/aws-cloud-practitioner   ", VS.syn_string), tk("/badges/", VS.syn_string)],
  [tk("COPY ", VS.syn_keyword), tk("./certs/aws-ai-practitioner      ", VS.syn_string), tk("/badges/", VS.syn_string)],
  [tk("COPY ", VS.syn_keyword), tk("./certs/aws-solutions-architect  ", VS.syn_string), tk("/badges/", VS.syn_string)],
  [tk("COPY ", VS.syn_keyword), tk("./certs/aws-cloudops-engineer    ", VS.syn_string), tk("/badges/", VS.syn_string)],
  [tk("COPY ", VS.syn_keyword), tk("./certs/ielts-cambridge          ", VS.syn_string), tk("/badges/", VS.syn_string)],
  EMPTY,
  [tk("EXPOSE ", VS.syn_keyword), tk("443", VS.syn_number), tk("  # skills", VS.syn_comment)],
  EMPTY,
  [tk("CMD ", VS.syn_keyword), tk('["ship", "--with-passion"]', VS.syn_string)],
];

/* ─────────────────────────── pipeline.yml ─────────────────────────── */
const pipelineYML = (l: Lang): Line[] => [
  [tk("# pipeline.yml — Professional Experience", VS.syn_comment)],
  EMPTY,
  [tk("name", VS.syn_variable), tk(": ", VS.syn_operator), tk("Caio Resende · Career Pipeline", VS.syn_string)],
  EMPTY,
  [tk("stages", VS.syn_variable), tk(":", VS.syn_operator)],
  [tk("  - ", VS.syn_operator), tk("technical-support", VS.syn_string)],
  [tk("  - ", VS.syn_operator), tk("devops",            VS.syn_string)],
  [tk("  - ", VS.syn_operator), tk("cloud-architecture",VS.syn_string)],
  EMPTY,
  [tk("# ── Stage 1 ──────────────────────────────────────────────────", VS.syn_comment)],
  [tk("technical-support", VS.syn_function), tk(":", VS.syn_operator)],
  [tk("  company", VS.syn_variable), tk(": ", VS.syn_operator), tk("eduCAT", VS.syn_string)],
  [tk("  period ", VS.syn_variable), tk(": ", VS.syn_operator), tk(`"${l === "en" ? "Jun 2023 — Jun 2024" : "jun 2023 — jun 2024"}"`, VS.syn_string)],
  [tk("  script", VS.syn_variable), tk(":", VS.syn_operator)],
  [tk(`    - "${l === "en" ? "Technical support for client computers (medical societies)"   : "Suporte técnico para computadores de clientes (sociedades médicas)"}"`,   VS.syn_string)],
  [tk(`    - "${l === "en" ? "Customer service and resolution for online exam applications" : "Atendimento ao cliente e resolução de problemas em provas online"}"`,      VS.syn_string)],
  [tk(`    - "${l === "en" ? "SESI project integration"                                    : "Integração do projeto SESI"}"`,                                           VS.syn_string)],
  EMPTY,
  [tk("# ── Stage 2 ──────────────────────────────────────────────────", VS.syn_comment)],
  [tk("devops", VS.syn_function), tk(":", VS.syn_operator)],
  [tk("  company", VS.syn_variable), tk(": ", VS.syn_operator), tk("eduCAT", VS.syn_string)],
  [tk("  period ", VS.syn_variable), tk(": ", VS.syn_operator), tk(`"${l === "en" ? "Jul 2024 — Jan 2025" : "jul 2024 — jan 2025"}"`, VS.syn_string)],
  [tk("  script", VS.syn_variable), tk(":", VS.syn_operator)],
  [tk(`    - "${l === "en" ? "AWS: EKS, EC2, RDS, S3, WAF, CodePipeline, CloudFront, IAM" : "AWS: EKS, EC2, RDS, S3, WAF, CodePipeline, CloudFront, IAM"}"`, VS.syn_string)],
  [tk(`    - "${l === "en" ? "Container orchestration with Kubernetes"                    : "Orquestração de contêineres com Kubernetes"}"`, VS.syn_string)],
  [tk(`    - "${l === "en" ? "CI/CD pipelines — Jenkins & GitLab"                        : "Pipelines CI/CD — Jenkins & GitLab"}"`, VS.syn_string)],
  [tk(`    - "${l === "en" ? "Infrastructure automation with Terraform"                   : "Automação de infraestrutura com Terraform"}"`, VS.syn_string)],
  [tk(`    - "${l === "en" ? "Linux/Ubuntu server administration"                         : "Administração de servidores Linux/Ubuntu"}"`, VS.syn_string)],
  EMPTY,
  [tk("# ── Stage 3 ──────────────────────────────────────────────────", VS.syn_comment)],
  [tk("cloud-architecture", VS.syn_function), tk(":", VS.syn_operator)],
  [tk("  company", VS.syn_variable), tk(": ", VS.syn_operator), tk("ForceOne", VS.syn_string)],
  [tk("  period ", VS.syn_variable), tk(": ", VS.syn_operator), tk(`"${l === "en" ? "Jan 2025 — present" : "jan 2025 — presente"}"`, VS.syn_string)],
  [tk("  script", VS.syn_variable), tk(":", VS.syn_operator)],
  [tk(`    - "${l === "en" ? "Design & implementation of cloud architectures (security, scalability)" : "Desenho e implementação de arquiteturas em nuvem (segurança, escalabilidade)"}"`, VS.syn_string)],
  [tk(`    - "${l === "en" ? "System migration projects to cloud environments"                        : "Projetos de migração de sistemas para cloud"}"`, VS.syn_string)],
  [tk(`    - "${l === "en" ? "Infrastructure automation & FinOps for cost optimization"               : "Automação & FinOps para otimização de custos"}"`, VS.syn_string)],
  EMPTY,
  [tk("on_success", VS.syn_variable), tk(": ", VS.syn_operator), tk(`"${l === "en" ? "Keep growing" : "Continuar crescendo"}"`, VS.syn_string)],
];

/* ─────────────────────────── README.md ─────────────────────────── */
const readmeMD = (l: Lang): Line[] => [
  [tk("# Caio Resende", VS.syn_heading, true)],
  [tk(l === "en" ? "### Junior Cloud Architect · AWS Solutions Architect" : "### Arquiteto Cloud Júnior · AWS Solutions Architect", VS.syn_heading)],
  EMPTY,
  [tk("---", VS.syn_comment)],
  EMPTY,
  [tk(l === "en" ? "## About" : "## Sobre", VS.syn_heading)],
  EMPTY,
  [tk(l === "en"
    ? "Software Engineering student at PUC Minas and AWS Solutions"
    : "Estudante de Engenharia de Software na PUC Minas e Arquiteto", VS.syn_operator)],
  [tk(l === "en"
    ? "Architect at ForceOne. Passionate about cloud, automation"
    : "de Soluções AWS na ForceOne. Apaixonado por cloud, automação", VS.syn_operator)],
  [tk(l === "en"
    ? "and FinOps best practices."
    : "e boas práticas de FinOps.", VS.syn_operator)],
  EMPTY,
  [tk("---", VS.syn_comment)],
  EMPTY,
  [tk("## Links", VS.syn_heading)],
  EMPTY,
  [tk("- ", VS.syn_operator), tk("**GitHub**",   VS.syn_variable, true), tk("   → ", VS.syn_comment), tk("github.com/CaioSResende",               VS.syn_link)],
  [tk("- ", VS.syn_operator), tk("**LinkedIn**",  VS.syn_variable, true), tk("  → ", VS.syn_comment), tk("linkedin.com/in/caiosouzaderesende",     VS.syn_link)],
  [tk("- ", VS.syn_operator), tk("**Credly**",    VS.syn_variable, true), tk("    → ", VS.syn_comment), tk("credly.com/users/caiosresende",          VS.syn_link)],
  [tk("- ", VS.syn_operator), tk("**Email**",     VS.syn_variable, true), tk("     → ", VS.syn_comment), tk("caiosouzamresende@gmail.com",            VS.syn_link)],
  EMPTY,
  [tk("---", VS.syn_comment)],
  EMPTY,
  [tk(l === "en" ? "## Certifications" : "## Certificações", VS.syn_heading)],
  EMPTY,
  [tk("- ✅ ", VS.syn_operator), tk("AWS Certified Cloud Practitioner",              VS.syn_string)],
  [tk("- ✅ ", VS.syn_operator), tk("AWS Certified AI Practitioner",                 VS.syn_string)],
  [tk("- ✅ ", VS.syn_operator), tk("AWS Certified Solutions Architect – Associate",  VS.syn_string)],
  [tk("- ✅ ", VS.syn_operator), tk("AWS Certified CloudOps Engineer – Associate",    VS.syn_string)],
  [tk("- ✅ ", VS.syn_operator), tk("IELTS – University of Cambridge (jan 2022)",     VS.syn_string)],
  EMPTY,
  [tk("---", VS.syn_comment)],
  EMPTY,
  [tk("## Stack", VS.syn_heading)],
  EMPTY,
  [tk("`AWS`", VS.syn_code), tk(" ", VS.syn_operator), tk("`Terraform`", VS.syn_code), tk(" ", VS.syn_operator), tk("`Kubernetes`", VS.syn_code), tk(" ", VS.syn_operator), tk("`Docker`", VS.syn_code), tk(" ", VS.syn_operator), tk("`Jenkins`", VS.syn_code), tk(" ", VS.syn_operator), tk("`GitLab CI`", VS.syn_code)],
  [tk("`EC2`", VS.syn_code), tk(" ", VS.syn_operator), tk("`EKS`", VS.syn_code), tk(" ", VS.syn_operator), tk("`RDS`", VS.syn_code), tk(" ", VS.syn_operator), tk("`S3`", VS.syn_code), tk(" ", VS.syn_operator), tk("`IAM`", VS.syn_code), tk(" ", VS.syn_operator), tk("`CloudFront`", VS.syn_code), tk(" ", VS.syn_operator), tk("`WAF`", VS.syn_code), tk(" ", VS.syn_operator), tk("`Route53`", VS.syn_code)],
  [tk("`Proxmox`", VS.syn_code), tk(" ", VS.syn_operator), tk("`Nginx`", VS.syn_code), tk(" ", VS.syn_operator), tk("`Firebase`", VS.syn_code), tk(" ", VS.syn_operator), tk("`Linux/Ubuntu`", VS.syn_code)],
];

/* ─────────────────────────── FILE METADATA ─────────────────────────── */
type FileMeta = { id: FileId; label: string; icon: JSX.Element; langLabel: string };

const TerraformIcon = () => (
  <svg width="16" height="16" viewBox="0 0 128 128">
    <path d="M53.4 14.9v34.4l29.8 17.2V32.1z" fill="#5C4EE5"/>
    <path d="M86.6 32.1v34.4L116.4 49V14.7z" fill="#4040B2"/>
    <path d="M11.6 32.1V66.5l29.8 17.2V49.3z" fill="#5C4EE5"/>
    <path d="M53.4 81.1v34.4l29.8-17.2V63.9z" fill="#5C4EE5"/>
  </svg>
);

const DockerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 128 128">
    <path d="M124.8 52.1c-2.3-1.5-7.7-2.1-11.8-1.3-.5-4-2.9-7.5-7.2-10.6l-2.4-1.6-1.7 2.4c-2.2 3.3-3.3 7.9-3 12.3.1 1.6.6 4.4 2.3 6.9-1.6.9-4.8 2.1-9 2H3.3l-.3 1.5c-.9 5.5-.7 22.6 9.8 35.8 7.9 9.8 19.6 14.8 34.9 14.8 33.3 0 57.9-15.4 69.5-43.3 4.5.1 14.2.3 19.2-9.5.1-.3 1.1-2.2 1.4-3l.3-.8-2.1-1.5zm-91.2-9.5h-14v13.1h14V42.6zm16.5 0h-14v13.1h14V42.6zm16.6 0h-14v13.1h14V42.6zm16.5 0h-14v13.1h14V42.6zm-49.6-15.9h-14v13.1h14V26.7zm16.5 0h-14v13.1h14V26.7zm16.6 0h-14v13.1h14V26.7zm16.5 16h-14v13.1h14V42.7z" fill="#2496ED"/>
  </svg>
);

const YamlIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#CB3837" opacity="0.18"/>
    <text x="1.5" y="12" fontSize="7.5" fontWeight="800" fill="#CB3837" fontFamily="'Consolas','monospace'" letterSpacing="-0.5">YAML</text>
  </svg>
);

const MarkdownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 208 128" fill="#42A5F5">
    <rect width="208" height="128" rx="16" fill="#42A5F5" opacity="0.15"/>
    <path d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"/>
  </svg>
);

const FILES: FileMeta[] = [
  { id: "main.tf",      label: "main.tf",      icon: <TerraformIcon />, langLabel: "Terraform"  },
  { id: "Dockerfile",   label: "Dockerfile",   icon: <DockerIcon />,    langLabel: "Dockerfile" },
  { id: "pipeline.yml", label: "pipeline.yml", icon: <YamlIcon />,      langLabel: "YAML"       },
  { id: "README.md",    label: "README.md",    icon: <MarkdownIcon />,  langLabel: "Markdown"   },
];

function getLines(id: FileId, lang: Lang): Line[] {
  if (id === "main.tf")      return mainTF(lang);
  if (id === "Dockerfile")   return dockerfile(lang);
  if (id === "pipeline.yml") return pipelineYML(lang);
  return readmeMD(lang);
}

/* ─────────────────────────── ACTIVITY BAR ICONS ─────────────────────────── */
const ExplorerSVG = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#fff" : VS.activityBarIcon}>
    <path d="M17.5 0H8.5L7 1.5v5H2L0 8.5v14.07L1.5 24h13.07L16 22.57V18h4.7l1.8-1.93V4.5L17.5 0zm0 2.12L20.38 5H17.5V2.12zM14.57 22H2V8.5h5V1.5h7.5v5.12L16 8.5v7H9.5L8 9.93v-.43H6.5v.43l-1.5 8.1 1.5 1.97H14.57V22zm1.93-5.5H16V10h-1.5v6.5H9L8 10.5v-.5h-.5L6 13.5V16l1.5 1.5H16.5l1.5-1.5v-7l-1.5-1.5H16V8H14.5v2H8V8.5H6.5v8.07l1.57 1.93H16.5V22h4.08L22 20.5V5.5l-1.5-1.5H17.5V0z"/>
  </svg>
);

/* ─────────────────────────── CODE LINE ─────────────────────────── */
const CodeLine = ({ line, num, isActive }: { line: Line; num: number; isActive: boolean }) => (
  <div
    className="flex hover:bg-white/[0.03] group"
    style={{ minHeight: "19px", lineHeight: "19px" }}
  >
    {/* Line number */}
    <div
      style={{
        width: "50px",
        minWidth: "50px",
        textAlign: "right",
        paddingRight: "16px",
        paddingLeft: "8px",
        color: isActive ? VS.lineNumActiveFg : VS.lineNumFg,
        userSelect: "none",
        fontSize: "13px",
        fontFamily: "'Consolas', 'Courier New', monospace",
        flexShrink: 0,
      }}
    >
      {num}
    </div>
    {/* Code */}
    <div style={{ whiteSpace: "pre", fontSize: "13px", letterSpacing: "0", fontFamily: "'Consolas', 'Courier New', monospace" }}>
      {line.length === 0
        ? "\u200b"
        : line.map((tok, i) => (
            <span key={i} style={{ color: tok.c, fontWeight: tok.b ? "600" : undefined }}>
              {tok.t}
            </span>
          ))}
    </div>
  </div>
);

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */
export default function VSCodeApp() {
  const [lang, setLang]                 = useState<Lang>("en");
  const [activeFile, setActiveFile]     = useState<FileId>("main.tf");
  const [openFiles, setOpenFiles]       = useState<FileId[]>(["main.tf"]);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [activeLine, setActiveLine]     = useState(1);

  const openFile = (id: FileId) => {
    if (!openFiles.includes(id)) setOpenFiles((p) => [...p, id]);
    setActiveFile(id);
    setActiveLine(1);
  };

  const closeTab = (id: FileId, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = openFiles.filter((f) => f !== id);
    const safe = next.length ? next : (["main.tf"] as FileId[]);
    setOpenFiles(safe);
    if (activeFile === id) setActiveFile(safe[safe.length - 1]);
  };

  const lines    = getLines(activeFile, lang);
  const fileMeta = FILES.find((f) => f.id === activeFile)!;

  return (
    <div
      className="flex flex-col h-full w-full overflow-hidden"
      style={{ background: VS.editorBg, fontFamily: "'Consolas', 'Courier New', monospace", fontSize: "13px" }}
    >
      <div className="flex flex-1 overflow-hidden">

        {/* ── Activity Bar ── */}
        <div
          className="flex flex-col items-center pt-1 pb-2"
          style={{ width: "48px", background: VS.activityBar, flexShrink: 0, borderRight: `1px solid ${VS.borderColor}` }}
        >
          {([
            { tip: "Explorer",       icon: <Files size={24} />,     active: explorerOpen, onClick: () => setExplorerOpen((p) => !p) },
            { tip: "Search",         icon: <Search size={24} />,    active: false,        onClick: () => {} },
            { tip: "Source Control", icon: <GitBranch size={24} />, active: false,        onClick: () => {} },
          ] as { tip: string; icon: JSX.Element; active: boolean; onClick: () => void }[]).map(({ tip, icon, active, onClick }) => (
            <button
              key={tip}
              title={tip}
              onClick={onClick}
              className="flex items-center justify-center transition-colors"
              style={{
                width: "48px",
                height: "48px",
                color: active ? "#fff" : VS.activityBarIcon,
                borderLeft: active ? "2px solid #fff" : "2px solid transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = active ? "#fff" : VS.activityBarIcon)}
            >
              {icon}
            </button>
          ))}
          {/* Settings — pushed to bottom */}
          <button
            title="Settings"
            className="flex items-center justify-center mt-auto transition-colors"
            style={{ width: "48px", height: "48px", color: VS.activityBarIcon }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = VS.activityBarIcon)}
          >
            <Settings2 size={24} />
          </button>
        </div>

        {/* ── Sidebar / Explorer ── */}
        {explorerOpen && (
          <div
            className="flex flex-col overflow-hidden"
            style={{ width: "220px", background: VS.sidebarBg, flexShrink: 0, borderRight: `1px solid ${VS.borderColor}` }}
          >
            {/* Panel title */}
            <div
              className="flex items-center px-5"
              style={{ color: "#bbbfc4", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "system-ui, sans-serif", height: "35px" }}
            >
              Explorer
            </div>

            {/* Folder row */}
            <div>
              <button
                className="flex items-center w-full gap-1.5 text-left select-none"
                style={{ color: VS.sidebarFg, fontSize: "13px", fontFamily: "system-ui, sans-serif", fontWeight: 700, paddingLeft: "8px", height: "22px" }}
              >
                {/* chevron down */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill={VS.sidebarFg} style={{ flexShrink: 0 }}>
                  <path d="M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z"/>
                </svg>
                {/* folder open icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                  <path d="M1.5 14h13l.5-.5v-8l-.5-.5H7.71l-.86-.85L6.5 4h-5l-.5.5v9l.5.5zM2 5h4.29l.86.85.35.15H14v7H2V5z" fill="#dcb67a"/>
                  <path d="M14 6H7.5L6.5 5H2V4l.5-.5h4l.35.15.86.85H14l.5.5v.5L14 6z" fill="#dcb67a" opacity="0.6"/>
                </svg>
                <span style={{ letterSpacing: "0.06em", fontSize: "11px" }}>PORTFOLIO</span>
              </button>

              {FILES.map(({ id, label, icon }) => {
                const isActive = activeFile === id;
                return (
                  <button
                    key={id}
                    onClick={() => openFile(id)}
                    className="flex items-center w-full gap-2 text-left transition-colors"
                    style={{
                      paddingLeft:   "34px",
                      paddingRight:  "8px",
                      height:        "22px",
                      background:    isActive ? VS.sidebarActive : "transparent",
                      color:         isActive ? "#fff" : VS.sidebarFg,
                      fontSize:      "13px",
                      fontFamily:    "system-ui, sans-serif",
                    }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = VS.sidebarHover; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <span style={{ flexShrink: 0, display: "flex", alignItems: "center", width: "16px", height: "16px" }}>{icon}</span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Editor Column ── */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Tab Bar */}
          <div
            className="flex overflow-x-auto"
            style={{ background: VS.tabBarBg, borderBottom: `1px solid ${VS.borderColor}`, flexShrink: 0, height: "35px" }}
          >
            {openFiles.map((id) => {
              const f        = FILES.find((x) => x.id === id)!;
              const isActive = id === activeFile;
              return (
                <div
                  key={id}
                  onClick={() => { setActiveFile(id); setActiveLine(1); }}
                  className="flex items-center gap-1.5 cursor-pointer group"
                  style={{
                    paddingLeft:  "12px",
                    paddingRight: "8px",
                    background:   isActive ? VS.tabActiveBg   : VS.tabInactiveBg,
                    color:        isActive ? VS.tabActiveFg   : VS.tabInactiveFg,
                    borderTop:    isActive ? `1px solid ${VS.tabActiveTopBorder}` : "1px solid transparent",
                    borderRight:  `1px solid ${VS.borderColor}`,
                    fontSize:     "13px",
                    fontFamily:   "system-ui, sans-serif",
                    whiteSpace:   "nowrap",
                    flexShrink:   0,
                    height:       "35px",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>{f.icon}</span>
                  <span>{f.label}</span>
                  <button
                    onClick={(e) => closeTab(id, e)}
                    className="flex items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                    style={{ width: "20px", height: "20px", color: VS.tabInactiveFg }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"/>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-0.5 px-3"
            style={{
              background: VS.breadcrumbBg,
              borderBottom: `1px solid ${VS.borderColor}`,
              height: "22px",
              flexShrink: 0,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            <span style={{ color: VS.breadcrumbFg, fontSize: "12px" }}>portfolio</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill={VS.breadcrumbFg} style={{ flexShrink: 0 }}>
              <path d="M6 3.5L10.5 8 6 12.5" strokeWidth="1" stroke={VS.breadcrumbFg} fill="none"/>
            </svg>
            <span style={{ color: "#cccccc", fontSize: "12px" }}>{activeFile}</span>
          </div>

          {/* Editor Content */}
          <div
            className="flex-1 overflow-auto"
            style={{ background: VS.editorBg, paddingTop: "8px", paddingBottom: "24px" }}
            onClick={(e) => {
              const el = e.target as HTMLElement;
              const row = el.closest("[data-line]");
              if (row) setActiveLine(Number(row.getAttribute("data-line")));
            }}
          >
            {lines.map((line, i) => (
              <div key={i} data-line={i + 1} onClick={() => setActiveLine(i + 1)}>
                <CodeLine line={line} num={i + 1} isActive={activeLine === i + 1} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Status Bar ── */}
      <div
        className="flex items-center justify-between"
        style={{
          background: VS.statusBarBg,
          color:      VS.statusBarFg,
          height:     "22px",
          flexShrink: 0,
          paddingLeft: "8px",
          paddingRight: "8px",
          fontFamily: "system-ui, sans-serif",
          fontSize:   "12px",
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 hover:bg-white/10 px-1.5 rounded transition-colors h-full" style={{ height: "22px" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10.57 1.14 9.71 0H7.89L7 1.14 6 1h-.5L5 1.5v2l.5.5H6l.57 1.14L7 6.88V8H6l-.5.5v1l-.5.5H4l-.5.5v1l-.5.5H2l-.5.5V14l.5.5h12l.5-.5v-2l-.5-.5h-1l-.5-.5v-1l-.5-.5h-1l-.5-.5v-1l-.5-.5H9V6.88l.43-2.24L10 4h.5l.5-.5v-2L10.57 1h-.5z"/>
            </svg>
            main
          </button>
          <span className="hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors" style={{ height: "22px", lineHeight: "22px" }}>
            0 errors, 0 warnings
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1">
          <span className="hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors" style={{ height: "22px", lineHeight: "22px" }}>
            Ln {activeLine}, Col 1
          </span>
          <span className="hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors" style={{ height: "22px", lineHeight: "22px" }}>
            Spaces: 2
          </span>
          <span className="hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors" style={{ height: "22px", lineHeight: "22px" }}>
            UTF-8
          </span>
          <span className="hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors" style={{ height: "22px", lineHeight: "22px" }}>
            {fileMeta.langLabel}
          </span>
          <button
            onClick={() => setLang((l) => l === "en" ? "pt" : "en")}
            className="hover:bg-white/10 px-1.5 rounded transition-colors font-medium"
            style={{ height: "22px", lineHeight: "22px", fontSize: "11px" }}
          >
            {lang === "en" ? "🇺🇸 EN" : "🇧🇷 PT"}
          </button>
        </div>
      </div>
    </div>
  );
}
