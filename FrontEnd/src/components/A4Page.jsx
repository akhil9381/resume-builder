export default function A4Page({ children }) {
  return (
    <div
  className="w-[210mm] min-h-[297mm] bg-white text-[var(--text-main)] p-10 mx-auto shadow-xl"
  style={{
    fontFamily: "Arial, sans-serif",
    fontSize: "10.5pt",
    lineHeight: "1.35",
    overflowWrap: "break-word",     // <-- THIS PREVENTS OVERFLOW
    wordBreak: "break-word",        // <-- SAFETY FIX FOR LONG WORDS
  }}
>

      {children}
    </div>
  );
}
