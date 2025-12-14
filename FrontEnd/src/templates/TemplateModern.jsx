export default function TemplateModern({ data }) {
  if (!data) return null;

  const {
    personal = {},
    experience = [],
    projects = [],
    education = [],
    skills = [],
    interests = "",
  } = data;

  const {
    fullName = "",
    jobTitle = "",
    email = "",
    phone = "",
    linkedin = "",
    website = "",
    summary = "",
  } = personal;

  return (
    <div
  style={{
    width: "210mm",
    minHeight: "297mm",
    padding: "12mm",
    boxSizing: "border-box",
    background: "white",
    color: "black",
    fontSize: "11pt",
    lineHeight: 1.4,

    /* 🔥 FIX */
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  }}
>

      {/* ===== HEADER ===== */}
      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "14px",
  }}
>
  {data.personal?.photo && (
    <img
      src={data.personal.photo}
      alt="Profile"
      style={{
        width: "75px",
        height: "75px",
        borderRadius: "6px",
        objectFit: "cover",
      }}
    />
  )}

  <div>
    <h1 style={{ fontSize: "22pt", fontWeight: 700 }}>
      {data.personal.fullName || "YOUR NAME"}
    </h1>

    {data.personal.jobTitle && (
      <div style={{ fontSize: "12pt" }}>
        {data.personal.jobTitle}
      </div>
    )}

    <div style={{ fontSize: "10.5pt", marginTop: "4px" }}>
      {data.personal.email}
      {data.personal.phone && ` • ${data.personal.phone}`}
    </div>
  </div>
</div>

      {/* ===== TWO COLUMN ===== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2.2fr 1fr",
          gap: "18px",
        }}
      >
        {/* LEFT COLUMN */}
        <div>
          {summary && (
            <Section title="Professional Summary">
              <p style={{ wordBreak: "break-word" }}>{summary}</p>
            </Section>
          )}

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
    marginTop: "4px",
    paddingLeft: "18px",
    listStyleType: "disc",
  }}
>
  {exp.details?.map((d, di) => (
    <li
      key={di}
      style={{
        marginBottom: "2px",
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

                  <ul style={{ marginLeft: "18px" ,listStyleType: "disc",}}>
                    {p.description?.map((d, di) => (
                      <li key={di} style={{ wordBreak: "break-word" }}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {skills.length > 0 && (
            <Section title="Skills">
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "4px 8px",
                  listStyle: "disc",
                  paddingLeft: "18px",
                }}
              >
                {skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </Section>
          )}

          {education.length > 0 && (
            <Section title="Education">
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "6px" }}>
                  <strong>{edu.institution}</strong>
                  <div>{edu.degree}</div>
                  <div style={{ fontSize: "10pt", color: "#444" }}>
                    {edu.startYear} – {edu.endYear}
                    {edu.grade &&
                      ` • ${edu.gradeType}: ${edu.grade}`}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* INTERESTS */}
{interests && (
  <Section title="Interests">
    <p
      style={{
        fontSize: "10.5pt",
        lineHeight: 1.5,
        wordBreak: "break-word",
      }}
    >
      {interests}
    </p>
  </Section>
)}

          {/* ===== CUSTOM SECTIONS ===== */}
{data.customSections?.length > 0 &&
  data.customSections.map((sec, si) => (
    <Section key={si} title={sec.title}>
      <ul
        style={{
          paddingLeft: "18px",
          listStyleType: "disc",
        }}
      >
        {sec.bullets.map((b, bi) => (
          <li
            key={bi}
            style={{
              marginBottom: "4px",
              wordBreak: "break-word",
            }}
          >
            {b}
          </li>
        ))}
      </ul>
    </Section>
  ))}

        </div>
      </div>
    </div>
  );
}

/* ---------- SECTION ---------- */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "12px", breakInside: "avoid" }}>
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
