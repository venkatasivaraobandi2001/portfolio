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
      tags: ["Moodle 3.x / 4.x / 5.0", "Local Plugins", "Block Plugins", "Report Plugins", "Module Plugins", "Theme Customization", "IOMAD", "Moodle APIs", "REST Web Services"],
    },
    {
      title: "Backend",
      tags: ["PHP", "MySQL", "MariaDB", "PostgreSQL", "AJAX"],
    },
    {
      title: "Frontend",
      tags: ["HTML5", "CSS3", "JavaScript ES6+", "jQuery", "Bootstrap", "React"],
    },
    {
      title: "LMS / E-Learning",
      tags: ["SCORM", "xAPI (Tin Can)", "Course Completion", "Proctoring", "Custom Reporting", "User Management"],
    },
    {
      title: "Integrations",
      tags: ["Payment Gateways", "Zoom", "External APIs", "SSO (SAML)", "OAuth"],
    },
    {
      title: "DevOps & Tools",
      tags: ["Git / GitHub", "Linux (Apache)", "Cron Jobs", "Log Analysis", "Performance Debugging"],
    },
  ],

  // Projects sorted chronologically by start date
  projects: [
    {
      name: "Winwork LMS",
      period: "Dec 2023 – Mar 2024",
      stack: ["Moodle", "PHP", "SCORM", "xAPI"],
      points: [
        "Modified core SCORM module behavior via a local plugin to capture and display custom xAPI statements.",
        "Designed a custom report providing detailed SCORM attempt tracking and completion statuses for instructors.",
      ],
    },
    {
      name: "Mazenet LMS",
      period: "Jan 2024 – May 2025",
      stack: ["Moodle", "PHP", "MySQL", "Bootstrap", "React"],
      points: [
        "Developed custom Moodle Web Service APIs to connect the Moodle backend with a React-based frontend application.",
        "Built APIs covering courses, enrollments, quizzes, assignments, progress tracking, and file submissions.",
        "Enforced secure token-based authentication and role-based access control across all API endpoints.",
      ],
    },
    {
      name: "Corecard LMS",
      period: "May 2024 – Sep 2024",
      stack: ["Moodle 4.3", "PHP", "PostgreSQL"],
      points: [
        "Directed end-to-end upgrade and architectural overhaul from Moodle 3.11 to 4.3, covering full site revamp, theme modernization, and menu restructuring aligned to Moodle 4.x UX standards.",
        "Implemented CSV-based bulk user creation with custom L1 and L2 manager assignments.",
        "Developed bulk course enrollment and unenrollment workflows via CSV uploads.",
        "Built site-wide training reports and automated email notifications for enrollment, unenrollment, and course completion events.",
      ],
    },
    {
      name: "Bank of Uganda – LMS",
      period: "Oct 2024 – Feb 2025",
      stack: ["Moodle", "IOMAD", "PHP", "MariaDB"],
      points: [
        "Deployed and customized IOMAD for a multi-tenant B2B architecture, enabling isolated reporting and branding per department.",
        "Constructed a complex local plugin for tenant-specific report generation, handling IOMAD company-based data separation.",
        "Configured automated cron tasks for nightly report generation and enrollment reminder notifications.",
      ],
    },
    {
      name: "Galgano LMS – Time Spent Reporting",
      period: "May 2025 – Dec 2025",
      stack: ["Moodle", "PHP", "MySQL", "xAPI"],
      points: [
        "Integrated and extended the Course Dedication Block plugin to capture accurate time-spent data across all courses and activities.",
        "Built a custom reporting module delivering course-wise and activity-wise time-spent analytics for administrators and trainers.",
        "Developed Moodle scheduled tasks (cron-based) to automatically aggregate and store time-spent data daily.",
        "Recovered and backfilled all historical time-spent records by iterating scheduled tasks manually, then switched to full automation.",
        "Integrated xAPI (Tin Can) to capture standardized learning statements, enriching reporting data.",
      ],
    },
    {
      name: "Wordludo LMS",
      period: "Dec 2025 – Jan 2026",
      stack: ["Moodle 5.0", "PHP", "Edma Theme"],
      points: [
        "Led Moodle 5.0 customization using the Edma theme across all LMS pages including course landing pages, login pages, and site branding.",
        "Enhanced the learner UI by customizing Moodle blocks and interface components for a modern, intuitive experience.",
      ],
    },
    {
      name: "Siddhanth LMS",
      period: "Feb 2026 – Present",
      stack: ["Moodle", "PHP", "MySQL"],
      points: [
        "Developed role-based custom dashboards for Admin, Teacher, Non-Editing Teacher, and Student roles — each tailored with contextually relevant data, quick actions, and navigation.",
        "Implemented core quiz customizations including automatic redirection to a Feedback activity upon quiz submission for a seamless post-assessment flow.",
        "Built a custom feedback completion handler triggering a branded confirmation popup with a 3-second auto-logout timer and a manual logout button — enhancing exam session security.",
      ],
    },
  ],

  experience: [
    {
      company: "Hansetech Soft Solutions Pvt. Ltd",
      role: "Junior Moodle Developer",
      period: "Dec 2023 – Present",
      points: [
        "Designed and maintained custom Moodle plugins (local, blocks, reports) and child themes for multiple enterprise clients, directly addressing unique business logic.",
        "Integrated third-party systems via Moodle APIs and web services — including Zoom, payment gateways, and external SSO authentication providers.",
        "Enhanced a custom local plugin for proctoring with video and audio monitoring capabilities to ensure remote exam integrity.",
        "Executed end-to-end Moodle version upgrades (3.11 → 4.3 → 5.0) for live production sites, achieving zero data loss and minimal downtime.",
        "Created performance-optimized SQL-based reports for administrators and trainers, delivering actionable insights on user completion and SCORM activity.",
        "Diagnosed and resolved complex Moodle issues through server log analysis (Apache, PHP) and database-level debugging.",
        "Configured and managed cron jobs for automated nightly reports, enrollment reminders, and system backups.",
      ],
    },
    {
      company: "Hansetech Soft Solutions Pvt. Ltd",
      role: "Moodle Trainee",
      period: "June 2023 – Dec 2023",
      points: [
        "Learned Moodle architecture, plugin structure, and core LMS concepts under senior developer mentorship.",
        "Assisted in theme customization, basic plugin development, and platform configuration for live client sites.",
        "Gained practical experience with PHP, MySQL, and Moodle web service APIs in a production environment.",
        "Supported the team in debugging, server log analysis, and cron job configuration.",
      ],
    },
  ],
};

// ── Utilities ──────────────────────────────────────────────────────────────

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
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease` }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT, marginBottom: "0.75rem" }}>
      {children}
      <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)", maxWidth: 60 }} />
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <li>
      <a href={href} style={{ color: "#64748b", textDecoration: "none", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s" }}
        onMouseEnter={e => e.target.style.color = ACCENT}
        onMouseLeave={e => e.target.style.color = "#64748b"}>
        {children}
      </a>
    </li>
  );
}

function Tag({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <span style={{ background: hov ? "rgba(0,212,170,0.08)" : "rgba(255,255,255,0.05)", border: hov ? "1px solid rgba(0,212,170,0.25)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: "0.3rem 0.75rem", fontFamily: "monospace", fontSize: "0.78rem", color: hov ? ACCENT : "#e2e8f0", transition: "all 0.2s", cursor: "default" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const [hov, setHov] = useState(false);
  const isActive = project.period.includes("Present");
  return (
    <div style={{ background: "#111827", border: hov ? "1px solid rgba(0,212,170,0.22)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "2rem", display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", transition: "all 0.25s", transform: hov ? "translateY(-3px)" : "translateY(0)", position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #00d4aa, #3b82f6)", opacity: hov ? 1 : 0, transition: "opacity 0.25s" }} />
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "#fff" }}>{project.name}</div>
          {isActive && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 100, padding: "0.2rem 0.65rem", fontSize: "0.7rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.06em" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite", display: "inline-block" }} />
              ACTIVE
            </span>
          )}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#64748b", marginBottom: "1rem" }}>{project.period}</div>
        <ul style={{ paddingLeft: "1.2rem", color: "#64748b", fontSize: "0.92rem", lineHeight: 1.75 }}>
          {project.points.map((p, i) => <li key={i} style={{ marginBottom: "0.35rem" }}>{p}</li>)}
        </ul>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", minWidth: 130 }}>
        {project.stack.map(s => (
          <span key={s} style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 6, padding: "0.3rem 0.75rem", fontFamily: "monospace", fontSize: "0.74rem", color: "#93c5fd", textAlign: "center", whiteSpace: "nowrap" }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function SkillCard({ cat }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background: "#1a2235", border: hov ? "1px solid rgba(0,212,170,0.3)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "1.75rem", transition: "border-color 0.2s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: "1rem" }}>{cat.title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>{cat.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
    </div>
  );
}

function ContactChip({ href, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: hov ? "rgba(0,212,170,0.05)" : "rgba(255,255,255,0.04)", border: hov ? "1px solid rgba(0,212,170,0.3)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "0.75rem 1.25rem", color: hov ? ACCENT : "#e2e8f0", fontSize: "0.88rem", textDecoration: "none", fontFamily: "monospace", transition: "all 0.2s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {label}
    </a>
  );
}

function Btn({ href, primary, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.85rem 2rem", borderRadius: 8, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", transition: "all 0.2s", fontFamily: "inherit", background: primary ? (hov ? "#00f0c0" : ACCENT) : "transparent", color: primary ? "#0a0e17" : "#e2e8f0", border: primary ? "none" : "1px solid rgba(255,255,255,0.1)", transform: hov && primary ? "translateY(-2px)" : "translateY(0)", boxShadow: hov && primary ? "0 8px 25px rgba(0,212,170,0.28)" : "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </a>
  );
}

// ── Resume Download ────────────────────────────────────────────────────────
// Place your resume PDF at: my-portfolio/public/resume.pdf
// Vite serves /public files at root URL automatically.

function ResumeDownloadBtn() {
  const [hov, setHov] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleDownload = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/resume.pdf");
      if (!res.ok) throw new Error("Not found");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Venkata_Siva_Rao_Bandi_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatus("idle");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  const isError   = status === "error";
  const isLoading = status === "loading";

  return (
    <button onClick={handleDownload} disabled={isLoading}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", padding: "0.85rem 2rem", borderRadius: 8, fontSize: "0.9rem", fontWeight: 600, border: "none", cursor: isLoading ? "wait" : "pointer", fontFamily: "inherit", transition: "all 0.2s", background: isError ? "#ef4444" : hov ? "#00f0c0" : ACCENT, color: isError ? "#fff" : "#0a0e17", transform: hov && !isLoading && !isError ? "translateY(-2px)" : "translateY(0)", boxShadow: hov && !isLoading && !isError ? "0 8px 25px rgba(0,212,170,0.28)" : "none", opacity: isLoading ? 0.75 : 1 }}>
      {isLoading ? (
        <><span style={{ width: 14, height: 14, border: "2px solid rgba(10,14,23,0.4)", borderTopColor: "#0a0e17", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block", flexShrink: 0 }} />Downloading…</>
      ) : isError ? (
        <>⚠ resume.pdf missing in /public</>
      ) : (
        <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download Resume</>
      )}
    </button>
  );
}

// ── Experience Card ────────────────────────────────────────────────────────

function ExperienceCard({ exp }) {
  const [hov, setHov] = useState(false);
  const isActive = exp.period.includes("Present");
  return (
    <div style={{ background: "#111827", border: hov ? "1px solid rgba(0,212,170,0.18)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "2.5rem", position: "relative", overflow: "hidden", marginBottom: "1.5rem", transition: "border-color 0.25s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#fff" }}>{exp.company}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.3rem", flexWrap: "wrap" }}>
            <div style={{ color: ACCENT, fontWeight: 600, fontSize: "0.88rem" }}>{exp.role}</div>
            {isActive && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 100, padding: "0.15rem 0.6rem", fontSize: "0.66rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.06em" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite", display: "inline-block" }} />CURRENT
              </span>
            )}
          </div>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#64748b", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "0.5rem 1rem", whiteSpace: "nowrap" }}>{exp.period}</div>
      </div>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {exp.points.map((pt, i) => (
          <li key={i} style={{ display: "flex", gap: "0.75rem", color: "#64748b", fontSize: "0.95rem", lineHeight: 1.7 }}>
            <span style={{ color: ACCENT, flexShrink: 0 }}>→</span>{pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────

export default function Portfolio() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={styles.root}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes spin   { to { transform: rotate(360deg) } }
      `}</style>

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
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "7rem 8vw 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", right: "-20%", width: "70vw", height: "70vw", background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-30%", left: "-15%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 860 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: "1.5rem", animation: "fadeUp 0.6s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite" }} />
            Available from June 1st, 2026
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 1.5rem" }}>
            Venkata<br />Siva Rao <span style={{ color: ACCENT, fontStyle: "italic" }}>Bandi</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#64748b", maxWidth: 560, lineHeight: 1.75, marginBottom: "2.5rem" }}>
            Moodle Developer & LMS Specialist with 3+ years engineering enterprise LMS solutions — custom plugins, IOMAD multi-tenancy, xAPI/SCORM integrations, and role-based dashboards.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Btn href="#projects" primary>View Projects ↓</Btn>
            <ResumeDownloadBtn />
            <Btn href="mailto:venkatasivaraobandi2001@gmail.com">Get in Touch</Btn>
          </div>
        </div>
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
                I'm a Moodle specialist based in <strong style={{ color: "#e2e8f0" }}>Hyderabad, India</strong>, focused on delivering enterprise-grade LMS solutions. I design and build custom plugins, integrate third-party APIs, and handle everything from database debugging to live production upgrades — including Moodle 3.x → 4.x → 5.0 with zero data loss.
              </p>
              <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                From multi-tenant IOMAD deployments for international banks to xAPI-powered SCORM tracking and role-based dashboards, I work across the full Moodle stack.
              </p>
              <Btn href="mailto:venkatasivaraobandi2001@gmail.com">Say hello →</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
              {[["3+","Years Experience"],["7","Projects Delivered"],["5.0","Moodle Expert"],["0","Data Loss on Upgrades"]].map(([num, label]) => (
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
              {data.skills.map(cat => <SkillCard key={cat.title} cat={cat} />)}
            </div>
          </Reveal>
        </div>
      </div>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 8vw", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Key projects</SectionLabel>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Work I'm proud of</h2>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "2.5rem" }}>Sorted chronologically — oldest to newest</p>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {data.projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "0 8vw 6rem", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Experience</SectionLabel>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>Where I've worked</h2>
        {data.experience.map(exp => (
          <Reveal key={exp.role}>
            <ExperienceCard exp={exp} />
          </Reveal>
        ))}
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "0 8vw 6rem", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "4rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-60%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, background: "radial-gradient(circle, rgba(0,212,170,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
            <SectionLabel>Contact</SectionLabel>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Let's build something<br /><span style={{ color: ACCENT, fontStyle: "italic" }}>together</span>
            </h2>
            <p style={{ color: "#64748b", maxWidth: 420, margin: "0 auto 2.5rem", fontSize: "1rem", lineHeight: 1.75 }}>
              Open to new opportunities and freelance Moodle projects. Available from June 1st, 2026.
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
      <footer style={{ textAlign: "center", padding: "2rem 5vw", color: "#64748b", fontSize: "0.82rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        © 2026 Venkata Siva Rao Bandi · Hyderabad, India
      </footer>
    </div>
  );
}
