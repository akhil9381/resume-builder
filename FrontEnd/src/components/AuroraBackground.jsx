export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(130,0,255,0.35), transparent 60%),             radial-gradient(circle at 80% 70%, rgba(0,150,255,0.35), transparent 60%)",
          filter: "blur(180px)",
        }}
      />
    </div>
  );
}
