export default function TemplateCreative({ data }) {
  if (!data) return null;

  const {
    personal = {},
    experience = [],
    projects = [],
    education = [],
    skills = [],
    interests = "",
    customSections = [],
  } = data;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "14mm",
        boxSizing: "border-box",
        background: "white",
        color: "#111",
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: "11pt",lineHeight: 1.45,
overflowWrap: "break-word",
wordBreak: "break-word",
hyphens: "auto",

      }}
    >
      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "14px",
    background: "#1f2937",
    color: "white",
    borderRadius: "8px",
  }}
>
  {data.personal?.photo && (
    <img
      src={data.personal.photo}
      alt="Profile"
      style={{
        width: "90px",
        height: "90px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid white",
      }}
    />
  )}

  <div>
    <h1 style={{ fontSize: "20pt", fontWeight: 700 }}>
      {data.personal.fullName}
    </h1>
    <div>{data.personal.jobTitle}</div>
  </div>
</div>

      {/* ===== SUMMARY ===== */}
      {personal.summary && (
        <Section title="Summary">
          <p>{personal.summary}</p>
        </Section>
      )}

      {/* ===== EXPERIENCE ===== */}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "12px"}}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                }}
              >
                <span>{exp.role}</span>
                <span style={{ fontSize: "10pt", fontWeight: 400 }}>
                  {exp.start} – {exp.end}
                </span>
              </div>

              <div style={{ fontWeight: 600, color: "#444" }}>
                {exp.company}
              </div>

              <ul style={{ marginLeft: "18px", marginTop: "4px" ,listStyle:"disc"}}>
                {exp.details?.map((d, di) => (
                  <li key={di}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* ===== PROJECTS ===== */}
      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <strong>{p.name}</strong>

              {p.stack && (
                <div style={{ fontSize: "10pt", color: "#555" }}>
                  {p.stack}
                </div>
              )}

              <ul style={{ marginLeft: "18px" , listStyle:"disc"}}>
                {p.description?.map((d, di) => (
                  <li key={di}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* ===== EDUCATION ===== */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: 700 }}>{edu.institution}</div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{edu.degree}</span>
                <span style={{ fontSize: "10pt", color: "#444" }}>
                  {edu.startYear} – {edu.endYear}
                </span>
              </div>

              {edu.grade && (
                <div style={{ fontSize: "10pt", color: "#555" }}>
                  {edu.gradeType}: {edu.grade}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ===== SKILLS ===== */}
      {skills.length > 0 && (
        <Section title="Skills">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "6px 10px",
            }}
          >
            {skills.map((s, i) => (
              <span key={i}>• {s}</span>
            ))}
          </div>
        </Section>
      )}

      {/* ===== INTERESTS ===== */}
      {interests && (
        <Section title="Interests">
          <p>{interests}</p>
        </Section>
      )}

      {/* ===== CUSTOM SECTIONS ===== */}
      {customSections?.map((sec, i) => (
        <Section key={i} title={sec.title}>
          <ul style={{ marginLeft: "18px" , listStyle:"disc"}}>
            {sec.bullets.map((b, bi) => (
              <li key={bi}>{b}</li>
            ))}
          </ul>
        </Section>
      ))}
    </div>
  );
}

/* ===== SECTION ===== */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "16px", breakInside: "avoid" }}>
      <h2
        style={{
          fontSize: "13pt",
          fontWeight: 800,
          textTransform: "uppercase",
          color: "#7c3aed",
          marginBottom: "6px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
