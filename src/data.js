export const periodOptions = [
  { id: "30d", label: "Last 30 days", range: "Jul 24 – Aug 22, 2026" },
  { id: "q3", label: "This quarter", range: "Jul 1 – Sep 30, 2026" },
  { id: "ytd", label: "Year to date", range: "Jan 1 – Aug 22, 2026" },
];

export const dashboardByPeriod = {
  "30d": {
    kpis: [
      { id: "revenue", label: "Net revenue", value: "$8.42M", change: 12.8, note: "$953K above plan", spark: [42, 48, 46, 55, 61, 68, 73] },
      { id: "margin", label: "Operating margin", value: "24.6%", change: 3.6, note: "Target 23.1%", spark: [44, 43, 51, 54, 52, 63, 67] },
      { id: "customers", label: "Active customers", value: "18,942", change: 8.4, note: "+1,463 this period", spark: [36, 40, 43, 50, 55, 58, 64] },
      { id: "forecast", label: "Forecast accuracy", value: "94.7%", change: 2.1, note: "Top quartile", spark: [51, 49, 56, 60, 58, 65, 68] },
    ],
    chart: {
      labels: ["Jul 24", "Jul 29", "Aug 3", "Aug 8", "Aug 13", "Aug 18", "Aug 22"],
      revenue: [0.82, 0.96, 1.03, 1.14, 1.09, 1.28, 1.36],
      target: [0.78, 0.84, 0.92, 1.0, 1.08, 1.16, 1.24],
      margin: [21.8, 22.4, 23.1, 23.7, 24.0, 24.3, 24.6],
      customers: [16.2, 16.6, 17.0, 17.4, 17.8, 18.4, 18.9],
    },
  },
  q3: {
    kpis: [
      { id: "revenue", label: "Net revenue", value: "$19.7M", change: 10.4, note: "$1.8M above plan", spark: [39, 45, 52, 54, 63, 68, 71] },
      { id: "margin", label: "Operating margin", value: "23.9%", change: 2.8, note: "Target 22.8%", spark: [42, 47, 45, 53, 56, 60, 64] },
      { id: "customers", label: "Active customers", value: "18,942", change: 7.2, note: "+2,105 this quarter", spark: [35, 38, 44, 49, 53, 59, 65] },
      { id: "forecast", label: "Forecast accuracy", value: "93.8%", change: 1.7, note: "2.8 pts over Q2", spark: [47, 52, 49, 56, 59, 62, 66] },
    ],
    chart: {
      labels: ["Jul 1", "Jul 15", "Aug 1", "Aug 15", "Sep 1", "Sep 15", "Sep 30"],
      revenue: [2.4, 4.9, 7.7, 10.8, 13.9, 16.8, 19.7],
      target: [2.2, 4.5, 6.9, 9.6, 12.5, 15.4, 18.1],
      margin: [21.7, 22.1, 22.5, 23.0, 23.2, 23.6, 23.9],
      customers: [16.8, 17.1, 17.5, 17.9, 18.2, 18.6, 18.9],
    },
  },
  ytd: {
    kpis: [
      { id: "revenue", label: "Net revenue", value: "$54.8M", change: 16.2, note: "$4.6M above plan", spark: [32, 38, 45, 51, 57, 65, 74] },
      { id: "margin", label: "Operating margin", value: "22.8%", change: 4.1, note: "Target 21.6%", spark: [38, 42, 46, 48, 55, 61, 68] },
      { id: "customers", label: "Active customers", value: "18,942", change: 21.6, note: "+3,364 year to date", spark: [31, 37, 42, 48, 54, 61, 69] },
      { id: "forecast", label: "Forecast accuracy", value: "92.9%", change: 5.4, note: "Best result since 2023", spark: [40, 45, 43, 51, 55, 62, 67] },
    ],
    chart: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      revenue: [5.2, 11.4, 18.1, 24.7, 31.5, 39.2, 46.4, 54.8],
      target: [5.0, 10.5, 16.5, 22.6, 29.1, 36.0, 43.0, 50.2],
      margin: [18.8, 19.2, 19.9, 20.5, 21.0, 21.8, 22.3, 22.8],
      customers: [15.6, 16.0, 16.4, 16.9, 17.3, 17.8, 18.3, 18.9],
    },
  },
};

export const revenueMix = [
  { label: "Subscriptions", value: 46, amount: "$3.87M", color: "#194d43" },
  { label: "Enterprise", value: 32, amount: "$2.69M", color: "#8eae4a" },
  { label: "Services", value: 15, amount: "$1.26M", color: "#dca348" },
  { label: "Other", value: 7, amount: "$590K", color: "#c7d0cc" },
];

export const regions = [
  { name: "North America", code: "NA", revenue: "$3.46M", value: 88, delta: 14.2 },
  { name: "Europe", code: "EU", revenue: "$2.31M", value: 69, delta: 9.7 },
  { name: "Asia Pacific", code: "AP", revenue: "$1.87M", value: 58, delta: 18.5 },
  { name: "Latin America", code: "LA", revenue: "$780K", value: 31, delta: 5.8 },
];

export const strategicGoals = [
  { label: "Annual recurring revenue", value: 78, meta: "$64.8M of $83M", status: "On track" },
  { label: "Enterprise expansion", value: 64, meta: "32 of 50 accounts", status: "Watch" },
  { label: "Gross retention", value: 91, meta: "91% of 94% target", status: "On track" },
];

export const executiveInsights = [
  {
    id: 1,
    type: "opportunity",
    title: "Enterprise expansion is accelerating",
    summary: "Expansion revenue rose 18.4% after the new account playbook launched.",
    detail: "North America contributed 61% of the gain. Applying the same playbook to the top 12 European accounts could add an estimated $420K in quarterly recurring revenue.",
    action: "Review 12 target accounts",
  },
  {
    id: 2,
    type: "attention",
    title: "Service delivery costs moved above plan",
    summary: "Contractor costs are 6.2% above the monthly operating plan.",
    detail: "The variance is concentrated in three implementation programs. Two programs are scheduled to complete by September 8, returning the run rate to the approved range.",
    action: "Open cost analysis",
  },
  {
    id: 3,
    type: "positive",
    title: "Customer health reached a six-month high",
    summary: "76% of accounts now show high product engagement and low support risk.",
    detail: "Adoption of the workflow module increased most among mid-market accounts, lifting their renewal confidence score by 9 points.",
    action: "View health segments",
  },
];

export const activityFeed = [
  { title: "Q3 operating forecast approved", meta: "Finance · 18 minutes ago", tone: "success" },
  { title: "Enterprise pipeline crossed $12M", meta: "Revenue · 1 hour ago", tone: "neutral" },
  { title: "Cost variance requires review", meta: "Operations · 3 hours ago", tone: "warning" },
  { title: "Board report is ready to export", meta: "Reporting · Yesterday", tone: "neutral" },
];

export const financeRows = [
  { category: "Subscription revenue", actual: "$3.87M", plan: "$3.55M", variance: "+9.0%", positive: true },
  { category: "Enterprise revenue", actual: "$2.69M", plan: "$2.42M", variance: "+11.2%", positive: true },
  { category: "Professional services", actual: "$1.26M", plan: "$1.31M", variance: "−3.8%", positive: false },
  { category: "Cost of revenue", actual: "$2.15M", plan: "$2.08M", variance: "+3.4%", positive: false },
  { category: "Operating expense", actual: "$4.20M", plan: "$4.36M", variance: "−3.7%", positive: true },
];

export const customerSegments = [
  { label: "Enterprise", accounts: "1,284", arr: "$36.2M", retention: "96.8%", health: 91 },
  { label: "Mid-market", accounts: "4,936", arr: "$18.7M", retention: "92.4%", health: 84 },
  { label: "Growth", accounts: "12,722", arr: "$9.9M", retention: "88.1%", health: 76 },
];

export const funnel = [
  { label: "Qualified pipeline", value: 100, count: "2,480", amount: "$24.8M" },
  { label: "Solution validated", value: 72, count: "1,785", amount: "$17.9M" },
  { label: "Commercial review", value: 48, count: "1,194", amount: "$11.7M" },
  { label: "Committed", value: 29, count: "724", amount: "$7.4M" },
];

export const operations = [
  { team: "Customer delivery", score: 94, utilization: "82%", sla: "98.6%", trend: "+3.2%" },
  { team: "Platform reliability", score: 97, utilization: "76%", sla: "99.95%", trend: "+0.8%" },
  { team: "Customer support", score: 88, utilization: "91%", sla: "94.2%", trend: "−1.6%" },
  { team: "Data operations", score: 91, utilization: "79%", sla: "97.8%", trend: "+2.1%" },
];

export const reports = [
  { title: "Board performance brief", description: "Executive KPIs, forecast outlook, and strategic priorities.", updated: "Updated 12 min ago", type: "PDF", pages: "18 pages" },
  { title: "Revenue operating review", description: "Pipeline coverage, regional performance, and sales efficiency.", updated: "Updated 2 hours ago", type: "PDF", pages: "24 pages" },
  { title: "Customer health summary", description: "Retention risk, product adoption, and account health by segment.", updated: "Updated yesterday", type: "XLSX", pages: "8 sheets" },
  { title: "Monthly finance pack", description: "P&L, budget variance, cash position, and department spend.", updated: "Updated Aug 20", type: "PDF", pages: "31 pages" },
];

export const kpiDetails = {
  revenue: {
    eyebrow: "Financial performance",
    title: "Net revenue",
    description: "Recognized revenue across subscriptions, enterprise agreements, professional services, and other sources.",
    metrics: [["Current", "$8.42M"], ["Plan", "$7.47M"], ["Previous", "$7.46M"], ["Full-year forecast", "$83.2M"]],
  },
  margin: {
    eyebrow: "Profitability",
    title: "Operating margin",
    description: "Operating income as a percentage of net revenue after all recurring operating expenses.",
    metrics: [["Current", "24.6%"], ["Plan", "23.1%"], ["Previous", "23.7%"], ["FY target", "24.0%"]],
  },
  customers: {
    eyebrow: "Customer growth",
    title: "Active customers",
    description: "Paying customer organizations with an active subscription or services agreement.",
    metrics: [["Current", "18,942"], ["New", "1,463"], ["Churned", "284"], ["Net growth", "+1,179"]],
  },
  forecast: {
    eyebrow: "Planning confidence",
    title: "Forecast accuracy",
    description: "The proximity of the rolling revenue forecast to finalized actual performance.",
    metrics: [["Current", "94.7%"], ["Target", "92.0%"], ["Previous", "92.6%"], ["Variance", "+2.7 pts"]],
  },
};
