import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import photo from "./assets/foto.png";
import mark from "./assets/mark.png";
import { experience, highlights, profile } from "./data/profile";
import { projects } from "./data/projects";
import { skillVisuals, type SkillVisual } from "./data/skillVisuals";
import { useAwayReminder } from "./useAwayReminder";
import "./styles.css";

const tabs = [
  { href: "#sobre", label: "sobre mim" },
  { href: "#experiencia", label: "experiência" },
  { href: "#projetos", label: "projetos" },
  { href: "#formacao", label: "formação" },
  { href: "#contato", label: "contato" },
];
const curriculumUrl = "https://osoapy.github.io/my-curriculum/";

function Folder({ label }: { label: string }) {
  return (
    <span className="folder-wrap">
      <span className="folder-pixel" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

function Titlebar({ title }: { title: string }) {
  return (
    <div className="titlebar">
      <span>▣ &nbsp; {title}</span>
      <span className="title-controls" aria-hidden="true">
        <i className="control-minimize" />
        <i className="control-maximize" />
        <i className="control-close" />
      </span>
    </div>
  );
}

function External({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Skill({ name }: { name: string }) {
  const visual: SkillVisual = skillVisuals[name] ?? {
    from: "#333",
    to: "#666",
  };
  const colors = {
    "--skill-from": visual.from,
    "--skill-to": visual.to,
  } as CSSProperties;
  return (
    <span className="skill" style={colors}>
      <img src={visual.icon ?? mark} alt="" width="18" height="18" />
      <span className="skill-name">{name}</span>
    </span>
  );
}

function Taskbar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = window.setInterval(() => setTime(new Date()), 30000);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <nav className="taskbar" aria-label="Seções do currículo">
      {tabs.map((tab) => (
        <a className="task-tab" href={tab.href} key={tab.href}>
          {tab.label}
        </a>
      ))}
      <a
        className="task-print"
        href={curriculumUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Abrir meu currículo em outra aba"
      >
        CURRÍCULO / PDF
      </a>
      <time className="task-time" dateTime={time.toISOString()}>
        {time.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}{" "}
        &nbsp;{" "}
        {time.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </time>
    </nav>
  );
}

function ReturnReminder({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    closeRef.current?.focus();
    return () => {
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") onClose();
    if (event.key !== "Tab") return;
    const items =
      dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
    if (!items?.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="reminder-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="return-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="return-title"
        onKeyDown={onKeyDown}
      >
        <header className="return-titlebar">
          <img src={mark} alt="" width="16" height="16" />
          <b>Mensagem do sistema</b>
          <button ref={closeRef} onClick={onClose} aria-label="Fechar aviso">
          </button>
        </header>
        <div className="return-body">
          <img src={mark} alt="" width="42" height="42" />
          <div>
            <h2 id="return-title">Você voltou!</h2>
            <p>
              Gostou de algum projeto? Mande uma mensagem para João Gabriel. A
              conversa pode começar por aqui.
            </p>
          </div>
        </div>
        <div className="return-actions">
          <button onClick={onClose}>Agora não</button>
          <a href={`mailto:${profile.email}`} onClick={onClose}>
            Entrar em contato
          </a>
        </div>
        <div className="return-status">João Gabriel - Portfólio pessoal</div>
      </section>
    </div>
  );
}

function ProjectExplorer() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  return (
    <div className="explorer">
      <div className="explorer-intro">
        <div className="explorer-title">
          <span>meus</span>
          <strong>projetos</strong>
          <small>coleção / 2022-2026</small>
        </div>
        <p>
          Projetos de software e ideias que ganharam forma. Escolha uma pasta
          para ler mais.
        </p>
        <article className="project-detail" aria-live="polite">
          <span>ARQUIVO 0{selected + 1}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>
            <b>Tecnologias:</b> {project.stack.join(", ")}
          </p>
          <p>
            <b>Equipe:</b> {project.team}
          </p>
          {project.url ? (
            <External href={project.url}>abrir projeto ↗</External>
          ) : (
            <small>Link público indisponível.</small>
          )}
        </article>
      </div>
      <div className="folder-list" role="group" aria-label="Escolha um projeto">
        {projects.map((item, index) => (
          <button
            key={item.id}
            className={selected === index ? "folder-selected" : ""}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
          >
            <Folder label={item.title} />
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const { showReminder, closeReminder } = useAwayReminder();
  useEffect(() => {
    const section = document.getElementById(window.location.hash.slice(1));
    if (section) {
      document.documentElement.style.scrollBehavior = "auto";
      section.scrollIntoView();
      document.documentElement.style.removeProperty("scroll-behavior");
    }
  }, []);
  return (
    <div id="inicio" className="site">
      <header className="wallpaper">
        <div className="wallpaper-grain" aria-hidden="true" />
        <div className="desktop-shortcuts">
          <a href="#projetos">
            <Folder label="meus arquivos" />
          </a>
          <a href="#sobre">
            <span className="shortcut-portrait">
              <img src={photo} alt="" />
            </span>
            <span>joao.exe</span>
          </a>
          <a href="#contato">
            <span className="mail-icon" aria-hidden="true">
              ✉
            </span>
            <span>contato</span>
          </a>
        </div>
        <div className="wallpaper-title">
          <span className="year">2026-</span>
          <h1>PORTFÓLIO</h1>
          <p>por João Gabriel Vieira Silva</p>
        </div>
        <span className="wallpaper-version">
          edição pessoal &nbsp; / &nbsp; v. 01
        </span>
      </header>

      <Taskbar />

      <main>
        <section id="sobre" className="about page-section">
          <div className="about-text">
            <div className="about-heading">
              <span>sobre</span>
              <strong>mim!</strong>
            </div>
            <h2>{profile.name}</h2>
            <p>{profile.intro}</p>
            <h3>HABILIDADES</h3>
            <div className="skill-groups">
              {profile.skills.map((group) => (
                <div className="skill-group" key={group.group}>
                  <h4>{group.group}</h4>
                  <div>
                    {group.items.map((skill) => (
                      <Skill key={skill} name={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <a className="old-link" href="#formacao">
              FORMAÇÃO ACADÊMICA ↓
            </a>
            <p className="tiny-note">
              Formação no IFPB e intercâmbio acadêmico na Espanha.
            </p>
          </div>
          <div className="about-windows">
            <div className="photo-window">
              <Titlebar title="MEET-JOAO" />
              <img src={photo} alt="Foto de João Gabriel" />
              <div className="window-status">
                joao_gabriel.png &nbsp; • &nbsp; 100%
              </div>
            </div>
            <div className="social-window">
              <Titlebar title="SOCIALS" />
              <div>
                <External href={profile.github}>
                  ◉ &nbsp; github.com/Osoapy ↗
                </External>
                <External href={profile.linkedin}>
                  in &nbsp; LinkedIn / João Gabriel ↗
                </External>
                <a href={`mailto:${profile.email}`}>
                  ✉ &nbsp; enviar e-mail ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="window-divider">
          <span>curriculo.doc</span>
          <span>▣ &nbsp; página 1 de 3</span>
        </div>

        <section id="experiencia" className="experience page-section">
          <div className="section-side">
            <span className="section-code">01 / HISTÓRICO</span>
            <h2>
              onde
              <br />
              <em>trabalhei.</em>
            </h2>
            <p>
              Experiências em desenvolvimento de software e equipes
              multidisciplinares.
            </p>
          </div>
          <div className="jobs">
            {experience.map((job) => (
              <article className="job" key={`${job.company}-${job.period}`}>
                <div className="job-title">
                  <h3>{job.role}</h3>
                  <span>{job.period}</span>
                </div>
                <b>{job.company}</b>
                <p>{job.description}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="window-divider">
          <span>projetos.exe</span>
          <span>▣ &nbsp; {projects.length} arquivos</span>
        </div>

        <section id="projetos" className="projects page-section">
          <ProjectExplorer />
        </section>

        <div className="window-divider">
          <span>formacao.txt</span>
          <span>▣ &nbsp; somente leitura</span>
        </div>

        <section id="formacao" className="education page-section">
          <div className="section-side">
            <span className="section-code">02 / CONHECIMENTO</span>
            <h2>
              onde
              <br />
              <em>estudei.</em>
            </h2>
            <p>Formação acadêmica, ensino e outras atividades.</p>
          </div>
          <div className="jobs education-list">
            {profile.education.map((item) => (
              <article className="job" key={item.title}>
                <div className="job-title">
                  <h3>{item.title}</h3>
                  <span>{item.period}</span>
                </div>
                <b>{item.institution}</b>
              </article>
            ))}
            <h3 className="extras-title">CURSOS & CONQUISTAS</h3>
            <ul className="education-extras">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="extras-title">IDIOMAS</h3>
            <p className="education-languages">
              {profile.languages.join(" · ")}
            </p>
          </div>
        </section>

        <div className="window-divider">
          <span>mensagem.msg</span>
          <span>▣ &nbsp; pronto para enviar</span>
        </div>

        <section id="contato" className="contact page-section">
          <div>
            <span className="section-code">03 / FALE COMIGO</span>
            <h2>
              vamos
              <br />
              <em>conversar?</em>
            </h2>
            <p>Para projetos, oportunidades ou só para trocar ideias:</p>
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <p className="phone">{profile.phone}</p>
          </div>
          <div className="contact-note">
            <Titlebar title="atalhos.url" />
            <div>
              <External href={profile.github}>GitHub ↗</External>
              <External href={profile.linkedin}>LinkedIn ↗</External>
              <External href={curriculumUrl}>CURRÍCULO / PDF ↗</External>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>aprendendo a ser a mundança</span>
        <a href="#inicio">↑ voltar ao topo</a>
      </footer>
      {showReminder && <ReturnReminder onClose={closeReminder} />}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
