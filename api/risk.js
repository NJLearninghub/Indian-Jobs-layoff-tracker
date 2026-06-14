/**
 * POST /api/risk
 * Calculates personalized layoff risk score.
 *
 * Body (JSON):
 *   { sector, role, companySize, tenureYears, seniority, skill }
 *
 * Returns:
 *   { score (0-100), level, breakdown, advice }
 */

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Origin', '*'); return res.status(200).end(); }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { sector = 'IT/ITeS', role = 'Engineering', companySize = 'mid',
          tenureYears = 2, seniority = 'mid', skill = 'fullstack' } = req.body || {};

  // Weights — derived from 2025–26 India layoff patterns
  const SECTOR_RISK = {
    'Gaming':90, 'EdTech':78, 'IT/ITeS':72, 'Media':68,
    'Fintech':65, 'E-commerce':60, 'Startup':70, 'Logistics':58,
    'Healthtech':52, 'Banking':55, 'Manufacturing':35, 'PSU/Government':15,
    'Quick Commerce':60, 'AI':45, 'Agritech':62, 'SaaS':50,
  };
  const ROLE_RISK = {
    'Operations':80, 'Content':75, 'HR':70, 'Marketing':65, 'Sales':60,
    'Finance':55, 'Design':50, 'Data':45, 'Engineering':42, 'Management':40,
    'Legal':38, 'Product':48,
  };
  const SIZE_RISK  = { small:70, mid:55, large:65, enterprise:60 };
  const SKILL_RISK = { manual:90, legacy:82, domain:60, content:70, pm:50, fullstack:35, cloud:25, ai:15 };
  const SEN_RISK   = { junior:65, mid:55, senior:60, lead:45, exec:40 };

  // Tenure: shorter = higher risk
  const tenureScore = tenureYears < 1 ? 85 : tenureYears < 2 ? 65 : tenureYears < 4 ? 45 : 30;

  const breakdown = {
    sector:    { score: SECTOR_RISK[sector]    || 50, weight: 0.25 },
    role:      { score: ROLE_RISK[role]         || 55, weight: 0.15 },
    companySize:{ score: SIZE_RISK[companySize] || 60, weight: 0.10 },
    tenure:    { score: tenureScore,                   weight: 0.20 },
    skill:     { score: SKILL_RISK[skill]       || 50, weight: 0.20 },
    seniority: { score: SEN_RISK[seniority]     || 55, weight: 0.10 },
  };

  const score = Math.round(
    Object.values(breakdown).reduce((sum, b) => sum + b.score * b.weight, 0)
  );
  const clamped = Math.min(100, Math.max(1, score));

  const level = clamped > 75 ? 'high' : clamped > 50 ? 'moderate' : 'low';
  const advice = {
    high:     'Immediate action recommended: upskill in AI/GenAI tools, strengthen network, and explore parallel income streams.',
    moderate: 'Stay current with GenAI tooling. Strengthen domain expertise and start building your external profile.',
    low:      'Your skills are market-resilient. Continue building AI-adjacent expertise to stay ahead.',
  }[level];

  return res.status(200).json({
    data: { score: clamped, level, advice, breakdown }
  });
};
