/**
 * GET /api/sectors
 * Returns aggregated totals per sector.
 */
const { LAYOFFS } = require('../lib/data');

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Origin', '*'); return res.status(200).end(); }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const map = {};
  LAYOFFS.forEach(l => {
    if (!map[l.sector]) map[l.sector] = { sector: l.sector, totalJobs: 0, events: 0, confirmed: 0, shutdowns: 0, topCompany: null, topJobs: 0 };
    map[l.sector].totalJobs += l.jobs;
    map[l.sector].events += 1;
    if (l.status === 'confirmed') map[l.sector].confirmed += 1;
    if (l.status === 'shutdown')  map[l.sector].shutdowns += 1;
    if (l.jobs > map[l.sector].topJobs) { map[l.sector].topJobs = l.jobs; map[l.sector].topCompany = l.company; }
  });

  const sorted = Object.values(map).sort((a, b) => b.totalJobs - a.totalJobs);
  return res.status(200).json({ data: sorted, meta: { count: sorted.length } });
};
