import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://298b1070ddfa6308.mokky.dev/Ishchilar";

export default function AsosiyPanel() {
  const [pendingCount, setPendingCount] = useState(0);


  const fetchPending = async () => {
    try {
      const res = await fetch(`${API_URL}?status=pending`);
      const data = await res.json();
      setPendingCount(data.length);
    } catch (err) {
      console.error("Notification error:", err);
    }
  };

  useEffect(() => {
    fetchPending();

    const interval = setInterval(fetchPending, 5000);
    return () => clearInterval(interval);
  }, []);

  const buttonStyle = {
    display: "block",
    width: "180px",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#fff8f0",
    cursor: "pointer",
    fontWeight: "600",
    textAlign: "center",
    textDecoration: "none",
    color: "#333",
    marginBottom: "15px",
    transition: "0.25s",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const hover = (e) => (e.target.style.backgroundColor = "#ffe0b3");
  const leave = (e) => (e.target.style.backgroundColor = "#fff8f0");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >

      <div
        style={{
          width: "260px",
          background: "linear-gradient(180deg, #ff8c00, #ffb84d)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "25px",
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: "none",
            fontSize: "1.8rem",
            fontWeight: "700",
            textShadow: "0 2px 3px rgba(0,0,0,0.2)",
          }}
        >
          1Tiyn Admin
        </h2>
        <img
          style={{
            width: "500px",
            margin: "none",
            fontWeight: "400",
          }}
          src="https://cbu.uz/upload/iblock/b96/1tiyin_1994_1.png"
          alt=""
        />

        <Link to="/ishchilar" style={buttonStyle} onMouseEnter={hover} onMouseLeave={leave}>
          👥 Ishchilar
        </Link>

        <Link to="/kameralar" style={buttonStyle} onMouseEnter={hover} onMouseLeave={leave}>
          📷 Kameralar
        </Link>

        <Link to="/mahsulotlar" style={buttonStyle} onMouseEnter={hover} onMouseLeave={leave}>
          🛒 Mahsulotlar
        </Link>

        <Link to="/" style={buttonStyle} onMouseEnter={hover} onMouseLeave={leave}>
          🏪 Market
        </Link>
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#fffaf3",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative", 
        }}
      >
        <h1 style={{ color: "#ff8c00", fontSize: "2.5rem", marginBottom: "10px" }}>
          Xush kelibsiz, Admin! 👋
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Bu yerda siz marketni boshqarishingiz mumkin.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
          alt=""
          style={{ width: "280px", marginTop: "30px", opacity: 0.9 }}
        />

        <a
          href="/ishchilar"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            fontSize: "28px",
            textDecoration: "none",
            color: "#ff8c00",
          }}
        >
          🔔
          {pendingCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {pendingCount}
            </span>
          )}
        </a>
      </div>
    </div>
  );
}
