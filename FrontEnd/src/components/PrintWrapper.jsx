import React from "react";

export default function PrintWrapper({ children }) {
  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: 0,
        padding: 0,
        background: "white",
      }}
    >
      {children}
    </div>
  );
}
