import { useRef } from "react";

export default function TemplateImageUpload({ onUpload }) {
  const ref = useRef();

  function handleFiles(files) {
    const images = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name.replace(/\.[^/.]+$/, ""),
      image: URL.createObjectURL(file),
      description: "Uploaded template preview",
    }));

    onUpload(images);
  }

  return (
    <div className="mb-6">
      <input
        type="file"
        multiple
        accept="image/*"
        ref={ref}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button
        onClick={() => ref.current.click()}
        className="
          px-5 py-2 rounded-xl
          bg-purple-600 hover:bg-purple-500
          font-semibold
        "
      >
        + Upload Template Images
      </button>
    </div>
  );
}
