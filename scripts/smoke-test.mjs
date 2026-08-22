import React from "react";
import { renderToString } from "react-dom/server";
import react from "@vitejs/plugin-react";
import { createServer } from "vite";

const vite = await createServer({
  appType: "custom",
  configFile: false,
  logLevel: "error",
  plugins: [react()],
  server: { middlewareMode: true, hmr: false },
});

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
  const html = renderToString(React.createElement(App));
  const expectedCopy = ["Vantage", "Executive overview", "Net revenue", "Executive insights"];
  const missingCopy = expectedCopy.filter((copy) => !html.includes(copy));

  if (missingCopy.length) {
    throw new Error(`Initial render is missing expected copy: ${missingCopy.join(", ")}`);
  }

  console.log(`Smoke test passed: rendered ${html.length.toLocaleString()} characters of HTML.`);
} finally {
  await vite.close();
}
