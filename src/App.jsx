import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Boxes,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleDollarSign,
  Command,
  Download,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WalletCards,
  Workflow,
  X,
} from "lucide-react";
import {
  activityFeed,
  customerSegments,
  dashboardByPeriod,
  executiveInsights,
  financeRows,
  funnel,
  kpiDetails,
  operations,
  periodOptions,
  regions,
  reports,
  revenueMix,
  strategicGoals,
} from "./data.js";

const navigation = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "financials", label: "Financials", icon: CircleDollarSign },
  { id: "customers", label: "Customers", icon: Users },
  { id: "operations", label: "Operations", icon: Workflow },
  { id: "reports", label: "Reports", icon: FileText },
];

const pageCopy = {
  overview: ["Executive overview", "A focused view of company performance and strategic movement."],
  financials: ["Financial performance", "Revenue, profitability, and plan variance in one operating view."],
  customers: ["Customer intelligence", "Growth, retention, and account health across every segment."],
  operations: ["Operating performance", "Service quality, capacity, and execution against company commitments."],
  reports: ["Reports & briefings", "Decision-ready reporting for leadership reviews and board meetings."],
};

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function Sidebar({ activeView, onNavigate, mobileOpen, onClose }) {
  return (
    <>
      <button
        className={`sidebar-scrim ${mobileOpen ? "is-visible" : ""}`}
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
      />
      <aside className={`sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="brand-row">
          <BrandMark />
          <div>
            <strong>Vantage</strong>
            <span>Business intelligence</span>
          </div>
          <button className="icon-button mobile-close" type="button" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className="workspace-switcher">
          <span className="workspace-avatar">AC</span>
          <div>
            <strong>Acme Group</strong>
            <span>Executive workspace</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          <span className="nav-label">Workspace</span>
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={activeView === id ? "active" : ""}
              onClick={() => {
                onNavigate(id);
                onClose();
              }}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
              {id === "reports" && <em>4</em>}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="upgrade-card">
          <span className="upgrade-icon"><Sparkles size={17} /></span>
          <strong>Weekly briefing</strong>
          <p>Your leadership summary is ready to review.</p>
          <button type="button" onClick={() => onNavigate("reports")}>Open briefing <ChevronRight size={15} /></button>
        </div>

        <div className="sidebar-footer">
          <button type="button"><Settings size={18} /> Settings</button>
          <button type="button"><LogOut size={18} /> Sign out</button>
        </div>
        <div className="account-row">
          <span className="profile-avatar">AK</span>
          <div><strong>Alex Kim</strong><span>Chief Executive Officer</span></div>
          <MoreHorizontal size={18} />
        </div>
      </aside>
    </>
  );
}

function Header({ activeView, period, onPeriodChange, onMenu, onToast }) {
  const [title, subtitle] = pageCopy[activeView];

  return (
    <header className="page-header">
      <div className="header-copy">
        <button className="mobile-menu" type="button" aria-label="Open menu" onClick={onMenu}>
          <Menu size={21} />
        </button>
        <div>
          <div className="eyebrow-row"><span>Executive workspace</span><i /> <span>Live</span></div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="header-actions">
        <label className="search-control">
          <Search size={17} />
          <input aria-label="Search workspace" placeholder="Search metrics or reports" />
          <kbd><Command size={12} /> K</kbd>
        </label>
        <button className="icon-button has-notification" type="button" aria-label="Notifications" onClick={() => onToast("You have 3 new executive alerts.")}>
          <Bell size={19} />
        </button>
        <label className="period-control">
          <CalendarDays size={17} />
          <select value={period} onChange={(event) => onPeriodChange(event.target.value)} aria-label="Reporting period">
            {periodOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
          <ChevronDown size={14} />
        </label>
        <button className="secondary-button export-top" type="button" onClick={() => onToast("Dashboard export is being prepared.")}>
          <Download size={17} /> Export
        </button>
      </div>
    </header>
  );
}

function Sparkline({ values, negative = false }) {
  const width = 108;
  const height = 34;
  const min = Math.min(...values) - 4;
  const max = Math.max(...values) + 4;
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - min) / (max - min)) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Metric trend">
      <polyline points={points} fill="none" stroke={negative ? "#b8584f" : "#276d5e"} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KpiCard({ item, onOpen }) {
  const positive = item.change >= 0;
  return (
    <button className="kpi-card" type="button" onClick={() => onOpen(item.id)}>
      <span className="kpi-label">{item.label}<ChevronRight size={16} /></span>
      <span className="kpi-main"><strong>{item.value}</strong><Sparkline values={item.spark} negative={!positive} /></span>
      <span className="kpi-meta">
        <em className={positive ? "positive" : "negative"}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(item.change)}%
        </em>
        <span>vs previous</span>
      </span>
      <span className="kpi-note">{item.note}</span>
    </button>
  );
}

function createChart(values, width, height, padding, forcedMin, forcedMax) {
  const min = forcedMin ?? Math.min(...values) * 0.9;
  const max = forcedMax ?? Math.max(...values) * 1.05;
  return values.map((value, index) => ({
    x: padding.left + (index / Math.max(values.length - 1, 1)) * (width - padding.left - padding.right),
    y: padding.top + (1 - (value - min) / Math.max(max - min, 0.1)) * (height - padding.top - padding.bottom),
    value,
  }));
}

function RevenueChart({ data, metric, onMetricChange }) {
  const width = 760;
  const height = 275;
  const padding = { left: 24, right: 24, top: 24, bottom: 38 };
  const isRevenue = metric === "revenue";
  const mainValues = data[metric];
  const compareValues = isRevenue ? data.target : mainValues.map((value, index) => value * (index < 2 ? 0.98 : 0.96));
  const allValues = [...mainValues, ...compareValues];
  const min = Math.min(...allValues) * 0.9;
  const max = Math.max(...allValues) * 1.06;
  const main = createChart(mainValues, width, height, padding, min, max);
  const comparison = createChart(compareValues, width, height, padding, min, max);
  const path = (points) => points.map((point, index) => `${index ? "L" : "M"} ${point.x} ${point.y}`).join(" ");
  const baseline = height - padding.bottom;
  const area = `${path(main)} L ${main.at(-1).x} ${baseline} L ${main[0].x} ${baseline} Z`;
  const format = (value) => metric === "revenue" ? `$${value.toFixed(1)}M` : metric === "margin" ? `${value.toFixed(1)}%` : `${value.toFixed(1)}K`;

  return (
    <article className="panel revenue-panel">
      <div className="panel-heading chart-heading">
        <div>
          <span className="section-kicker">Performance trend</span>
          <h2>{metric === "revenue" ? "Revenue momentum" : metric === "margin" ? "Margin movement" : "Customer growth"}</h2>
        </div>
        <div className="segmented-control" role="group" aria-label="Chart metric">
          {["revenue", "margin", "customers"].map((item) => (
            <button key={item} type="button" className={metric === item ? "active" : ""} onClick={() => onMetricChange(item)}>
              {item === "customers" ? "Customers" : item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-summary">
        <strong>{format(mainValues.at(-1))}</strong>
        <span><ArrowUpRight size={14} /> 12.8% vs previous period</span>
      </div>
      <div className="chart-legend"><span><i className="actual" />Actual</span><span><i className="plan" />{isRevenue ? "Plan" : "Previous"}</span></div>
      <div className="line-chart-wrap">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${metric} performance chart`}>
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a7565" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2a7565" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((line) => {
            const y = padding.top + line * ((height - padding.top - padding.bottom) / 3);
            return <line key={line} x1={padding.left} y1={y} x2={width - padding.right} y2={y} className="grid-line" />;
          })}
          <path d={area} fill="url(#areaFill)" />
          <path d={path(comparison)} className="compare-line" />
          <path d={path(main)} className="main-line" />
          {main.map((point, index) => (
            <g key={data.labels[index]}>
              <circle cx={point.x} cy={point.y} r="4" className="chart-dot"><title>{`${data.labels[index]}: ${format(point.value)}`}</title></circle>
              <text x={point.x} y={height - 13} textAnchor="middle" className="axis-label">{data.labels[index]}</text>
            </g>
          ))}
        </svg>
      </div>
    </article>
  );
}

function RevenueMix() {
  const gradient = `conic-gradient(${revenueMix.map((item, index) => {
    const start = revenueMix.slice(0, index).reduce((sum, current) => sum + current.value, 0);
    return `${item.color} ${start}% ${start + item.value}%`;
  }).join(", ")})`;

  return (
    <article className="panel mix-panel">
      <div className="panel-heading">
        <div><span className="section-kicker">Composition</span><h2>Revenue mix</h2></div>
        <button className="icon-button subtle" type="button" aria-label="Revenue mix options"><MoreHorizontal size={18} /></button>
      </div>
      <div className="mix-content">
        <div className="donut" style={{ background: gradient }} role="img" aria-label="Revenue mix: subscriptions 46%, enterprise 32%, services 15%, other 7%">
          <span><strong>$8.42M</strong><small>Total</small></span>
        </div>
        <div className="mix-legend">
          {revenueMix.map((item) => (
            <div key={item.label}>
              <i style={{ backgroundColor: item.color }} />
              <span><small>{item.label}</small><strong>{item.amount}</strong></span>
              <em>{item.value}%</em>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function RegionalPerformance() {
  return (
    <article className="panel region-panel">
      <div className="panel-heading">
        <div><span className="section-kicker">Markets</span><h2>Regional performance</h2></div>
        <button className="text-button" type="button">Full analysis <ChevronRight size={15} /></button>
      </div>
      <div className="region-list">
        {regions.map((region) => (
          <div className="region-row" key={region.code}>
            <span className="region-code">{region.code}</span>
            <span className="region-name"><strong>{region.name}</strong><span className="progress-track"><i style={{ width: `${region.value}%` }} /></span></span>
            <span className="region-value"><strong>{region.revenue}</strong><em><ArrowUpRight size={13} />{region.delta}%</em></span>
          </div>
        ))}
      </div>
    </article>
  );
}

function StrategyProgress() {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="panel strategy-panel">
      <div className="panel-heading">
        <div><span className="section-kicker">Company goals</span><h2>Strategic priorities</h2></div>
        <span className="quarter-chip">Q3 2026</span>
      </div>
      <div className="goal-list">
        {strategicGoals.slice(0, expanded ? strategicGoals.length : 2).map((goal) => (
          <div className="goal" key={goal.label}>
            <div><strong>{goal.label}</strong><span>{goal.meta}</span></div>
            <span className={goal.status === "On track" ? "status-good" : "status-watch"}>{goal.status}</span>
            <div className="goal-progress"><i style={{ width: `${goal.value}%` }} /><em>{goal.value}%</em></div>
          </div>
        ))}
      </div>
      <button className="disclosure-button" type="button" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Show fewer goals" : "Show all goals"} {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </article>
  );
}

function InsightsPanel() {
  const [openId, setOpenId] = useState(1);
  return (
    <article className="panel insights-panel">
      <div className="panel-heading">
        <div><span className="section-kicker"><Sparkles size={13} /> Decision support</span><h2>Executive insights</h2></div>
        <span className="freshness"><RefreshCw size={13} /> Updated 8 min ago</span>
      </div>
      <div className="insight-list">
        {executiveInsights.map((insight) => {
          const open = openId === insight.id;
          return (
            <div className={`insight ${insight.type} ${open ? "is-open" : ""}`} key={insight.id}>
              <button type="button" onClick={() => setOpenId(open ? null : insight.id)} aria-expanded={open}>
                <span className="insight-icon">
                  {insight.type === "attention" ? <AlertTriangle size={17} /> : insight.type === "positive" ? <CheckCircle2 size={17} /> : <TrendingUp size={17} />}
                </span>
                <span><strong>{insight.title}</strong><small>{insight.summary}</small></span>
                {open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
              </button>
              {open && <div className="insight-detail"><p>{insight.detail}</p><a href="#insight-action">{insight.action} <ArrowUpRight size={14} /></a></div>}
            </div>
          );
        })}
      </div>
    </article>
  );
}

function ActivityPanel() {
  return (
    <article className="panel activity-panel">
      <div className="panel-heading"><div><span className="section-kicker">Latest changes</span><h2>Activity & alerts</h2></div><button className="icon-button subtle" type="button"><SlidersHorizontal size={17} /></button></div>
      <div className="activity-list">
        {activityFeed.map((item) => (
          <div key={item.title}>
            <span className={`activity-dot ${item.tone}`} />
            <span><strong>{item.title}</strong><small>{item.meta}</small></span>
            <ChevronRight size={16} />
          </div>
        ))}
      </div>
      <button className="disclosure-button" type="button">View all activity <ChevronRight size={16} /></button>
    </article>
  );
}

function Overview({ dashboard, metric, setMetric, openKpi }) {
  return (
    <>
      <section className="kpi-grid" aria-label="Key performance indicators">
        {dashboard.kpis.map((item) => <KpiCard item={item} key={item.id} onOpen={openKpi} />)}
      </section>
      <section className="dashboard-grid top-grid">
        <RevenueChart data={dashboard.chart} metric={metric} onMetricChange={setMetric} />
        <RevenueMix />
      </section>
      <section className="dashboard-grid middle-grid">
        <RegionalPerformance />
        <StrategyProgress />
      </section>
      <section className="dashboard-grid bottom-grid">
        <InsightsPanel />
        <ActivityPanel />
      </section>
    </>
  );
}

function Financials({ dashboard, metric, setMetric, openKpi, onToast }) {
  return (
    <>
      <section className="kpi-grid compact-kpis">
        {dashboard.kpis.slice(0, 2).map((item) => <KpiCard item={item} key={item.id} onOpen={openKpi} />)}
        <article className="mini-stat-card"><span>Cash position</span><strong>$26.4M</strong><em><ArrowUpRight size={14} /> 6.8%</em><small>18.7 months runway</small></article>
        <article className="mini-stat-card"><span>Budget utilized</span><strong>61.2%</strong><em className="neutral">On plan</em><small>$28.1M remaining</small></article>
      </section>
      <section className="dashboard-grid top-grid">
        <RevenueChart data={dashboard.chart} metric={metric} onMetricChange={setMetric} />
        <article className="panel finance-scorecard">
          <div className="panel-heading"><div><span className="section-kicker">Outlook</span><h2>Forecast confidence</h2></div><ShieldCheck size={20} /></div>
          <div className="confidence-ring"><span><strong>94.7%</strong><small>High confidence</small></span></div>
          <div className="forecast-stat"><span>FY revenue forecast</span><strong>$83.2M</strong></div>
          <div className="forecast-stat"><span>Expected range</span><strong>$81.7–84.6M</strong></div>
          <p>Primary risk: service capacity in the European region.</p>
        </article>
      </section>
      <article className="panel table-panel">
        <div className="panel-heading"><div><span className="section-kicker">Plan comparison</span><h2>Budget variance</h2></div><button className="secondary-button" type="button" onClick={() => onToast("Finance report downloaded.")}><Download size={16} /> Download</button></div>
        <div className="data-table-wrap">
          <table><thead><tr><th>Category</th><th>Actual</th><th>Plan</th><th>Variance</th><th>Signal</th></tr></thead>
            <tbody>{financeRows.map((row) => <tr key={row.category}><td><strong>{row.category}</strong></td><td>{row.actual}</td><td>{row.plan}</td><td className={row.positive ? "table-positive" : "table-negative"}>{row.variance}</td><td><span className={row.positive ? "signal-positive" : "signal-warning"}>{row.positive ? "Favorable" : "Review"}</span></td></tr>)}</tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function Customers({ dashboard, openKpi }) {
  return (
    <>
      <section className="kpi-grid compact-kpis">
        <KpiCard item={dashboard.kpis[2]} onOpen={openKpi} />
        <article className="mini-stat-card"><span>Gross retention</span><strong>92.8%</strong><em><ArrowUpRight size={14} /> 2.4%</em><small>Target 94.0%</small></article>
        <article className="mini-stat-card"><span>Net retention</span><strong>118.6%</strong><em><ArrowUpRight size={14} /> 4.9%</em><small>Expansion led</small></article>
        <article className="mini-stat-card"><span>Health score</span><strong>84 / 100</strong><em><ArrowUpRight size={14} /> 5 pts</em><small>1,926 need attention</small></article>
      </section>
      <section className="dashboard-grid customer-grid">
        <article className="panel funnel-panel">
          <div className="panel-heading"><div><span className="section-kicker">Revenue funnel</span><h2>Pipeline progression</h2></div><span className="quarter-chip">$7.4M committed</span></div>
          <div className="funnel-list">{funnel.map((step) => <div key={step.label}><span className="funnel-bar" style={{ width: `${step.value}%` }}><i /></span><span><strong>{step.label}</strong><small>{step.count} opportunities</small></span><em>{step.amount}</em></div>)}</div>
        </article>
        <article className="panel health-panel">
          <div className="panel-heading"><div><span className="section-kicker">Portfolio</span><h2>Account health</h2></div><button className="icon-button subtle"><MoreHorizontal size={18} /></button></div>
          <div className="health-visual"><div className="health-score"><strong>76%</strong><span>Healthy</span></div><div className="health-key"><span><i className="healthy" />Healthy <strong>76%</strong></span><span><i className="watch" />Watch <strong>17%</strong></span><span><i className="risk" />At risk <strong>7%</strong></span></div></div>
        </article>
      </section>
      <article className="panel table-panel">
        <div className="panel-heading"><div><span className="section-kicker">Segmentation</span><h2>Customer portfolio</h2></div><button className="text-button">View accounts <ChevronRight size={15} /></button></div>
        <div className="data-table-wrap"><table><thead><tr><th>Segment</th><th>Accounts</th><th>ARR</th><th>Retention</th><th>Health</th></tr></thead><tbody>{customerSegments.map((row) => <tr key={row.label}><td><strong>{row.label}</strong></td><td>{row.accounts}</td><td>{row.arr}</td><td>{row.retention}</td><td><div className="table-health"><span><i style={{ width: `${row.health}%` }} /></span><em>{row.health}</em></div></td></tr>)}</tbody></table></div>
      </article>
    </>
  );
}

function Operations({ onToast }) {
  const [capacityOpen, setCapacityOpen] = useState(false);
  return (
    <>
      <section className="ops-banner">
        <div><span className="ops-icon"><Activity size={21} /></span><div><span>Operating health</span><strong>All critical systems are performing within target</strong></div></div>
        <span className="operational-chip"><i /> Operational</span>
      </section>
      <section className="kpi-grid compact-kpis">
        <article className="mini-stat-card"><span>Delivery SLA</span><strong>97.6%</strong><em><ArrowUpRight size={14} /> 1.8%</em><small>Target 96.0%</small></article>
        <article className="mini-stat-card"><span>Team utilization</span><strong>81.4%</strong><em className="neutral">Optimal</em><small>1,428 active staff</small></article>
        <article className="mini-stat-card"><span>Cycle time</span><strong>6.8 days</strong><em><ArrowDownRight size={14} /> 12.1%</em><small>1.1 days faster</small></article>
        <article className="mini-stat-card"><span>Open risks</span><strong>7</strong><em className="warning">2 priority</em><small>Down from 11</small></article>
      </section>
      <section className="dashboard-grid ops-grid">
        <article className="panel team-panel">
          <div className="panel-heading"><div><span className="section-kicker">Execution</span><h2>Team performance</h2></div><button className="secondary-button" onClick={() => onToast("Filters opened.")}><SlidersHorizontal size={16} /> Filter</button></div>
          <div className="team-list">
            <div className="team-header"><span>Function</span><span>Score</span><span>Utilization</span><span>SLA</span><span>Trend</span></div>
            {operations.map((row) => <div className="team-row" key={row.team}><span><i><Building2 size={15} /></i><strong>{row.team}</strong></span><span><em className="score-pill">{row.score}</em></span><span>{row.utilization}</span><span>{row.sla}</span><span className={row.trend.startsWith("+") ? "table-positive" : "table-negative"}>{row.trend}</span></div>)}
          </div>
        </article>
        <article className="panel capacity-panel">
          <div className="panel-heading"><div><span className="section-kicker">Resources</span><h2>Capacity outlook</h2></div><Boxes size={20} /></div>
          <div className="capacity-total"><strong>81.4%</strong><span>Current utilization</span></div>
          <div className="capacity-chart">{[68, 72, 74, 78, 76, 82, 81, 84, 83, 85, 82, 81].map((value, index) => <i key={index} style={{ height: `${value}%` }}><span>{value}%</span></i>)}</div>
          <div className="capacity-axis"><span>Sep 1</span><span>Sep 15</span><span>Sep 30</span></div>
          <button className="disclosure-button" onClick={() => setCapacityOpen(!capacityOpen)}>{capacityOpen ? "Hide forecast notes" : "Show forecast notes"}{capacityOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
          {capacityOpen && <p className="capacity-note">Implementation capacity is forecast to peak at 85% in mid-September. No additional contractor coverage is currently required.</p>}
        </article>
      </section>
    </>
  );
}

function Reports({ onToast }) {
  return (
    <>
      <section className="report-hero">
        <div><span className="report-hero-icon"><FileText size={24} /></span><div><span>Next leadership review · Monday, 9:00 AM</span><h2>Your weekly executive briefing is ready</h2><p>14 key changes summarized across growth, financials, customers, and operations.</p></div></div>
        <button className="primary-button" type="button" onClick={() => onToast("Executive briefing opened.")}>Review briefing <ArrowUpRight size={16} /></button>
      </section>
      <div className="section-title-row"><div><span className="section-kicker">Library</span><h2>Saved reports</h2></div><button className="secondary-button"><Plus size={17} /> Create report</button></div>
      <section className="report-grid">
        {reports.map((report, index) => (
          <article className="report-card" key={report.title}>
            <div className={`report-icon color-${index}`}><FileText size={21} /></div>
            <button className="icon-button subtle"><MoreHorizontal size={18} /></button>
            <h3>{report.title}</h3><p>{report.description}</p>
            <div className="report-meta"><span>{report.type}</span><span>{report.pages}</span></div>
            <footer><span>{report.updated}</span><button onClick={() => onToast(`${report.title} downloaded.`)}><Download size={16} /> Download</button></footer>
          </article>
        ))}
      </section>
      <article className="panel scheduled-panel">
        <div className="panel-heading"><div><span className="section-kicker">Automation</span><h2>Scheduled delivery</h2></div><button className="text-button"><Plus size={15} /> New schedule</button></div>
        <div className="schedule-row"><span className="schedule-icon"><CalendarDays size={18} /></span><div><strong>Weekly leadership pulse</strong><small>Every Monday at 7:00 AM · 8 recipients</small></div><span className="signal-positive">Active</span><ChevronRight size={17} /></div>
        <div className="schedule-row"><span className="schedule-icon"><CalendarDays size={18} /></span><div><strong>Monthly board package</strong><small>First business day at 8:00 AM · 12 recipients</small></div><span className="signal-positive">Active</span><ChevronRight size={17} /></div>
      </article>
    </>
  );
}

function KpiDrawer({ id, onClose }) {
  const detail = id ? kpiDetails[id] : null;
  return (
    <div className={`drawer-shell ${detail ? "is-open" : ""}`} aria-hidden={!detail}>
      <button className="drawer-scrim" type="button" onClick={onClose} aria-label="Close metric details" />
      <aside className="detail-drawer" role="dialog" aria-modal="true" aria-label="Metric details">
        {detail && <>
          <div className="drawer-header"><span className="metric-icon"><TrendingUp size={20} /></span><button className="icon-button" type="button" onClick={onClose}><X size={19} /></button></div>
          <span className="section-kicker">{detail.eyebrow}</span><h2>{detail.title}</h2><p>{detail.description}</p>
          <div className="drawer-metrics">{detail.metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
          <div className="drawer-chart"><span>Eight-week performance</span><Sparkline values={[32, 39, 44, 42, 50, 57, 62, 68]} /></div>
          <div className="drawer-callout"><Sparkles size={18} /><div><strong>What changed?</strong><p>Performance strengthened in the last two reporting cycles, driven primarily by enterprise accounts and improved conversion.</p></div></div>
          <button className="primary-button full-width" onClick={onClose}>Open full analysis <ArrowUpRight size={16} /></button>
        </>}
      </aside>
    </div>
  );
}

function Toast({ message, onClose }) {
  if (!message) return null;
  return <div className="toast" role="status"><CheckCircle2 size={18} /><span>{message}</span><button onClick={onClose} aria-label="Dismiss notification"><X size={15} /></button></div>;
}

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const [period, setPeriod] = useState("30d");
  const [metric, setMetric] = useState("revenue");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerId, setDrawerId] = useState(null);
  const [toast, setToast] = useState("");
  const dashboard = useMemo(() => dashboardByPeriod[period], [period]);
  const selectedRange = periodOptions.find((item) => item.id === period)?.range;

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onNavigate={setActiveView} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="main-content">
        <Header activeView={activeView} period={period} onPeriodChange={setPeriod} onMenu={() => setMobileOpen(true)} onToast={showToast} />
        <div className="content-wrap">
          <div className="mobile-period-note"><CalendarDays size={14} /> {selectedRange}</div>
          {activeView === "overview" && <Overview dashboard={dashboard} metric={metric} setMetric={setMetric} openKpi={setDrawerId} />}
          {activeView === "financials" && <Financials dashboard={dashboard} metric={metric} setMetric={setMetric} openKpi={setDrawerId} onToast={showToast} />}
          {activeView === "customers" && <Customers dashboard={dashboard} openKpi={setDrawerId} />}
          {activeView === "operations" && <Operations onToast={showToast} />}
          {activeView === "reports" && <Reports onToast={showToast} />}
          <footer className="page-footer"><span>Vantage Intelligence</span><span>Data refreshed 8 minutes ago · All systems operational</span></footer>
        </div>
      </main>
      <KpiDrawer id={drawerId} onClose={() => setDrawerId(null)} />
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
