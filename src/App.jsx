import { useState } from "react";

/* ======================
   APP
====================== */

export default function App() {
  const [view, setView] = useState("start");

  return (
    <>
      {view === "start" && <StartPage setView={setView} />}

      {view === "tenant" && <SimplePage title="Hyresgäst – logga in" setView={setView} />}
      {view === "landlord" && <SimplePage title="Hyresvärd – logga in" setView={setView} />}
      {view === "admin" && <SimplePage title="Admin – översikt" setView={setView} />}
    </>
  );
}

/* ======================
   START / HERO
====================== */

function StartPage({ setView }) {
  return (
    <div style={hero}>
      <div style={overlay} />

      <div style={heroContent}>
        <div style={logoRow}>
          <span style={logoIcon}>🧺</span>
          <span style={logoText}>HJALMAR</span>
        </div>

        <p style={tagline}>Boka tvättstugan, enkelt.</p>

        <button style={heroButton} onClick={() => setView("tenant")}>
          Hyresgäst
        </button>

        <button style={heroButton} onClick={() => setView("landlord")}>
          Hyresvärd
        </button>

        <button style={adminLink} onClick={() => setView("admin")}>
          Admin
        </button>
      </div>
    </div>
  );
}

/* ======================
   PLACEHOLDER PAGES
====================== */

function SimplePage({ title, setView }) {
  return (
    <div style={simpleContainer}>
      <h2>{title}</h2>

      <button style={backButton} onClick={() => setView("start")}>
        ← Tillbaka
      </button>
    </div>
  );
}

/* ======================
   STYLES – PRESENTATION
====================== */

const hero = {
  position: "relative",
  width: "100%",
  height: "100vh",
  backgroundImage: "url('/hero.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const overlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(120, 150, 220, 0.65)", // ljusblå overlay
};

const heroContent = {
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "260px",
};

const logoRow = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  fontSize: "28px",
  fontWeight: "700",
  color: "#1f3a8a",
};

const logoIcon = {
  fontSize: "28px",
};

const logoText = {
  letterSpacing: "1px",
};

const tagline = {
  color: "#1f3a8a",
  fontSize: "16px",
  marginBottom: "12px",
};

const heroButton = {
  padding: "16px",
  fontSize: "18px",
  borderRadius: "16px",
  border: "none",
  background: "#4f75d8",
  color: "white",
  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  cursor: "pointer",
};

const adminLink = {
  marginTop: "20px",
  background: "transparent",
  border: "none",
  color: "rgba(0,0,0,0.55)",
  fontSize: "14px",
  cursor: "pointer",
};

/* ======================
   STYLES – INNER PAGES
====================== */

const simpleContainer = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  background: "#f2f4f7",
  fontFamily: "system-ui, sans-serif",
};

const backButton = {
  background: "transparent",
  border: "none",
  color: "#555",
  fontSize: "14px",
  cursor: "pointer",
};





