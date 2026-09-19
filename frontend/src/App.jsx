import { useState } from "react";
import HealthMap from "./HealthMap";
import ReportPage from "./ReportPage";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "▦",
  },
  {
    id: "map",
    label: "Live Health Map",
    icon: "⌖",
  },
  {
    id: "reports",
    label: "Health Reports",
    icon: "▤",
  },
  {
    id: "analysis",
    label: "AI Analysis",
    icon: "✦",
  },
  {
    id: "alerts",
    label: "Alerts",
    icon: "⚠",
  },
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

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">
            H
          </div>

          <div>
            <h1>HealthMap</h1>
            <span>Health Intelligence</span>
          </div>

        </div>


        <div className="sidebar-section">

          <p className="section-title">
            MAIN MENU
          </p>

          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => setActivePage(item.id)}
            >

              <span className="nav-icon">
                {item.icon}
              </span>

              {item.label}

            </button>
          ))}

        </div>


        <div className="sidebar-bottom">

          <div className="system-status">

            <span className="status-dot"></span>

            <div>
              <strong>
                System Online
              </strong>

              <small>
                Monitoring active
              </small>
            </div>

          </div>


          <div className="user-card">

            <div className="avatar">
              A
            </div>

            <div>
              <strong>
                Authority
              </strong>

              <small>
                Health Officer
              </small>
            </div>

          </div>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="main-content">

        <header className="topbar">

          <div>

            <p className="breadcrumb">
              HEALTH INTELLIGENCE / OVERVIEW
            </p>

            <h2>
              {getPageTitle(activePage)}
            </h2>

          </div>


          <div className="topbar-actions">

            <div className="live-indicator">

              <span></span>

              LIVE

            </div>


            <button className="notification-btn">
              ♢
            </button>


            <div className="date-box">

              <span>
                Today
              </span>

              <strong>
                19 Sep 2026
              </strong>

            </div>

          </div>

        </header>


        {/* ================= PAGE CONTENT ================= */}

        {activePage === "dashboard" && (
          <Dashboard />
        )}


        {activePage === "map" && (
          <HealthMap />
        )}


        {activePage === "reports" && (
          <ReportPage />
        )}


        {activePage === "analysis" && (
          <AIAnalysisPage />
        )}


        {activePage === "alerts" && (
          <AlertsPage />
        )}

      </main>

    </div>
  );
}


/* =========================================================
   PAGE TITLE
========================================================= */

function getPageTitle(page) {

  switch (page) {

    case "dashboard":
      return "Community Health Overview";

    case "map":
      return "Live Health Map";

    case "reports":
      return "Health Reports";

    case "analysis":
      return "AI Analysis";

    case "alerts":
      return "Alerts";

    default:
      return "Community Health Overview";
  }
}


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard() {

  return (

    <div className="dashboard">

      {/* ================= STAT CARDS ================= */}

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


      {/* ================= MAP + AI ================= */}

      <section className="content-grid">

        {/* MAP */}

        <div className="panel map-panel">

          <div className="panel-header">

            <div>

              <h3>
                Live Health Map
              </h3>

              <p>
                Community reports across the monitored region
              </p>

            </div>

            <button
              className="view-button"
              onClick={() => setActivePage("map")}
            >
              Open Map →
            </button>

          </div>


          <div className="fake-map">

            <div className="map-grid"></div>


            <div className="map-label label-one">
              Kavoor
            </div>

            <div className="map-label label-two">
              Kadri
            </div>

            <div className="map-label label-three">
              Bejai
            </div>

            <div className="map-label label-four">
              Kottara
            </div>


            <div className="cluster cluster-large">
              <span>
                12
              </span>
            </div>


            <div className="cluster cluster-medium">
              <span>
                7
              </span>
            </div>


            <div className="cluster cluster-small">
              <span>
                5
              </span>
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


        {/* AI INSIGHT */}

        <div className="panel insight-panel">

          <div className="panel-header">

            <div>

              <h3>
                AI Insight
              </h3>

              <p>
                Latest pattern detection
              </p>

            </div>

            <span className="ai-badge">
              ✦ AI
            </span>

          </div>


          <div className="insight-box">

            <div className="insight-icon">
              !
            </div>

            <div>

              <strong>
                Unusual activity detected
              </strong>

              <p>
                A cluster of fever-related reports
                in the Kavoor area is above the
                recent baseline.
              </p>

            </div>

          </div>


          <div className="confidence">

            <div>

              <span>
                Investigation priority
              </span>

              <strong>
                High
              </strong>

            </div>


            <div className="progress">
              <div></div>
            </div>


            <small>
              Pattern confidence: 87%
            </small>

          </div>


          <button
            className="analysis-button"
            onClick={() => setActivePage("analysis")}
          >
            Why was this flagged? →
          </button>

        </div>

      </section>


      {/* ================= REPORTS + ALERTS ================= */}

      <section className="bottom-grid">

        {/* RECENT REPORTS */}

        <div className="panel">

          <div className="panel-header">

            <div>

              <h3>
                Recent Reports
              </h3>

              <p>
                Latest community submissions
              </p>

            </div>

            <button
              className="text-button"
              onClick={() => setActivePage("reports")}
            >
              View all →
            </button>

          </div>


          <div className="reports-list">

            {reports.map((report, index) => (

              <div
                className="report-row"
                key={index}
              >

                <div className="report-location">

                  <div
                    className={`report-marker marker-${report.severity.toLowerCase()}`}
                  >
                    ●
                  </div>


                  <div>

                    <strong>
                      {report.location}
                    </strong>

                    <span>
                      {report.category}
                    </span>

                  </div>

                </div>


                <div className="report-people">

                  <strong>
                    {report.people}
                  </strong>

                  <span>
                    people
                  </span>

                </div>


                <div
                  className={`severity ${report.severity.toLowerCase()}`}
                >
                  {report.severity}
                </div>


                <div className="report-time">
                  {report.time}
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ALERTS */}

        <div className="panel">

          <div className="panel-header">

            <div>

              <h3>
                Priority Alerts
              </h3>

              <p>
                Requires investigation
              </p>

            </div>

            <span className="alert-count">
              4
            </span>

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


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  change,
  description,
  icon,
  type,
}) {

  return (

    <div className="stat-card">

      <div
        className={`stat-icon ${type}`}
      >
        {icon}
      </div>


      <div className="stat-content">

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>


        <div>

          <b className={type}>
            {change}
          </b>

          <small>
            {description}
          </small>

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   ALERT COMPONENT
========================================================= */

function Alert({
  title,
  location,
  time,
  level,
}) {

  return (

    <div className="alert-item">

      <div
        className={`alert-icon ${level.toLowerCase()}`}
      >
        !
      </div>


      <div className="alert-info">

        <strong>
          {title}
        </strong>

        <span>
          {location} • {time}
        </span>

      </div>


      <span
        className={`alert-level ${level.toLowerCase()}`}
      >
        {level}
      </span>

    </div>

  );
}


/* =========================================================
   AI ANALYSIS PAGE
========================================================= */

function AIAnalysisPage() {

  return (

    <div className="placeholder-page">

      <div className="placeholder-icon">
        ✦
      </div>

      <h3>
        AI Analysis
      </h3>

      <p>
        Pattern detection and investigation reasoning.
      </p>

      <div className="coming-soon">
        AI Analysis module will be built next.
      </div>

    </div>

  );
}


/* =========================================================
   ALERTS PAGE
========================================================= */

function AlertsPage() {

  return (

    <div className="placeholder-page">

      <div className="placeholder-icon">
        ⚠
      </div>

      <h3>
        Authority Alerts
      </h3>

      <p>
        Monitor investigation priorities and alerts.
      </p>

      <div className="coming-soon">
        Authority dashboard will be built next.
      </div>

    </div>

  );
}


export default App;