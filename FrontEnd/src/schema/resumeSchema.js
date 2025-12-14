export const EMPTY_RESUME = {
  title: "Untitled Resume",

  /* ------------------ PERSONAL ------------------ */
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    linkedin: "",
    website: "",
    summary: "",
    photo: "", // optional (base64 / object URL)
  },

  /* ------------------ EXPERIENCE ------------------ */
  // { role, company, start, end, details: [] }
  experience: [],

  /* ------------------ PROJECTS ------------------ */
  // { name, stack, description: [] }
  projects: [],

  /* ------------------ EDUCATION ------------------ */
  // {
  //   institution: "",
  //   degree: "",
  //   startYear: "",
  //   endYear: "",
  //   grade: "", // CGPA / Percentage (optional)
  // }
  education: [],

  /* ------------------ SKILLS ------------------ */
  // ["React", "JavaScript", "Tailwind"]
  skills: [],

  /* ------------------ INTERESTS ------------------ */
  interests: "",

  /* ------------------ CUSTOM SECTIONS ------------------ */
  // { title: "", bullets: [] }
  customSections: [],

  /* ------------------ TEMPLATE ------------------ */
  template: "classic",
};
