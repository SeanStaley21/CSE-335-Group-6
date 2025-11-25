import React from 'react';

function AlertList({ alerts }) {
  const getConditionSymbol = (condition) => {
    switch(condition) {
      case '>': return '▲';
      case '<': return '▼';
      case '>=': return '▲';
      case '<=': return '▼';
      case '==': return '=';
      default: return condition;
    }
  };

  const getConditionColor = (condition) => {
    if (condition === '>' || condition === '>=') return '#15803d';
    if (condition === '<' || condition === '<=') return '#dc2626';
    return '#3b82f6';
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: 'var(--bg-card)',
      borderRadius: '12px',
      border: '1px solid var(--border-color)'
    }}>
      <h3 style={{ 
        margin: '0 0 16px 0', 
        color: 'var(--text-primary)',
        fontSize: '20px',
        fontWeight: '600'
      }}>Active Alerts</h3>
      
      {alerts.length === 0 ? (
        <p style={{ 
          color: 'var(--text-secondary)', 
          textAlign: 'center',
          padding: '20px',
          margin: 0
        }}>
          No active alerts
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.map((alert, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '8px',
                border: `2px solid ${getConditionColor(alert.condition)}20`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: `${getConditionColor(alert.condition)}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: getConditionColor(alert.condition),
                  fontWeight: 'bold'
                }}>
                  {getConditionSymbol(alert.condition)}
                </div>
                <div>
                  <div style={{ 
                    fontWeight: '600', 
                    fontSize: '16px',
                    color: 'var(--text-primary)'
                  }}>
                    {alert.symbol}
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: 'var(--text-secondary)',
                    marginTop: '2px'
                  }}>
                    Alert when {alert.condition} ${alert.threshold}
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: getConditionColor(alert.condition)
              }}>
                ${alert.threshold}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlertList;
