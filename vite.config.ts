import { VitePWA } from "vite-plugin-pwa";

export default {
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Nembak Wage",
        short_name: "Nembak Wage",
        description: "Game nembak wage goro-goro ngentekne panganan",
        theme_color: "#ffffff",
        icons: [
          {
            src: "android-chrome-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "android-chrome-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
        ],
      },
    }),
  ],
};
