import { useState, useEffect, useRef } from "react";

/* ─── Google Fonts: Be Vietnam Pro (Vietnamese support) + Playfair Display ─── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap";
document.head.appendChild(fontLink);

/* ─── Global styles ─── */
const globalStyle = document.createElement("style");
globalStyle.innerHTML = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f5f2ec; font-family: 'Be Vietnam Pro', sans-serif; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #f0ede6; }
  ::-webkit-scrollbar-thumb { background: #c8a96e; border-radius: 3px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .card-hover {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.10);
  }

  .nav-link {
    position: relative;
    color: #5a4a3a;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    padding: 4px 0;
    transition: color 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Be Vietnam Pro', sans-serif;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 2px;
    background: #c8a96e;
    transition: width 0.25s ease;
  }
  .nav-link:hover { color: #1a1208; }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active { color: #1a1208; font-weight: 700; }
  .nav-link.active::after { width: 100%; }

  .tag-pill {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    background: #ede8df;
    color: #7a6040;
    margin: 2px 4px 2px 0;
    letter-spacing: 0.3px;
    transition: background 0.2s;
  }
  .tag-pill:hover { background: #c8a96e; color: #fff; cursor: default; }

  .chart-tab {
    padding: 7px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border: 1.5px solid #ddd5c8;
    background: #fff;
    color: #7a6040;
    transition: all 0.2s;
    font-family: 'Be Vietnam Pro', sans-serif;
  }
  .chart-tab:hover { border-color: #c8a96e; color: #8a5a10; }
  .chart-tab.active {
    background: #c8a96e;
    border-color: #c8a96e;
    color: #fff;
    font-weight: 600;
  }

  .filter-btn {
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border: 1.5px solid #ddd5c8;
    background: transparent;
    color: #8a7a6a;
    transition: all 0.18s;
    font-family: 'Be Vietnam Pro', sans-serif;
  }
  .filter-btn:hover { border-color: #c8a96e; color: #8a5a10; }
  .filter-btn.active { background: #1a1208; border-color: #1a1208; color: #f5f2ec; }

  .btn-primary {
    background: #1a1208;
    color: #f5f2ec;
    border: none;
    padding: 10px 22px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Be Vietnam Pro', sans-serif;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: #2e2010; transform: translateY(-1px); }

  .btn-outline {
    background: transparent;
    color: #5a4a3a;
    border: 1.5px solid #ddd5c8;
    padding: 9px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    font-family: 'Be Vietnam Pro', sans-serif;
    transition: all 0.2s;
  }
  .btn-outline:hover { border-color: #c8a96e; color: #8a5a10; }

  .btn-danger {
    background: transparent;
    color: #c0392b;
    border: 1.5px solid #f5c6c2;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
    font-family: 'Be Vietnam Pro', sans-serif;
    transition: all 0.2s;
  }
  .btn-danger:hover { background: #c0392b; color: #fff; }

  .form-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #ddd5c8;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Be Vietnam Pro', sans-serif;
    color: #1a1208;
    background: #fff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    margin-bottom: 14px;
  }
  .form-input:focus {
    border-color: #c8a96e;
    box-shadow: 0 0 0 3px rgba(200,169,110,0.15);
  }
  .form-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #9a8a7a;
    margin-bottom: 5px;
  }

  .article-body p { margin-bottom: 1.1em; }
  .article-body strong { color: #1a1208; font-weight: 700; }

  .divider {
    border: none;
    border-top: 1px solid #e8e0d5;
    margin: 0;
  }

  .price-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 6px;
    background: #f0ede6;
    color: #3a2a1a;
    border: 1px solid #e0d8cc;
    text-decoration: none;
    transition: all 0.2s;
    font-family: 'Be Vietnam Pro', sans-serif;
  }
  .price-badge:hover {
    background: #c8a96e;
    color: #fff;
    border-color: #c8a96e;
  }
`;
document.head.appendChild(globalStyle);

/* ─── Data ─── */
const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: "G7 xả dự trữ chiến lược: Chiến tranh tâm lý hay viên đạn cuối cùng?",
    category: "Phân tích",
    date: "10/03/2024",
    readTime: "6 phút",
    tags: ["G7", "Dự trữ chiến lược", "Địa chính trị"],
    summary: "Giá dầu bị kéo xuống mốc 100 USD chỉ trong 4 giờ — thực chất ít liên quan đến cung cầu. Đây giống một chiến dịch chiến tranh tâm lý hơn là thực tế thị trường.",
    content: `Vừa rồi giá dầu bị kéo xuống mốc 100 USD chỉ trong 4 giờ — thực chất ít liên quan đến cung cầu, mình thấy giống một chiến dịch chiến tranh tâm lý hơn. Nhưng cơ bản nó tăng vèo từ 65 USD vượt 100 USD trong vài ngày thì cần nghỉ ngơi.

Động thái loan tin phối hợp xả dự trữ chiến lược của các nước G7 đã khéo léo quét sạch phần đầu cơ quá nóng của thị trường, bằng cách hứa sẽ tung ra lượng dầu gấp 4 lần mức tiêu thụ toàn cầu mỗi ngày (102 triệu thùng).

Tuy nhiên, cú sụt giảm mạnh này trên thị trường tài chính cuối cùng sẽ đụng phải bức tường của thực tế vật lý — khả năng xả dầu mỗi ngày của hệ thống đường ống đơn giản là không thể xử lý kỹ thuật một dòng chảy lớn đến vậy.

**Dự trữ dầu khẩn cấp theo từng quốc gia G7**

🇯🇵 Nhật Bản: ~470 triệu thùng (254 ngày)
🇺🇸 Mỹ: ~415 triệu thùng (125 ngày)
🇩🇪 Đức: ~130 triệu thùng (90+ ngày)
🇫🇷 Pháp: ~125 triệu thùng (90+ ngày)
🇮🇹 Ý: ~85 triệu thùng (90+ ngày)
🇬🇧 Anh: ~75 triệu thùng (90 ngày)
🇨🇦 Canada: Không có dữ liệu chính thức

*Canada không duy trì kho dự trữ chiến lược vì là nước xuất khẩu dầu lớn.*

Tôi nhớ câu nói của tên tội phạm Năm Cam khét tiếng: **"Điều quan trọng không phải là thực tế, mà là điều mọi người tin là thật."**

Hôm nay, G7 phao tin cho thị trường chỉ bằng cách bán dầu trên giấy. Sự bốc hơi 18% giá trị thị trường này, khi những nút thắt logistics và chi phí phải mua lại để nạp đầy kho dự trữ được tính đến, cuối cùng có thể nhường chỗ cho một khoảng trống nguồn cung lớn.

**Chiến thắng này đạt được mà thậm chí chưa cần bắn viên đạn thật nào** — có thể mở ra cánh cửa cho đợt tăng giá trả đũa lớn nhất lịch sử, vào ngày các kho dự trữ chạm đáy.

Liệu động thái này được thực hiện để kéo giá dầu xuống, hay đây chỉ là liều thuốc súng cuối cùng trước khi một cơn bão địa chính trị lớn hơn bùng nổ?

**Quan điểm của tôi vẫn là: lên tàu và bám chặt.** Chu kỳ tăng của hàng hoá lần này rất lâu mới quay lại.`,
  },
  {
    id: 2,
    title: "Cổ phiếu dầu mỏ và mối tương quan với giá dầu thô",
    category: "Đầu tư",
    date: "08/03/2024",
    readTime: "4 phút",
    tags: ["Cổ phiếu", "Dầu thô", "Chiến lược"],
    summary: "Cổ phiếu dầu mỏ có tăng khi giá dầu tăng phi mã không? Tra lại lịch sử — cả Việt Nam và quốc tế đều có câu trả lời rõ ràng.",
    content: `Câu hỏi nhiều người thắc mắc: **cổ phiếu dầu mỏ có tăng khi giá dầu tăng phi mã không?**

Câu trả lời ngắn gọn: **Có**, nhưng không phải lúc nào cũng ngay lập tức và tỷ lệ không phải 1:1.

Có thể tra lại lịch sử giá dầu khí và lịch sử cổ phiếu dầu mỏ — cả Việt Nam và nước ngoài sẽ có câu trả lời tốt nhất.

**Những phiên bán tháo mạnh** như khi margin call bị kích hoạt hoàn toàn không liên quan đến fundamental. Đó là bán chéo call margin — không liên quan đến bán tháo hay úp bô gì cả. Đây là cơ hội để tích lũy thêm.

Chu kỳ hàng hoá lần này có thể kéo dài nhiều năm. Hãy kiên nhẫn.`,
  },
];

const CATEGORIES = ["Tất cả", "Phân tích", "Đầu tư", "Địa chính trị", "Thị trường"];

const CHARTS = [
  { symbol: "OANDA:BCOUSD",  label: "Brent Crude",   flag: "🌍" },
  { symbol: "OANDA:WTIUSD",  label: "WTI Crude",     flag: "🇺🇸" },
  { symbol: "NYMEX:NG1!",    label: "Natural Gas",   flag: "🔥" },
  { symbol: "HOSE:PVD",      label: "PVD",           flag: "🇻🇳" },
  { symbol: "HOSE:GAS",      label: "GAS",           flag: "🇻🇳" },
  { symbol: "HOSE:PLX",      label: "PLX",           flag: "🇻🇳" },
  { symbol: "NYSE:XOM",      label: "ExxonMobil",    flag: "🇺🇸" },
  { symbol: "NYSE:CVX",      label: "Chevron",       flag: "🇺🇸" },
];

const LIVE_LINKS = [
  { label: "Brent", sym: "OANDA:BCOUSD" },
  { label: "WTI",   sym: "OANDA:WTIUSD" },
  { label: "Gas",   sym: "NYMEX:NG1!" },
  { label: "PVD",   sym: "HOSE:PVD" },
  { label: "GAS",   sym: "HOSE:GAS" },
  { label: "PLX",   sym: "HOSE:PLX" },
];

/* ─── TradingView iframe ─── */
function TVChart({ symbol }) {
  const params = new URLSearchParams({
    symbol,
    interval: "D",
    theme: "light",
    style: "1",
    locale: "vi_VN",
    timezone: "Asia/Ho_Chi_Minh",
    toolbar_bg: "#ffffff",
    hide_top_toolbar: "0",
    allow_symbol_change: "1",
    save_image: "1",
    backgroundColor: "rgba(255,255,255,1)",
    gridColor: "rgba(240,236,229,1)",
  });
  return (
    <iframe
      key={symbol}
      src={`https://www.tradingview.com/widgetembed/?${params}`}
      style={{ width: "100%", height: 500, border: "none", display: "block", borderRadius: "0 0 12px 12px" }}
      allowFullScreen
      title={`Chart ${symbol}`}
    />
  );
}

/* ─── Article body renderer ─── */
function renderBody(text) {
  return text.split("\n").map((line, i) => {
    if (!line.trim()) return <div key={i} style={{ height: "0.8em" }} />;
    if (line.startsWith("**") && line.endsWith("**"))
      return <h3 key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#1a1208", margin: "1.4em 0 0.4em", borderLeft: "3px solid #c8a96e", paddingLeft: 14 }}>{line.replace(/\*\*/g, "")}</h3>;
    if (line.startsWith("*") && !line.startsWith("**"))
      return <p key={i} style={{ fontSize: 13, color: "#9a8a7a", fontStyle: "italic", margin: "0.3em 0" }}>{line.slice(1)}</p>;
    if (line.includes("**")) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return <p key={i} className="article-body" style={{ lineHeight: 1.85, color: "#3a2e22" }}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</p>;
    }
    return <p key={i} style={{ lineHeight: 1.85, color: "#3a2e22", marginBottom: "0.9em" }}>{line}</p>;
  });
}

/* ══════════════ MAIN APP ══════════════ */
export default function OilWatch() {
  const [view, setView] = useState("home");
  const [articles, setArticles] = useState(SAMPLE_ARTICLES);
  const [selected, setSelected] = useState(null);
  const [filterCat, setFilterCat] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [activeChart, setActiveChart] = useState(CHARTS[0]);
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [editArt, setEditArt] = useState(null);
  const [newArt, setNewArt] = useState({ title: "", category: "Phân tích", summary: "", content: "", tags: "" });
  const PW = "oilwatch2024";

  const goTo = (v) => { setView(v); setSelected(null); };

  const filtered = articles.filter(a =>
    (filterCat === "Tất cả" || a.category === filterCat) &&
    (!search || a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase()))
  );

  const saveEdit = () => {
    setArticles(articles.map(a => a.id === editArt.id
      ? { ...editArt, tags: typeof editArt.tags === "string" ? editArt.tags.split(",").map(t => t.trim()) : editArt.tags }
      : a));
    setEditArt(null);
  };

  const addArticle = () => {
    setArticles([{
      id: Date.now(), ...newArt,
      tags: newArt.tags.split(",").map(t => t.trim()).filter(Boolean),
      date: new Date().toLocaleDateString("vi-VN"),
      readTime: Math.max(1, Math.ceil(newArt.content.split(" ").length / 200)) + " phút",
    }, ...articles]);
    setNewArt({ title: "", category: "Phân tích", summary: "", content: "", tags: "" });
    setShowNew(false);
  };

  const catColor = { "Phân tích": "#1a5276", "Đầu tư": "#1e8449", "Địa chính trị": "#922b21", "Thị trường": "#6e2fa0" };

  /* ── Layout shell ── */
  return (
    <div style={{ background: "#f5f2ec", minHeight: "100vh", fontFamily: "'Be Vietnam Pro', sans-serif" }}>

      {/* ══ TOP BAR ══ */}
      <div style={{ background: "#1a1208", color: "#c8a96e", fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textAlign: "center", padding: "6px 20px", textTransform: "uppercase" }}>
        Phân tích độc lập · Không phải tư vấn đầu tư · Dữ liệu TradingView
      </div>

      {/* ══ NAV ══ */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e8e0d5", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        {/* Live price strip */}
        <div style={{ background: "#faf8f4", borderBottom: "1px solid #ede8df", padding: "5px 24px", display: "flex", gap: 10, alignItems: "center", overflowX: "auto" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#c8a96e", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap", marginRight: 4 }}>Live →</span>
          {LIVE_LINKS.map(({ label, sym }) => (
            <a key={label} href={`https://www.tradingview.com/symbols/${sym.replace(":", "-")}/`}
              target="_blank" rel="noopener noreferrer" className="price-badge">
              {label} ↗
            </a>
          ))}
        </div>

        {/* Main nav */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={() => goTo("home")}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #1a1208 60%, #c8a96e 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>🛢</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: "#1a1208", lineHeight: 1 }}>OilWatch</div>
              <div style={{ fontSize: 10, color: "#c8a96e", letterSpacing: 2, fontWeight: 600, textTransform: "uppercase" }}>Vietnam</div>
            </div>
          </div>
          <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {[["home","Bài viết"],["chart","Đồ thị"],["admin","Quản lý"]].map(([v,lbl]) => (
              <button key={v} className={`nav-link${view===v?" active":""}`} onClick={() => goTo(v)}>{lbl}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* ══ HOME ══ */}
      {view === "home" && !selected && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          {/* Hero */}
          <div style={{ background: "linear-gradient(135deg, #1a1208 0%, #2e1e08 50%, #1a1208 100%)", padding: "64px 24px 52px", position: "relative", overflow: "hidden" }}>
            {/* Decorative circles */}
            <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(200,169,110,0.08)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -40, left: "30%", width: 200, height: 200, borderRadius: "50%", background: "rgba(200,169,110,0.05)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#c8a96e", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Phân tích thị trường</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 800, color: "#f5f2ec", lineHeight: 1.15, marginBottom: 18, maxWidth: 640 }}>
                Dầu khí — Góc nhìn<br /><em style={{ color: "#c8a96e" }}>thực chiến</em>
              </h1>
              <p style={{ fontSize: 16, color: "#c8b898", lineHeight: 1.7, maxWidth: 480, fontWeight: 300 }}>
                Phân tích độc lập về giá dầu, địa chính trị năng lượng và cơ hội đầu tư dài hạn.
              </p>
            </div>
          </div>

          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
            {/* Filter + search */}
            <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap", alignItems: "center" }}>
              {CATEGORIES.map(c => (
                <button key={c} className={`filter-btn${filterCat===c?" active":""}`} onClick={() => setFilterCat(c)}>{c}</button>
              ))}
              <div style={{ marginLeft: "auto", position: "relative" }}>
                <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#aaa" }}>🔍</span>
                <input
                  className="form-input"
                  style={{ paddingLeft: 34, width: 200, marginBottom: 0 }}
                  placeholder="Tìm bài viết..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Section label */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#1a1208" }}>Bài viết mới nhất</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #e0d8cc, transparent)" }} />
            </div>

            {/* Grid */}
            {filtered.length === 0 && <p style={{ color: "#9a8a7a", fontSize: 15 }}>Không tìm thấy bài viết phù hợp.</p>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {filtered.map((a, idx) => (
                <article key={a.id} className="card-hover"
                  onClick={() => setSelected(a)}
                  style={{ background: "#fff", borderRadius: 14, overflow: "hidden", cursor: "pointer", border: "1px solid #ede8df", animation: `fadeUp 0.4s ease ${idx * 0.06}s both` }}>
                  {/* Color top strip */}
                  <div style={{ height: 4, background: catColor[a.category] || "#c8a96e" }} />
                  <div style={{ padding: "20px 22px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: catColor[a.category] || "#c8a96e", textTransform: "uppercase", letterSpacing: 1 }}>{a.category}</span>
                      <span style={{ fontSize: 11, color: "#b0a090" }}>{a.readTime}</span>
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#1a1208", lineHeight: 1.4, marginBottom: 10 }}>{a.title}</h2>
                    <p style={{ fontSize: 13.5, color: "#6a5a4a", lineHeight: 1.65 }}>{a.summary}</p>
                    <div style={{ marginTop: 12 }}>
                      {(Array.isArray(a.tags) ? a.tags : []).map(t => <span key={t} className="tag-pill">{t}</span>)}
                    </div>
                  </div>
                  <div style={{ padding: "12px 22px", borderTop: "1px solid #f0ebe3", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#faf8f4" }}>
                    <span style={{ fontSize: 12, color: "#b0a090" }}>📅 {a.date}</span>
                    <span style={{ fontSize: 13, color: "#c8a96e", fontWeight: 600 }}>Đọc →</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ ARTICLE ══ */}
      {view === "home" && selected && (
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px", animation: "fadeIn 0.35s ease" }}>
          <button className="btn-outline" style={{ marginBottom: 32 }} onClick={() => setSelected(null)}>← Quay lại</button>
          <div style={{ height: 4, borderRadius: 2, background: catColor[selected.category] || "#c8a96e", marginBottom: 24, width: 48 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: catColor[selected.category] || "#c8a96e", textTransform: "uppercase", letterSpacing: 1 }}>{selected.category}</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 800, color: "#1a1208", lineHeight: 1.25, margin: "10px 0 16px" }}>{selected.title}</h1>
          <div style={{ display: "flex", gap: 20, color: "#b0a090", fontSize: 13, marginBottom: 36, paddingBottom: 24, borderBottom: "1px solid #e8e0d5" }}>
            <span>📅 {selected.date}</span>
            <span>⏱ {selected.readTime}</span>
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.9, color: "#3a2e22" }}>{renderBody(selected.content)}</div>
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid #e8e0d5" }}>
            {(Array.isArray(selected.tags) ? selected.tags : []).map(t => <span key={t} className="tag-pill">{t}</span>)}
          </div>
        </div>
      )}

      {/* ══ CHART ══ */}
      {view === "chart" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px", animation: "fadeIn 0.35s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#1a1208" }}>Đồ thị giá dầu</span>
            <span style={{ fontSize: 12, background: "#e8f4e8", color: "#1e8449", fontWeight: 600, padding: "3px 10px", borderRadius: 12 }}>● Realtime</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #e0d8cc, transparent)" }} />
          </div>

          {/* Symbol tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {CHARTS.map(c => (
              <button key={c.symbol} className={`chart-tab${activeChart.symbol===c.symbol?" active":""}`} onClick={() => setActiveChart(c)}>
                {c.flag} {c.label}
              </button>
            ))}
          </div>

          {/* Chart card */}
          <div style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #ede8df", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1208" }}>{activeChart.flag} {activeChart.label}</span>
                <span style={{ fontSize: 12, color: "#b0a090", marginLeft: 10 }}>· Cập nhật realtime từ TradingView</span>
              </div>
              <a href={`https://www.tradingview.com/chart/?symbol=${encodeURIComponent(activeChart.symbol)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: "#c8a96e", fontWeight: 600, textDecoration: "none", padding: "5px 12px", border: "1px solid #e0d5c0", borderRadius: 6 }}>
                Mở full screen ↗
              </a>
            </div>
            <TVChart symbol={activeChart.symbol} />
          </div>

          <div style={{ marginTop: 14, padding: "12px 16px", background: "#fff8ee", border: "1px solid #f0e0b8", borderRadius: 10, fontSize: 13, color: "#8a6a30" }}>
            💡 Nếu biểu đồ không hiển thị trong preview sandbox, nhấn <strong>"Mở full screen"</strong> để xem trực tiếp. Khi deploy lên web thật biểu đồ sẽ nhúng hoàn toàn.
          </div>
        </div>
      )}

      {/* ══ ADMIN ══ */}
      {view === "admin" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px", animation: "fadeIn 0.35s ease" }}>
          {!unlocked ? (
            <div style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 16, padding: 36, maxWidth: 420, margin: "0 auto", boxShadow: "0 8px 32px rgba(0,0,0,0.07)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#1a1208", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>🔐</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#1a1208", marginBottom: 6 }}>Quản trị</h2>
              <p style={{ color: "#9a8a7a", fontSize: 14, marginBottom: 24 }}>Nhập mật khẩu để truy cập khu vực quản lý bài viết.</p>
              <label className="form-label">Mật khẩu</label>
              <input type="password" className="form-input" value={pw} onChange={e => setPw(e.target.value)}
                onKeyDown={e => { if (e.key==="Enter") { if (pw===PW) { setUnlocked(true); setPwErr(false); } else setPwErr(true); } }}
                placeholder="Nhập mật khẩu..." />
              {pwErr && <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 12, marginTop: -8 }}>❌ Sai mật khẩu.</p>}
              <button className="btn-primary" style={{ width: "100%" }} onClick={() => { if (pw===PW) { setUnlocked(true); setPwErr(false); } else setPwErr(true); }}>Đăng nhập</button>
            </div>
          ) : (
            <div>
              {/* Admin header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#1a1208" }}>Quản lý bài viết</h2>
                  <p style={{ fontSize: 13, color: "#9a8a7a", marginTop: 2 }}>{articles.length} bài viết · Đang đăng nhập</p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn-primary" onClick={() => { setShowNew(!showNew); setEditArt(null); }}>{showNew ? "✕ Đóng" : "+ Bài viết mới"}</button>
                  <button className="btn-outline" onClick={() => setUnlocked(false)}>Đăng xuất</button>
                </div>
              </div>

              {/* New article form */}
              {showNew && (
                <div style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 14, padding: 28, marginBottom: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#1a1208", marginBottom: 20 }}>✍️ Thêm bài viết mới</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                    <div>
                      <label className="form-label">Tiêu đề *</label>
                      <input className="form-input" value={newArt.title} onChange={e => setNewArt({...newArt,title:e.target.value})} placeholder="Tiêu đề bài viết..." />
                    </div>
                    <div>
                      <label className="form-label">Danh mục</label>
                      <select className="form-input" value={newArt.category} onChange={e => setNewArt({...newArt,category:e.target.value})}>
                        {CATEGORIES.filter(c=>c!=="Tất cả").map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <label className="form-label">Tóm tắt</label>
                  <input className="form-input" value={newArt.summary} onChange={e => setNewArt({...newArt,summary:e.target.value})} placeholder="Mô tả ngắn hiển thị trên card..." />
                  <label className="form-label">Tags (phân cách bằng dấu phẩy)</label>
                  <input className="form-input" value={newArt.tags} onChange={e => setNewArt({...newArt,tags:e.target.value})} placeholder="OPEC, Brent, Phân tích..." />
                  <label className="form-label">Nội dung bài viết (dùng **chữ** để in đậm)</label>
                  <textarea className="form-input" style={{ minHeight: 180, resize: "vertical" }} value={newArt.content} onChange={e => setNewArt({...newArt,content:e.target.value})} placeholder="Viết nội dung ở đây..." />
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <button className="btn-primary" onClick={addArticle} disabled={!newArt.title||!newArt.content}>Đăng bài</button>
                    <button className="btn-outline" onClick={() => setShowNew(false)}>Hủy</button>
                  </div>
                </div>
              )}

              {/* Edit form */}
              {editArt && (
                <div style={{ background: "#fff", border: "2px solid #c8a96e", borderRadius: 14, padding: 28, marginBottom: 24, boxShadow: "0 4px 16px rgba(200,169,110,0.12)" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#1a1208", marginBottom: 20 }}>✏️ Chỉnh sửa bài viết</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                    <div>
                      <label className="form-label">Tiêu đề</label>
                      <input className="form-input" value={editArt.title} onChange={e => setEditArt({...editArt,title:e.target.value})} />
                    </div>
                    <div>
                      <label className="form-label">Danh mục</label>
                      <select className="form-input" value={editArt.category} onChange={e => setEditArt({...editArt,category:e.target.value})}>
                        {CATEGORIES.filter(c=>c!=="Tất cả").map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <label className="form-label">Tóm tắt</label>
                  <input className="form-input" value={editArt.summary} onChange={e => setEditArt({...editArt,summary:e.target.value})} />
                  <label className="form-label">Tags</label>
                  <input className="form-input" value={Array.isArray(editArt.tags)?editArt.tags.join(", "):editArt.tags} onChange={e => setEditArt({...editArt,tags:e.target.value})} />
                  <label className="form-label">Nội dung</label>
                  <textarea className="form-input" style={{ minHeight: 220, resize: "vertical" }} value={editArt.content} onChange={e => setEditArt({...editArt,content:e.target.value})} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn-primary" onClick={saveEdit}>💾 Lưu thay đổi</button>
                    <button className="btn-outline" onClick={() => setEditArt(null)}>Hủy</button>
                  </div>
                </div>
              )}

              {/* Article list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {articles.map(a => (
                  <div key={a.id} style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 10, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, transition: "box-shadow 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow="0 4px 14px rgba(0,0,0,0.07)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow="none"}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: "#1a1208", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 15 }}>{a.title}</div>
                      <div style={{ fontSize: 12, color: "#b0a090" }}>
                        <span style={{ color: catColor[a.category]||"#888", fontWeight: 600 }}>{a.category}</span> · {a.date} · {a.readTime}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      <button className="btn-outline" style={{ padding: "6px 14px", fontSize: 13 }}
                        onClick={() => { setEditArt({...a, tags: Array.isArray(a.tags)?a.tags.join(", "):a.tags}); setShowNew(false); }}>✏️ Sửa</button>
                      <button className="btn-danger"
                        onClick={() => { if (confirm("Xóa bài viết này?")) setArticles(articles.filter(x=>x.id!==a.id)); }}>🗑 Xóa</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#1a1208", color: "#7a6a5a", fontSize: 13, padding: "28px 24px", marginTop: 60 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>🛢</span>
            <span style={{ fontFamily: "'Playfair Display', serif", color: "#c8a96e", fontWeight: 700, fontSize: 16 }}>OilWatch VN</span>
          </div>
          <span>Phân tích độc lập thị trường dầu khí · Không phải tư vấn đầu tư</span>
        </div>
      </footer>
    </div>
  );
}
