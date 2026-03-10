# OilWatch VN 🛢

Website phân tích thị trường dầu khí với đồ thị TradingView realtime.

---

## 🚀 Deploy lên Vercel (miễn phí, ~5 phút)

### Bước 1 — Tạo tài khoản GitHub (nếu chưa có)
Vào https://github.com → Sign up (miễn phí)

### Bước 2 — Upload code lên GitHub
1. Vào https://github.com/new → đặt tên repo: `oilwatch-vn` → Create repository
2. Trên trang repo vừa tạo, nhấn **"uploading an existing file"**
3. Kéo thả **toàn bộ thư mục** `oilwatch-vercel` vào → Commit changes

### Bước 3 — Deploy lên Vercel
1. Vào https://vercel.com → Sign up bằng tài khoản GitHub
2. Nhấn **"Add New Project"** → chọn repo `oilwatch-vn`
3. Framework preset: chọn **Vite**
4. Nhấn **Deploy** → chờ ~1 phút

✅ Xong! Vercel sẽ cấp cho bạn URL dạng: `https://oilwatch-vn.vercel.app`

---

## 💻 Chạy local (để xem trước)

Cần cài [Node.js](https://nodejs.org) trước.

```bash
cd oilwatch-vercel
npm install
npm run dev
```

Mở trình duyệt tại http://localhost:5173

---

## ✏️ Thêm bài viết

Vào tab **⚙️ Quản lý** → mật khẩu: `oilwatch2024`

Để đổi mật khẩu: mở file `src/App.jsx`, tìm dòng:
```js
const PW = "oilwatch2024";
```
Đổi thành mật khẩu bạn muốn, rồi push lên GitHub → Vercel tự deploy lại.

---

## 🔧 Tuỳ chỉnh

| Muốn thay đổi | Sửa ở đâu |
|---|---|
| Thêm mã cổ phiếu vào đồ thị | `src/App.jsx` → mảng `CHARTS` |
| Đổi tên website | `index.html` → thẻ `<title>` |
| Thêm danh mục bài viết | `src/App.jsx` → mảng `CATEGORIES` |
| Đổi màu sắc | `src/App.jsx` → object `C` |

---

## 📦 Cấu trúc file

```
oilwatch-vercel/
├── index.html          # Entry HTML
├── package.json        # Dependencies
├── vite.config.js      # Build config
├── vercel.json         # Vercel routing
└── src/
    ├── main.jsx        # React entry
    ├── index.css       # Global styles
    └── App.jsx         # Toàn bộ app
```
