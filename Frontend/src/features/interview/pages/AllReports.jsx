import React from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useInterview.jsx";
import "../style/allReports.scss";

const AllReports = () => {
  const { reports, loading } = useInterview();
  const navigate = useNavigate();

  if (loading) {
    return (
      <main className="all-reports">
        <div className="all-reports__card">
          <h1>Loading reports...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="all-reports">
      <div className="all-reports__card">
        <div className="all-reports__header">
          <div>
            <p className="eyebrow">Reports</p>
            <h1>All Interview Reports</h1>
            <p className="subtitle">Your generated interview strategies in one place.</p>
          </div>
          <button className="ghost-btn" onClick={() => navigate("/")}>Back to Home</button>
        </div>

        {reports.length === 0 ? (
          <div className="empty-state">
            <p>No reports yet. Generate your first interview plan from the Home page.</p>
            <div className="empty-actions">
              <button className="primary-btn" onClick={() => navigate("/")}>Generate Report</button>
              <button className="ghost-btn" onClick={() => navigate("/")}>Back to Home</button>
            </div>
          </div>
        ) : (
          <ul className="reports-grid">
            {reports.map((report) => (
              <li
                key={report._id}
                className="report-card"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <h3>{report.title || "Untitled Position"}</h3>
                <p className="meta">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                <p className={`score ${report.matchScore >= 80 ? "high" : report.matchScore >= 60 ? "mid" : "low"}`}>
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default AllReports;
