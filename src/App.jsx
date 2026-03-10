import { useState } from "react";

const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: "G7 xả dự trữ chiến lược: Chiến tranh tâm lý hay viên đạn cuối cùng?",
    category: "Phân tích",
    date: "2024-03-10",
    readTime: "6 phút",
    tags: ["G7", "Dự trữ chiến lược", "Giá dầu", "Địa chính trị"],
    summary: "Vừa rồi giá dầu bị kéo xuống mốc 100 USD chỉ trong 4 giờ — thực chất ít liên quan đến cung cầu. Đây giống một chiến dịch chiến tranh tâm lý hơn.",
    content: `Vừa rồi giá dầu bị kéo xuống mốc 100 USD chỉ trong 4 giờ — thực chất ít liên quan đến cung cầu, mình thấy giống một chiến dịch chiến tranh tâm lý hơn. Nhưng cơ bản nó tăng vèo 1 cái từ 65 USD vượt 100 USD trong vài ngày thì cần nghỉ ngơi.

Động thái loan tin phối hợp xả dự trữ chiến lược của các nước G7 đã khéo léo quét sạch phần đầu cơ quá nóng của thị trường, bằng cách hứa sẽ tung ra lượng dầu gấp 4 lần mức tiêu thụ toàn cầu mỗi ngày (102 triệu thùng).

Tuy nhiên, mình nghĩ cú sụt giảm mạnh này trên thị trường tài chính cuối cùng sẽ đụng phải bức tường của thực tế vật lý, bởi khả năng xả dầu mỗi ngày của hệ thống đường ống đơn giản là không thể xử lý kỹ thuật xả một dòng chảy lớn đến vậy.

**Dự trữ dầu khẩn cấp theo từng quốc gia G7:**

🇯🇵 Nhật Bản: ~470 triệu thùng (254 ngày)
🇺🇸 Mỹ: ~415 triệu thùng (125 ngày)
🇩🇪 Đức: ~130 triệu thùng (90+ ngày)
🇫🇷 Pháp: ~125 triệu thùng (90+ ngày)
🇮🇹 Ý: ~85 triệu thùng (90+ ngày)
🇬🇧 Anh: ~75 triệu thùng (90 ngày)
🇨🇦 Canada: Không có dữ liệu chính thức

*Canada không duy trì kho dự trữ chiến lược quốc gia vì là nước xuất khẩu dầu lớn.*

Tôi từng nhớ câu nói của tên tội phạm Năm Cam khét tiếng: **"Điều quan trọng không phải là thực tế, mà là điều mọi người tin là thật."**

Hôm nay, G7 phao tin cho thị trường chỉ bằng cách bán dầu trên giấy. Sự bốc hơi 18% giá trị thị trường này, khi những nút thắt logistics và chi phí phải mua lại để nạp đầy kho dự trữ chiến lược được tính đến, cuối cùng có thể nhường chỗ cho một khoảng trống nguồn cung lớn.

**Chiến thắng này đạt được mà thậm chí chưa cần bắn viên đạn thật nào** (dầu vật lý) — có thể mở ra cánh cửa cho đợt tăng giá trả đũa lớn nhất lịch sử, vào ngày các kho dự trữ chạm đáy.

**Câu hỏi đặt ra:** Liệu động thái này được thực hiện để kéo giá dầu xuống, hay đây chỉ là liều thuốc súng cuối cùng được đốt trước khi một cơn bão địa chính trị lớn hơn bùng nổ?

Đơn giản vì những con tàu và kho dầu, nhà máy lọc dầu, giàn khoan bị phá hủy — thời gian phục hồi phải tính theo năm.

**Quan điểm của tôi vẫn là: lên tàu và bám chặt.** Chu kỳ tăng của hàng hoá lần này bao gồm dầu mỏ rất lâu mới quay lại.`
  },
  {
    id: 2,
    title: "Cổ phiếu dầu mỏ và mối tương quan với giá dầu thô",
    category: "Đầu tư",
    date: "2024-03-08",
    readTime: "4 phút",
    tags: ["Cổ phiếu", "Dầu thô", "Đầu tư"],
    summary: "Cổ phiếu dầu mỏ có tăng khi giá dầu tăng phi mã không? Lịch sử đã có câu trả lời rõ ràng.",
    content: `Câu hỏi nhiều người thắc mắc: **cổ phiếu dầu mỏ có tăng khi giá dầu tăng phi mã không?**

Câu trả lời ngắn gọn: **Có**, nhưng không phải lúc nào cũng ngay lập tức và tỷ lệ không phải 1:1.

Có thể tra lại lịch sử giá dầu khí và lịch sử cổ phiếu dầu mỏ — cả Việt Nam và nước ngoài sẽ có câu trả lời tốt nhất.

**Những phiên bán tháo mạnh** như khi margin call bị kích hoạt hoàn toàn không liên quan đến fundamental. Đó là bán chéo call margin — không liên quan đến bán tháo hay úp bô gì cả. Đây là cơ hội để tích lũy thêm.

Chu kỳ hàng hoá lần này có thể kéo dài nhiều năm. Hãy kiên nhẫn.`
  }
];

const CATEGORIES = ["Tất cả", "Phân tích", "Đầu tư", "Địa chính trị", "Thị trường"];

const CHARTS = [
  { symbol: "OANDA:BCOUSD", label: "🛢 Brent Crude", desc: "Dầu thô Brent – chuẩn quốc tế" },
  { symbol: "OANDA:WTIUSD", label: "🛢 WTI Crude", desc: "Dầu thô WTI – chuẩn Mỹ" },
  { symbol: "NYMEX:NG1!", label: "🔥 Natural Gas", desc: "Khí thiên nhiên" },
  { symbol: "HOSE:PVD", label: "📊 PVD", desc: "PV Drilling – Việt Nam" },
  { symbol: "HOSE:GAS", label: "📊 GAS", desc: "PV Gas – Việt Nam" },
  { symbol: "HOSE:PLX", label: "📊 PLX", desc: "Petrolimex – Việt Nam" },
  { symbol: "NYSE:XOM", label: "📊 ExxonMobil", desc: "Exxon – Mỹ" },
  { symbol: "NYSE:CVX", label: "📊 Chevron", desc: "Chevron – Mỹ" },
];

function TVIframe({ symbol }) {
  const src = `https://www.tradingview.com/widgetembed/?frameElementId=tv_chart&symbol=${encodeURIComponent(symbol)}&interval=D&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=1&saveimage=1&toolbarbg=0d1117&theme=dark&style=1&timezone=Asia%2FHo_Chi_Minh&locale=vi_VN&bgcolor=0d1117&gridcolor=1a2535`;
  return (
    <iframe
      src={src}
      style={{ width: "100%", height: 460, border: "none", borderRadius: "0 0 12px 12px", display: "block" }}
      allowFullScreen
      title="TradingView Chart"
    />
  );
}

export default function OilWatch() {
  const [view, setView] = useState("home");
  const [articles, setArticles] = useState(SAMPLE_ARTICLES);
  const [selected, setSelected] = useState(null);
  const [filterCat, setFilterCat] = useState("Tất cả");
  const [editMode, setEditMode] = useState(false);
  const [editArt, setEditArt] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [newArt, setNewArt] = useState({ title: "", category: "Phân tích", summary: "", content: "", tags: "" });
  const [pw, setPw] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pwErr, setPwErr] = useState(false);
  const [search, setSearch] = useState("");
  const [activeChart, setActiveChart] = useState(CHARTS[0]);
  const PW = "oilwatch2024";

  const filtered = articles.filter(a =>
    (filterCat === "Tất cả" || a.category === filterCat) &&
    (search === "" || a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase()))
  );

  const saveEdit = () => {
    setArticles(articles.map(a => a.id === editArt.id
      ? { ...editArt, tags: typeof editArt.tags === "string" ? editArt.tags.split(",").map(t => t.trim()) : editArt.tags }
      : a));
    setEditMode(false); setEditArt(null);
  };

  const addArticle = () => {
    setArticles([{
      id: Date.now(), ...newArt,
      tags: newArt.tags.split(",").map(t => t.trim()),
      date: new Date().toISOString().slice(0, 10),
      readTime: Math.ceil(newArt.content.split(" ").length / 200) + " phút"
    }, ...articles]);
    setNewArt({ title: "", category: "Phân tích", summary: "", content: "", tags: "" });
    setShowNew(false);
  };

  const renderBody = (text) => text.split("\n").map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**"))
      return <p key={i} style={{ fontWeight: 700, color: "#f0a500", margin: "14px 0 6px", fontSize: 17 }}>{line.replace(/\*\*/g, "")}</p>;
    if (line.includes("**")) {
      const p = line.split(/\*\*(.*?)\*\*/g);
      return <p key={i} style={{ margin: "9px 0", lineHeight: 1.85 }}>{p.map((x, j) => j % 2 === 1 ? <strong key={j} style={{ color: "#f0c040" }}>{x}</strong> : x)}</p>;
    }
    if (line.startsWith("*") && !line.startsWith("**"))
      return <p key={i} style={{ color: "#777", fontStyle: "italic", fontSize: 13, margin: "4px 0" }}>{line.slice(1)}</p>;
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} style={{ margin: "9px 0", lineHeight: 1.9 }}>{line}</p>;
  });

  // Styles
  const C = {
    bg: "#060a0f", card: "#0d1117", border: "#1a2535", gold: "#f0a500", goldDim: "#c07800",
    text: "#d4c5a0", textMuted: "#7a8a9a", textDim: "#4a5a6a",
  };
  const inp = (extra = {}) => ({ background: "#060a0f", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 14, width: "100%", outline: "none", marginBottom: 12, boxSizing: "border-box", fontFamily: "Georgia,serif", ...extra });
  const btnStyle = (v) => ({ background: v === "p" ? C.gold : v === "d" ? "#c0392b" : "#1a2535", color: v === "p" ? "#000" : C.text, border: "none", padding: "9px 20px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600 });
  const tagStyle = { display: "inline-block", background: "#111a26", border: `1px solid #1e2e3e`, color: "#7a9aba", fontSize: 11, padding: "3px 10px", borderRadius: 12, marginRight: 6, marginTop: 4 };
  const secTitle = { fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: C.gold, marginBottom: 22, display: "flex", alignItems: "center", gap: 12 };
  const secLine = { flex: 1, height: 1, background: "linear-gradient(90deg,rgba(240,165,0,0.4),transparent)" };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "Georgia, serif", color: C.text }}>

      {/* NAV */}
      <nav style={{ background: "rgba(6,10,15,0.97)", borderBottom: `1px solid #1a2030`, position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => { setView("home"); setSelected(null); }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#f0a500,#c06000)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🛢</div>
            <span style={{ fontSize: 19, fontWeight: 700, color: C.gold, letterSpacing: 1 }}>OilWatch</span>
            <span style={{ fontSize: 10, color: "#555", fontFamily: "monospace" }}>VN</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[["home","📰 Bài viết"],["chart","📈 Đồ thị"],["admin","⚙️ Quản lý"]].map(([v,lbl]) => (
              <button key={v} onClick={() => { setView(v); setSelected(null); }}
                style={{ background: view===v ? "rgba(240,165,0,0.15)" : "transparent", color: view===v ? C.gold : "#888", border: view===v ? "1px solid rgba(240,165,0,0.3)" : "1px solid transparent", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
                {lbl}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* PRICE BAR — static reference prices with live link */}
      <div style={{ background: "#080d14", borderBottom: `1px solid #1a2030`, padding: "8px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#3a4a5a", marginRight: 8, fontFamily: "monospace" }}>LIVE:</span>
          {[
            { label: "Brent", url: "https://www.tradingview.com/symbols/OANDA-BCOUSD/" },
            { label: "WTI", url: "https://www.tradingview.com/symbols/OANDA-WTIUSD/" },
            { label: "Nat.Gas", url: "https://www.tradingview.com/symbols/NYMEX-NG1/" },
            { label: "PVD", url: "https://www.tradingview.com/symbols/HOSE-PVD/" },
            { label: "GAS", url: "https://www.tradingview.com/symbols/HOSE-GAS/" },
            { label: "PLX", url: "https://www.tradingview.com/symbols/HOSE-PLX/" },
          ].map(({ label, url }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: C.gold, background: "rgba(240,165,0,0.08)", border: "1px solid rgba(240,165,0,0.2)", padding: "3px 10px", borderRadius: 12, textDecoration: "none", fontFamily: "monospace" }}>
              {label} ↗
            </a>
          ))}
          <span style={{ fontSize: 11, color: "#2a3a4a", marginLeft: "auto" }}>Nhấn để xem giá realtime trên TradingView</span>
        </div>
      </div>

      {/* ── HOME LIST ── */}
      {view === "home" && !selected && (
        <>
          <div style={{ background: "linear-gradient(180deg,#0a1020,#060a0f)", borderBottom: `1px solid #1a2030`, padding: "44px 20px 34px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <h1 style={{ fontSize: "clamp(24px,5vw,48px)", fontWeight: 700, color: "#f0c040", lineHeight: 1.2, marginBottom: 10, textShadow: "0 0 40px rgba(240,165,0,0.2)" }}>
                Phân tích thị trường<br />dầu khí độc lập
              </h1>
              <p style={{ color: "#888", fontSize: 15, maxWidth: 480, lineHeight: 1.6, margin: 0 }}>
                Góc nhìn thực chiến về giá dầu, địa chính trị năng lượng và cơ hội đầu tư dài hạn.
              </p>
            </div>
          </div>

          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 20px" }}>
            <div style={secTitle}><span>Bài viết mới nhất</span><div style={secLine} /></div>
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setFilterCat(c)}
                  style={{ background: filterCat===c ? C.gold : "transparent", color: filterCat===c ? "#000" : "#666", border: `1px solid ${filterCat===c ? C.gold : C.border}`, padding: "5px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13 }}>
                  {c}
                </button>
              ))}
              <input style={{ ...inp(), width: 190, marginLeft: "auto", marginBottom: 0 }} placeholder="🔍 Tìm..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
              {filtered.map(a => (
                <div key={a.id} onClick={() => setSelected(a)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "all 0.22s" }}>
                  <div style={{ padding: "18px 20px 12px", borderBottom: `1px solid #141e2a` }}>
                    <div style={{ display: "inline-block", background: "rgba(240,165,0,0.12)", color: C.gold, fontSize: 10, padding: "2px 9px", borderRadius: 4, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>{a.category}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#e8d5a0", lineHeight: 1.4, marginBottom: 8 }}>{a.title}</div>
                    <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>{a.summary}</div>
                    <div style={{ marginTop: 10 }}>{(Array.isArray(a.tags) ? a.tags : []).map(t => <span key={t} style={tagStyle}>{t}</span>)}</div>
                  </div>
                  <div style={{ padding: "10px 20px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: C.textDim }}>{a.date}</span>
                    <span style={{ fontSize: 12, color: C.gold }}>📖 {a.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── ARTICLE ── */}
      {view === "home" && selected && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 20px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <button onClick={() => setSelected(null)} style={{ background: "transparent", border: `1px solid ${C.border}`, color: "#888", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, marginBottom: 28 }}>← Quay lại</button>
            <div style={{ display: "inline-block", background: "rgba(240,165,0,0.12)", color: C.gold, fontSize: 10, padding: "2px 9px", borderRadius: 4, marginBottom: 14, letterSpacing: 1, textTransform: "uppercase" }}>{selected.category}</div>
            <h1 style={{ fontSize: "clamp(20px,4vw,32px)", fontWeight: 700, color: "#f0c040", lineHeight: 1.3, marginBottom: 14 }}>{selected.title}</h1>
            <div style={{ display: "flex", gap: 16, color: "#666", fontSize: 13, marginBottom: 28 }}>
              <span>📅 {selected.date}</span><span>⏱ {selected.readTime}</span>
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.9, color: "#c4b590" }}>{renderBody(selected.content)}</div>
            <div style={{ marginTop: 28, paddingTop: 18, borderTop: `1px solid ${C.border}` }}>
              {(Array.isArray(selected.tags) ? selected.tags : []).map(t => <span key={t} style={tagStyle}>{t}</span>)}
            </div>
          </div>
        </div>
      )}

      {/* ── CHART ── */}
      {view === "chart" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 20px" }}>
          <div style={secTitle}><span>Đồ thị giá dầu — Realtime</span><div style={secLine} /></div>

          {/* Chart tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {CHARTS.map(c => (
              <button key={c.symbol} onClick={() => setActiveChart(c)}
                style={{ background: activeChart.symbol===c.symbol ? "rgba(240,165,0,0.15)" : "transparent", color: activeChart.symbol===c.symbol ? C.gold : "#777", border: `1px solid ${activeChart.symbol===c.symbol ? "rgba(240,165,0,0.4)" : C.border}`, padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, transition: "all 0.2s" }}>
                {c.label}
              </button>
            ))}
          </div>

          {/* Chart box */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid #141e2a`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#f0c040" }}>{activeChart.label}</div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{activeChart.desc}</div>
              </div>
              <a href={`https://www.tradingview.com/chart/?symbol=${encodeURIComponent(activeChart.symbol)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: C.gold, textDecoration: "none", background: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.3)", padding: "5px 12px", borderRadius: 6 }}>
                Mở TradingView ↗
              </a>
            </div>
            <TVIframe symbol={activeChart.symbol} />
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "13px 18px", fontSize: 13, color: "#666", lineHeight: 1.7 }}>
            💡 Nếu iframe bị chặn trong môi trường preview, nhấn <strong style={{ color: C.gold }}>"Mở TradingView ↗"</strong> để xem biểu đồ realtime đầy đủ tính năng (vẽ đường trend, thêm indicator, v.v.)
          </div>
        </div>
      )}

      {/* ── ADMIN ── */}
      {view === "admin" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 20px" }}>
          {!unlocked ? (
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, maxWidth: 420, margin: "0 auto" }}>
              <h2 style={{ color: C.gold, marginBottom: 6, fontSize: 19 }}>🔐 Khu vực quản trị</h2>
              <p style={{ color: "#666", fontSize: 14, marginBottom: 18 }}>Nhập mật khẩu để tiếp tục.</p>
              <label style={{ fontSize: 11, color: "#888", marginBottom: 5, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Mật khẩu</label>
              <input type="password" style={inp()} value={pw} onChange={e => setPw(e.target.value)}
                onKeyDown={e => { if (e.key==="Enter") { if (pw===PW) { setUnlocked(true); setPwErr(false); } else setPwErr(true); } }}
                placeholder="••••••••" />
              {pwErr && <p style={{ color: "#f87171", fontSize: 13, marginBottom: 10 }}>❌ Sai mật khẩu.</p>}
              <button style={btnStyle("p")} onClick={() => { if (pw===PW) { setUnlocked(true); setPwErr(false); } else setPwErr(true); }}>Đăng nhập</button>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={secTitle}><span>Quản lý bài viết ({articles.length})</span><div style={secLine} /></div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={btnStyle("p")} onClick={() => setShowNew(!showNew)}>{showNew ? "✕ Đóng" : "+ Bài viết mới"}</button>
                  <button style={btnStyle()} onClick={() => setUnlocked(false)}>Đăng xuất</button>
                </div>
              </div>

              {showNew && (
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22, marginBottom: 20 }}>
                  <h3 style={{ color: C.gold, marginBottom: 16, fontSize: 15 }}>✍️ Bài viết mới</h3>
                  {[["Tiêu đề *","title","Tiêu đề bài viết..."],["Tóm tắt","summary","Hiển thị trên card..."],["Tags","tags","OPEC, Brent, Đầu tư..."]].map(([lbTxt, key, ph]) => (
                    <div key={key}>
                      <label style={{ fontSize: 11, color: "#888", marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>{lbTxt}</label>
                      <input style={inp()} value={newArt[key]} onChange={e => setNewArt({ ...newArt, [key]: e.target.value })} placeholder={ph} />
                    </div>
                  ))}
                  <label style={{ fontSize: 11, color: "#888", marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Danh mục</label>
                  <select style={inp()} value={newArt.category} onChange={e => setNewArt({ ...newArt, category: e.target.value })}>
                    {CATEGORIES.filter(c => c !== "Tất cả").map(c => <option key={c}>{c}</option>)}
                  </select>
                  <label style={{ fontSize: 11, color: "#888", marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Nội dung (dùng **text** để in đậm)</label>
                  <textarea style={inp({ minHeight: 160, resize: "vertical" })} value={newArt.content} onChange={e => setNewArt({ ...newArt, content: e.target.value })} placeholder="Viết nội dung..." />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={btnStyle("p")} onClick={addArticle} disabled={!newArt.title || !newArt.content}>Đăng bài</button>
                    <button style={btnStyle()} onClick={() => setShowNew(false)}>Hủy</button>
                  </div>
                </div>
              )}

              {editMode && editArt && (
                <div style={{ background: C.card, border: `1px solid ${C.gold}`, borderRadius: 12, padding: 22, marginBottom: 20 }}>
                  <h3 style={{ color: C.gold, marginBottom: 16, fontSize: 15 }}>✏️ Chỉnh sửa</h3>
                  {[["Tiêu đề","title"],["Tóm tắt","summary"]].map(([lbTxt, key]) => (
                    <div key={key}>
                      <label style={{ fontSize: 11, color: "#888", marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>{lbTxt}</label>
                      <input style={inp()} value={editArt[key]} onChange={e => setEditArt({ ...editArt, [key]: e.target.value })} />
                    </div>
                  ))}
                  <label style={{ fontSize: 11, color: "#888", marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Tags</label>
                  <input style={inp()} value={Array.isArray(editArt.tags) ? editArt.tags.join(", ") : editArt.tags} onChange={e => setEditArt({ ...editArt, tags: e.target.value })} />
                  <label style={{ fontSize: 11, color: "#888", marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Danh mục</label>
                  <select style={inp()} value={editArt.category} onChange={e => setEditArt({ ...editArt, category: e.target.value })}>
                    {CATEGORIES.filter(c => c !== "Tất cả").map(c => <option key={c}>{c}</option>)}
                  </select>
                  <label style={{ fontSize: 11, color: "#888", marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Nội dung</label>
                  <textarea style={inp({ minHeight: 220, resize: "vertical" })} value={editArt.content} onChange={e => setEditArt({ ...editArt, content: e.target.value })} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={btnStyle("p")} onClick={saveEdit}>💾 Lưu</button>
                    <button style={btnStyle()} onClick={() => { setEditMode(false); setEditArt(null); }}>Hủy</button>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {articles.map(a => (
                  <div key={a.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "#e8d5a0", fontWeight: 600, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</div>
                      <div style={{ color: C.textDim, fontSize: 12 }}>{a.category} · {a.date}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button style={btnStyle()} onClick={() => { setEditArt({ ...a, tags: Array.isArray(a.tags) ? a.tags.join(", ") : a.tags }); setEditMode(true); setShowNew(false); }}>✏️</button>
                      <button style={btnStyle("d")} onClick={() => { if (confirm("Xóa bài viết này?")) setArticles(articles.filter(x => x.id !== a.id)); }}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "20px", textAlign: "center", color: "#2a3a4a", fontSize: 12, marginTop: 40 }}>
        OilWatch VN · Phân tích độc lập · Không phải tư vấn đầu tư
      </footer>
    </div>
  );
}
