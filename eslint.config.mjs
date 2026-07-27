import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored/static assets (e.g. the minified DRACO decoder) — not our source.
    "public/**",
  ]),
  {
    // R3F + GSAP rely on imperative mutation of refs/uniforms in frame loops and
    // on setting state from media-query / scroll effects. The new React-Compiler
    // hook rules don't model these patterns — off for the 3D + interactive layer.
    files: ["src/three/**/*.{ts,tsx}", "src/components/**/*.tsx", "src/lib/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
