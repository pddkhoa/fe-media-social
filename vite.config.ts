import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log(`This app is running in ${env.APP_ENV} environment!`);

  return defineConfig({
    plugins: [react()],
    server: {
      port: +env.PORT,
    },
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
    },
  });
};
