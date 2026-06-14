# India Layoff Tracker — Vercel Backend

REST API for the India Layoff Tracker 2025–2026 dashboard.

## Project Structure

```
.
├── api/
│   ├── layoffs.js      — GET /api/layoffs     (paginated, filtered list)
│   ├── sectors.js      — GET /api/sectors     (aggregated by sector)
│   ├── stats.js        — GET /api/stats       (KPI summary)
│   ├── search.js       — GET /api/search?q=   (full-text search)
│   ├── timeline.js     — GET /api/timeline    (events sorted newest first)
│   └── risk.js         — POST /api/risk       (personal risk score)
├── lib/
│   └── data.js         — Shared layoff dataset (74 events)
├── public/             — Put your frontend HTML here
├── vercel.json         — Vercel routing & header config
├── package.json
└── .env.example
```

## Quick Deploy

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Clone / copy this folder, then:
cd india-layoff-tracker-vercel
vercel          # follow prompts — first deploy auto-creates project
vercel --prod   # promote to production
```

## API Reference

### GET /api/layoffs
Returns paginated layoff records.

| Param    | Type   | Default | Description                              |
|----------|--------|---------|------------------------------------------|
| sector   | string | —       | Filter by sector (e.g. `IT/ITeS`)        |
| year     | string | —       | `2024`, `2025`, or `2026`                |
| reason   | string | —       | `AI Automation`, `Cost Cutting`, etc.    |
| status   | string | —       | `confirmed`, `silent`, `shutdown`        |
| search   | string | —       | Free-text search on company/sector       |
| sort     | string | `date`  | `jobs`, `date`, `company`, `sector`      |
| order    | string | `desc`  | `asc` or `desc`                          |
| page     | int    | `1`     | Page number                              |
| limit    | int    | `20`    | Records per page (max 100)               |

**Example:**
```
GET /api/layoffs?sector=IT%2FITeS&year=2025&sort=jobs&order=desc&limit=10
```

### GET /api/sectors
Returns per-sector aggregates sorted by total jobs cut.

### GET /api/stats
Returns overall KPI summary: total jobs, events, by-year breakdown, top sector/reason.

### GET /api/search?q=tcs
Full-text search. Minimum 2 characters.

### GET /api/timeline?sector=Banking&limit=30
Chronological event list, newest first.

### POST /api/risk
Calculates personalized layoff risk score.

**Request body (JSON):**
```json
{
  "sector":       "IT/ITeS",
  "role":         "Engineering",
  "companySize":  "large",
  "tenureYears":  3,
  "seniority":    "mid",
  "skill":        "cloud"
}
```

**Response:**
```json
{
  "data": {
    "score": 48,
    "level": "moderate",
    "advice": "Stay current with GenAI tooling...",
    "breakdown": {
      "sector":    { "score": 72, "weight": 0.25 },
      "role":      { "score": 42, "weight": 0.15 },
      "companySize":{ "score": 65, "weight": 0.10 },
      "tenure":    { "score": 45, "weight": 0.20 },
      "skill":     { "score": 25, "weight": 0.20 },
      "seniority": { "score": 55, "weight": 0.10 }
    }
  }
}
```

## Local Development

```bash
npm install
vercel dev       # starts local dev server at http://localhost:3000
```

Test an endpoint:
```bash
curl "http://localhost:3000/api/stats"
curl "http://localhost:3000/api/layoffs?sector=Banking&limit=5"
curl -X POST "http://localhost:3000/api/risk" \
  -H "Content-Type: application/json" \
  -d '{"sector":"Gaming","role":"Engineering","skill":"legacy"}'
```

## Connecting the Frontend

In your frontend HTML (the `india-layoff-tracker.html`), replace the static
`const LAYOFFS = [...]` array with fetch calls:

```js
// Replace static data with API calls
async function loadLayoffs(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`/api/layoffs?${qs}`);
  return res.json();
}

async function loadStats() {
  const res = await fetch('/api/stats');
  return res.json();
}
```

## Adding New Layoff Records

Edit `lib/data.js` and add a new entry to the `LAYOFFS` array. Schema:

```js
{
  id:      "unique-id",       // kebab-case unique string
  company: "Company Name",
  sector:  "IT/ITeS",        // must match a known sector key
  jobs:    1000,              // integer
  pct:     "5%",             // string — % of workforce
  reason:  "AI Automation",  // see REASONS list in data.js
  date:    "2025-08",        // YYYY-MM format
  hq:      "Bengaluru",
  stage:   "Listed",         // Listed | Late Stage | Growth Stage | Early Stage | Bootstrapped
  status:  "confirmed",      // confirmed | silent | shutdown
}
```

Redeploy with `vercel --prod` and the API serves the updated data instantly.
