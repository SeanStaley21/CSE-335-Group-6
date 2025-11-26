import React from 'react';

function TransactionTable({ transactions }) {
  const getTransactionColor = (type) => {
    return type.toLowerCase() === 'buy' ? '#15803d' : '#dc2626';
  };

  const getTransactionBg = (type) => {
    return type.toLowerCase() === 'buy' ? '#dcfce720' : '#fee2e220';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
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
      }}>Transaction History</h3>
      
      {transactions.length === 0 ? (
        <p style={{ 
          color: 'var(--text-secondary)', 
          textAlign: 'center',
          padding: '20px',
          margin: 0
        }}>
          No transactions yet
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'separate',
            borderSpacing: '0 8px'
          }}>
            <thead>
              <tr>
                <th style={{ 
                  padding: '12px 16px',
                  textAlign: 'left',
                  color: 'var(--text-secondary)',
                  fontWeight: '600',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Date</th>
                <th style={{ 
                  padding: '12px 16px',
                  textAlign: 'left',
                  color: 'var(--text-secondary)',
                  fontWeight: '600',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Symbol</th>
                <th style={{ 
                  padding: '12px 16px',
                  textAlign: 'left',
                  color: 'var(--text-secondary)',
                  fontWeight: '600',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Type</th>
                <th style={{ 
                  padding: '12px 16px',
                  textAlign: 'right',
                  color: 'var(--text-secondary)',
                  fontWeight: '600',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr 
                  key={index}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.01)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <td style={{ 
                    padding: '16px',
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px'
                  }}>
                    {formatDate(tx.date)}
                  </td>
                  <td style={{ 
                    padding: '16px',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}>
                    {tx.symbol}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      backgroundColor: getTransactionBg(tx.type),
                      color: getTransactionColor(tx.type),
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {tx.type}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '16px',
                    textAlign: 'right',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '15px',
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px'
                  }}>
                    {tx.amount} shares
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
