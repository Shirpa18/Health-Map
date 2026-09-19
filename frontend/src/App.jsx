import { useState, useEffect } from "react";
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

      {/* SIDEBAR */}

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


      {/* MAIN */}

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


        {activePage === "dashboard" && (
          <Dashboard
            setActivePage={setActivePage}
          />
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

function Dashboard({ setActivePage }) {

  return (

    <div className="dashboard">

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


      <section className="content-grid">

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
                A cluster of health reports
                in the Kavoor area is above
                the recent baseline.
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
              Pattern detection active
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


      <section className="bottom-grid">

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
              title="Health report cluster"
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
   ALERT
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

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchAnalysis = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        "http://127.0.0.1:8000/analysis/clusters"
      );

      if (!response.ok) {

        throw new Error(
          "Failed to fetch AI analysis"
        );

      }

      const data = await response.json();

      setAnalysis(data);

    } catch (err) {

      console.error(
        "AI analysis error:",
        err
      );

      setError(
        "Unable to connect to the HealthMap AI engine."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchAnalysis();

  }, []);


  if (loading) {

    return (

      <div className="placeholder-page">

        <div className="placeholder-icon">
          ✦
        </div>

        <h3>
          AI Analysis
        </h3>

        <p>
          Analyzing community health reports...
        </p>

      </div>

    );

  }


  if (error) {

    return (

      <div className="placeholder-page">

        <div className="placeholder-icon">
          ⚠
        </div>

        <h3>
          AI Analysis
        </h3>

        <p>
          {error}
        </p>

        <button
          className="analysis-button"
          onClick={fetchAnalysis}
        >
          Try Again →
        </button>

      </div>

    );

  }


  const clusters =
    analysis?.clusters || [];

  const totalReports =
    analysis?.total_reports || 0;

  const totalPeople =
    analysis?.total_people_affected || 0;


  return (

    <div className="analysis-page">

      {/* HEADER */}

      <div className="analysis-header">

        <div>

          <p className="breadcrumb">
            HEALTH INTELLIGENCE / AI ANALYSIS
          </p>

          <h3>
            Community Health Pattern Analysis
          </h3>

          <p>
            AI-powered detection of unusual
            geographic patterns in community
            health reports.
          </p>

        </div>


        <button
          className="view-button"
          onClick={fetchAnalysis}
        >
          ↻ Refresh Analysis
        </button>

      </div>


      {/* SUMMARY */}

      <div className="stats-grid">

        <StatCard
          title="Reports Analyzed"
          value={totalReports}
          change="LIVE"
          description="community reports"
          icon="▤"
          type="blue"
        />


        <StatCard
          title="Clusters Detected"
          value={clusters.length}
          change="AI"
          description="geographic patterns"
          icon="⌖"
          type="purple"
        />


        <StatCard
          title="People Affected"
          value={totalPeople}
          change="TOTAL"
          description="reported across areas"
          icon="●"
          type="orange"
        />


        <StatCard
          title="Engine Status"
          value="Active"
          change="LIVE"
          description="pattern detection running"
          icon="✓"
          type="green"
        />

      </div>


      {/* DETECTED CLUSTERS */}

      <div className="panel">

        <div className="panel-header">

          <div>

            <h3>
              Detected Health Clusters
            </h3>

            <p>
              Geographic groups identified from
              community health reports.
            </p>

          </div>


          <span className="ai-badge">
            ✦ AI DETECTED
          </span>

        </div>


        {clusters.length === 0 ? (

          <div className="coming-soon">

            <div className="placeholder-icon">
              ✓
            </div>

            <strong>
              No geographic clusters detected
            </strong>

            <p>
              The current reports do not contain
              enough nearby reports to form a cluster.
            </p>

          </div>

        ) : (

          <div className="cluster-cards">

            {clusters.map((cluster) => (

              <div
                className="cluster-card"
                key={cluster.cluster_id}
              >

                <div className="cluster-card-header">

                  <div>

                    <span className="cluster-label">
                      CLUSTER #{cluster.cluster_id}
                    </span>

                    <h3>
                      Geographic Health Pattern
                    </h3>

                  </div>


                  <div className="priority-badge">
                    INVESTIGATE
                  </div>

                </div>


                <div className="cluster-stats">

                  <div>

                    <span>
                      Reports
                    </span>

                    <strong>
                      {cluster.report_count}
                    </strong>

                  </div>


                  <div>

                    <span>
                      People Affected
                    </span>

                    <strong>
                      {cluster.people_affected}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Latitude
                    </span>

                    <strong>
                      {Number(
                        cluster.latitude
                      ).toFixed(4)}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Longitude
                    </span>

                    <strong>
                      {Number(
                        cluster.longitude
                      ).toFixed(4)}
                    </strong>

                  </div>

                </div>


                <div className="priority-section">

                  <div className="priority-heading">

                    <span>
                      Investigation Signal
                    </span>

                    <strong>
                      CLUSTER DETECTED
                    </strong>

                  </div>


                  <div className="priority-bar">

                    <div className="priority-fill"></div>

                  </div>


                  <small>
                    Multiple reports are geographically
                    concentrated in the same area.
                  </small>

                </div>


                <div className="why-flagged">

                  <div className="why-icon">
                    !
                  </div>


                  <div>

                    <strong>
                      Why was this flagged?
                    </strong>

                    <p>

                      HealthMap detected{" "}

                      <b>
                        {cluster.report_count}
                      </b>{" "}

                      reports within the configured
                      geographic analysis radius.

                      These reports collectively
                      represent{" "}

                      <b>
                        {cluster.people_affected}
                      </b>{" "}

                      people affected.

                    </p>

                  </div>

                </div>


                <div className="analysis-disclaimer">

                  <span>
                    ℹ
                  </span>

                  <p>
                    This is an investigation signal,
                    not a disease diagnosis or confirmed
                    outbreak.
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* HOW AI WORKS */}

      <div className="panel">

        <div className="panel-header">

          <div>

            <h3>
              How HealthMap Detects Patterns
            </h3>

            <p>
              The analysis pipeline used to identify
              geographic health signals.
            </p>

          </div>

          <span className="ai-badge">
            AI ENGINE
          </span>

        </div>


        <div className="ai-pipeline">

          <div className="pipeline-step">

            <div className="pipeline-number">
              1
            </div>

            <strong>
              Collect
            </strong>

            <span>
              Community health reports
            </span>

          </div>


          <div className="pipeline-arrow">
            →
          </div>


          <div className="pipeline-step">

            <div className="pipeline-number">
              2
            </div>

            <strong>
              Locate
            </strong>

            <span>
              Geographic coordinates
            </span>

          </div>


          <div className="pipeline-arrow">
            →
          </div>


          <div className="pipeline-step">

            <div className="pipeline-number">
              3
            </div>

            <strong>
              Cluster
            </strong>

            <span>
              Nearby reports
            </span>

          </div>


          <div className="pipeline-arrow">
            →
          </div>


          <div className="pipeline-step">

            <div className="pipeline-number">
              4
            </div>

            <strong>
              Investigate
            </strong>

            <span>
              Identify priority areas
            </span>

          </div>

        </div>

      </div>


      {/* FOOTER */}

      <div className="analysis-footer">

        <span>
          ✦
        </span>

        <p>
          HealthMap supports early investigation
          by identifying unusual geographic patterns.
          It does not diagnose diseases or confirm
          outbreaks.
        </p>

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