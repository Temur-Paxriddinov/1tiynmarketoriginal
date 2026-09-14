import React, { useState } from "react";

export default function Kameralar() {
  
  const initialCameras = [
    { id: 1, nom: "1-Kamera", xona: "1-xona" },
    { id: 2, nom: "2-Kamera", xona: "1-xona" },
    { id: 3, nom: "3-Kamera", xona: "1-xona" },
    { id: 4, nom: "4-Kamera", xona: "1-xona" },
    { id: 5, nom: "5-Kamera", xona: "1-xona" },
  ];

  const [cameras, setCameras] = useState(initialCameras);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nom: "", xona: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCameras(
        cameras.map((cam) =>
          cam.id === editingId ? { ...cam, ...formData } : cam
        )
      );
      setEditingId(null);
    } else {
      const newCamera = { id: Date.now(), ...formData };
      setCameras([...cameras, newCamera]);
    }
    setFormData({ nom: "", xona: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setCameras(cameras.filter((cam) => cam.id !== id));
  };

  const handleEdit = (cam) => {
    setFormData({ nom: cam.nom, xona: cam.xona });
    setEditingId(cam.id);
    setShowForm(true);
  };

  return (
    <div style={{ padding: "30px", background: "#f0f8ff", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      <a
        href="/asosiypanel"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          padding: "8px 15px",
          backgroundColor: "#ff8c00",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Menu
      </a>

      <h1 style={{ textAlign: "center", color: "#ff8c00", marginBottom: "20px" }}>📷 Kameralar bo‘limi</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ nom: "", xona: "" });
          }}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "6px",
            backgroundColor: "#ff8c00",
            color: "white",
            border: "none",
            fontWeight: "bold",
          }}
        >
          {showForm ? "✖ Bekor qilish" : "➕ Kamera qo‘shish"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            name="nom"
            placeholder="Kamera nomi"
            value={formData.nom}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "100%", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            name="xona"
            placeholder="Xona nomi / raqami"
            value={formData.xona}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "100%", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: editingId ? "#007bff" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {editingId ? "✏️ Tahrirlash" : "✅ Qo‘shish"}
          </button>
        </form>
      )}

      {cameras.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>Hozircha kamera yo‘q</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {cameras.map((cam) => (
            <div
              key={cam.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={{ margin: "5px 0", fontSize: "1rem", fontWeight: "600" }}>
                {cam.nom}
              </h3>
              <p style={{ margin: "5px 0", color: "#777" }}>Xona: {cam.xona}</p>

              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={() => handleEdit(cam)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ✏️ Tahrirlash
                </button>

                <button
                  onClick={() => handleDelete(cam.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#dc3545",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  🗑 O‘chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
