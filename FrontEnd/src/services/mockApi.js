import classicImg from "../assets/templates/classic.webp";
import colourImg from "../assets/templates/colour.webp";
import technicalImg from "../assets/templates/technical.png";
import twocolumnImg from "../assets/templates/twocolumn.png";

export function getResumes() {
  return Promise.resolve([
    {
      id: "r1",
      title: "Frontend Developer Resume",
      summary: "React, Vite, Tailwind — Focused on modern frontend stacks.",
      type: "Frontend",
      experience: "2 yrs",
      updatedAt: "Nov 25, 2025",
    },
    {
      id: "r2",
      title: "Software Engineer - Intern",
      summary: "Academia projects + internship experience with fullstack apps.",
      type: "Fullstack",
      experience: "1 yr",
      updatedAt: "Oct 4, 2025",
    },
  ]);
}

export function getTemplates() {
  return Promise.resolve([
    {
      id: "classic",
      name: "Clean Classic",
      description: "A minimal professional resume.",
      image: classicImg,
    },
    {
      id: "modern",
      name: "Modern Two-column",
      description: "Two column layout with skills sidebar.",
      image: twocolumnImg,
    },
    {
      id: "creative",
      name: "Creative Template",
      description: "Colorful resume for designers.",
      image: colourImg,
    },
    {
      id: "technical",
      name: "Technical Template",
      description: "Perfect for engineers and developers.",
      image: technicalImg,
    },
  ]);
}

