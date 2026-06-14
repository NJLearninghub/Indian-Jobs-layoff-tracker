/**
 * GET /api/search?q=tcs
 * Full-text search across company, sector, hq, reason, stage.
 */
const { LAYOFFS } = require('../lib/data');

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Origin', '*'); return res.status(200).end(); }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const q = (req.query.q || '').toLowerCase().trim();
  if (!q || q.length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters', data: [] });
  }

  const fields = ['company', 'sector', 'hq', 'reason', 'stage', 'status'];
  const results = LAYOFFS
    .filter(l => fields.some(f => String(l[f] || '').toLowerCase().includes(q)))
    .slice(0, 50);

  return res.status(200).json({ data: results, meta: { count: results.length, query: q } });
};
