/**
 * lib/data.js
 * Central layoff dataset — India Layoff Tracker 2025–2026
 * Source: Inc42, TechCircle, Economic Times, LinkedIn
 */

const LAYOFFS = [
  // ── IT / ITeS ──
  { id:"tcs-2025",        company:"TCS",                  sector:"IT/ITeS",      jobs:12000, pct:"2%",   reason:"AI Automation",  date:"2025-08", hq:"Mumbai",     stage:"Listed",       status:"confirmed" },
  { id:"infosys-2025",    company:"Infosys",              sector:"IT/ITeS",      jobs:8000,  pct:"3%",   reason:"Restructuring",  date:"2025-07", hq:"Bengaluru",  stage:"Listed",       status:"silent" },
  { id:"wipro-2025",      company:"Wipro",                sector:"IT/ITeS",      jobs:7000,  pct:"3%",   reason:"Cost Cutting",   date:"2025-06", hq:"Bengaluru",  stage:"Listed",       status:"silent" },
  { id:"techmahindra",    company:"Tech Mahindra",        sector:"IT/ITeS",      jobs:5000,  pct:"5%",   reason:"Restructuring",  date:"2025-05", hq:"Pune",       stage:"Listed",       status:"confirmed" },
  { id:"hcltech",         company:"HCLTech",              sector:"IT/ITeS",      jobs:3500,  pct:"2%",   reason:"Restructuring",  date:"2025-04", hq:"Noida",      stage:"Listed",       status:"confirmed" },
  { id:"cognizant",       company:"Cognizant",            sector:"IT/ITeS",      jobs:3500,  pct:"2%",   reason:"AI Automation",  date:"2025-03", hq:"Chennai",    stage:"Listed",       status:"confirmed" },
  { id:"oracle-2025",     company:"Oracle India",         sector:"IT/ITeS",      jobs:2882,  pct:"10%",  reason:"AI Automation",  date:"2025-09", hq:"Bengaluru",  stage:"Listed",       status:"confirmed" },
  { id:"accenture",       company:"Accenture India",      sector:"IT/ITeS",      jobs:3000,  pct:"2%",   reason:"AI Automation",  date:"2025-04", hq:"Bengaluru",  stage:"Listed",       status:"confirmed" },
  { id:"capgemini",       company:"Capgemini India",      sector:"IT/ITeS",      jobs:1200,  pct:"2%",   reason:"AI Automation",  date:"2025-05", hq:"Mumbai",     stage:"Listed",       status:"confirmed" },
  { id:"microsoft-in",    company:"Microsoft India",      sector:"IT/ITeS",      jobs:1500,  pct:"3%",   reason:"AI Automation",  date:"2025-03", hq:"Hyderabad",  stage:"Listed",       status:"confirmed" },
  { id:"ibm-india",       company:"IBM India",            sector:"IT/ITeS",      jobs:1000,  pct:"5%",   reason:"AI Automation",  date:"2025-04", hq:"Bengaluru",  stage:"Listed",       status:"confirmed" },
  { id:"intel-india",     company:"Intel India",          sector:"IT/ITeS",      jobs:500,   pct:"4%",   reason:"Restructuring",  date:"2025-04", hq:"Bengaluru",  stage:"Listed",       status:"confirmed" },
  { id:"pwc-india",       company:"PwC India",            sector:"IT/ITeS",      jobs:800,   pct:"3%",   reason:"Cost Cutting",   date:"2025-06", hq:"Mumbai",     stage:"Listed",       status:"confirmed" },
  { id:"sap-india",       company:"SAP India",            sector:"IT/ITeS",      jobs:800,   pct:"3%",   reason:"Restructuring",  date:"2025-05", hq:"Bengaluru",  stage:"Listed",       status:"silent" },
  { id:"mphasis",         company:"Mphasis",              sector:"IT/ITeS",      jobs:600,   pct:"2%",   reason:"Cost Cutting",   date:"2025-06", hq:"Bengaluru",  stage:"Listed",       status:"silent" },
  { id:"ltimindtree",     company:"LTIMindtree",          sector:"IT/ITeS",      jobs:900,   pct:"2%",   reason:"Restructuring",  date:"2025-07", hq:"Mumbai",     stage:"Listed",       status:"silent" },
  { id:"persistent",      company:"Persistent Systems",   sector:"IT/ITeS",      jobs:400,   pct:"1%",   reason:"Restructuring",  date:"2025-08", hq:"Pune",       stage:"Listed",       status:"silent" },
  { id:"hexaware",        company:"Hexaware",             sector:"IT/ITeS",      jobs:700,   pct:"3%",   reason:"Cost Cutting",   date:"2025-07", hq:"Mumbai",     stage:"Listed",       status:"silent" },
  { id:"oracle-2026",     company:"Oracle India",         sector:"IT/ITeS",      jobs:200,   pct:"5%",   reason:"AI Automation",  date:"2026-04", hq:"Bengaluru",  stage:"Listed",       status:"confirmed" },
  // ── Banking ──
  { id:"icici-bank",      company:"ICICI Bank",           sector:"Banking",      jobs:6000,  pct:"4%",   reason:"AI Automation",  date:"2025-03", hq:"Mumbai",     stage:"Listed",       status:"confirmed" },
  { id:"axis-bank",       company:"Axis Bank",            sector:"Banking",      jobs:3100,  pct:"3%",   reason:"Restructuring",  date:"2026-04", hq:"Mumbai",     stage:"Listed",       status:"confirmed" },
  { id:"hdfc-bank",       company:"HDFC Bank",            sector:"Banking",      jobs:3000,  pct:"1.5%", reason:"Restructuring",  date:"2026-03", hq:"Mumbai",     stage:"Listed",       status:"silent" },
  { id:"rbl-bank",        company:"RBL Bank",             sector:"Banking",      jobs:950,   pct:"7%",   reason:"Cost Cutting",   date:"2025-12", hq:"Mumbai",     stage:"Listed",       status:"silent" },
  { id:"yes-bank",        company:"Yes Bank",             sector:"Banking",      jobs:1200,  pct:"8%",   reason:"Restructuring",  date:"2025-10", hq:"Mumbai",     stage:"Listed",       status:"confirmed" },
  // ── EV / Auto ──
  { id:"ola-electric",    company:"Ola Electric",         sector:"EV/Auto",      jobs:1000,  pct:"25%",  reason:"AI Automation",  date:"2025-03", hq:"Bengaluru",  stage:"Listed",       status:"confirmed" },
  // ── Gaming ──
  { id:"mpl",             company:"MPL",                  sector:"Gaming",       jobs:300,   pct:"60%",  reason:"Regulatory",     date:"2025-09", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"head-digital",    company:"Head Digital Works",   sector:"Gaming",       jobs:500,   pct:"67%",  reason:"Regulatory",     date:"2025-09", hq:"Hyderabad",  stage:"Growth Stage", status:"confirmed" },
  { id:"games24x7",       company:"Games 24x7",           sector:"Gaming",       jobs:400,   pct:"35%",  reason:"Regulatory",     date:"2025-09", hq:"Mumbai",     stage:"Late Stage",   status:"confirmed" },
  { id:"gameskraft",      company:"GamesKraft",           sector:"Gaming",       jobs:400,   pct:"67%",  reason:"Regulatory",     date:"2025-11", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"pokerbaazi",      company:"PokerBaazi",           sector:"Gaming",       jobs:200,   pct:"50%",  reason:"Regulatory",     date:"2025-09", hq:"Gurugram",   stage:"Late Stage",   status:"confirmed" },
  // ── E-commerce ──
  { id:"ans-commerce",    company:"ANS Commerce (Flipkart)",sector:"E-commerce", jobs:110,   pct:"100%", reason:"Shutdown",       date:"2025-02", hq:"Bengaluru",  stage:"Listed",       status:"shutdown" },
  { id:"cars24",          company:"CARS24",               sector:"E-commerce",   jobs:200,   pct:"5%",   reason:"Cost Cutting",   date:"2025-04", hq:"Gurugram",   stage:"Late Stage",   status:"confirmed" },
  { id:"beepkart",        company:"BeepKart",             sector:"E-commerce",   jobs:150,   pct:"100%", reason:"Shutdown",       date:"2025-08", hq:"Bengaluru",  stage:"Early Stage",  status:"shutdown" },
  { id:"snapdeal",        company:"Snapdeal",             sector:"E-commerce",   jobs:400,   pct:"20%",  reason:"Cost Cutting",   date:"2025-01", hq:"Delhi",      stage:"Late Stage",   status:"confirmed" },
  { id:"meesho",          company:"Meesho",               sector:"E-commerce",   jobs:251,   pct:"5%",   reason:"Restructuring",  date:"2024-05", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"amazon-india",    company:"Amazon India",         sector:"E-commerce",   jobs:500,   pct:"2%",   reason:"Restructuring",  date:"2026-03", hq:"Bengaluru",  stage:"Listed",       status:"confirmed" },
  { id:"flipkart-2026",   company:"Flipkart",             sector:"E-commerce",   jobs:400,   pct:"2%",   reason:"AI Automation",  date:"2026-03", hq:"Bengaluru",  stage:"Listed",       status:"confirmed" },
  // ── Quick Commerce ──
  { id:"zepto-1",         company:"Zepto",                sector:"Quick Commerce",jobs:400,  pct:"7%",   reason:"Cost Cutting",   date:"2025-05", hq:"Mumbai",     stage:"Late Stage",   status:"confirmed" },
  { id:"zepto-2",         company:"Zepto",                sector:"Quick Commerce",jobs:200,  pct:"3%",   reason:"Restructuring",  date:"2025-11", hq:"Mumbai",     stage:"Late Stage",   status:"confirmed" },
  // ── Logistics ──
  { id:"ecom-express",    company:"Ecom Express",         sector:"Logistics",    jobs:500,   pct:"3%",   reason:"Cost Cutting",   date:"2025-02", hq:"Delhi",      stage:"Late Stage",   status:"confirmed" },
  { id:"porter",          company:"Porter",               sector:"Logistics",    jobs:350,   pct:"18%",  reason:"Restructuring",  date:"2025-11", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"delhivery",       company:"Delhivery",            sector:"Logistics",    jobs:600,   pct:"4%",   reason:"Cost Cutting",   date:"2025-06", hq:"Gurugram",   stage:"Listed",       status:"silent" },
  { id:"dunzo",           company:"Dunzo",                sector:"Logistics",    jobs:300,   pct:"30%",  reason:"Funding Crunch", date:"2025-01", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"swiggy",          company:"Swiggy",               sector:"Logistics",    jobs:350,   pct:"3%",   reason:"Cost Cutting",   date:"2025-12", hq:"Bengaluru",  stage:"Listed",       status:"confirmed" },
  { id:"zomato-blinkit",  company:"Zomato / Blinkit",     sector:"Logistics",    jobs:200,   pct:"1%",   reason:"Restructuring",  date:"2026-01", hq:"Gurugram",   stage:"Listed",       status:"silent" },
  // ── Fintech ──
  { id:"gupshup-1",       company:"Gupshup",              sector:"Fintech",      jobs:500,   pct:"30%",  reason:"AI Automation",  date:"2025-04", hq:"Mumbai",     stage:"Late Stage",   status:"confirmed" },
  { id:"clear",           company:"Clear",                sector:"Fintech",      jobs:145,   pct:"16%",  reason:"AI Automation",  date:"2025-08", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"zopper",          company:"Zopper",               sector:"Fintech",      jobs:100,   pct:"20%",  reason:"Restructuring",  date:"2025-04", hq:"Delhi",      stage:"Growth Stage", status:"confirmed" },
  { id:"simpl",           company:"Simpl",                sector:"Fintech",      jobs:80,    pct:"80%",  reason:"Regulatory",     date:"2025-09", hq:"Bengaluru",  stage:"Growth Stage", status:"shutdown" },
  { id:"paytm",           company:"Paytm",                sector:"Fintech",      jobs:1000,  pct:"5%",   reason:"Regulatory",     date:"2024-03", hq:"Noida",      stage:"Listed",       status:"confirmed" },
  { id:"bharatpe",        company:"BharatPe",             sector:"Fintech",      jobs:500,   pct:"20%",  reason:"Restructuring",  date:"2024-06", hq:"Delhi",      stage:"Late Stage",   status:"confirmed" },
  // ── EdTech ──
  { id:"byjus",           company:"Byju's",               sector:"EdTech",       jobs:4500,  pct:"15%",  reason:"Funding Crunch", date:"2024-06", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"unacademy",       company:"Unacademy",            sector:"EdTech",       jobs:1000,  pct:"15%",  reason:"Cost Cutting",   date:"2024-05", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"vedantu",         company:"Vedantu",              sector:"EdTech",       jobs:800,   pct:"20%",  reason:"Cost Cutting",   date:"2024-04", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"upgrad",          company:"upGrad",               sector:"EdTech",       jobs:700,   pct:"10%",  reason:"Restructuring",  date:"2024-03", hq:"Mumbai",     stage:"Late Stage",   status:"silent" },
  // ── Healthtech ──
  { id:"pristyn",         company:"Pristyn Care",         sector:"Healthtech",   jobs:400,   pct:"10%",  reason:"Cost Cutting",   date:"2025-04", hq:"Gurugram",   stage:"Late Stage",   status:"confirmed" },
  { id:"pharmeasy",       company:"PharmEasy",            sector:"Healthtech",   jobs:1500,  pct:"15%",  reason:"Funding Crunch", date:"2024-07", hq:"Mumbai",     stage:"Late Stage",   status:"confirmed" },
  { id:"zoplar",          company:"Zoplar",               sector:"Healthtech",   jobs:45,    pct:"100%", reason:"Shutdown",       date:"2025-05", hq:"Bengaluru",  stage:"Growth Stage", status:"shutdown" },
  // ── Media ──
  { id:"verse-innovation",company:"VerSe Innovation",     sector:"Media",        jobs:350,   pct:"10%",  reason:"AI Automation",  date:"2025-05", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"pocket-fm",       company:"Pocket FM",            sector:"Media",        jobs:75,    pct:"15%",  reason:"Cost Cutting",   date:"2025-01", hq:"Bengaluru",  stage:"Growth Stage", status:"confirmed" },
  { id:"sharechat",       company:"ShareChat",            sector:"Media",        jobs:400,   pct:"15%",  reason:"Cost Cutting",   date:"2024-10", hq:"Bengaluru",  stage:"Late Stage",   status:"confirmed" },
  { id:"mx-media",        company:"MX Media",             sector:"Media",        jobs:200,   pct:"8%",   reason:"Restructuring",  date:"2025-03", hq:"Delhi",      stage:"Listed",       status:"silent" },
  { id:"meta-india",      company:"Meta India",           sector:"Media",        jobs:150,   pct:"8%",   reason:"Restructuring",  date:"2026-05", hq:"Mumbai",     stage:"Listed",       status:"confirmed" },
  // ── AI Startups ──
  { id:"krutrim",         company:"Krutrim",              sector:"AI",           jobs:150,   pct:"20%",  reason:"Restructuring",  date:"2025-07", hq:"Bengaluru",  stage:"Growth Stage", status:"confirmed" },
  { id:"astra-ai",        company:"Astra (AI)",           sector:"AI",           jobs:106,   pct:"100%", reason:"Shutdown",       date:"2025-07", hq:"Bengaluru",  stage:"Early Stage",  status:"shutdown" },
  { id:"gupshup-ai",      company:"Gupshup (AI div)",     sector:"AI",           jobs:100,   pct:"10%",  reason:"AI Automation",  date:"2025-09", hq:"Mumbai",     stage:"Late Stage",   status:"confirmed" },
  // ── Agritech ──
  { id:"otipy",           company:"Otipy",                sector:"Agritech",     jobs:300,   pct:"100%", reason:"Funding Crunch", date:"2025-05", hq:"Delhi",      stage:"Growth Stage", status:"shutdown" },
  { id:"bharatagri",      company:"BharatAgri",           sector:"Agritech",     jobs:37,    pct:"100%", reason:"Shutdown",       date:"2025-11", hq:"Pune",       stage:"Early Stage",  status:"shutdown" },
  { id:"dehaat",          company:"DeHaat",               sector:"Agritech",     jobs:200,   pct:"8%",   reason:"Cost Cutting",   date:"2025-03", hq:"Patna",      stage:"Late Stage",   status:"confirmed" },
  // ── SaaS ──
  { id:"freshworks",      company:"Freshworks India",     sector:"SaaS",         jobs:700,   pct:"5%",   reason:"AI Automation",  date:"2025-02", hq:"Chennai",    stage:"Listed",       status:"confirmed" },
  { id:"zoho",            company:"Zoho (selective)",     sector:"SaaS",         jobs:400,   pct:"1%",   reason:"AI Automation",  date:"2025-05", hq:"Chennai",    stage:"Bootstrapped", status:"silent" },
  { id:"chargebee",       company:"Chargebee",            sector:"SaaS",         jobs:200,   pct:"12%",  reason:"Cost Cutting",   date:"2025-04", hq:"Chennai",    stage:"Late Stage",   status:"confirmed" },
  { id:"innovaccer",      company:"Innovaccer",           sector:"SaaS",         jobs:150,   pct:"10%",  reason:"Cost Cutting",   date:"2025-06", hq:"Delhi",      stage:"Late Stage",   status:"confirmed" },
];

module.exports = { LAYOFFS };
