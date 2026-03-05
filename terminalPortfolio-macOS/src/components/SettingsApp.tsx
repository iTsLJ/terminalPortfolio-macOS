import { useState } from "react";
import {
  User, Globe, Info, GraduationCap, Briefcase, Image,
  ChevronRight, ChevronDown,
} from "lucide-react";

type Lang = "en" | "pt";
type Section = "general" | "language" | "about" | "education" | "experience" | "photos";

interface SettingsAppProps {
  lang?: Lang;
  onLangChange?: (lang: Lang) => void;
}

const SECTIONS: { id: Section; icon: React.ReactNode; label: { en: string; pt: string } }[] = [
  { id: "general",    icon: <Info size={15} />,         label: { en: "General",    pt: "Geral"       } },
  { id: "about",      icon: <User size={15} />,         label: { en: "About",      pt: "Sobre"       } },
  { id: "experience", icon: <Briefcase size={15} />,    label: { en: "Experience", pt: "Experiência" } },
  { id: "education",  icon: <GraduationCap size={15} />,label: { en: "Education",  pt: "Formação"    } },
  { id: "photos",     icon: <Image size={15} />,        label: { en: "Photos",     pt: "Fotos"       } },
  { id: "language",   icon: <Globe size={15} />,        label: { en: "Language",   pt: "Idioma"      } },
];

const ACCENT = "#38b2ac";

export default function SettingsApp({ lang: externalLang, onLangChange }: SettingsAppProps) {
  const [active, setActive] = useState<Section>("general");
  const [lang, setLang]     = useState<Lang>(externalLang || "en");

  const handleLangChange = (l: Lang) => {
    setLang(l);
    onLangChange?.(l);
  };

  const t = (en: string, pt: string) => lang === "en" ? en : pt;

  return (
    <div className="flex h-full w-full overflow-hidden" style={{ background: "#0d1117", fontFamily: "'JetBrains Mono', monospace" }}>

      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 flex flex-col py-4 border-r overflow-y-auto" style={{ background: "#0d1117", borderColor: "#1e2a38" }}>

        {/* Profile header */}
        <div className="flex flex-col items-center mb-6 px-3">
          <img
            src="/avatar.png"
            alt="Caio"
            className="w-20 h-21 rounded-full border-3 mb-3 object-cover"
            style={{ borderColor: ACCENT }}
          />
          <p className="text-sm font-semibold text-white">Caio Resende</p>
          <p className="text-xs mt-1" style={{ color: "#4a5568" }}>Junior Cloud Architect</p>
        </div>

        <div className="w-full h-px mb-3" style={{ background: "#1e2a38" }} />

        {/* Nav items */}
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="flex items-center gap-2.5 px-4 py-2.5 mx-2 rounded-lg text-left transition-all duration-150"
              style={{
                background: isActive ? `${ACCENT}22` : "transparent",
                color:      isActive ? ACCENT : "#718096",
                fontSize:   "13px",
              }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <span style={{ color: isActive ? ACCENT : "#4a5568" }}>{s.icon}</span>
              {s.label[lang]}
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-8 py-6" style={{ scrollbarColor: "#2d3748 transparent" }}>
        {active === "general"    && <GeneralSection    lang={lang} t={t} />}
        {active === "about"      && <AboutSection      lang={lang} t={t} />}
        {active === "experience" && <ExperienceSection lang={lang} t={t} />}
        {active === "education"  && <EducationSection  lang={lang} t={t} />}
        {active === "photos"     && <PhotosSection     lang={lang} t={t} />}
        {active === "language"   && <LanguageSection   lang={lang} onLangChange={handleLangChange} t={t} />}
      </div>
    </div>
  );
}

/* ─── Helpers ─── */
const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-6">
    <h1 className="text-xl font-bold text-white">{title}</h1>
    {subtitle && <p className="text-sm mt-1" style={{ color: "#4a5568" }}>{subtitle}</p>}
  </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl p-4 mb-4 border" style={{ background: "#111827", borderColor: "#1e2a38" }}>
    {children}
  </div>
);

const Row = ({ label, value, accent, href }: { label: string; value: string; accent?: string; href?: string }) => (
  <div className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: "#1e2a38" }}>
    <span className="text-sm" style={{ color: "#718096" }}>{label}</span>
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium flex items-center gap-1 hover:underline transition-all"
        style={{ color: accent || ACCENT }}
        onClick={(e) => e.stopPropagation()}
      >
        {value}
        <ChevronRight size={12} />
      </a>
    ) : (
      <span className="text-sm font-medium" style={{ color: accent || "#e2e8f0" }}>{value}</span>
    )}
  </div>
);

/* ─── Sections ─── */
const GeneralSection = ({ t }: { lang: Lang; t: (en: string, pt: string) => string }) => (
  <div>
    <SectionTitle
      title={t("General", "Geral")}
      subtitle={t("System information and preferences", "Informações do sistema e preferências")}
    />
    <Card>
      <Row label={t("Name", "Nome")}              value="Caio Souza de Resende"           accent={ACCENT} />
      <Row label={t("Age", "Idade")}               value="21"                                     />
      <Row label={t("Role", "Cargo")}              value="Junior Cloud Architect"                 />
      <Row label={t("Company", "Empresa")}         value="ForceOne"                               />
      <Row label={t("University", "Universidade")} value="PUC Minas"                              />
    </Card>
    <Card>
      <Row label="GitHub"   value="@CaioSResende"                href="https://github.com/CaioSResende"             />
      <Row label="LinkedIn" value="caiosouzaderesende"            href="https://linkedin.com/in/caiosouzaderesende"  />
      <Row label="Credly"   value={t("View certifications", "Ver certificações")} href="https://www.credly.com/users/caiosresende" />
      <Row label="Email"    value="caiosouzamresende@gmail.com"                                                      />
    </Card>
  </div>
);

const AboutSection = ({ t }: { lang: Lang; t: (en: string, pt: string) => string }) => (
  <div>
    <SectionTitle
      title={t("About Me", "Sobre Mim")}
      subtitle={t("Who I am and what I do", "Quem sou e o que faço")}
    />
    <Card>
      <p className="text-sm leading-relaxed" style={{ color: "#a0aec0" }}>
        {t(
          "I am Caio Resende, a Software Engineering student at PUC Minas and an AWS Solutions Architect at ForceOne. I work on developing cloud solutions with a focus on efficient architecture, cost optimization, and infrastructure best practices.",
          "Sou Caio Resende, estudante de Engenharia de Software na PUC Minas e arquiteto de soluções AWS na ForceOne. Atuo no desenvolvimento de soluções em nuvem com foco em arquitetura eficiente, otimização de custos e boas práticas de infraestrutura."
        )}
      </p>
    </Card>
    <Card>
      <p className="text-sm leading-relaxed" style={{ color: "#a0aec0" }}>
        {t(
          "I am an enthusiast of languages, fluent in Portuguese and English, with advanced Spanish and intermediate German. I am always looking to learn new technologies and bring innovations to the work environment.",
          "Sou entusiasta de idiomas, fluente em português e inglês, com espanhol avançado e alemão em nível intermediário. Busco sempre aprender novas tecnologias e trazer inovações para o ambiente de trabalho."
        )}
      </p>
    </Card>
  </div>
);

const ExperienceSection = ({ t }: { lang: Lang; t: (en: string, pt: string) => string }) => (
  <div>
    <SectionTitle
      title={t("Experience", "Experiência")}
      subtitle={t("Professional history", "Histórico profissional")}
    />
    <Card>
      <div className="mb-3">
        <p className="text-sm font-semibold text-white">ForceOne</p>
        <p className="text-sm mt-0.5" style={{ color: ACCENT }}>{t("Cloud Architect Intern", "Estagiário Arquiteto Cloud AWS")}</p>
        <p className="text-xs mt-0.5" style={{ color: "#4a5568" }}>jan 2025 — {t("present", "presente")}</p>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "#a0aec0" }}>
        {t(
          "Design and implementation of cloud architectures focused on security, scalability and operational efficiency. Participation in system migration projects to cloud environments, proposing solutions aligned with technical and business needs. Automation for infrastructure management and FinOps practices to optimize cloud resource costs.",
          "Atuo no desenho e implementação de arquiteturas em nuvem, com foco em segurança, escalabilidade e eficiência operacional. Participo de projetos de migração de sistemas para ambientes cloud, propondo soluções alinhadas às necessidades técnicas e de negócio. Automações para gestão de infraestrutura e práticas de FinOps para otimizar os custos dos recursos em nuvem."
        )}
      </p>
    </Card>

    <Card>
      <div className="mb-3">
        <p className="text-sm font-semibold text-white">eduCAT</p>
        <p className="text-sm mt-0.5" style={{ color: "#fbd38d" }}>{t("DevOps Intern", "Estagiário DevOps")}</p>
        <p className="text-xs mt-0.5" style={{ color: "#4a5568" }}>jul 2024 — jan 2025</p>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: "#a0aec0" }}>
        {t(
          "Administration and monitoring of all company systems. Implementation of AWS Cloud services including CodeBuild, RDS, EKS, EC2, ECR, WAF, CodePipeline, Route 53, IAM and CloudFront. Container orchestration with Kubernetes, CI/CD pipelines with Jenkins and GitLab, infrastructure automation with Terraform, and Linux/Ubuntu server administration.",
          "Administração e monitoramento de todos os sistemas da empresa. Implementação de serviços AWS: CodeBuild, RDS, EKS, EC2, ECR, WAF, CodePipeline, Route 53, IAM e CloudFront. Orquestração de contêineres com Kubernetes, pipelines CI/CD com Jenkins e GitLab, automação com Terraform e administração de servidores Linux/Ubuntu."
        )}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {["AWS", "Kubernetes", "Terraform", "Jenkins", "GitLab", "Docker", "S3", "EC2", "RDS", "Firebase", "Nginx", "Proxmox"].map((skill) => (
          <span key={skill} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#1e2a38", color: "#76e4f7" }}>
            {skill}
          </span>
        ))}
      </div>
    </Card>

    <Card>
      <div className="mb-3">
        <p className="text-sm font-semibold text-white">eduCAT</p>
        <p className="text-sm mt-0.5" style={{ color: "#68d391" }}>{t("Technical Support Intern", "Estagiário Suporte Técnico")}</p>
        <p className="text-xs mt-0.5" style={{ color: "#4a5568" }}>jun 2023 — jun 2024</p>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: "#a0aec0" }}>
        {t(
          "Provided technical support for client computers, especially doctors from various medical societies across the country. Actively participated in customer service and resolving issues related to online exam applications. Significantly contributed to the successful integration of the SESI project.",
          "Suporte técnico aos computadores dos clientes, especialmente médicos de diversas sociedades médicas do país. Participação no atendimento ao cliente e resolução de problemas relacionados às aplicações de provas online. Contribuição para a integração do projeto SESI, principal cliente da eduCAT."
        )}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {[t("Technical Support", "Suporte Técnico"), t("Customer Service", "Atendimento ao Cliente")].map((skill) => (
          <span key={skill} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#1e2a38", color: "#68d391" }}>
            {skill}
          </span>
        ))}
      </div>
    </Card>
  </div>
);

const CERTS: { name: string; image?: string; color: string }[] = [
  { name: "AWS Certified Cloud Practitioner",              image: "/Cloud Practitioner.png",  color: "#fbd38d" },
  { name: "AWS Certified AI Practitioner",                 image: "/ai practitioner.png",     color: "#fbd38d" },
  { name: "AWS Certified Solutions Architect - Associate", image: "/Architect associate.png", color: "#fbd38d" },
  { name: "AWS Certified CloudOps Engineer - Associate",   image: "/Cloudops.png",            color: "#fbd38d" },
  { name: "IELTS — University of Cambridge (jan 2022)",                                       color: "#76e4f7" },
];

const CertCard = ({ cert }: { cert: typeof CERTS[0] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl mb-3 border overflow-hidden" style={{ background: "#111827", borderColor: "#1e2a38" }}>
      <button
        className="w-full flex items-center justify-between px-4 py-3 transition-all"
        onClick={() => cert.image && setOpen(!open)}
        style={{ cursor: cert.image ? "pointer" : "default" }}
        onMouseEnter={(e) => { if (cert.image) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      >
        <p className="text-sm font-medium text-left" style={{ color: cert.color }}>{cert.name}</p>
        {cert.image && (open
          ? <ChevronDown  size={14} style={{ color: "#4a5568" }} />
          : <ChevronRight size={14} style={{ color: "#4a5568" }} />
        )}
      </button>
      {open && cert.image && (
        <div className="px-4 pb-4">
          <img
            src={cert.image}
            alt={cert.name}
            className="w-full rounded-lg border object-contain max-h-64"
            style={{ borderColor: "#1e2a38" }}
          />
        </div>
      )}
    </div>
  );
};

const EducationSection = ({ t }: { lang: Lang; t: (en: string, pt: string) => string }) => (
  <div>
    <SectionTitle
      title={t("Education", "Formação")}
      subtitle={t("Academic background and certifications", "Formação acadêmica e certificações")}
    />
    <Card>
      <p className="text-sm font-semibold text-white">PUC Minas</p>
      <p className="text-sm mt-1" style={{ color: ACCENT }}>{t("Software Engineering", "Engenharia de Software")}</p>
      <p className="text-xs mt-1" style={{ color: "#4a5568" }}>2023 — 2027</p>
    </Card>
    <Card>
      <p className="text-sm font-semibold text-white">Colégio Santa Maria Minas</p>
      <p className="text-sm mt-1" style={{ color: "#a0aec0" }}>{t("Primary and Secondary Education", "Ensino Básico e Médio")}</p>
    </Card>

    <SectionTitle title={t("Certifications", "Certificações")} />
    {CERTS.map((cert) => <CertCard key={cert.name} cert={cert} />)}
  </div>
);

const PhotosSection = ({ t }: { lang: Lang; t: (en: string, pt: string) => string }) => (
  <div>
    <SectionTitle title="Photos" subtitle={t("My photos", "Minhas fotos")} />
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#1e2a38" }}>
        <img
          src="/Foto1.jpeg"
          alt="Photo"
          className="w-full h-57 object-cover"
        />
      </div>
    </div>
  </div>
);

const LanguageSection = ({ lang, onLangChange, t }: { lang: Lang; onLangChange: (l: Lang) => void; t: (en: string, pt: string) => string }) => (
  <div>
    <SectionTitle
      title={t("Language", "Idioma")}
      subtitle={t("Choose your preferred language", "Escolha seu idioma preferido")}
    />
    <Card>
      {(["en", "pt"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => onLangChange(l)}
          className="w-full flex items-center justify-between py-3 border-b last:border-0 transition-all"
          style={{ borderColor: "#1e2a38" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{l === "en" ? "🇺🇸" : "🇧🇷"}</span>
            <span className="text-sm text-white">{l === "en" ? "English" : "Português"}</span>
          </div>
          {lang === l && (
            <div className="w-3 h-3 rounded-full" style={{ background: ACCENT }} />
          )}
        </button>
      ))}
    </Card>
  </div>
);
