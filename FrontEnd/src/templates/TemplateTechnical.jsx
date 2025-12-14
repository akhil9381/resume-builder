export default function TemplateTechnical({ data }) {
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
        padding: "12mm 15mm",
        boxSizing: "border-box",
        background: "white",
        color: "black",
        fontSize: "11pt",
        lineHeight: 1.45,
        fontFamily: "Courier New, monospace",
        overflowWrap: "break-word",
        wordBreak: "break-word",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  {data.personal?.photo && (
    <img
      src={data.personal.photo}
      alt="Profile"
      style={{
        width: "70px",
        height: "70px",
        borderRadius: "4px",
        objectFit: "cover",
      }}
    />
  )}

  <div>
    <h1 style={{ fontSize: "20pt", fontWeight: 700 }}>
      {data.personal.fullName}
    </h1>
    <div style={{ fontSize: "11pt" }}>
      {data.personal.jobTitle}
    </div>
  </div>
</div>

      {/* ================= SUMMARY ================= */}
      {personal.summary && (
        <Section title="Summary">
          <p>{personal.summary}</p>
        </Section>
      )}

      {/* ================= SKILLS ================= */}
      {skills.length > 0 && (
        <Section title="Technical Skills">
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              listStyleType: "disc",
              paddingLeft: "18px",
              gap: "4px 10px",
            }}
          >
            {skills.map((s, i) => (
              <li
                key={i}
                style={{
                  display: "list-item",
                  wordBreak: "break-word",
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
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

              <div style={{ fontWeight: 600 }}>
                {exp.company}
              </div>

              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "18px",
                  marginTop: "4px",
                }}
              >
                {exp.details?.map((d, di) => (
                  <li
                    key={di}
                    style={{
                      display: "list-item",
                      marginBottom: "3px",
                      wordBreak: "break-word",
                    }}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* ================= PROJECTS ================= */}
      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <strong>{p.name}</strong>
              {p.stack && (
                <div style={{ fontSize: "10pt", color: "#444" }}>
                  {p.stack}
                </div>
              )}

              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "18px",
                  marginTop: "4px",
                }}
              >
                {p.description?.map((d, di) => (
                  <li
                    key={di}
                    style={{
                      display: "list-item",
                      wordBreak: "break-word",
                    }}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* ================= EDUCATION ================= */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <strong>{edu.institution}</strong>
              <div>{edu.degree}</div>

              <div
                style={{
                  fontSize: "10pt",
                  color: "#444",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  {edu.startYear} – {edu.endYear}
                </span>

                {edu.grade && (
                  <span>
                    {edu.gradeType}: {edu.grade}
                  </span>
                )}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* ================= CUSTOM SECTIONS ================= */}
      {customSections.map((sec, i) => (
        <Section key={i} title={sec.title}>
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: "18px",
            }}
          >
            {sec.bullets.map((b, bi) => (
              <li
                key={bi}
                style={{
                  display: "list-item",
                  wordBreak: "break-word",
                }}
              >
                {b}
              </li>
            ))}
          </ul>
        </Section>
      ))}

      {/* ================= INTERESTS ================= */}
      {interests && (
        <Section title="Interests">
          <p>{interests}</p>
        </Section>
      )}
    </div>
  );
}

/* ================= SECTION ================= */
function Section({ title, children }) {
  return (
    <div
      style={{
        marginBottom: "12px",
        breakInside: "avoid",
      }}
    >
      <h2
        style={{
          fontSize: "12.5pt",
          fontWeight: 700,
          borderBottom: "1px solid black",
          marginBottom: "6px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
