import { useState, useEffect, useRef } from "react";

const ACCENT = "#00d4aa";

const styles = {
  root: {
    background: "#0a0e17",
    color: "#e2e8f0",
    fontFamily: "'Syne', 'Segoe UI', sans-serif",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  nav: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1.1rem 5vw",
    background: "rgba(10,14,23,0.88)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  navLogo: {
    fontFamily: "Georgia, serif",
    fontSize: "1.3rem",
    color: ACCENT,
    letterSpacing: "-0.02em",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
};

const data = {
  skills: [
    {
      title: "Moodle Development",
      tags: ["Moodle 3.x / 4.x", "Local Plugins", "Block Plugins", "Report Plugins", "Child Themes", "IOMAD", "Moodle APIs", "REST Web Services"],
    },
    {
      title: "Backend",
      tags: ["PHP", "MySQL", "MariaDB", "PostgreSQL", "AJAX"],
    },
    {
      title: "Frontend",
      tags: ["HTML5", "CSS3", "JavaScript ES6+", "jQuery", "Bootstrap"],
    },
    {
      title: "LMS Concepts",
      tags: ["SCORM", "xAPI", "Course Completion", "Proctoring", "Custom Reporting", "User Management"],
    },
    {
      title: "Integrations",
      tags: ["Payment Gateways", "Zoom", "External APIs", "SSO (SAML)", "OAuth"],
    },
    {
      title: "DevOps & Tools",
      tags: ["Git / GitHub", "Linux (Apache)", "Cron Jobs", "Log Analysis", "Performance Debug"],
    },
  ],
  projects: [
    {
      name: "Bank of Uganda LMS",
      period: "Oct 2024 – Feb 2025",
      stack: ["Moodle", "IOMAD", "PHP", "MariaDB"],
      points: [
        "Implemented IOMAD multi-tenant architecture for department-level reporting and branding",
        "Engineered a complex local plugin handling company-based data separation for tenant reports",
        "Configured automated cron tasks for nightly report generation and enrollment reminders",
      ],
    },
    {
      name: "Mazenet LMS",
      period: "Jan 2024 – May 2025",
      stack: ["Moodle", "PHP", "MySQL", "REST API", "React"],
      points: [
        "Developed custom Moodle Web Service APIs integrating the backend with a React frontend",
        "Built APIs for courses, enrollments, quizzes, assignments, progress tracking, and file submissions",
        "Implemented secure token-based authentication with role-based access control",
      ],
    },
    {
      name: "Corecard LMS Upgrade",
      period: "May 2024 – Sep 2024",
      stack: ["Moodle 4.3", "PHP", "PostgreSQL"],
      points: [
        "End-to-end upgrade from Moodle 3.11 → 4.3 with zero data loss and minimal downtime",
        "Complete site revamp with theme modernization and Moodle 4.x UX standards",
        "Built bulk CSV user/enrollment management and automated email notification system",
      ],
    },
    {
      name: "Winwork LMS – SCORM",
      period: "Dec 2023 – Mar 2024",
      stack: ["Moodle", "SCORM", "xAPI", "PHP"],
      points: [
        "Modified core SCORM module via local plugin to capture custom xAPI statements",
        "Designed detailed SCORM attempt tracking and completion report for instructors",
      ],
    },
    {
      name: "Wordludo LMS",
      period: "Dec 2025 – Jan 2026",
      stack: ["Moodle 5.0", "PHP", "Edma Theme"],
      points: [
        "Customizing Moodle 5.0 with the Edma theme across all LMS pages",
        "Customized course landing pages, login pages, and overall brand identity",
        "Enhanced UI with Moodle block customization and component improvements",
      ],
    },
  ],
  experience: [
    {
      company: "Hansetech Soft Solutions Pvt. Ltd",
      role: "Moodle Developer",
      period: "June 2023 – Present",
      points: [
        "Engineered and maintained custom Moodle plugins (local, blocks, reports) and child themes for multiple enterprise clients",
        "Integrated third-party systems via Moodle APIs and web services — Zoom, payment gateways, and SSO providers",
        "Enhanced a custom proctoring plugin with video/audio monitoring for exam integrity",
        "Oversaw Moodle version upgrades (3.11 → 4.3) for live production sites, ensuring zero data loss",
        "Created performance-optimized SQL-based reports for administrators and trainers",
        "Triaged complex Moodle issues via Apache/PHP log analysis and database-level debugging",
        "Managed cron jobs for nightly reports, enrollment reminders, and system backups",
      ],
    },
  ],
};

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "0.75rem",
      fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em",
      textTransform: "uppercase", color: ACCENT, marginBottom: "0.75rem",
    }}>
      {children}
      <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)", maxWidth: 60 }} />
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <li>
      <a href={href} style={{
        color: "#64748b", textDecoration: "none", fontSize: "0.82rem",
        fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
        transition: "color 0.2s",
      }}
        onMouseEnter={e => e.target.style.color = ACCENT}
        onMouseLeave={e => e.target.style.color = "#64748b"}
      >
        {children}
      </a>
    </li>
  );
}

function Tag({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <span style={{
      background: hov ? "rgba(0,212,170,0.08)" : "rgba(255,255,255,0.05)",
      border: hov ? "1px solid rgba(0,212,170,0.25)" : "1px solid rgba(255,255,255,0.07)",
      borderRadius: 6, padding: "0.3rem 0.75rem",
      fontFamily: "monospace", fontSize: "0.78rem",
      color: hov ? ACCENT : "#e2e8f0", transition: "all 0.2s", cursor: "default",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </span>
  );
}

function ProjectCard({ project }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      background: "#111827",
      border: hov ? "1px solid rgba(0,212,170,0.22)" : "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16, padding: "2rem",
      display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem",
      transition: "all 0.25s",
      transform: hov ? "translateY(-3px)" : "translateY(0)",
      position: "relative", overflow: "hidden",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, #00d4aa, #3b82f6)",
        opacity: hov ? 1 : 0, transition: "opacity 0.25s",
      }} />
      <div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "#fff", marginBottom: "0.4rem" }}>
          {project.name}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#64748b", marginBottom: "1rem" }}>
          {project.period}
        </div>
        <ul style={{ paddingLeft: "1.2rem", color: "#64748b", fontSize: "0.92rem", lineHeight: 1.75 }}>
          {project.points.map((p, i) => <li key={i} style={{ marginBottom: "0.35rem" }}>{p}</li>)}
        </ul>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", minWidth: 130 }}>
        {project.stack.map(s => (
          <span key={s} style={{
            background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: 6, padding: "0.3rem 0.75rem", fontFamily: "monospace",
            fontSize: "0.74rem", color: "#93c5fd", textAlign: "center", whiteSpace: "nowrap",
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function Btn({ href, primary, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      padding: "0.85rem 2rem", borderRadius: 8, fontSize: "0.9rem", fontWeight: 600,
      textDecoration: "none", transition: "all 0.2s", fontFamily: "inherit",
      background: primary ? (hov ? "#00f0c0" : ACCENT) : "transparent",
      color: primary ? "#0a0e17" : "#e2e8f0",
      border: primary ? "none" : "1px solid rgba(255,255,255,0.1)",
      transform: hov && primary ? "translateY(-2px)" : "translateY(0)",
      boxShadow: hov && primary ? "0 8px 25px rgba(0,212,170,0.28)" : "none",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  );
}

export default function Portfolio() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={styles.root}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>VSR.</div>
        <ul style={styles.navLinks}>
          {[["#about","About"],["#skills","Skills"],["#projects","Projects"],["#experience","Experience"],["#contact","Contact"]].map(([h,l]) => (
            <NavLink key={h} href={h}>{l}</NavLink>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "7rem 8vw 4rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-40%", right: "-20%",
          width: "70vw", height: "70vw",
          background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-30%", left: "-15%",
          width: "50vw", height: "50vw",
          background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 860 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.2)",
            borderRadius: 100, padding: "0.35rem 1rem",
            fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: ACCENT, marginBottom: "1.5rem",
            animation: "fadeUp 0.6s ease both",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite" }} />
            Available for opportunities
          </div>
          <h1 style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff",
            margin: "0 0 1.5rem",
          }}>
            Venkata<br />Siva Rao <span style={{ color: ACCENT, fontStyle: "italic" }}>Bandi</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#64748b", maxWidth: 540, lineHeight: 1.75, marginBottom: "2.5rem" }}>
            Moodle Developer with 2+ years engineering scalable LMS solutions — custom plugins, IOMAD multi-tenancy, and enterprise integrations.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Btn href="#projects" primary>View Projects ↓</Btn>
            <Btn href="mailto:venkatasivaraobandi2001@gmail.com">Get in Touch</Btn>
          </div>
        </div>
        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
          @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
        `}</style>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "6rem 8vw", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>About me</SectionLabel>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
                Building the future<br />of online learning
              </h2>
              <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.2rem" }}>
                I'm a Moodle specialist based in <strong style={{ color: "#e2e8f0" }}>Hyderabad, India</strong>, focused on delivering enterprise-grade LMS solutions that scale. I design and build custom plugins, integrate third-party APIs, and handle everything from database debugging to production upgrades.
              </p>
              <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                From multi-tenant IOMAD deployments for banks to SCORM proctoring systems, I work across the full Moodle stack — backend PHP, MySQL optimization, and frontend customization.
              </p>
              <Btn href="mailto:venkatasivaraobandi2001@gmail.com">Say hello →</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
              {[["2+","Years Experience"],["5+","Enterprise Projects"],["4.x","Moodle Expert"],["0","Data Loss on Upgrades"]].map(([num, label]) => (
                <div key={label} style={{ background: "#111827", padding: "2rem 1.5rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", color: ACCENT, lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* SKILLS */}
      <div id="skills" style={{ background: "#111827" }}>
        <div style={{ padding: "6rem 8vw", maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>Core skills</SectionLabel>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>What I work with</h2>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {data.skills.map(cat => (
                <SkillCard key={cat.title} cat={cat} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 8vw", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Key projects</SectionLabel>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>Work I'm proud of</h2>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {data.projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "0 8vw 6rem", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Experience</SectionLabel>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>Where I've worked</h2>
        {data.experience.map(exp => (
          <Reveal key={exp.company}>
            <div style={{
              background: "#111827", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "2.5rem", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, right: 0, width: 200, height: 200,
                background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", color: "#fff" }}>{exp.company}</div>
                  <div style={{ color: ACCENT, fontWeight: 600, fontSize: "0.88rem", marginTop: "0.25rem" }}>{exp.role}</div>
                </div>
                <div style={{
                  fontFamily: "monospace", fontSize: "0.8rem", color: "#64748b",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8, padding: "0.5rem 1rem",
                }}>{exp.period}</div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {exp.points.map((pt, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.75rem", color: "#64748b", fontSize: "0.95rem", lineHeight: 1.7 }}>
                    <span style={{ color: ACCENT, flexShrink: 0 }}>→</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "0 8vw 6rem", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            background: "#111827", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20, padding: "4rem 2rem", textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: "-60%", left: "50%", transform: "translateX(-50%)",
              width: 500, height: 500,
              background: "radial-gradient(circle, rgba(0,212,170,0.07) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />
            <SectionLabel style={{ justifyContent: "center" }}>Contact</SectionLabel>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Let's build something<br /><span style={{ color: ACCENT, fontStyle: "italic" }}>together</span>
            </h2>
            <p style={{ color: "#64748b", maxWidth: 420, margin: "0 auto 2.5rem", fontSize: "1rem", lineHeight: 1.75 }}>
              Open to new opportunities, freelance Moodle projects, and consulting. I'd love to hear from you.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { href: "mailto:venkatasivaraobandi2001@gmail.com", label: "venkatasivaraobandi2001@gmail.com" },
                { href: "tel:+918790546037", label: "+91 8790546037" },
                { href: "https://github.com", label: "GitHub" },
              ].map(link => <ContactChip key={link.href} {...link} />)}
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center", padding: "2rem 5vw",
        color: "#64748b", fontSize: "0.82rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        © 2025 Venkata Siva Rao Bandi · Hyderabad, India
      </footer>
    </div>
  );
}

function SkillCard({ cat }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      background: "#1a2235",
      border: hov ? "1px solid rgba(0,212,170,0.3)" : "1px solid rgba(255,255,255,0.07)",
      borderRadius: 12, padding: "1.75rem", transition: "border-color 0.2s",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: "1rem" }}>
        {cat.title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {cat.tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>
    </div>
  );
}

function ContactChip({ href, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      display: "inline-flex", alignItems: "center", gap: "0.6rem",
      background: hov ? "rgba(0,212,170,0.05)" : "rgba(255,255,255,0.04)",
      border: hov ? "1px solid rgba(0,212,170,0.3)" : "1px solid rgba(255,255,255,0.07)",
      borderRadius: 10, padding: "0.75rem 1.25rem",
      color: hov ? ACCENT : "#e2e8f0", fontSize: "0.88rem",
      textDecoration: "none", fontFamily: "monospace", transition: "all 0.2s",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </a>
  );
}