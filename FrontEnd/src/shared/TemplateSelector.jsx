import TemplateCard from "../components/TemplateCard";

const templates = [
  { id: "simple", title: "Simple", preview: "Clean, single column" },
  { id: "modern", title: "Modern", preview: "Two-column, accents" },
  { id: "classic", title: "Classic", preview: "Formal layout" }
];

export default function TemplateSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {templates.map(t => (
        <TemplateCard key={t.id} id={t.id} title={t.title} preview={t.preview} selected={value === t.id} onSelect={onChange} />
      ))}
    </div>
  );
}
