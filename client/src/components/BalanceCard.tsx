import React from 'react';

interface BalanceCardProps {
  label: string;
  value: string;
  subtext: string;
  isLoading?: boolean;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ label, value, subtext, isLoading }) => {
  return (
    <div className="bal-card" style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '24px',
      flex: 1,
      transition: 'transform 0.2s, border-color 0.2s',
      cursor: 'default'
    }}>
      <div className="bal-label" style={{
        fontSize: '11px',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '12px',
        fontWeight: 600
      }}>
        {label}
      </div>
      <div className="bal-val" style={{
        fontSize: '28px',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '6px'
      }}>
        {isLoading ? '...' : value}
      </div>
      <div className="bal-sub" style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)'
      }}>
        {subtext}
      </div>
    </div>
  );
};

export default BalanceCard;
