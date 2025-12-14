export default function Button({ children, className = "", ...props }) {
  const base =
    "w-full py-2 rounded-lg text-[var(--text-main)] font-medium " +
    "bg-gradient-to-r from-purple-500 to-purple-600 " +
    "hover:from-purple-400 hover:to-purple-500 " +
    "transition shadow-lg shadow-purple-500/20";

  return (
    <button
      {...props}
      className={base + " " + className} // ← merges user classes + base classes
    >
      {children}
    </button>
  );
}
