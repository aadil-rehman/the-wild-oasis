import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// build: {
	// 	outDir: ".", // Output to root directory
	// 	rollupOptions: {
	// 		input: "./index.html", // Specify your input HTML file
	// 	},
	// },
});
