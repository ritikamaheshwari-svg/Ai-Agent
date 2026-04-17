import React, { useState } from 'react';
import { useSignals } from "../hooks/useSignals";
import type { Signal } from "../types/signal";

const SignalTable = () => {
  const { signals, loading } = useSignals();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (loading) return <div style={{ padding: '20px', color: 'var(--text-muted)' }}>Loading signals...</div>;

  // Sort by createdAt desc (new data on top)
  const sortedSignals = [...signals].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSignals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedSignals.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="card" style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      overflow: 'hidden'
    }}>
      <div className="card-head" style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span className="card-title" style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>Active Signals</span>
        <span className="live-badge" style={{
          fontSize: '11px',
          padding: '4px 10px',
          borderRadius: '20px',
          backgroundColor: 'rgba(0, 212, 170, 0.1)',
          color: 'var(--accent-primary)',
          border: '1px solid rgba(0, 212, 170, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span className="live-dot animate-pulse" style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)'
          }}></span>
          Live
        </span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Asset</th>
              <th style={thStyle}>Action</th>
              <th style={thStyle}>Confidence</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Change</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((signal: Signal) => (
              <tr key={signal._id} style={{ borderBottom: '1px solid var(--bg-main)', transition: 'background 0.2s' }} className="table-row-hover">
                <td style={{ ...tdStyle, fontSize: '11px', color: 'var(--text-muted)' }}>
                  {new Date(signal.createdAt).toLocaleDateString()} {new Date(signal.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td style={tdStyle}>{signal.asset}</td>
                <td style={tdStyle}>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    backgroundColor: signal.action === 'deposit' ? 'rgba(90, 173, 255, 0.1)' : 'rgba(192, 122, 255, 0.1)',
                    color: signal.action === 'deposit' ? '#5aadff' : '#c07aff'
                  }}>{signal.action}</span>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', width: '28px' }}>{signal.confidence?.toFixed(2)}</span>
                    <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${(signal.confidence || 0) * 100}%`, 
                        height: '100%', 
                        backgroundColor: (signal.confidence || 0) > 0.8 ? 'var(--accent-primary)' : 'var(--accent-warning)',
                        borderRadius: '2px'
                      }}></div>
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>{signal.price ? `$${signal.price.toLocaleString()}` : "-"}</td>
                <td style={{ ...tdStyle, color: (signal.change || 0) >= 0 ? 'var(--accent-primary)' : 'var(--accent-danger)' }}>
                  {signal.change ? `${signal.change > 0 ? '+' : ''}${signal.change.toFixed(2)}%` : "-"}
                </td>
                <td style={tdStyle}>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    fontWeight: 600,
                    backgroundColor: signal.executed ? 'rgba(0, 212, 170, 0.1)' : 'rgba(247, 195, 74, 0.1)',
                    color: signal.executed ? 'var(--accent-primary)' : 'var(--accent-warning)',
                    border: `1px solid ${signal.executed ? 'rgba(0, 212, 170, 0.2)' : 'rgba(247, 195, 74, 0.2)'}`
                  }}>{signal.executed ? "Executed" : "Pending"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ 
          padding: '12px 24px', 
          borderTop: '1px solid var(--border-color)', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '8px',
          alignItems: 'center'
        }}>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            style={paginationButtonStyle}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              onClick={() => paginate(i + 1)}
              style={{
                ...paginationButtonStyle,
                backgroundColor: currentPage === i + 1 ? 'var(--accent-primary)' : 'transparent',
                color: currentPage === i + 1 ? 'var(--bg-card)' : 'var(--text-primary)',
                borderColor: currentPage === i + 1 ? 'var(--accent-primary)' : 'var(--border-color)'
              }}
            >
              {i + 1}
            </button>
          ))}
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            style={paginationButtonStyle}
          >
            Next
          </button>
        </div>
      )}

      <style>{`
        .table-row-hover:hover { background-color: var(--bg-hover) !important; }
      `}</style>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '12px 24px',
  fontSize: '10px',
  fontWeight: 600,
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em'
};

const tdStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '13px',
  color: 'var(--text-primary)'
};

const paginationButtonStyle: React.CSSProperties = {
  padding: '4px 10px',
  fontSize: '11px',
  borderRadius: '6px',
  border: '1px solid var(--border-color)',
  backgroundColor: 'transparent',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  transition: 'all 0.2s'
};

export default SignalTable;