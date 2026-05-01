function ProductivityMeter({ score }) {
  // Handle edge cases: undefined, null, or NaN
  const safeScore = score !== null && score !== undefined && !isNaN(score) 
    ? Math.max(0, Math.min(100, Number(score))) 
    : 0;

  // Decide color based on score
  const getColor = () => {
    if (safeScore < 40) return "#ef4444"; // red
    if (safeScore < 70) return "#f59e0b"; // yellow/orange
    return "#22c55e"; // green
  };

  const color = getColor();

  return (
    <div className="productivity-meter-card">
      <div className="meter-header">
        <span className="meter-icon">🎯</span>
        <h3 className="meter-title">Productivity Score</h3>
      </div>
      
      <div className="meter-container">
        <div className="meter-bar-bg">
          <div
            className="meter-bar-fill"
            style={{
              width: `${safeScore}%`,
              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            }}
          />
        </div>
        <div className="meter-label">
          <span className="meter-percentage">{safeScore}%</span>
          <span className="meter-text">productive</span>
        </div>
      </div>
    </div>
  );
}

export default ProductivityMeter;
