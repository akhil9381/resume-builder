import { useState,useEffect } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintWrapper from "../components/PrintWrapper";
import { EMPTY_RESUME } from "../schema/resumeSchema";
import { useSearchParams, useNavigate,useParams } from "react-router-dom";
import TemplateRenderer from "../components/TemplateRenderer";
import api from "../services/api";
export default function ResumeEditor() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateFromUrl = searchParams.get("template") || "classic";
  const [resume, setResume] = useState(() => ({
  ...EMPTY_RESUME,
  template: templateFromUrl,
}));
  const [status, setStatus] = useState("Saved");
  const [skillsText, setSkillsText] = useState("");
  const printRef = useRef(null);
  const { id } = useParams(); // "new" or resumeId
  const saveTimer = useRef(null);

  /* ================= LOAD RESUME ================= */
  useEffect(() => {
  if (id === "new") return;

  api.get(`/resumes/${id}`).then((res) => {
    setResume({
      ...res.data.data,
      title: res.data.title,
      template: res.data.template,
    });
  }).catch(() => {
    console.error("Failed to load resume");
  });
}, [id]);


  /* ================= AUTO SAVE ================= */
  useEffect(() => {
  if (id === "new") return;

  if (saveTimer.current) clearTimeout(saveTimer.current);

  saveTimer.current = setTimeout(() => {
    api.put(`/resumes/${id}`, {
      title: resume.title || "Untitled Resume",
      template: resume.template,
      data: resume,
    });
    setStatus("Saved");
  }, 1200);
}, [resume, id]);


const handleDownload = useReactToPrint({
  contentRef: printRef,
  documentTitle: resume.title || "Resume",
});



  /* ------------------ PHOTO UPLOAD ------------------ */

  const handlePhotoUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setResume((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          photo: reader.result,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const updatePersonal = (key, value) =>
    setResume((p) => ({
      ...p,
      personal: { ...p.personal, [key]: value },
    }));

  /* ------------------ EXPERIENCE ------------------ */

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { role: "", company: "", start: "", end: "", details: [""] },
      ],
    }));
  };

  const updateExpField = (i, key, value) => {
    setResume((prev) => {
      const copy = [...prev.experience];
      copy[i][key] = value;
      return { ...prev, experience: copy };
    });
  };

  const updateExpBullet = (expIndex, bulletIndex, value) => {
    setResume((prev) => {
      const copy = [...prev.experience];
      copy[expIndex].details[bulletIndex] = value;
      return { ...prev, experience: copy };
    });
  };

  const addExpBullet = (expIndex) => {
    setResume((prev) => {
      const copy = [...prev.experience];
      copy[expIndex].details.push("");
      return { ...prev, experience: copy };
    });
  };

  /* ------------------ PROJECTS ------------------ */

  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { name: "", stack: "", description: [""] },
      ],
    }));
  };

  const updateProjectField = (i, key, value) => {
    setResume((prev) => {
      const copy = [...prev.projects];
      copy[i][key] = value;
      return { ...prev, projects: copy };
    });
  };

  const updateProjectBullet = (projIndex, bulletIndex, value) => {
    setResume((prev) => {
      const copy = [...prev.projects];
      copy[projIndex].description[bulletIndex] = value;
      return { ...prev, projects: copy };
    });
  };

  const addProjectBullet = (projIndex) => {
    setResume((prev) => {
      const copy = [...prev.projects];
      copy[projIndex].description.push("");
      return { ...prev, projects: copy };
    });
  };

  /* ------------------ EDUCATION ------------------ */

  const addEducation = () => {
  setResume((prev) => ({
    ...prev,
    education: [
      ...prev.education,
      {
        institution: "",
        degree: "",
        startYear: "",
        endYear: "",
        grade: "",
        gradeType: "CGPA", // "CGPA" | "Percentage"
      },
    ],
  }));
};

const saveResume = async () => {
  try {
    setStatus("Saving...");

    // 🟢 CREATE FIRST TIME
    if (id === "new") {
      const res = await api.post("/resumes", {
        title: resume.title || "Untitled Resume",
        template: resume.template,
        data: resume,
      });

      setStatus("Saved");
      navigate(`/editor/${res.data._id}`, { replace: true });
      return;
    }

    // 🟢 UPDATE EXISTING
    await api.put(`/resumes/${id}`, {
      title: resume.title,
      template: resume.template,
      data: resume,
    });

    setStatus("Saved");
  } catch (err) {
    console.error(err);
    setStatus("Save failed");
  }
};



  const updateEdu = (i, key, value) => {
    setResume((prev) => {
      const copy = [...prev.education];
      copy[i][key] = value;
      return { ...prev, education: copy };
    });
  };
  const addCustomSection = () => {
  setResume((p) => ({
    ...p,
    customSections: [
      ...p.customSections,
      { title: "", bullets: [""] },
    ],
  }));
};

const updateCustomTitle = (i, value) => {
  setResume((p) => {
    const copy = [...p.customSections];
    copy[i].title = value;
    return { ...p, customSections: copy };
  });
};

const updateCustomBullet = (si, bi, value) => {
  setResume((p) => {
    const copy = [...p.customSections];
    copy[si].bullets[bi] = value;
    return { ...p, customSections: copy };
  });
};

const addCustomBullet = (si) => {
  setResume((p) => {
    const copy = [...p.customSections];
    copy[si].bullets.push("");
    return { ...p, customSections: copy };
  });
};

  /* ------------------ RENDER ------------------ */

  return (
    
    <div className="min-h-screen bg-transparent text-inherit p-6 flex gap-10">

      
      {/* LEFT PANEL */}
      <div className="no-print w-[430px] space-y-8 overflow-y-auto h-[95vh] pr-2">
        <button
      onClick={() => {
  handleDownload();
}}

  className="
    fixed top-20 right-8 z-50
    px-5 py-2
    bg-purple-600 text-[var(--text-main)]
    rounded-lg shadow-lg
    hover:bg-purple-500
  "
>
  Download PDF
</button>
        {/* TEMPLATE SELECTION */}
<Section title="Template">
  <select
  value={resume.template}
  onChange={(e) => {
    const t = e.target.value;
    setResume((p) => ({ ...p, template: t }));
    navigate(`?template=${t}`, { replace: true });
  }}
  className="
    w-full px-3 py-2
    bg-[var(--bg)]
    border border-[var(--border)]
    rounded
    text-[var(--text-main)]
    focus:outline-none
  "
>

    <option value="classic" className="bg-[var(--bg)] text-[var(--text-main)]">
      Classic
    </option>
    <option value="modern" className="bg-[var(--bg)] text-[var(--text-main)]">
      Modern Two Column
    </option>
    <option value="creative" className="bg-[var(--bg)] text-[var(--text-main)]">
      Creative
    </option>
    <option value="technical" className="bg-[var(--bg)] text-[var(--text-main)]">
      Technical
    </option>
  </select>
</Section>
<Section title="Resume Title">
  <input
    className="
      w-full px-3 py-2
      bg-[var(--card-bg)]
      border border-[var(--border)]
      rounded
      text-[var(--text-main)]
      focus:outline-none
      focus:ring-1
      focus:ring-purple-500
    "
    placeholder="Untitled Resume"
    value={resume.title || ""}
    onChange={(e) =>
      setResume((p) => ({
        ...p,
        title: e.target.value,
      }))
    }
  />
</Section>

<div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-semibold text-[var(--text-main)]">
    Resume Editor
  </h2>

  <div className="flex items-center gap-3">
    <span className="text-sm text-[var(--text-muted)]">
      {status}
    </span>

    <button
      onClick={saveResume}
      className="
        px-4 py-2 rounded-lg
        bg-purple-600 text-white
        hover:bg-purple-500
        transition
      "
    >
      Save
    </button>
  </div>
</div>


        {/* HEADER */}
        <Section title="Header Information">

          {/* PROFILE PHOTO (OPTIONAL) */}
          <div className="flex items-center gap-4 mb-4">
            {resume.personal.photo ? (
              <img
                src={resume.personal.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-[var(--border)]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[var(--card-bg)] flex items-center justify-center text-[var(--text-muted)] text-xs">
                No Photo
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="cursor-pointer text-sm text-purple-300">
                {resume.personal.photo ? "Change Photo" : "Upload Photo (Optional)"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handlePhotoUpload(e.target.files[0]);
                    }
                  }}
                />
              </label>

              {resume.personal.photo && (
                <button
                  onClick={() =>
                    setResume((p) => ({
                      ...p,
                      personal: { ...p.personal, photo: "" },
                    }))
                  }
                  className="text-xs text-red-400 hover:text-red-300 text-left"
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>

          <Input label="Full Name" value={resume.personal.fullName} onChange={(v) => updatePersonal("fullName", v)} />
          <Input label="Job Title" value={resume.personal.jobTitle} onChange={(v) => updatePersonal("jobTitle", v)} />
          <Input label="Email" value={resume.personal.email} onChange={(v) => updatePersonal("email", v)} />
          <Input label="Phone" value={resume.personal.phone} onChange={(v) => updatePersonal("phone", v)} />
          <Input label="LinkedIn" value={resume.personal.linkedin} onChange={(v) => updatePersonal("linkedin", v)} />
          <Input label="Website" value={resume.personal.website} onChange={(v) => updatePersonal("website", v)} />
        </Section>

        {/* SUMMARY */}
        <Section title="Summary">
          <Textarea value={resume.personal.summary} onChange={(v) => updatePersonal("summary", v)} />
        </Section>
{/* EXPERIENCE */}
<Section title="Experience">
  {resume.experience.map((exp, idx) => (
    <div
      key={idx}
      className="p-4 bg-[var(--card-bg)] rounded border border-[var(--border)] space-y-3"
    >
      {/* Role */}
      <Input
        label="Role"
        value={exp.role}
        onChange={(v) => updateExpField(idx, "role", v)}
      />

      {/* Company */}
      <Input
        label="Company"
        value={exp.company}
        onChange={(v) => updateExpField(idx, "company", v)}
      />

      {/* Duration */}
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Start"
          value={exp.start}
          onChange={(v) => updateExpField(idx, "start", v)}
        />
        <Input
          label="End"
          value={exp.end}
          onChange={(v) => updateExpField(idx, "end", v)}
        />
      </div>

      {/* Bullet Points */}
      <label className="text-sm text-[var(--text-muted)]">
        Bullet Points
      </label>

      {exp.details.map((bullet, bi) => (
        <div key={bi} className="flex items-start gap-2">
          {/* Bullet dot */}
          <span className="mt-3 text-[var(--text-muted)] text-lg">•</span>

          {/* Bullet input */}
          <input
            className="
              flex-1 px-3 py-2
              bg-[var(--card-bg)] border border-[var(--border)]
              rounded text-[var(--text-main)]
            "
            value={bullet}
            placeholder="Achievement or responsibility"
            onChange={(e) =>
              updateExpBullet(idx, bi, e.target.value)
            }
          />

          {/* Remove bullet */}
          <button
            className="text-red-400 hover:text-red-300 text-sm mt-2"
            onClick={() =>
              setResume((p) => {
                const copy = [...p.experience];
                copy[idx].details = copy[idx].details.filter(
                  (_, i) => i !== bi
                );
                return { ...p, experience: copy };
              })
            }
          >
            ✕
          </button>
        </div>
      ))}

      {/* Add bullet */}
      <button
        className="text-sm text-purple-300 hover:text-purple-200"
        onClick={() => addExpBullet(idx)}
      >
        + Add bullet
      </button>

      {/* Remove experience */}
      <button
        className="
          mt-2 w-full py-1
          bg-red-600/20 text-red-300
          rounded hover:bg-red-600/30
        "
        onClick={() =>
          setResume((p) => ({
            ...p,
            experience: p.experience.filter((_, i) => i !== idx),
          }))
        }
      >
        Remove Experience
      </button>
    </div>
  ))}

  <AddButton onClick={addExperience} text="Add Experience" />
</Section>

  {/* EDUCATION */}
<Section title="Education">
  {resume.education.map((edu, idx) => (
    <div
      key={idx}
      className="p-3 bg-[var(--card-bg)] rounded border border-[var(--border)] space-y-2"
    >
      <Input
        label="Institution"
        value={edu.institution}
        onChange={(v) => updateEdu(idx, "institution", v)}
      />

      <Input
        label="Degree / Program"
        value={edu.degree}
        onChange={(v) => updateEdu(idx, "degree", v)}
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Start Year"
          value={edu.startYear}
          onChange={(v) => updateEdu(idx, "startYear", v)}
        />
        <Input
          label="End Year"
          value={edu.endYear}
          onChange={(v) => updateEdu(idx, "endYear", v)}
        />
      </div>
{/* Grade Row */}
<div className="grid grid-cols-2 gap-2">
  
  {/* Grade Type */}
  <div>
    <label className="text-sm text-[var(--text-muted)] mb-1 block">
      Grade Type
    </label>
    <select
      value={edu.gradeType}
      onChange={(e) => updateEdu(idx, "gradeType", e.target.value)}
      className="
        w-full
        h-[42px]
        px-3
        bg-[var(--card-bg)]
        border border-[var(--border)]
        rounded
        text-[var(--text-main)]
        text-sm
        focus:outline-none
        focus:ring-1
        focus:ring-purple-500
      "
    >
      <option value="CGPA" className="bg-[var(--bg)] text-[var(--text-main)]">
        CGPA
      </option>
      <option value="Percentage" className="bg-[var(--bg)] text-[var(--text-main)]">
        Percentage
      </option>
    </select>
  </div>

  {/* Grade Value */}
  <div>
    <label className="text-sm text-[var(--text-muted)] mb-1 block">
      {edu.gradeType}
    </label>
    <input
      type="text"
      value={edu.grade}
      onChange={(e) => updateEdu(idx, "grade", e.target.value)}
      className="
        w-full
        h-[42px]
        px-3
        bg-[var(--card-bg)]
        border border-[var(--border)]
        rounded
        text-[var(--text-main)]
        text-sm
        focus:outline-none
        focus:ring-1
        focus:ring-purple-500
      "
    />
  </div>

</div>


      {/* REMOVE EDUCATION */}
      <button
        onClick={() =>
          setResume((p) => ({
            ...p,
            education: p.education.filter((_, i) => i !== idx),
          }))
        }
        className="text-xs text-red-400 hover:text-red-300"
      >
        Remove
      </button>
    </div>
  ))}

  <AddButton onClick={addEducation} text="Add Education" />
</Section>

{/* PROJECTS */}
<Section title="Projects">
  {resume.projects.map((proj, idx) => (
    <div
      key={idx}
      className="p-3 bg-[var(--card-bg)] rounded border border-[var(--border)] space-y-2"
    >
      <Input
        label="Project Name"
        value={proj.name}
        onChange={(v) => updateProjectField(idx, "name", v)}
      />

      <Input
        label="Tech Stack"
        value={proj.stack}
        onChange={(v) => updateProjectField(idx, "stack", v)}
      />

      {/* Project Bullet Points */}
      <label className="text-sm text-[var(--text-muted)]">
        Description / Highlights
      </label>

      {proj.description.map((bullet, bi) => (
        <div key={bi} className="flex items-start gap-2 mb-2">
          <span className="mt-3 text-[var(--text-muted)]">•</span>

          <input
            className="
              flex-1
              px-3 py-2
              bg-[var(--card-bg)]
              border border-[var(--border)]
              rounded
              text-[var(--text-main)]
              focus:outline-none
              focus:ring-1
              focus:ring-purple-500
            "
            value={bullet}
            placeholder="Describe the project or your contribution"
            onChange={(e) =>
              updateProjectBullet(idx, bi, e.target.value)
            }
          />
        </div>
      ))}

      <button
        onClick={() => addProjectBullet(idx)}
        className="text-xs text-purple-300 hover:text-purple-200"
      >
        + Add Bullet
      </button>
    </div>
  ))}

  <AddButton onClick={addProject} text="Add Project" />
</Section>


        {/* SKILLS */}
<Section title="Skills">
  {/* Existing skills */}
  <div className="flex flex-wrap gap-2 mb-3">
    {resume.skills.map((skill, i) => (
      <div
        key={i}
        className="
          flex items-center gap-2
          px-3 py-1 rounded-full
          bg-purple-600/20 text-purple-200
          border border-purple-500/30
          text-sm
        "
      >
        {skill}
        <button
          className="text-purple-300 hover:text-red-400"
          onClick={() =>
            setResume((p) => ({
              ...p,
              skills: p.skills.filter((_, idx) => idx !== i),
            }))
          }
        >
          ✕
        </button>
      </div>
    ))}
  </div>

  {/* Add skill */}
  <div className="flex gap-2">
    <input
      className="
        flex-1 px-3 py-2
        bg-[var(--card-bg)] border border-[var(--border)]
        rounded text-[var(--text-main)]
      "
      placeholder="Add a skill (e.g. React)"
      value={skillsText}
      onChange={(e) => setSkillsText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && skillsText.trim()) {
          e.preventDefault();
          setResume((p) => ({
            ...p,
            skills: [...p.skills, skillsText.trim()],
          }));
          setSkillsText("");
        }
      }}
    />

    <button
      className="
        px-4 py-2
        bg-purple-600 rounded
        hover:bg-purple-500
      "
      onClick={() => {
        if (!skillsText.trim()) return;
        setResume((p) => ({
          ...p,
          skills: [...p.skills, skillsText.trim()],
        }));
        setSkillsText("");
      }}
    >
      Add Skill
    </button>
  </div>
</Section>
{/* INTERESTS */}
<Section title="Interests">
  <Textarea
    value={resume.interests}
    onChange={(v) =>
      setResume((p) => ({ ...p, interests: v }))
    }
    placeholder="e.g. Open-source contribution, Competitive programming, Photography"
  />
</Section>

{/* CUSTOM SECTIONS */}
<Section title="Additional Sections">
  {resume.customSections.map((sec, si) => (
    <div
      key={si}
      className="p-4 bg-[var(--card-bg)] rounded border border-[var(--border)] space-y-3"
    >
      <Input
        label="Section Title"
        value={sec.title}
        onChange={(v) => updateCustomTitle(si, v)}
        placeholder="e.g. Certifications, Achievements"
      />

      <label className="text-sm text-[var(--text-muted)]">Bullet Points</label>

      {sec.bullets.map((b, bi) => (
        <div key={bi} className="flex gap-2 items-start">
          <span className="mt-3">•</span>
          <input
            className="flex-1 px-3 py-2 bg-[var(--card-bg)] border border-[var(--border)] rounded text-[var(--text-main)]"
            value={b}
            onChange={(e) =>
              updateCustomBullet(si, bi, e.target.value)
            }
          />
        </div>
      ))}

      <button
        className="text-sm text-purple-300"
        onClick={() => addCustomBullet(si)}
      >
        + Add bullet
      </button>

      <button
        className="w-full py-1 bg-red-600/20 text-red-300 rounded"
        onClick={() =>
          setResume((p) => ({
            ...p,
            customSections: p.customSections.filter((_, i) => i !== si),
          }))
        }
      >
        Remove Section
      </button>
    </div>
  ))}

  <button
    className="w-full py-2 bg-purple-600 rounded hover:bg-purple-500"
    onClick={addCustomSection}
  >
    + Add New Section
  </button>
</Section>

      </div>
      


      {/* RIGHT SIDE PREVIEW */}
      {/* RIGHT SIDE PREVIEW */}
<div className="flex-1 flex justify-center items-start overflow-auto h-[95vh] bg-gray-200 p-4">
  <div
    ref={printRef}
    style={{
      width: "210mm",
      background: "white",
    }}
  >
    <PrintWrapper>
      <TemplateRenderer data={resume} />
    </PrintWrapper>
  </div>
</div>


    </div>
  );
}

/* ------------------ UI COMPONENTS ------------------ */

function Section({ title, children }) {
  return (
    <div className="bg-[var(--card-bg)] p-4 rounded border border-[var(--border)]">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="mb-3">
      {label && <label className="text-sm text-[var(--text-muted)]">{label}</label>}
      <input
        className="w-full px-3 py-2 mt-1 bg-[var(--card-bg)] border border-[var(--border)] rounded text-[var(--text-main)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Textarea({ value, onChange }) {
  return (
    <textarea
      rows={4}
      className="w-full px-3 py-2 mt-1 bg-[var(--card-bg)] border border-[var(--border)] rounded text-[var(--text-main)]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function AddButton({ onClick, text }) {
  return (
    <button
      className="w-full mt-3 py-2 bg-purple-600 rounded hover:bg-purple-500"
      onClick={onClick}
    >
      + {text}
    </button>
  );
}
