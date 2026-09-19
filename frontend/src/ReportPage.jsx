import { useState } from "react";

const locationCoordinates = {
  Kavoor: {
    latitude: 12.925,
    longitude: 74.86,
  },

  Kadri: {
    latitude: 12.889,
    longitude: 74.856,
  },

  Bejai: {
    latitude: 12.884,
    longitude: 74.849,
  },

  Kottara: {
    latitude: 12.916,
    longitude: 74.85,
  },

  Bendoor: {
    latitude: 12.872,
    longitude: 74.848,
  },

  Adyar: {
    latitude: 12.861,
    longitude: 74.896,
  },
};


function ReportPage() {
  const [form, setForm] = useState({
    category: "",
    severity: "Medium",
    people: 1,
    location: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Get coordinates for selected locality
      const coordinates =
        locationCoordinates[form.location];

      if (!coordinates) {
        alert("Please select a valid locality.");
        return;
      }


      const response = await fetch(
        "http://127.0.0.1:8000/reports",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            latitude: coordinates.latitude,

            longitude: coordinates.longitude,

            category: form.category,

            severity: form.severity,

            people_affected: Number(form.people),

            reporter_type: "Community",

            description: form.description,

          }),
        }
      );


      if (!response.ok) {
        throw new Error(
          "Failed to submit report"
        );
      }


      const data = await response.json();

      console.log(
        "Report saved:",
        data
      );


      setSubmitted(true);


      // Clear form after successful submission
      setForm({
        category: "",
        severity: "Medium",
        people: 1,
        location: "",
        description: "",
      });


    } catch (error) {

      console.error(
        "Error submitting report:",
        error
      );

      alert(
        "Could not submit the report. Please make sure the backend is running."
      );

    }
  };


  return (
    <div className="report-page">

      {/* HEADER */}

      <div className="report-header">

        <div>

          <p className="breadcrumb">
            HEALTH INTELLIGENCE / REPORT
          </p>

          <h2>
            Report a Health Concern
          </h2>

          <p>
            Share a community health concern to help HealthMap
            identify unusual patterns early.
          </p>

        </div>

        <div className="privacy-badge">
          🔒 Privacy protected
        </div>

      </div>


      {/* MAIN */}

      <div className="report-layout">


        {/* FORM */}

        <div className="report-form-card">

          <div className="form-card-header">

            <div className="form-number">
              01
            </div>

            <div>

              <h3>
                Health Concern Details
              </h3>

              <p>
                Tell us what you observed. No personal
                information is required.
              </p>

            </div>

          </div>


          <form onSubmit={handleSubmit}>


            {/* CATEGORY */}

            <div className="form-group">

              <label>
                What type of concern are you reporting?
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select a health concern
                </option>

                <option value="Fever">
                  Fever / flu-like symptoms
                </option>

                <option value="Respiratory">
                  Respiratory symptoms
                </option>

                <option value="Water-related">
                  Water-related concern
                </option>

                <option value="Food-related">
                  Food-related concern
                </option>

                <option value="Vector-borne">
                  Vector-borne concern
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* SEVERITY */}

            <div className="form-group">

              <label>
                How serious does the situation appear?
              </label>

              <div className="severity-options">


                <label
                  className={`severity-option ${
                    form.severity === "Low"
                      ? "selected low"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="severity"
                    value="Low"
                    checked={
                      form.severity === "Low"
                    }
                    onChange={handleChange}
                  />

                  <span className="severity-circle low-circle">
                    ●
                  </span>

                  <div>

                    <strong>
                      Low
                    </strong>

                    <small>
                      Small or isolated concern
                    </small>

                  </div>

                </label>


                <label
                  className={`severity-option ${
                    form.severity === "Medium"
                      ? "selected medium"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="severity"
                    value="Medium"
                    checked={
                      form.severity === "Medium"
                    }
                    onChange={handleChange}
                  />

                  <span className="severity-circle medium-circle">
                    ●
                  </span>

                  <div>

                    <strong>
                      Medium
                    </strong>

                    <small>
                      Needs monitoring
                    </small>

                  </div>

                </label>


                <label
                  className={`severity-option ${
                    form.severity === "High"
                      ? "selected high"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="severity"
                    value="High"
                    checked={
                      form.severity === "High"
                    }
                    onChange={handleChange}
                  />

                  <span className="severity-circle high-circle">
                    ●
                  </span>

                  <div>

                    <strong>
                      High
                    </strong>

                    <small>
                      Needs investigation
                    </small>

                  </div>

                </label>

              </div>

            </div>


            {/* PEOPLE */}

            <div className="form-group">

              <label>
                Approximately how many people are affected?
              </label>

              <input
                type="number"
                name="people"
                min="1"
                value={form.people}
                onChange={handleChange}
                required
              />

              <small className="field-help">
                An approximate number is enough.
              </small>

            </div>


            {/* LOCATION */}

            <div className="form-group">

              <label>
                Where is this happening?
              </label>


              <div className="location-input">

                <span>
                  📍
                </span>


                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select locality
                  </option>

                  <option value="Kavoor">
                    Kavoor
                  </option>

                  <option value="Kadri">
                    Kadri
                  </option>

                  <option value="Bejai">
                    Bejai
                  </option>

                  <option value="Kottara">
                    Kottara
                  </option>

                  <option value="Bendoor">
                    Bendoor
                  </option>

                  <option value="Adyar">
                    Adyar
                  </option>

                </select>

              </div>


              <small className="field-help">

                Select an area or locality. Do not enter a
                house number or exact residential address.

              </small>

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                What did you observe?
              </label>

              <textarea
                name="description"
                rows="5"
                placeholder="Example: Several people in the area have reported fever over the last two days..."
                value={form.description}
                onChange={handleChange}
              />

              <small className="field-help">

                Please don't include names, phone numbers,
                medical record numbers, or other personal
                information.

              </small>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="submit-report-button"
            >
              Submit Health Report →
            </button>


            {submitted && (

              <div className="success-message">

                <span>
                  ✓
                </span>

                <div>

                  <strong>
                    Report submitted successfully
                  </strong>

                  <p>
                    Your report has been added to the
                    HealthMap monitoring queue.
                  </p>

                </div>

              </div>

            )}

          </form>

        </div>


        {/* RIGHT SIDE */}

        <aside className="report-side">

          <div className="side-info-card">

            <div className="side-info-icon">
              ✦
            </div>

            <h3>
              How HealthMap works
            </h3>

            <p>
              Your report becomes one signal in a larger
              community health picture.
            </p>


            <div className="process-step">

              <span>1</span>

              <div>

                <strong>
                  Report
                </strong>

                <small>
                  Community concern is submitted
                </small>

              </div>

            </div>


            <div className="process-line"></div>


            <div className="process-step">

              <span>2</span>

              <div>

                <strong>
                  Correlate
                </strong>

                <small>
                  Reports are grouped by location
                </small>

              </div>

            </div>


            <div className="process-line"></div>


            <div className="process-step">

              <span>3</span>

              <div>

                <strong>
                  Detect
                </strong>

                <small>
                  Unusual patterns are identified
                </small>

              </div>

            </div>


            <div className="process-line"></div>


            <div className="process-step">

              <span>4</span>

              <div>

                <strong>
                  Investigate
                </strong>

                <small>
                  Priority clusters are reviewed
                </small>

              </div>

            </div>

          </div>


          <div className="important-card">

            <div className="important-title">
              ⚠ Important
            </div>

            <p>
              HealthMap is an early-warning and
              investigation-support system. It does not
              diagnose diseases or confirm outbreaks.
            </p>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default ReportPage;