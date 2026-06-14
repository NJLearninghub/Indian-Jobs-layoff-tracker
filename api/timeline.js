/**
 * GET /api/timeline
 * Returns layoff events sorted newest-first, optionally filtered by sector.
 *
 * Query params:
 *   sector  — optional sector filter
 *   limit   — max records (default 50, max 200)
 */
const { LAYOFFS } = require('../lib/data');

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Origin', '*'); return res.status(200).end(); }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { sector, limit = '50' } = req.query;
  const cap = Math.min(200, Math.max(1, parseInt(limit, 10) || 50));

  const data = LAYOFFS
    .filter(l => !sector || l.sector === sector)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, cap)
    .map(l => ({
      ...l,
      month: new Date(l.date + '-01').toLocaleString('en-IN', { month: 'short', year: 'numeric' }),
    }));

  return res.status(200).json({ data, meta: { count: data.length } });
};
