import React from 'react';

function AlertList({ alerts }) {
  return (
    <div>
      <h3>Active Alerts</h3>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>
            {alert.symbol} — {alert.condition} {alert.threshold}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlertList;
