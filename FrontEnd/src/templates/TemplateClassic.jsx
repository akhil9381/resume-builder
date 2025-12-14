export default function TemplateClassic({ data }) {
  if (!data) return null;

  const {
    personal,
    experience = [],
    projects = [],
    education = [],
    skills = [],
    interests = "",
  } = data;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "12mm 15mm",
        boxSizing: "border-box",
        fontSize: "11pt",
        lineHeight: "1.4",
        overflowWrap: "break-word",
        wordBreak: "break-word",
        background: "white",
        color: "black",
      }}
    >
      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "16px",
    justifyContent: "center",
    marginBottom: "16px",
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
      }}
    />
  )}

  <div style={{ textAlign: "center" }}>
    <h1 style={{ fontSize: "22pt", fontWeight: 700 }}>
      {data.personal.fullName || "YOUR NAME"}
    </h1>

    {data.personal.jobTitle && (
      <p style={{ fontSize: "12pt" }}>{data.personal.jobTitle}</p>
    )}

    <p style={{ fontSize: "10.5pt", marginTop: "6px" }}>
      {data.personal.email}
      {data.personal.phone && ` • ${data.personal.phone}`}
      {data.personal.linkedin && ` • ${data.personal.linkedin}`}
      {data.personal.website && ` • ${data.personal.website}`}
    </p>
  </div>
</div>

      {/* ===== SUMMARY ===== */}
      {personal.summary && (
        <Section title="Professional Summary">
          <p>{personal.summary}</p>
        </Section>
      )}

      {/* ===== EXPERIENCE ===== */}
{experience.length > 0 && (
  <Section title="Experience">
    {experience.map((exp, i) => (
      <div key={i} style={{ marginBottom: "12px" }}>

        {/* Role + Duration */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div style={{ fontWeight: 700 }}>
            {exp.role}
          </div>

          <div style={{ fontSize: "10pt", color: "#444" }}>
            {exp.start} – {exp.end}
          </div>
        </div>

        {/* Company */}
        <div
          style={{
            fontSize: "10.5pt",
            fontStyle: "italic",
            marginBottom: "4px",
            fontWeight:700
          }}
        >
          {exp.company}
        </div>

        {/* Bullet Points */}
        <ul style={{ marginLeft: "18px", marginTop: "4px" , listStyleType:"disc"}}>
          {exp.details.map((d, di) => (
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
              <div style={{ fontSize: "10pt", color: "#444" }}>
                {p.stack}
              </div>

              <ul style={{ marginLeft: "18px" }}>
                {p.description.map((d, di) => (
                  <li key={di}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* ===== EDUCATION ===== */}
{/* ===== EDUCATION ===== */}
{education.length > 0 && (
  <Section title="Education">
    {education.map((edu, i) => (
      <div key={i} style={{ marginBottom: "8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
          }}
        >
          <span>{edu.institution}</span>
          <span style={{ fontSize: "10pt", fontWeight: 400 }}>
            {edu.startYear} – {edu.endYear}
          </span>
        </div>

        <div style={{ fontSize: "10.5pt" }}>
          {edu.degree}
          {edu.grade && (
            <span style={{ color: "#444" }}>
              {" "}— {edu.gradeType}: {edu.grade}
            </span>
          )}
        </div>
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
        columnGap: "16px",
        rowGap: "6px",
        marginTop: "4px",
      }}
    >
      {skills.map((skill, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "10.5pt",
          }}
        >
          <span style={{ marginRight: "6px" }}>•</span>
          <span>{skill}</span>
        </div>
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
{data.customSections?.map(
  (sec, i) =>
    sec.title &&
    sec.bullets.some((b) => b.trim()) && (
      <Section key={i} title={sec.title}>
        <ul style={{ marginLeft: "18px" ,listStyle:"disc"}}>
          {sec.bullets
            .filter((b) => b.trim())
            .map((b, bi) => (
              <li key={bi}>{b}</li>
            ))}
        </ul>
      </Section>
    )
)}

    </div>
  );
}

/* ----- SECTION COMPONENT ----- */
function Section({ title, children }) {
  return (
    <div
      style={{
        marginTop: "14px",
        breakInside: "avoid",
        pageBreakInside: "avoid",
      }}
    >
      <h2
        style={{
          fontSize: "13pt",
          fontWeight: 700,
          borderBottom: "1px solid black",
          paddingBottom: "2px",
          marginBottom: "6px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
