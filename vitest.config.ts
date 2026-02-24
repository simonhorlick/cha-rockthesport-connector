import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["reflect-metadata"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    // Prevent test files from running in parallel to avoid database conflicts
    fileParallelism: false,
    coverage: {
      // you can include other reporters, but 'json-summary' is required, json is recommended
      reporter: ["text", "json-summary", "json"],
      // If you want a coverage reports even if your tests are failing, include the reportOnFailure option
      reportOnFailure: true,
    },
  },
});
