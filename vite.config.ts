import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		exclude: ["lucide-react"]
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8000",
				changeOrigin: true
			}
		}
	},
	test: {
		globals: true,
		environment: "jsdom",
		include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
		pool: "vmThreads"
	}
})
