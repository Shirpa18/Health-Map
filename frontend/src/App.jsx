import { useState } from "react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "map", label: "Live Health Map", icon: "⌖" },
  { id: "reports", label: "Health Reports", icon: "▤" },
  { id: "analysis", label: "AI Analysis", icon: "✦" },
  { id: "alerts", label: "Alerts", icon: "⚠" },
];

const reports = [
  {
    location: "Kavoor",
    category: "Fever",
    severity: "High",
    people: 12,
    time: "18 min ago",
  },
  {
    location: "Kadri",
    category: "Respiratory",
    severity: "Medium",
    people: 7,
    time: "42 min ago",
  },
  {
    location: "Bejai",
    category: "Fever",
    severity: "Medium",
    people: 5,
    time: "1 hr ago",
  },
  {
    location: "Kottara",
    category: "Water-related",
    severity: "Low",
    people: 3,
    time: "2 hrs ago",
  },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">H</div>
          <div>
            <h1>HealthMap</h1>
            <span>Health Intelligence</span>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="section-title">MAIN MENU</p>

          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot"></span>
            <div>
              <strong>System Online</strong>
              <small>Monitoring active</small>
            </div>
          </div>

          <div className="user-card">
            <div className="avatar">A</div>
            <div>
              <strong>Authority</strong>
              <small>Health Officer</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">HEALTH INTELLIGENCE / OVERVIEW</p>
            <h2>
              {activePage === "dashboard"
                ? "Community Health Overview"
                : navItems.find((item) => item.id === activePage)?.label}
            </h2>
          </div>

          <div className="topbar-actions">
            <div className="live-indicator">
              <span></span>
              LIVE
            </div>

            <button className="notification-btn">♢</button>

            <div className="date-box">
              <span>Today</span>
              <strong>19 Sep 2026</strong>
            </div>
          </div>
        </header>

        {activePage === "dashboard" && (
          <Dashboard />
        )}

        {activePage === "map" && (
          <PlaceholderPage
            title="Live Health Map"
            description="Geographic visualization of community health reports and emerging clusters."
            icon="⌖"
          />
        )}

        {activePage === "reports" && (
          <PlaceholderPage
            title="Health Reports"
            description="Review and monitor incoming community health reports."
            icon="▤"
          />
        )}

        {activePage === "analysis" && (
          <PlaceholderPage
            title="AI Analysis"
            description="Understand detected patterns and why HealthMap flagged them."
            icon="✦"
          />
        )}

        {activePage === "alerts" && (
          <PlaceholderPage
            title="Alerts"
            description="Monitor investigation priorities and public-health alerts."
            icon="⚠"
          />
        )}
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Stats */}
      <section className="stats-grid">
        <StatCard
          title="Reports Today"
          value="47"
          change="+18%"
          description="vs yesterday"
          icon="▤"
          type="blue"
        />

        <StatCard
          title="Active Clusters"
          value="6"
          change="+2"
          description="new clusters"
          icon="⌖"
          type="purple"
        />

        <StatCard
          title="Investigation Priority"
          value="4"
          change="High"
          description="requires review"
          icon="⚠"
          type="orange"
        />

        <StatCard
          title="Reports Verified"
          value="82%"
          change="+6%"
          description="this week"
          icon="✓"
          type="green"
        />
      </section>

      {/* Main Grid */}
      <section className="content-grid">
        {/* Map Preview */}
        <div className="panel map-panel">
          <div className="panel-header">
            <div>
              <h3>Live Health Map</h3>
              <p>Community reports across the monitored region</p>
            </div>

            <button className="view-button">Open Map →</button>
          </div>

          <div className="fake-map">
            <div className="map-grid"></div>

            <div className="map-label label-one">Kavoor</div>
            <div className="map-label label-two">Kadri</div>
            <div className="map-label label-three">Bejai</div>
            <div className="map-label label-four">Kottara</div>

            <div className="cluster cluster-large">
              <span>12</span>
            </div>

            <div className="cluster cluster-medium">
              <span>7</span>
            </div>

            <div className="cluster cluster-small">
              <span>5</span>
            </div>

            <div className="map-center">
              <span></span>
            </div>

            <div className="map-legend">
              <div>
                <span className="legend-dot high"></span>
                High activity
              </div>
              <div>
                <span className="legend-dot medium"></span>
                Moderate
              </div>
              <div>
                <span className="legend-dot low"></span>
                Low
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="panel insight-panel">
          <div className="panel-header">
            <div>
              <h3>AI Insight</h3>
              <p>Latest pattern detection</p>
            </div>

            <span className="ai-badge">✦ AI</span>
          </div>

          <div className="insight-box">
            <div className="insight-icon">!</div>

            <div>
              <strong>Unusual activity detected</strong>

              <p>
                A cluster of fever-related reports in the Kavoor area is
                above the recent baseline.
              </p>
            </div>
          </div>

          <div className="confidence">
            <div>
              <span>Investigation priority</span>
              <strong>High</strong>
            </div>

            <div className="progress">
              <div></div>
            </div>

            <small>Pattern confidence: 87%</small>
          </div>

          <button className="analysis-button">
            Why was this flagged? →
          </button>
        </div>
      </section>

      {/* Reports + Alerts */}
      <section className="bottom-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Recent Reports</h3>
              <p>Latest community submissions</p>
            </div>

            <button className="text-button">View all →</button>
          </div>

          <div className="reports-list">
            {reports.map((report, index) => (
              <div className="report-row" key={index}>
                <div className="report-location">
                  <div className={`report-marker marker-${report.severity.toLowerCase()}`}>
                    ●
                  </div>

                  <div>
                    <strong>{report.location}</strong>
                    <span>{report.category}</span>
                  </div>
                </div>

                <div className="report-people">
                  <strong>{report.people}</strong>
                  <span>people</span>
                </div>

                <div
                  className={`severity ${report.severity.toLowerCase()}`}
                >
                  {report.severity}
                </div>

                <div className="report-time">{report.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Priority Alerts</h3>
              <p>Requires investigation</p>
            </div>

            <span className="alert-count">4</span>
          </div>

          <div className="alert-list">
            <Alert
              title="Fever cluster"
              location="Kavoor"
              time="18 min ago"
              level="High"
            />

            <Alert
              title="Respiratory reports rising"
              location="Kadri"
              time="42 min ago"
              level="Medium"
            />

            <Alert
              title="Water-related reports"
              location="Kottara"
              time="2 hrs ago"
              level="Low"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, change, description, icon, type }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>{icon}</div>

      <div className="stat-content">
        <span>{title}</span>
        <strong>{value}</strong>

        <div>
          <b className={type}>{change}</b>
          <small>{description}</small>
        </div>
      </div>
    </div>
  );
}

function Alert({ title, location, time, level }) {
  return (
    <div className="alert-item">
      <div className={`alert-icon ${level.toLowerCase()}`}>!</div>

      <div className="alert-info">
        <strong>{title}</strong>
        <span>
          {location} • {time}
        </span>
      </div>

      <span className={`alert-level ${level.toLowerCase()}`}>
        {level}
      </span>
    </div>
  );
}

function PlaceholderPage({ title, description, icon }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="coming-soon">
        This module will be built next.
      </div>
    </div>
  );
}

export default App;