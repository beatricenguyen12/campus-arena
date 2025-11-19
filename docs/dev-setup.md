# Dev Setup

## Prerequisites
- Node.js 20.x (or the version required by the Next/Express stacks)
- npm 10.x+
- Recommended: VS Code + ESLint/Prettier extensions

---

## Backend (`ca-backend`)

1. **Create workspace**
   ```bash
   mkdir ca-backend && cd ca-backend
   npm init -y
   ```

2. **Install dependencies**
   ```bash
   npm install express cors dotenv
   npm install -D typescript ts-node-dev @types/node @types/express @types/cors
   ```

3. **TypeScript config**
   ```bash
   npx tsc --init --rootDir src --outDir dist --esModuleInterop \
     --module commonjs --target ES2020 --strict
   ```
   Adjust `tsconfig.json` afterwards if you need different options.

4. **Source structure**
   ```bash
   mkdir src
   touch src/index.ts
   ```

5. **App entry (`src/index.ts`)**
   ```ts
   import express from "express";
   import cors from "cors";
   import dotenv from "dotenv";

   dotenv.config();

   const app = express();
   const port = process.env.PORT || 4000;

   app.use(cors());
   app.use(express.json());

   app.get("/health", (_req, res) => {
     res.status(200).json({ status: "ok" });
   });

   app.listen(port, () => {
     console.log(`API running on http://localhost:${port}`);
   });
   ```

6. **Scripts (`package.json`)**
   ```json
   {
     "scripts": {
       "dev": "ts-node-dev --respawn --transpileOnly src/index.ts",
       "build": "tsc",
       "start": "node dist/index.js",
       "lint": "eslint \"src/**/*.{ts,tsx,js,jsx}\""
     }
   }
   ```

7. **ESLint + Prettier**
   ```bash
   npm install -D eslint @eslint/js typescript-eslint @eslint/compat \
     prettier eslint-config-prettier eslint-plugin-prettier
   ```
   `eslint.config.mjs`:
   ```js
   import js from "@eslint/js";
   import tseslint from "typescript-eslint";
   import globals from "globals";
   import prettierConfig from "eslint-config-prettier";
   import prettierPlugin from "eslint-plugin-prettier";

   export default tseslint.config(
     js.configs.recommended,
     ...tseslint.configs.recommendedTypeChecked,
     prettierConfig,
     {
       files: ["src/**/*.{ts,tsx}"],
       languageOptions: {
         parserOptions: { project: ["./tsconfig.json"] },
         globals: globals.node
       },
       plugins: { prettier: prettierPlugin },
       rules: { "prettier/prettier": "error" }
     }
   );
   ```

8. **Run + verify**
   ```bash
   npm run lint -- --fix    # optional
   npm run dev
   curl http://localhost:4000/health
   ```
   You should see `{ "status": "ok" }`.

---

## Frontend (`ca-frontend`)

1. **Scaffold Next.js**
   ```bash
   npx create-next-app@latest ca-frontend \
     --ts --eslint --app --tailwind --src-dir --import-alias "@/*"
   cd ca-frontend
   ```

2. **Inspect generated tooling**
   - `package.json` already contains `next`, `react`, `react-dom`, `typescript`, and `eslint-config-next`.
   - Tailwind v4 is configured through `postcss.config.mjs` and the default `app/globals.css`.
   - `tsconfig.json`, `next.config.ts`, and `eslint.config.mjs` are pre-populated; tweak as needed.

3. **Optional Prettier setup**
   ```bash
   npm install -D prettier eslint-config-prettier eslint-plugin-prettier
   ```
   Then extend `eslint.config.mjs` similarly to the backend so formatting issues show up in `npm run lint`.

4. **Run dev server**
   ```bash
   npm install
   npm run dev
   ```
   Visit `http://localhost:3000` to confirm the app renders.

---

## Running both together

Use two terminals from the repo root:
```bash
# Terminal 1
cd ca-backend
npm run dev

# Terminal 2
cd ca-frontend
npm run dev
```
Backend runs on `http://localhost:4000`, frontend on `http://localhost:3000`. Point frontend API calls to the backend’s `/health` (or future API routes) to verify connectivity.
