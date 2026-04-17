import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="topbar" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 24px',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-card)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div className="logo" style={{
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div className="logo-dot animate-pulse" style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-primary)',
          boxShadow: '0 0 10px var(--accent-primary)'
        }}></div>
        Autonomous Vault
      </div>
      <div className="ticker" style={{ display: 'flex', gap: '24px' }}>
        <TickerItem symbol="SOL" price="$87.62" change="+0.05%" isUp={true} />
        <TickerItem symbol="BTC" price="$74,685" change="-0.01%" isUp={false} />
        <TickerItem symbol="ETH" price="$2,321" change="-0.02%" isUp={false} />
      </div>
    </div>
  );
};

interface TickerItemProps {
  symbol: string;
  price: string;
  change: string;
  isUp: boolean;
}

const TickerItem: React.FC<TickerItemProps> = ({ symbol, price, change, isUp }) => (
  <div className="tick" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
    <span className="tick-sym" style={{ color: 'var(--text-secondary)' }}>{symbol}</span>
    <span className="tick-price" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{price}</span>
    <span className="tick-chg" style={{ color: isUp ? 'var(--accent-primary)' : 'var(--accent-danger)' }}>{change}</span>
  </div>
);

export default TopBar;
