# Bàn Nhậu Online — MVP

Quán nhậu hư cấu ven Hồ Hoàn Kiếm, phong cách chibi 2.5D. Bản hiện tại là **chơi đơn, NPC mô phỏng trên máy**, không có multiplayer hay backend.

## Chơi
- Chọn một trong 15 nhân vật Việt hư cấu và đặt tên (lưu cục bộ trên trình duyệt).
- Chạm/click sân để di chuyển, hoặc dùng WASD / phím mũi tên.
- Chạm bàn hoặc nút bàn để đi tới và ngồi. Chọn Đứng dậy để rời bàn.
- Nâng ly, cụng ly khi đã ngồi, hô theo nhịp và gửi lời chúc.
- Bật âm thanh để nghe tiếng chuông tổng hợp; không có bản ghi giọng nói.

## Chạy cục bộ
Node.js 20+: `npm start`, mở http://127.0.0.1:4173. Không cần cài thư viện.

Toàn bộ game là HTML/CSS/JavaScript và Canvas 2D; cảnh, nhân vật và hiệu ứng được vẽ bằng mã gốc, không cần bộ ảnh ngoài. Google Fonts có phông dự phòng nếu không truy cập được mạng. Dữ liệu tên chỉ lưu trên thiết bị.

## Triển khai
GitHub Pages: Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save. Địa chỉ dự kiến: https://adamavaadam.github.io/GameNhau/ (chỉ hoạt động sau khi bật Pages và build thành công).

## Giới hạn và hướng tiếp theo
- 15 thiết kế là bộ nhân vật mới cho MVP, không phải phục dựng ảnh tham chiếu cũ.
- Khách NPC phản ứng theo thao tác trong máy; không có người chơi trực tuyến, phòng, tài khoản, chat hay đồng bộ.
- Không có va chạm vật lý hoặc tìm đường tránh đồ vật; di chuyển tự do trên mặt sân.
- Cần backend/WebSocket và quy tắc phòng, ghế, chống spam trước khi quảng bá multiplayer.
- Có hỗ trợ reduced-motion cho hiệu ứng pháo giấy và điều khiển bàn bằng nút HTML; cảnh Canvas chưa cung cấp trải nghiệm đọc màn hình đầy đủ.
