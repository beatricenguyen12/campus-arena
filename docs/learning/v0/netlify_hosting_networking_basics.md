## Hosting on Netlify — networking fundamentals (MVP view)

**Top-down**
- Goal: ship a static Vite SPA that calls Supabase from the browser. Netlify serves the built assets; Supabase serves data.
- Request path: browser → DNS resolves your custom domain/Netlify URL → Netlify CDN edge (cached assets) → (if needed) Netlify origin/build output → Supabase API for live reads/writes.
- Trust: the public anon key lives in the browser; security comes from Supabase RLS, not hiding the key.

**CDN, simply**
- CDN = a worldwide cache for static files (HTML, JS, CSS, images). Nearest edge returns files fast; if a file is missing or expired, the edge pulls it from origin and caches it.
- Great fit for SPAs: assets are static, so cache hits are high; dynamic data still comes from Supabase.

**What `npm run build` means (Vite)**
- Runs Vite’s production build: bundles modules, minifies JS/CSS, fingerprints filenames for caching (`index-abc123.js`), and emits the `/build` folder Netlify serves.
- Source maps and dev-only code are stripped; environment variables are inlined at build time (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

**Implications for future scaling**
- Static assets: CDN scales essentially infinitely with minimal latency; no refactor needed for more readers.
- Data/API: Supabase handles query load; you may add pagination, indexes, and rate limiting as usage grows.
- Edge vs functions: Netlify Functions can handle small server-side tasks; heavy or long-lived work (chat websockets) stays in Supabase Realtime or a dedicated service.
- Cache strategy: long-cache static assets (fingerprinted) + short-cache HTML keeps deployments instant without users seeing stale JS.

**Potential costs (at a glance)**
- Netlify: free tier covers small traffic; costs grow with bandwidth and build minutes. CDN egress is the main lever if traffic spikes.
- Supabase: free tier covers light usage; inserts/selects for Q&A count toward quota. Scaling adds database/storage costs.
- Build churn: frequent commits trigger builds; keep CI quiet to conserve build minutes on free tiers.

**Mental model for a freshman**
- Think of Netlify as a super-fast file cabinet spread worldwide (CDN) that hands out your website files; Supabase is the database/library clerk answering data questions. `npm run build` is you neatly packing the files before placing them in the cabinet. Scaling mostly means paying for more cabinet doors opening (bandwidth) and more library queries (Supabase).***
