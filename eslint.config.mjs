import next from "eslint-config-next";

const files = ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"];
const { plugins } = next.find((c) => c.plugins?.["@next/next"]) ?? { plugins: {} };

const config = [
  ...next,
  {
    ignores: [
      ".open-next/**",
      ".wrangler/**",
      ".pnpm-store/**",
      "convex/_generated/**",
      "cloudflare-env.d.ts",
    ],
  },
  {
    files,
    plugins: { react: plugins.react, "@next/next": plugins["@next/next"] },
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
    },
  },
];

export default config;
