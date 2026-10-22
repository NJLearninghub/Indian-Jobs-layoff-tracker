# Updating the data

These rules apply to people and to the weekly automated update. The site is public and names real companies, so accuracy beats coverage: leave something out rather than guess.

## Golden rules

1. **Every row needs a working `https://` source link** to the article, filing or notification the number came from. No source, no row.
2. **India only.** Use the India figure. If only a global number exists, set `jobs` to `null`, put the global figure in `jobs_reported` (e.g. "Part of 7,800 global cuts"), and say so.
3. **Use the low end.** If reports say "200–600", set `jobs: 200` and `jobs_reported: "200–600"`.
4. **Don't double count.** Before adding, search `layoffs.json` for the company. A new round is a new row (name it e.g. "Oracle India (round 4)"); a follow-up report of the same cut is not. If a headcount decline already includes announced layoffs, put the overlapping number in `overlap`.
5. **Label honestly.** `status`: `Confirmed` only if the company itself confirmed; `Reported` for credible press reports; `Unconfirmed` for single-source reports of big numbers; `Disputed` if the company denies it; `Developing` if numbers are not out yet.
6. **Never change or delete an existing row without a source** showing the old figure was wrong. Corrections update the row in place and keep its `id`.
7. **Never invent or estimate numbers.** Industry-wide claims (unions, associations, consultancies) go in as `type: "Industry estimate"`, which keeps them out of the main total.

## layoffs.json row

```json
{
  "id": "E116",
  "date": "2026-10-27",
  "company": "Example Pvt Ltd",
  "sector": "Software & SaaS",
  "segment": "Startup / new-age",
  "jobs": 120,
  "jobs_reported": "~120",
  "pct": "15%",
  "reason": "AI & automation",
  "type": "Layoff",
  "city": "Bengaluru",
  "status": "Reported",
  "source": "Inc42",
  "url": "https://...",
  "overlap": 0,
  "year": "2026",
  "month": "2026-10"
}
```

- `id`: next number after the highest existing id (E116, E117 ...). Never reuse an id.
- `date`: the date the layoff was reported (YYYY-MM-DD). Use the 15th if only the month is known.
- `sector`: must be one of the names in `sectors.json`.
- `segment`: `Startup / new-age`, `Indian IT`, `MNC / Big Tech`, `Indian corporate`, `MSME / industry cluster`.
- `reason`: `AI & automation`, `Cost cutting`, `Restructuring`, `Performance`, `Regulatory`, `Shutdown`, `Tariffs & trade`.
- `type`: `Layoff`, `Shutdown`, `Headcount drop` (net decline in filings), `Industry estimate`.
- `year` and `month` must match `date`.

## Other files

- `hiring.json`, `demand.json`, `signals.json`, `workforce.json`: refresh when a new monthly release is out (Naukri JobSpeak, foundit, PLFS monthly bulletin, EPFO payroll, TeamLease/ManpowerGroup outlooks). Replace the values and period; keep ids stable.
- `govt.json`: add new notifications (SSC, UPSC, RRB, IBPS, state drives) as `kind: "Hiring now"`; append new years to `kind: "Exam vacancies"`; update `Vacancy by ministry` only from an official count (Parliament reply, DoPT/Expenditure report, RTI).
- `risk_rules.json`: edit scores only with a stated reason in `why`; keep `basis` honest (`Data-informed` must cite data).

## Before pushing

```bash
node scripts/validate.mjs
```

It must print `Data OK`. Commit with a message that lists what changed, e.g.
`data: +4 layoffs (Wipro, X, Y, Z), Naukri Oct 2026`.
