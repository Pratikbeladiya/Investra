import React from "react";
import TimelineIcon from '@mui/icons-material/Timeline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const partnerApps = [
  {
    name: "Sensibull",
    description: "Options trading platform for building, analyzing, and executing option strategies with professional-grade tools.",
    icon: <ShowChartIcon style={{ fontSize: 32, color: "#e63946" }} />,
    tag: "Options",
    tagColor: "#e63946",
    bgColor: "rgba(230,57,70,0.1)"
  },
  {
    name: "Smallcase",
    description: "Invest in thematic portfolios of stocks and ETFs managed by SEBI-registered experts.",
    icon: <PieChartIcon style={{ fontSize: 32, color: "#457b9d" }} />,
    tag: "Investing",
    tagColor: "#457b9d",
    bgColor: "rgba(69,123,157,0.1)"
  },
  {
    name: "Streak",
    description: "Algo trading platform to create, backtest, and deploy strategies without writing a single line of code.",
    icon: <AutoGraphIcon style={{ fontSize: 32, color: "#2a9d8f" }} />,
    tag: "Algo Trading",
    tagColor: "#2a9d8f",
    bgColor: "rgba(42,157,143,0.1)"
  },
  {
    name: "Tijori",
    description: "Fundamental analysis and research platform for deep stock, sector, and economy-level insights.",
    icon: <TimelineIcon style={{ fontSize: 32, color: "#7b5ea7" }} />,
    tag: "Research",
    tagColor: "#7b5ea7",
    bgColor: "rgba(123,94,167,0.1)"
  },
  {
    name: "Ditto",
    description: "Insurance advisory platform that helps you get the right term and health insurance without jargon.",
    icon: <BarChartIcon style={{ fontSize: 32, color: "#e07a5f" }} />,
    tag: "Insurance",
    tagColor: "#e07a5f",
    bgColor: "rgba(224,122,95,0.1)"
  },
  {
    name: "Kite MF",
    description: "Invest in direct mutual funds at zero commission. SIP, lump sum & more — all in one place.",
    icon: <TrendingUpIcon style={{ fontSize: 32, color: "#00d09c" }} />,
    tag: "Mutual Funds",
    tagColor: "#00d09c",
    bgColor: "rgba(0,208,156,0.1)"
  }
];

const Apps = () => {
  return (
    <div style={{ padding: "22px 24px", background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.45rem", fontWeight: "800", margin: "0 0 4px", color: "var(--text-primary)" }}>
            Partner Apps
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
            Discover and connect with top trading &amp; investment platforms directly from your account.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "18px"
        }}>
          {partnerApps.map((app, index) => (
            <div
              key={index}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                transition: "all 0.25s ease",
                cursor: "default"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.15)";
                e.currentTarget.style.borderColor = app.tagColor;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            >
              {/* Top row: icon + name + tag */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: app.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  {app.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: "0 0 4px", fontWeight: "800", fontSize: "1rem", color: "var(--text-primary)" }}>
                    {app.name}
                  </p>
                  <span style={{
                    display: "inline-block",
                    padding: "2px 9px",
                    borderRadius: "20px",
                    fontSize: "0.68rem",
                    fontWeight: "700",
                    color: app.tagColor,
                    background: app.bgColor,
                    letterSpacing: "0.3px"
                  }}>
                    {app.tag}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p style={{
                margin: 0,
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                flexGrow: 1
              }}>
                {app.description}
              </p>

              {/* Connect button */}
              <button
                onClick={() => alert(`Successfully Connected to ${app.name}!`)}
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "10px",
                  border: `1px solid ${app.tagColor}`,
                  background: "transparent",
                  color: app.tagColor,
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = app.bgColor;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apps;
