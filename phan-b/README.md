# 📚 Bài TH02 (Phần A & Phần B)

## 🛠️ Hướng dẫn chạy dự án

**Cách chạy Phần A (JavaScript thuần):**

- Mở file `Part_a/index.html`.
- Chuột phải chọn **"Open with Live Server"** (hoặc dùng lệnh `npx serve Part_a`).

**Cách chạy Phần B (React + Vite):**

- Mở Terminal, di chuyển vào thư mục: `cd phan-b`
- Cài đặt thư viện: `npm install`
- Khởi chạy: `npm run dev`
- Truy cập: `http://localhost:5173/`

---

### So sánh cách làm giữa Phần A và Phần B

### 1. Cách cập nhật giao diện (Hiển thị UI)

- **Phần A:** Phải tự tay tạo thẻ HTML bằng `createElement`. Mỗi khi có dữ liệu mới, phải xóa danh sách cũ và vẽ lại toàn bộ (gọi hàm `renderBooks()`).
- **Phần B:** Chỉ cần khai báo giao diện trông như thế nào bằng JSX. Khi dữ liệu thay đổi, React sẽ **tự động** tính toán và cập nhật lại giao diện, không cần xóa/vẽ lại thủ công.

### 2. Quản lý trạng thái (State)

- **Phần A:** Lưu dữ liệu trong một object toàn cục (`state.js`). Mỗi khi muốn giao diện thay đổi, lập trình viên phải **tự nhớ** gọi hàm `update()`.
- **Phần B:** Sử dụng Hook `useState` ngay trong Component. Khi gọi hàm cập nhật state, React sẽ tự động kích hoạt render lại Component đó và các Component con.

### 3. Xử lý sự kiện (Click, Gõ phím...)

- **Phần A:** Phải dùng `addEventListener` để gắn sự kiện. Để tối ưu, phải dùng kỹ thuật "Event Delegation" (ủy quyền sự kiện) từ thẻ cha cho các nút Yêu thích/Xóa.
- **Phần B:** Gắn trực tiếp các hàm xử lý như `onClick`, `onChange` vào ngay thẻ JSX. Code ngắn gọn và trực quan hơn rất nhiều.

### 4. Tổ chức code và Component

- **Phần A:** Tách file bằng ES Module. Tuy nhiên, các hàm tạo DOM thường rất dài dòng và khó đọc nếu giao diện phức tạp.
- **Phần B:** Chia nhỏ giao diện thành các Component độc lập (`Header`, `BookCard`, `BookList`...). Code gọn gàng, dễ đọc và có thể tái sử dụng ở nhiều nơi.

### 5. Truyền dữ liệu (Props)

- **Phần A:** Không có khái niệm Props. Để các phần khác nhau dùng chung dữ liệu, phải dùng biến toàn cục hoặc import trực tiếp.
- **Phần B:** Truyền dữ liệu từ Component cha xuống Component con cực kỳ dễ dàng thông qua **Props** (Ví dụ: truyền cuốn sách `book` xuống cho `BookCard` hiển thị).

### 6. Xử lý Form và Validation

- **Phần A:** Tự tay lấy giá trị bằng `.value`, tự viết logic kiểm tra (nếu/else) và tự tạo thẻ HTML để hiện thông báo lỗi dưới ô nhập.
- **Phần B:** Có thể dùng State để quản lý dữ liệu nhập (Controlled Component). Mọi thứ từ giá trị đến thông báo lỗi đều được React đồng bộ tự động.

---
