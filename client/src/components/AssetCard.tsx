import React from 'react';

interface AssetCardProps {
  name: string;
  ticker: string;
  price: string;
  change: string;
  isUp: boolean;
  type: 'sol' | 'btc' | 'eth';
}

const AssetCard: React.FC<AssetCardProps> = ({ name, ticker, price, change, isUp, type }) => {
  const getIconStyles = () => {
    switch(type) {
      case 'sol': return { background: '#180f2a', color: '#9945ff', border: '1px solid #9945ff33' };
      case 'btc': return { background: '#1a1100', color: '#f7931a', border: '1px solid #f7931a33' };
      case 'eth': return { background: '#0a1020', color: '#627eea', border: '1px solid #627eea33' };
      default: return {};
    }
  };

  return (
    <div className="asset-card" style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flex: 1
    }}>
      <div className="a-icon" style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: 700,
        flexShrink: 0,
        ...getIconStyles()
      }}>
        {ticker}
      </div>
      <div style={{ flex: 1 }}>
        <div className="a-name" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{name}</div>
        <div className="a-ticker" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{ticker}</div>
      </div>
      <div className="a-right" style={{ textAlign: 'right' }}>
        <div className="a-price" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{price}</div>
        <div className="a-chg" style={{ 
          fontSize: '12px', 
          color: isUp ? 'var(--accent-primary)' : 'var(--accent-danger)',
          marginTop: '2px'
        }}>
          {change}
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
