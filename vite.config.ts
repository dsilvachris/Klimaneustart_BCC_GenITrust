import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const proxyTarget =
    env.VITE_API_BASE_URL ||
    env.VITE_API_PROXY_TARGET ||
    "http://localhost:4000";
  return {
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    // No TS-only aliases here to avoid Node type issues
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
      allowedHosts: ["*.ngrok-free.app", "785ec7322ad9.ngrok-free.app"],
    },
  };
});
