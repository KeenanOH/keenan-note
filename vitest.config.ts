/// <reference types="vitest" />
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        setupFiles: ["./tests/helpers/setup.ts"],
        environment: "jsdom",
    },
})
