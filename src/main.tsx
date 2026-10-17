import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
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
function SocialIcon({ name }: { name: "github" | "gmail" | "linkedin" | "whatsapp" }) {
  return <img className="social-icon" src={new URL(`./assets/social/${name}.svg`, import.meta.url).href} alt="" width="18" height="18" />;
}

const whatsappUrl = `https://wa.me/${profile.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Olá, João! Vi seu portfólio e gostaria de conversar sobre um projeto ou oportunidade.")}`;
const curriculumUrl = "https://osoapy.github.io/my-curriculum/";

function Folder({ label }: { label: string }) {
  return (
    <span className="folder-wrap">
      <span className="folder-pixel" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

function RetroWindow({ title, className, children }: {
  title: string; className: string; children: React.ReactNode;
}) {
  const shellRef = useRef<HTMLDialogElement>(null);
  const maximizeRef = useRef<HTMLButtonElement>(null);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  useEffect(() => { shellRef.current?.show(); }, []);
  useEffect(() => {
    if (!maximized) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [maximized]);

  function restore() {
    const dialog = shellRef.current!;
    dialog.close();
    dialog.show();
    setMaximized(false);
    maximizeRef.current?.focus({ preventScroll: true });
  }
  function maximize() {
    if (maximized) { restore(); return; }
    setMinimized(false);
    const dialog = shellRef.current!;
    dialog.close();
    dialog.showModal();
    setMaximized(true);
  }
  function minimize() {
    if (maximized) restore();
    setMinimized(value => !value);
  }

  return (
    <div className={`${className} retro-window`}>
      <dialog ref={shellRef} className={`window-shell${maximized ? " is-maximized" : ""}`}
        aria-label={title} onCancel={event => { event.preventDefault(); restore(); }}>
        <div className="titlebar">
          <span>{title}</span>
          <div className="title-controls">
            <button type="button" aria-label={`${minimized ? "Restaurar" : "Minimizar"} ${title}`} aria-expanded={!minimized} onClick={minimize}>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 12.5h10" /></svg>
            </button>
            <button type="button" ref={maximizeRef} aria-label={`${maximized ? "Sair da tela cheia de" : "Maximizar"} ${title}`} onClick={maximize}>
              <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="3.5" width="9" height="9" /></svg>
            </button>
            <button type="button" className="window-close" aria-label={`Fechar ${title}`} onClick={() => {
              if (maximized) { restore(); return; }
              window.dispatchEvent(new CustomEvent("portfolio-error", { detail: title }));
            }}>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 3.5 9 9m0-9-9 9" /></svg>
            </button>
          </div>
        </div>
        <div className="window-content" hidden={minimized}>{children}</div>
      </dialog>

    </div>
  );
}

type WindowError = { id: number; title: string };

function ErrorWindow({ error, onClose }: { error: WindowError; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.showPopover(); }, []);
  // Bounce across each axis to form a repeating zigzag, keeping the whole window on screen.
  const bounce = (step: number, period: number) => 1 - Math.abs((step % period) / (period / 2) - 1);
  const style = {
    "--error-x": bounce(error.id + 3, 16),
    "--error-y": bounce(error.id + 2, 10),
  } as CSSProperties;
  return createPortal(
    <div ref={ref} popover="manual" className="window-error" role="dialog"
      aria-label={`Erro ao fechar ${error.title}`} style={style}
      onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); onClose(); } }}>
      <div className="titlebar"><span>Erro do sistema</span><div className="title-controls">
        <button type="button" className="window-close" aria-label="Fechar erro" onClick={onClose}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 3.5 9 9m0-9-9 9" /></svg>
        </button>
      </div></div>
      <div className="error-message">
        <svg className="error-symbol" viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="14" fill="#c62b25" stroke="#801b17" strokeWidth="2" />
          <path d="m10 10 12 12m0-12L10 22" stroke="white" strokeWidth="4" />
        </svg>
        <div><h2>Não foi possível fechar {error.title}.</h2><p>Esta janela faz parte do meu portfólio. Você pode minimizá-la ou continuar explorando!</p></div>
      </div>
      <div className="error-actions"><button type="button" className="send-button" onClick={onClose}>OK</button></div>
    </div>, document.body,
  );
}

function ErrorStack() {
  const [errors, setErrors] = useState<WindowError[]>([]);
  const nextId = useRef(0);
  useEffect(() => {
    const addError = (event: Event) => {
      const error = { id: nextId.current++, title: (event as CustomEvent<string>).detail };
      setErrors(current => [...current, error]);
    };
    window.addEventListener("portfolio-error", addError);
    return () => window.removeEventListener("portfolio-error", addError);
  }, []);
  return errors.map(error => <ErrorWindow key={error.id} error={error}
    onClose={() => setErrors(current => current.filter(item => item.id !== error.id))} />);
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
  const visual: SkillVisual = skillVisuals[name];
  const colors = {
    "--skill-from": visual.from,
    "--skill-to": visual.to,
  } as CSSProperties;
  return (
    <span className="skill" style={colors}>
      <img className={name === "FlutterFlow" ? "flutterflow-icon" : undefined} src={visual.icon} alt="" width="16" height="16" />
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
        CURRÍCULO / PDF ↗
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
          <b>Uma mensagem para você</b>
          <button ref={closeRef} onClick={onClose} aria-label="Fechar aviso">
          </button>
        </header>
        <div className="return-body">
          <img src={mark} alt="" width="42" height="42" />
          <div>
            <h2 id="return-title">Você voltou!</h2>
            <p>
              Gostou de algum projeto? Entre em contato comigo!
              Vou adorar saber da sua ideia.
            </p>
          </div>
        </div>
        <div className="return-actions">
          <button onClick={onClose}>Agora não</button>
          <a href="#contato" onClick={() => {
            onClose();
            window.setTimeout(() => document.getElementById("contact-name")?.focus({ preventScroll: true }), 0);
          }}>
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

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const sendingRef = useRef(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return;
    sendingRef.current = true;
    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === "true")) {
        throw new Error("Não foi possível enviar");
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      sendingRef.current = false;
    }
  }

  return (
    <RetroWindow className="contact-compose" title="Nova mensagem">
      <div className="compose-recipient"><span>Para</span> {profile.email}</div>
      <form onSubmit={submit} aria-label="Enviar mensagem" aria-busy={status === "sending"}>
        <input type="hidden" name="_subject" value="Novo contato pelo portfólio" />
        <input type="hidden" name="_template" value="table" />
        <input className="form-trap" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <fieldset disabled={status === "sending"}>
          <label htmlFor="contact-name">Seu nome</label>
          <input id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder="Como posso te chamar?" />
          <label htmlFor="contact-email">Seu e-mail</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="voce@exemplo.com" />
          <label htmlFor="contact-message">Mensagem</label>
          <textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Me conte sobre sua ideia ou oportunidade…" />
          <button className="send-button" type="submit">{status === "sending" ? "Enviando…" : "Enviar mensagem ↗"}</button>
        </fieldset>
        <div className="form-feedback" role="status" aria-live="polite">
          {status === "success" && "Mensagem encaminhada! Obrigado por entrar em contato."}
          {status === "error" && <>Não consegui confirmar o envio. Sua mensagem continua aqui para tentar novamente. Você também pode <a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">me escrever por e-mail</a>.</>}
        </div>
      </form>
    </RetroWindow>
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
        <div className="desktop-shortcuts">
          <a href="#sobre">
            <span className="shortcut-portrait">
              <img src={photo} alt="" />
            </span>
            <span>joao.exe</span>
          </a>
          <a href="#projetos">
            <Folder label="meus arquivos" />
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
          versão 1.6.43+61
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
          </div>
          <div className="about-windows">
            <RetroWindow className="photo-window" title="MEET-JOAO">
              <img src={photo} alt="Foto de João Gabriel" />
              <div className="window-status">
                joao_gabriel.png &nbsp; • &nbsp; 100%
              </div>
            </RetroWindow>
            <RetroWindow className="social-window" title="SOCIALS">
              <div>
                <External href={profile.github}>
                  <SocialIcon name="github" /> github.com/Osoapy ↗
                </External>
                <External href={profile.linkedin}>
                  <SocialIcon name="linkedin" /> LinkedIn / João Gabriel ↗
                </External>
                <a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">
                  <SocialIcon name="gmail" /> enviar e-mail ↗
                </a>
                <External href={whatsappUrl}><SocialIcon name="whatsapp" /> conversar no WhatsApp ↗</External>
              </div>
            </RetroWindow>
          </div>
        </section>

        <div className="window-divider">
          <span>curriculo.doc</span>
          <span>experiência profissional</span>
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
          <span>{projects.length} projetos</span>
        </div>

        <section id="projetos" className="projects page-section">
          <ProjectExplorer />
        </section>

        <div className="window-divider">
          <span>formacao.txt</span>
          <span>formação & conquistas</span>
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
          <span>vamos conversar</span>
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
            <a className="email-link" href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">
              {profile.email}
            </a>
            <p className="phone"><External href={whatsappUrl}>{profile.phone} · WhatsApp ↗</External></p>
            <div className="contact-links">
              <External href={profile.github}>GitHub ↗</External>
              <External href={profile.linkedin}>LinkedIn ↗</External>
              <External href={curriculumUrl}>Currículo / PDF ↗</External>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>aprendendo a ser a mudança</span>
        <a href="#inicio">↑ voltar ao topo</a>
      </footer>
      <ErrorStack />
      {showReminder && <ReturnReminder onClose={closeReminder} />}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
