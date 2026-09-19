import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const severityColors = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#eab308",
};

function MapControls({ selectedSeverity, setSelectedSeverity }) {
  const map = useMap();

  return (
    <div className="map-controls">
      <button onClick={() => map.setZoom(map.getZoom() + 1)}>
        +
      </button>

      <button onClick={() => map.setZoom(map.getZoom() - 1)}>
        −
      </button>

      <select
        value={selectedSeverity}
        onChange={(e) => setSelectedSeverity(e.target.value)}
      >
        <option value="All">All activity</option>
        <option value="High">High activity</option>
        <option value="Medium">Moderate activity</option>
        <option value="Low">Low activity</option>
      </select>
    </div>
  );
}

function HealthMap() {
  const [reports, setReports] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get reports from FastAPI
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:8000/reports"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const data = await response.json();

        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err);

        setError(
          "Could not load health reports. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports =
    selectedSeverity === "All"
      ? reports
      : reports.filter(
          (report) => report.severity === selectedSeverity
        );

  return (
    <div className="health-map-page">

      {/* PAGE HEADER */}
      <div className="map-page-header">
        <div>
          <p className="breadcrumb">
            HEALTH INTELLIGENCE / MAP
          </p>

          <h2>Live Health Map</h2>

          <p className="map-subtitle">
            Geographic view of community health reports and emerging
            activity clusters.
          </p>
        </div>

        <div className="map-status">
          <span></span>
          Monitoring active
        </div>
      </div>


      {/* ERROR MESSAGE */}
      {error && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "16px",
            borderRadius: "10px",
            background: "#fee2e2",
            color: "#991b1b",
            fontWeight: "500",
          }}
        >
          {error}
        </div>
      )}


      {/* LOADING MESSAGE */}
      {loading && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "16px",
            borderRadius: "10px",
            background: "#f1f5f9",
            color: "#475569",
          }}
        >
          Loading health reports...
        </div>
      )}


      <div className="map-layout">

        {/* MAP */}
        <div className="large-map-card">

          <MapContainer
            center={[12.89, 74.855]}
            zoom={13}
            scrollWheelZoom={true}
            className="health-leaflet-map"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapControls
              selectedSeverity={selectedSeverity}
              setSelectedSeverity={setSelectedSeverity}
            />


            {/* REAL DATABASE REPORTS */}
            {filteredReports.map((report) => {

              const people = report.people_affected || 1;

              const radius =
                people >= 10
                  ? 18
                  : people >= 5
                  ? 13
                  : 9;

              const color =
                severityColors[report.severity] ||
                "#64748b";

              return (
                <CircleMarker
                  key={report.id}
                  center={[
                    report.latitude,
                    report.longitude,
                  ]}
                  radius={radius}
                  pathOptions={{
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.65,
                    weight: 3,
                  }}
                >

                  <Popup>

                    <div className="report-popup">

                      <span
                        className={`popup-severity ${
                          report.severity
                            ? report.severity.toLowerCase()
                            : ""
                        }`}
                      >
                        {report.severity} activity
                      </span>

                      <h3>
                        Community Report
                      </h3>

                      <p>
                        <strong>Category:</strong>{" "}
                        {report.category}
                      </p>

                      <p>
                        <strong>
                          People affected:
                        </strong>{" "}
                        {report.people_affected}
                      </p>

                      <p>
                        <strong>
                          Reporter:
                        </strong>{" "}
                        {report.reporter_type}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        {report.status}
                      </p>

                      {report.description && (
                        <p>
                          {report.description}
                        </p>
                      )}

                      <p
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                        }}
                      >
                        Report ID: #{report.id}
                      </p>

                      <button className="popup-button">
                        Investigate cluster →
                      </button>

                    </div>

                  </Popup>

                </CircleMarker>
              );
            })}

          </MapContainer>


          {/* MAP LEGEND */}
          <div className="map-key">

            <strong>Activity level</strong>

            <div>
              <span className="key-dot high"></span>
              High
            </div>

            <div>
              <span className="key-dot medium"></span>
              Moderate
            </div>

            <div>
              <span className="key-dot low"></span>
              Low
            </div>

          </div>

        </div>


        {/* SIDEBAR */}
        <aside className="map-sidebar">

          <div className="map-side-card">

            <div className="side-card-header">

              <div>
                <h3>Detected Activity</h3>

                <p>
                  Current database reports
                </p>
              </div>

              <strong>
                {filteredReports.length}
              </strong>

            </div>


            {/* NO REPORTS */}
            {!loading &&
              filteredReports.length === 0 && (
                <div
                  style={{
                    padding: "20px 0",
                    color: "#64748b",
                  }}
                >
                  No reports found.
                </div>
              )}


            {/* REPORT LIST */}
            <div className="activity-list">

              {filteredReports.map((report) => (

                <div
                  className="activity-item"
                  key={report.id}
                >

                  <span
                    className="activity-dot"
                    style={{
                      backgroundColor:
                        severityColors[
                          report.severity
                        ] || "#64748b",
                    }}
                  ></span>


                  <div>

                    <strong>
                      Report #{report.id}
                    </strong>

                    <span>
                      {report.category} •{" "}
                      {report.people_affected} people
                    </span>

                  </div>


                  <small>
                    {report.severity}
                  </small>

                </div>

              ))}

            </div>

          </div>


          {/* AI CARD */}
          <div className="map-side-card ai-map-card">

            <div className="ai-title">
              <span>✦</span>
              AI Pattern Detection
            </div>

            <h3>
              Pattern analysis coming next
            </h3>

            <p>
              HealthMap is currently displaying
              real community reports from the
              database. The AI engine will analyze
              geographic clustering and unusual
              activity next.
            </p>

            <div className="confidence-row">

              <span>
                Reports available
              </span>

              <strong>
                {reports.length}
              </strong>

            </div>

            <div className="confidence-bar">

              <div
                style={{
                  width:
                    reports.length > 0
                      ? "100%"
                      : "0%",
                }}
              ></div>

            </div>

            <button>
              View AI Analysis →
            </button>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default HealthMap;