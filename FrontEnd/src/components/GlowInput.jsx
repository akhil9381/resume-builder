export default function GlowInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          className="text-sm font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full mt-1 px-4 py-2 rounded-lg
          border transition
          focus:outline-none focus:ring-2 focus:ring-purple-500
        "
        style={{
          background: "var(--card-bg)",
          color: "var(--text-main)",
          borderColor: "var(--border)",
        }}
      />
    </div>
  );
}
