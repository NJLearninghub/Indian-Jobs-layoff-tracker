#!/usr/bin/env node
// Validates every data file before a deploy. Vercel runs this as the build
// step, so a broken data update fails the build and the last good version
// stays live. Run locally with: node scripts/validate.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'data');
const errors = [];
const warnings = [];
const load = (f) => {
  try {
    const j = JSON.parse(readFileSync(join(root, f), 'utf8'));
    if (!Array.isArray(j.rows)) throw new Error('missing "rows" array');
    return j.rows;
  } catch (e) {
    errors.push(`${f}: cannot read (${e.message})`);
    return [];
  }
};
const isUrl = (u) => typeof u === 'string' && /^https:\/\/[^\s]+$/.test(u);
const isDate = (d) => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d));

const sectors = load('sectors.json');
const sectorNames = new Set(sectors.map((s) => s.sector));
for (const s of sectors) {
  for (const k of ['sector', 'group', 'covers']) if (!s[k]) errors.push(`sectors.json: "${s.sector}" missing ${k}`);
}

// ---- layoffs.json
const TYPES = new Set(['Layoff', 'Shutdown', 'Headcount drop', 'Industry estimate']);
const STATUSES = new Set(['Confirmed', 'Reported', 'Unconfirmed', 'Disputed', 'Developing', 'Annual report', 'Union claim']);
const SEGMENTS = new Set(['Startup / new-age', 'Indian IT', 'MNC / Big Tech', 'Indian corporate', 'MSME / industry cluster']);
const REQUIRED = ['id', 'date', 'company', 'sector', 'segment', 'jobs_reported', 'reason', 'type', 'city', 'status', 'source', 'url', 'year', 'month'];
const events = load('layoffs.json');
const ids = new Set();
const seen = new Map();
const today = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
for (const r of events) {
  const tag = `layoffs.json ${r.id || '?'} (${r.company || '?'})`;
  for (const k of REQUIRED) if (r[k] === undefined || r[k] === '') errors.push(`${tag}: missing ${k}`);
  if (ids.has(r.id)) errors.push(`${tag}: duplicate id`);
  ids.add(r.id);
  if (!/^E\d{3,}$/.test(r.id || '')) errors.push(`${tag}: id must look like E123`);
  if (!isDate(r.date)) errors.push(`${tag}: bad date ${r.date}`);
  else {
    if (r.date > today) errors.push(`${tag}: date is in the future`);
    if (r.year !== r.date.slice(0, 4) || r.month !== r.date.slice(0, 7)) errors.push(`${tag}: year/month do not match date`);
  }
  if (!sectorNames.has(r.sector)) errors.push(`${tag}: unknown sector "${r.sector}" (add it to sectors.json first)`);
  if (!TYPES.has(r.type)) errors.push(`${tag}: unknown type "${r.type}"`);
  if (!STATUSES.has(r.status)) errors.push(`${tag}: unknown status "${r.status}"`);
  if (!SEGMENTS.has(r.segment)) errors.push(`${tag}: unknown segment "${r.segment}"`);
  if (r.jobs !== null && (typeof r.jobs !== 'number' || r.jobs < 0 || !Number.isFinite(r.jobs))) errors.push(`${tag}: jobs must be a number or null`);
  if (typeof r.jobs === 'number' && r.jobs > 50000 && r.type !== 'Industry estimate' && r.type !== 'Headcount drop') warnings.push(`${tag}: very large layoff (${r.jobs}); double-check`);
  if (typeof r.overlap !== 'number' || r.overlap < 0) errors.push(`${tag}: overlap must be a number (0 if none)`);
  if (!isUrl(r.url)) errors.push(`${tag}: source url must start with https://`);
  const key = `${(r.company || '').toLowerCase()}|${r.date}`;
  if (seen.has(key)) errors.push(`${tag}: same company and date as ${seen.get(key)} (duplicate?)`);
  seen.set(key, r.id);
}

// ---- simple row files
const need = (file, keys, extra) => {
  for (const r of load(file)) {
    for (const k of keys) if (r[k] === undefined || r[k] === '') errors.push(`${file} ${r.id || r.label || r.industry || '?'}: missing ${k}`);
    if (r.url !== undefined && !isUrl(r.url)) errors.push(`${file} ${r.id || r.label || r.industry}: url must start with https://`);
    if (extra) extra(r);
  }
};
need('hiring.json', ['id', 'kind', 'label', 'value', 'unit', 'period', 'source', 'url']);
need('demand.json', ['industry', 'index_sep_2025', 'index_sep_2026', 'yoy_pct', 'source', 'url']);
need('workforce.json', ['id', 'group', 'label', 'value', 'unit', 'period', 'source', 'url']);
need('govt.json', ['id', 'kind', 'label', 'source', 'url'], (r) => {
  if (r.sanctioned != null && r.vacant != null && r.vacant > r.sanctioned) errors.push(`govt.json ${r.id}: vacant exceeds sanctioned`);
});
need('signals.json', ['id', 'source', 'metric', 'value', 'unit', 'period', 'url', 'type']);
need('risk_rules.json', ['factor', 'option', 'label', 'score', 'basis', 'why', 'applies'], (r) => {
  if (typeof r.score !== 'number' || r.score < 0 || r.score > 100) errors.push(`risk_rules.json ${r.factor}/${r.option}: score must be 0-100`);
});

warnings.forEach((w) => console.warn('warning:', w));
if (errors.length) {
  console.error(`\n${errors.length} problem(s) found:`);
  errors.forEach((e) => console.error(' -', e));
  process.exit(1);
}
console.log(`Data OK: ${events.length} events, ${sectors.length} sectors.`);
