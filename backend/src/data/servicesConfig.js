// src/data/servicesConfig.js

// key dùng để lưu trong localStorage
export const SERVICES_STORAGE_KEY = "gta5vnServices";

export const DEFAULT_SERVICES = [

  {
  id: "bot-discord",
  title: "Bot Discord quốc tế",
  subtitle: "Hệ thống bot đa chức năng • chuẩn quốc tế",
  description:
    "Bot đa năng gồm: Auto Moderation AI, Ticket, Logging, Verify Security, Autorole, Welcome Card, Music Player… tất cả tối ưu cho server FiveM / cộng đồng lớn.",

  // ⭐ Demo gallery title + desc
  demoTitle: "Demo bot Discord",
  demoDescription: "Screenshot bot hoạt động: log, ticket, welcome, v.v.",

  // ⭐ 8 DEMO IMAGE GIỐNG HÌNH MẪU
  demoImages: [
    "/demo/bot/dashboard.png",
    "/demo/bot/auto_mod.png",
    "/demo/bot/ticket.png",
    "/demo/bot/security.png",
    "/demo/bot/receive.png",
    "/demo/bot/welcome.png",
    "/demo/bot/autorole.png",
    "/demo/bot/music.png"
  ],

  demoVideos: [],

  // ⭐ FULL FEATURES
  features: [
    "Auto Moderation AI",
    "Anti Spam / Anti Flood",
    "Anti NSFW / Scam link",
    "Ticket system chuyên nghiệp",
    "Security Verify + Anti multi-account",
    "Logging toàn server",
    "Welcome Card / Join system",
    "Autorole / Auto nickname",
    "Music Player Premium",
    "Embed Tools"
  ]
}


];
