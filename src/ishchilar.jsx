import React, { useEffect, useState } from "react";

const API_URL = "https://298b1070ddfa6308.mokky.dev/Ishchilar";

export default function Ishchilar() {
  const [ishchilar, setIshchilar] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ism: "",
    familya: "",
    yosh: "",
    kategoriya: "",
  });

  const [pendingCount, setPendingCount] = useState(0);


  const fetchIshchilar = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setIshchilar(data);


      const pending = data.filter((x) => x.status === "pending").length;
      setPendingCount(pending);
    } catch (err) {
      console.error("Xatolik:", err);
    }
  };

  useEffect(() => {
    fetchIshchilar();
    const interval = setInterval(fetchIshchilar, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const saveIshchi = async () => {
    if (!formData.ism || !formData.familya || !formData.yosh || !formData.kategoriya) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      if (editingId) {
  
        await fetch(`${API_URL}/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, status: "approved" }),
        });
      }
      setFormVisible(false);
      setEditingId(null);
      setFormData({ ism: "", familya: "", yosh: "", kategoriya: "" });
      fetchIshchilar();
    } catch (err) {
      console.error("Saqlashda xato:", err);
    }
  };

 
  const deleteIshchi = async (id) => {
    if (!window.confirm("Rostdan ham o‘chirmoqchimisiz?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setIshchilar(ishchilar.filter((x) => x.id !== id));
      fetchIshchilar();
    } catch (err) {
      console.error("O‘chirishda xato:", err);
    }
  };

 
  const editIshchi = (ishchi) => {
    setEditingId(ishchi.id);
    setFormData({
      ism: ishchi.ism,
      familya: ishchi.familya,
      yosh: ishchi.yosh,
      kategoriya: ishchi.kategoriya || "",
    });
    setFormVisible(true);
  };

  const approveIshchi = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    });
    fetchIshchilar();
  };

  const rejectIshchi = async (id) => {
    if (!window.confirm("Ushbu ishchini rad qilmoqchimisiz?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setIshchilar(ishchilar.filter((x) => x.id !== id));
      setPendingCount((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("Rad etishda xato:", err);
    }
  };

  const toggleForm = () => {
    setFormVisible(!formVisible);
    setEditingId(null);
    setFormData({ ism: "", familya: "", yosh: "", kategoriya: "" });
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "linear-gradient(180deg, #fff, #fff5e6)",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
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

      <h1 style={{ color: "#ff8c00", marginBottom: "20px" }}>👷 Ishchilar boshqaruvi</h1>

      <button
        onClick={toggleForm}
        style={{
          padding: "10px 25px",
          backgroundColor: formVisible ? "#6c757d" : "#ff8c00",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          marginBottom: "25px",
        }}
      >
        {formVisible ? "❌ Yopish" : "➕ Add"}
      </button>

      {formVisible && (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            name="ism"
            placeholder="Ism"
            value={formData.ism}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="familya"
            placeholder="Familya"
            value={formData.familya}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="yosh"
            placeholder="Yosh"
            value={formData.yosh}
            onChange={handleChange}
            style={inputStyle}
          />
          <select
            name="kategoriya"
            value={formData.kategoriya}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Kategoriya tanlang</option>
            <option value="Sotuvchi">Sotuvchi</option>
            <option value="Yetkazib beruvchi">Yetkazib beruvchi</option>
            <option value="Omborchi">Omborchi</option>
          </select>

          <button
            onClick={saveIshchi}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: editingId ? "#007bff" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {editingId ? "💾 Yangilash" : "✅ Saqlash"}
          </button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {ishchilar.length === 0 ? (
          <p>Hozircha ishchilar yo‘q.</p>
        ) : (
          ishchilar.map((ishchi) => (
            <div
              key={ishchi.id}
              style={{
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                padding: "15px",
                textAlign: "center",
              }}
            >
              <h3>{ishchi.ism} {ishchi.familya}</h3>
              <p>🧒 {ishchi.yosh} yosh</p>
              <p>📋 Ishi: {ishchi.kategoriya}</p>
              <p>
                Holat:{" "}
                <span
                  style={{
                    color:
                      ishchi.status === "approved"
                        ? "green"
                        : ishchi.status === "pending"
                        ? "orange"
                        : "gray",
                  }}
                >
                  {ishchi.status === "approved"
                    ? "Qabul qilingan"
                    : ishchi.status === "pending"
                    ? "Kutilmoqda"
                    : "Rad etilgan"}
                </span>
              </p>

              {/* 🔹 Tugmalar holatga qarab */}
              <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                {ishchi.status === "approved" ? (
                  <>
                    <button
                      onClick={() => editIshchi(ishchi)}
                      style={buttonStyleFunc("#007bff")}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteIshchi(ishchi.id)}
                      style={buttonStyleFunc("#e74c3c")}
                    >
                      🗑 Delete
                    </button>
                  </>
                ) : ishchi.status === "pending" ? (
                  <>
                    <button
                      onClick={() => approveIshchi(ishchi.id)}
                      style={buttonStyleFunc("#28a745")}
                    >
                      ✅ Qabul qilish
                    </button>
                    <button
                      onClick={() => rejectIshchi(ishchi.id)}
                      style={buttonStyleFunc("#e74c3c")}
                    >
                      ❌ Rad etish
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyleFunc = (bg) => ({
  backgroundColor: bg,
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  fontWeight: "bold",
});
