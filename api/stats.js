/**
 * GET /api/stats
 * Returns high-level summary stats for the dashboard KPIs.
 */
const { LAYOFFS } = require('../lib/data');

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Origin', '*'); return res.status(200).end(); }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const totalJobs      = LAYOFFS.reduce((s, l) => s + l.jobs, 0);
  const totalEvents    = LAYOFFS.length;
  const totalCompanies = new Set(LAYOFFS.map(l => l.company)).size;
  const shutdowns      = LAYOFFS.filter(l => l.status === 'shutdown').length;
  const confirmed      = LAYOFFS.filter(l => l.status === 'confirmed').length;
  const silent         = LAYOFFS.filter(l => l.status === 'silent').length;

  // By year
  const byYear = {};
  LAYOFFS.forEach(l => {
    const y = l.date.slice(0, 4);
    byYear[y] = (byYear[y] || 0) + l.jobs;
  });

  // By month (2025)
  const byMonth = {};
  LAYOFFS.filter(l => l.date.startsWith('2025')).forEach(l => {
    const m = l.date.slice(0, 7);
    byMonth[m] = (byMonth[m] || 0) + l.jobs;
  });

  // Top reason
  const reasonMap = {};
  LAYOFFS.forEach(l => { reasonMap[l.reason] = (reasonMap[l.reason] || 0) + l.jobs; });
  const topReason = Object.entries(reasonMap).sort((a, b) => b[1] - a[1])[0];

  // Top sector
  const sectorMap = {};
  LAYOFFS.forEach(l => { sectorMap[l.sector] = (sectorMap[l.sector] || 0) + l.jobs; });
  const topSector = Object.entries(sectorMap).sort((a, b) => b[1] - a[1])[0];

  return res.status(200).json({
    data: {
      totalJobs, totalEvents, totalCompanies, shutdowns, confirmed, silent,
      byYear, byMonth,
      topReason: { reason: topReason[0], jobs: topReason[1] },
      topSector: { sector: topSector[0], jobs: topSector[1] },
    }
  });
};
