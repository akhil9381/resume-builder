import TemplateClassic from "../templates/TemplateClassic";
import TemplateModern from "../templates/TemplateModern";
import TemplateCreative from "../templates/TemplateCreative";
import TemplateTechnical from "../templates/TemplateTechnical";

const TEMPLATE_MAP = {
  classic: TemplateClassic,
  modern: TemplateModern,
  creative: TemplateCreative,
  technical: TemplateTechnical,
};

export default function TemplateRenderer({ data }) {
  const templateKey = data?.template || "classic";

  const TemplateComponent =
    TEMPLATE_MAP[templateKey] || TemplateClassic;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "white",
        margin: "0 auto",
      }}
    >
      <TemplateComponent data={data} />
    </div>
  );
}
