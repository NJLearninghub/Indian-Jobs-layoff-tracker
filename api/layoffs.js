/**
 * GET /api/layoffs
 * Returns paginated, filtered, sorted layoff records.
 *
 * Query params:
 *   sector   — filter by sector string
 *   year     — "2024" | "2025" | "2026"
 *   reason   — reason string
 *   status   — "confirmed" | "silent" | "shutdown"
 *   search   — free-text search on company name / sector
 *   sort     — field name ("jobs" | "date" | "company" | "sector")
 *   order    — "asc" | "desc"  (default: desc)
 *   page     — integer (default: 1)
 *   limit    — integer 1–100 (default: 20)
 */

const { LAYOFFS } = require('../lib/data');

module.exports = (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const {
    sector, year, reason, status, search,
    sort = 'date', order = 'desc',
    page = '1', limit = '20',
  } = req.query;

  // ── Filter ──
  let data = LAYOFFS.filter(l => {
    if (sector && l.sector !== sector) return false;
    if (year   && !l.date.startsWith(year)) return false;
    if (reason && l.reason !== reason) return false;
    if (status && l.status !== status) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!l.company.toLowerCase().includes(q) && !l.sector.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // ── Sort ──
  const dir = order === 'asc' ? 1 : -1;
  data.sort((a, b) => {
    if (sort === 'jobs') return dir * (a.jobs - b.jobs);
    if (sort === 'date') return dir * a.date.localeCompare(b.date);
    return dir * String(a[sort] || '').localeCompare(String(b[sort] || ''));
  });

  // ── Paginate ──
  const pageNum  = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const total    = data.length;
  const totalPages = Math.ceil(total / pageSize);
  const slice    = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);

  return res.status(200).json({
    data: slice,
    meta: {
      total,
      page: pageNum,
      limit: pageSize,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  });
};
