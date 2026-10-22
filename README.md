# LayoffWatch India

A public tracker of layoffs, shutdowns and headcount cuts in India (2025–26), with hiring trends, professions, government jobs and a personal layoff risk calculator. Every figure links to its source.

Live site: deployed on Vercel from the `main` branch.

## How it works

It is a static site. There is no server and no build step beyond a data check.

```
public/
  index.html          the whole app (pages, charts, calculator, CSV downloads)
  assets/
    dash-shim.js      loads the JSON files and feeds them to the page
    theme.css         colours, fonts, spacing (dark by default, light on light-mode devices)
    d3.min.js         charting library (d3 v7.9.0, vendored)
  data/               ALL the numbers live here
    layoffs.json      one row per layoff, shutdown, headcount decline or estimate
    sectors.json      the 23 sectors and their industry groups
    hiring.json       Naukri sector growth, GCC/BFSI/AI hotspots, experience and skill signals
    demand.json       Naukri JobSpeak index for 52 fields
    workforce.json    professions, PLFS workforce shares, labour-market pulse, hiring outlook
    govt.json         central vacancies, exam vacancies by year, 2026 recruitment drives
    signals.json      latest reading from 7 hiring sources
    risk_rules.json   calculator options, scores, evidence and advice
scripts/
  validate.mjs        checks every data file; Vercel runs it on each deploy
UPDATING.md           how to add data (used by the weekly update task)
```

Vercel runs `node scripts/validate.mjs` as the build command. If a data file is broken (missing source link, bad date, unknown sector, duplicate row), the build fails and the previous version stays live.

## Updating data

Edit the JSON files in `public/data/`, run `npm run validate`, commit and push to `main`. Vercel redeploys in about a minute. See [UPDATING.md](UPDATING.md) for the rules.

A scheduled task runs every Monday at about 8 AM IST, researches new events, updates these files and pushes to `main`.

## Run locally

```bash
npm run validate
npm run serve        # http://localhost:8080
```

## Disclaimer

Compiled from public news reports, company filings, trackers and official releases for information only. Not official data and not advice. Where anything differs from the original or official source, that source prevails.
