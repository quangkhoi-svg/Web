// src/data/servicesConfig.js

export const SERVICES_STORAGE_KEY = "gta5vnServices";

// demoImages: nhiều ảnh / gif
// demoVideos: nhiều link video (YouTube, mp4, webm, v.v.)
export const DEFAULT_SERVICES = [
  {
    id: "logo",
    title: "Edit logo",
    subtitle: "Tối ưu nhận diện thương hiệu",
    description:
      "Chỉnh sửa hoặc thiết kế lại logo dựa trên ý tưởng sẵn có, giữ đúng phong cách GTA5VN hoặc server của bạn.",
    demoTitle: "Demo edit logo",
    demoDescription:
      "Ví dụ: chỉnh màu, thêm hiệu ứng glow, làm lại bố cục text + icon cho rõ hơn.",
    demoImages: [], // ví dụ: ["https://.../logo1.png", "https://.../logo2.gif"]
    demoVideos: [], // ví dụ: ["https://youtu.be/xxxx", "https://.../preview.mp4"]
  },
  {
    id: "banner",
    title: "Edit banner",
    subtitle: "Ấn tượng ngay từ cái nhìn đầu tiên",
    description:
      "Thiết kế banner cho website, diễn đàn, Discord, fanpage...",
    demoTitle: "Demo edit banner",
    demoDescription:
      "Banner widescreen với background in-game + text server.",
    demoImages: [],
    demoVideos: [],
  },
  {
    id: "video",
    title: "Edit video",
    subtitle: "Trailer, highlight, intro server",
    description:
      "Cắt ghép + hiệu ứng + nhạc nền để tạo video chuyên nghiệp.",
    demoTitle: "Demo edit video",
    demoDescription:
      "Thay bằng link YouTube / Drive trailer server, highlight in-game…",
    demoImages: [],
    demoVideos: [],
  },
  {
    id: "discord-setup",
    title: "Set up Discord",
    subtitle: "Server gọn, rõ ràng, dễ dùng",
    description:
      "Setup category, role, kênh, rule, phân quyền rõ ràng.",
    demoTitle: "Demo Setup Discord",
    demoDescription: "Ảnh chụp cấu trúc kênh + role server.",
    demoImages: [],
    demoVideos: [],
  },
  {
    id: "discord-bot",
    title: "Bot Discord",
    subtitle: "Tự động hóa & tiện ích",
    description:
      "Cấu hình các bot: ticket, log, autorole, welcome…",
    demoTitle: "Demo bot Discord",
    demoDescription: "Screenshot bot hoạt động: log, ticket, welcome, v.v.",
    demoImages: [],
    demoVideos: [],
  },
];
