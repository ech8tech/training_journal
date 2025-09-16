import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "no-trailing-spaces": "error",
      "no-undef": "warn",
      semi: ["error", "always"],
      "max-len": [
        "error",
        {
          code: 80, // граница в 120 символов
          ignoreUrls: true, // не ругаться на длинные URL
          ignoreStrings: true, // не ругаться на длинные строки в кавычках
          ignoreTemplateLiterals: true, // не ругаться на шаблонные литералы
          ignoreComments: true, // отслеживать и комментарии
          ignoreTrailingComments: true, // но не ругаться на комментарии в конце строк
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Внешние пакеты, которые НЕ начинаются с "@" и не начинаются с точки (относительные)
            ["^(?!@)(?!\\.).+"],
            // Импорты, начинающиеся с "@"
            ["^@"],
            // Относительные импорты (начинающиеся с "." или "..")
            ["^\\."],
            // Сайд-эффект импорты, например: import "styles.css";
            ["^\\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      // "sort-imports": [
      //   "error",
      //   {
      //     ignoreCase: false,
      //     ignoreDeclarationSort: true,
      //     ignoreMemberSort: false,
      //     memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      //     allowSeparatedGroups: true,
      //   },
      // ],
      indent: ["error", 2, { SwitchCase: 1 }],
      "object-curly-spacing": ["error", "always"],
    },
  },
];
