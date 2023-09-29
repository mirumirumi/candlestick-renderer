/// <reference types="vitest" />

import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    includeSource: ["src/**/*.{js,ts}"],
    reporters: "verbose",
    mockReset: true,
  },
  define: {
    "import.meta.vitest": "undefined",
  },
})
