import React, { useState } from "react";

const API_URL = "https://298b1070ddfa6308.mokky.dev/Ishchilar";

export default function IshchiUchun() {
  const [formData, setFormData] = useState({
    ism: "",
    familya: "",
    yosh: "",
    kategoriya: "",
    status: "pending", 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ism || !formData.familya || !formData.yosh || !formData.kategoriya) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Server bilan bog‘lanib bo‘lmadi!");
      alert("✅ Arizangiz yuborildi! Admin tasdiqlashini kuting.");
      setFormData({ ism: "", familya: "", yosh: "", kategoriya: "", status: "pending" });
    } catch (err) {
      alert("❌ Ariza yuborishda xatolik yuz berdi!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff8c00",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#ff8c00" }}>🧑‍💼 Ish uchun ariza</h2>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label>Ism:</label>
          <input
            type="text"
            name="ism"
            value={formData.ism}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label>Familya:</label>
          <input
            type="text"
            name="familya"
            value={formData.familya}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label>Yosh:</label>
          <input
            type="number"
            name="yosh"
            value={formData.yosh}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label>Kategoriya:</label>
          <select
            name="kategoriya"
            value={formData.kategoriya}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Tanlang...</option>
            <option value="Sotuvchi">Sotuvchi</option>
            <option value="Yetkazib beruvchi">Yetkazib beruvchi</option>
            <option value="Omborchi">Omborchi</option>
            <option value="Boshqa">Boshqa</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
          }}
        >
          {loading ? "Yuborilmoqda..." : "Tasdiqlash"}
        </button>
      </form>
    </div>
  );
}
