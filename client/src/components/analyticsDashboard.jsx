import { useEffect, useState } from "react";
import {
  fetchTodayTotal,
  fetchCategoryAnalytics,
  fetchDailyAnalytics,
  fetchWeeklyAnalytics,
  fetchTodayProductivity,
  fetchWeeklyProductivity,
} from "../services/analyticsService";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ProductivityMeter from "./ProductivityMeter";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function AnalyticsDashboard({ refreshTrigger }) {
  const [todayTotal, setTodayTotal] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  const loadAnalytics = async () => {
    try {
      const todayData = await fetchTodayTotal();
      setTodayTotal((todayData && todayData.totalTime) || 0);

      const cat = await fetchCategoryAnalytics();
      setCategoryData(Array.isArray(cat) ? cat : []);

      const daily = await fetchDailyAnalytics();
      setDailyData(Array.isArray(daily) ? daily : []);
    } catch (error) {
      console.error("Error loading analytics:", error);
      setCategoryData([]);
      setDailyData([]);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [refreshTrigger]);

  const [weeklyData, setWeeklyData] = useState([]);
  useEffect(() => {
    const loadWeekly = async () => {
      try {
        const data = await fetchWeeklyAnalytics();
        setWeeklyData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading weekly analytics:", error);
        setWeeklyData([]);
      }
    };
    loadWeekly();
  }, [refreshTrigger]);

  const [timeframe, setTimeframe] = useState("today");
  const [productivity, setProductivity] = useState(null);
  useEffect(() => {
    const loadProductivity = async () => {
      try {
        const data =
          timeframe === "today"
            ? await fetchTodayProductivity()
            : await fetchWeeklyProductivity();
        if (data && typeof data === "object") {
          setProductivity(data);
        } else {
          setProductivity({
            productivityScore: 0,
            productiveTime: 0,
            totalTime: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching productivity:", error);
        setProductivity({
          productivityScore: 0,
          productiveTime: 0,
          totalTime: 0,
        });
      }
    };
    loadProductivity();
  }, [timeframe, refreshTrigger]);

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h2 className="dashboard-title">📊 Productivity Dashboard</h2>
        <div className="timeframe-toggle">
          <button
            className={`timeframe-btn ${timeframe === "today" ? "active" : ""}`}
            onClick={() => setTimeframe("today")}
          >
            Today
          </button>
          <button
            className={`timeframe-btn ${timeframe === "week" ? "active" : ""}`}
            onClick={() => setTimeframe("week")}
          >
            This Week
          </button>
        </div>
      </div>

      {productivity && (
        <div className="stats-grid">
          <div className="stat-card stat-primary">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-label">Productivity Score</div>
              <div className="stat-value">{productivity.productivityScore || 0}%</div>
            </div>
          </div>
          <div className="stat-card stat-success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">Productive Time</div>
              <div className="stat-value">{productivity.productiveTime || 0}m</div>
            </div>
          </div>
          <div className="stat-card stat-info">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-label">Total Time</div>
              <div className="stat-value">{productivity.totalTime || 0}m</div>
            </div>
          </div>
          <div className="stat-card stat-warning">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <div className="stat-label">Today's Total</div>
              <div className="stat-value">{todayTotal}m</div>
            </div>
          </div>
        </div>
      )}

      {productivity && (
        <div className="meter-section">
          <ProductivityMeter score={productivity.productivityScore} />
        </div>
      )}

      <div className="charts-section">
        {categoryData.length > 0 && (
          <div className="chart-card">
            <h3 className="chart-title">📈 Time by Category</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="totalTime"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {dailyData.length > 0 && (
          <div className="chart-card">
            <h3 className="chart-title">📊 Daily Breakdown</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dailyData}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalTime" fill="#667eea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {weeklyData.length > 0 && (
          <div className="chart-card">
            <h3 className="chart-title">📉 Weekly Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="totalTime" 
                  stroke="#667eea" 
                  strokeWidth={3}
                  dot={{ fill: "#667eea", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
