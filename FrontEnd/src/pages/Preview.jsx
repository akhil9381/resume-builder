import React, { useRef } from "react";
import TemplatePreviewFull from "../shared/TemplatePreviewFull";
import { useReactToPrint } from "react-to-print";
export default function Preview() {
  const ref = useRef();
  const handlePrint = useReactToPrint({ content: () => ref.current });
  return (
    <div>
      <div className="mb-3 flex gap-3">
        <button onClick={handlePrint} className="px-3 py-2 bg-brand text-[var(--text-main)] rounded">Download PDF</button>
      </div>
      <div ref={ref} className="bg-white p-6 rounded-xl shadow"><TemplatePreviewFull /></div>
    </div>
  );
}
