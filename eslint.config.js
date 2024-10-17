import jsPlugin from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import { configs as tseslintConfigs, config } from "typescript-eslint";

export default config(
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  jsPlugin.configs.recommended,
  tseslintConfigs.base,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          project: [
            "packages/*/tsconfig.json",
            "packages/*/tsconfig.app.json",
            "packages/*/tsconfig.node.json",
          ],
        },
      },
    },
    rules: {
      "react/button-has-type": 2,
      "no-unused-vars": 0,
      "import/order": [
        2,
        {
          groups: [
            "unknown", // non-export imports (side-effects)
            "builtin", // Node.js built-ins
            "external", // node_modules
            "internal", // aliases (like "~")
            ["parent", "sibling", "index"], // relative paths
          ],
          pathGroups: [
            {
              pattern: "bun",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@monorepo-template/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ["packages/backend/**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.node, Bun: true },
    },
  },
  {
    files: ["packages/frontend/**/*.{ts,tsx}"],
    settings: {
      globals: { window: true },
    },
  },
);
