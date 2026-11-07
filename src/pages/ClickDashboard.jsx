import { useState } from 'react'
import '../layouts/DashboardLayout.css'

const PLATFORMS = ['Amazon', 'Flipkart', 'Meesho', 'All']
const CATEGORIES = ['All', 'T-Shirts', 'Shirts', 'Pants', 'Jeans', 'Kurtas', 'Sarees', 'Dresses', 'Jackets']

const clickData = [
  { product: 'Blue Denim Jeans', category: 'Jeans', amazon: 1240, flipkart: 870, meesho: 540, trending: true },
  { product: 'White Cotton Shirt', category: 'Shirts', amazon: 980, flipkart: 1120, meesho: 320, trending: false },
  { product: 'Graphic T-Shirt', category: 'T-Shirts', amazon: 760, flipkart: 650, meesho: 1340, trending: true },
  { product: 'Black Formal Pants', category: 'Pants', amazon: 540, flipkart: 490, meesho: 210, trending: false },
  { product: 'Floral Kurti', category: 'Kurtas', amazon: 320, flipkart: 410, meesho: 2140, trending: true },
  { product: 'Silk Saree', category: 'Sarees', amazon: 460, flipkart: 390, meesho: 1890, trending: true },
  { product: 'Bomber Jacket', category: 'Jackets', amazon: 890, flipkart: 720, meesho: 180, trending: false },
  { product: 'Flared Dress', category: 'Dresses', amazon: 380, flipkart: 420, meesho: 980, trending: false },
  { product: 'Polo T-Shirt', category: 'T-Shirts', amazon: 1050, flipkart: 820, meesho: 670, trending: true },
  { product: 'Chino Pants', category: 'Pants', amazon: 430, flipkart: 380, meesho: 190, trending: false },
]

const platformColors = { Amazon: '#FF9900', Flipkart: '#2874F0', Meesho: '#FF4F79' }
const platformBg = { Amazon: '#fff8ee', Flipkart: '#eef3ff', Meesho: '#fff0f4' }

function MiniBar({ value, max, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, background: '#f1f5f9', borderRadius: 999, height: 6, overflow: 'hidden' }}>
        <div style={{ width: `${(value / max) * 100}%`, background: color, height: '100%', borderRadius: 999, transition: 'width 0.4s' }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#374151', minWidth: 36, textAlign: 'right' }}>{value}</span>
    </div>
  )
}

export default function ClickDashboard() {
  const [platform, setPlatform] = useState('All')
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = clickData.filter(d =>
    (category === 'All' || d.category === category) &&
    d.product.toLowerCase().includes(search.toLowerCase())
  )

  const totalClicks = filtered.reduce((s, d) => s + d.amazon + d.flipkart + d.meesho, 0)
  const maxClicks = Math.max(...filtered.map(d => d.amazon + d.flipkart + d.meesho), 1)

  const platformTotals = {
    Amazon: filtered.reduce((s, d) => s + d.amazon, 0),
    Flipkart: filtered.reduce((s, d) => s + d.flipkart, 0),
    Meesho: filtered.reduce((s, d) => s + d.meesho, 0),
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">🖱️ Click Dashboard</div>
          <div className="page-sub">Track product clicks across Amazon, Flipkart & Meesho</div>
        </div>
      </div>

      {/* Platform summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
        {Object.entries(platformTotals).map(([name, clicks]) => (
          <div
            key={name}
            onClick={() => setPlatform(p => p === name ? 'All' : name)}
            style={{
              background: platformBg[name],
              border: `2px solid ${platform === name ? platformColors[name] : platformColors[name] + '33'}`,
              borderRadius: 14,
              padding: '20px 22px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 24 }}>
                {name === 'Amazon' ? '🛒' : name === 'Flipkart' ? '📦' : '🛍️'}
              </span>
              <span style={{ fontSize: 16, fontWeight: 800, color: platformColors[name] }}>{name}</span>
              {platform === name && (
                <span style={{ marginLeft: 'auto', background: platformColors[name], color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>ACTIVE</span>
              )}
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a' }}>{clicks.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Total Clicks</div>
            <div style={{ marginTop: 10, background: '#fff', borderRadius: 8, height: 6, overflow: 'hidden' }}>
              <div style={{ width: `${(clicks / (totalClicks || 1)) * 100}%`, background: platformColors[name], height: '100%', borderRadius: 8 }} />
            </div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
              {totalClicks ? ((clicks / totalClicks) * 100).toFixed(1) : 0}% of total
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Filter:</span>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: '5px 12px',
                borderRadius: 999,
                border: 'none',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                background: category === c ? '#6366f1' : '#f1f5f9',
                color: category === c ? '#fff' : '#374151',
                transition: 'all 0.15s',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 12px' }}>
          <span>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            style={{ border: 'none', background: 'transparent', fontSize: 13, outline: 'none', width: 160 }}
          />
        </div>
      </div>

      {/* Click table */}
      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-title">Product Click Analytics</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>
            Total clicks: <strong style={{ color: '#0f172a' }}>{totalClicks.toLocaleString()}</strong>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Amazon 🛒</th>
              <th>Flipkart 📦</th>
              <th>Meesho 🛍️</th>
              <th>Total</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => {
              const total = d.amazon + d.flipkart + d.meesho
              return (
                <tr key={d.product}>
                  <td style={{ color: '#94a3b8', fontWeight: 600 }}>{i + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{d.product}</td>
                  <td><span className="chip chip-purple">{d.category}</span></td>
                  <td>
                    {(platform === 'All' || platform === 'Amazon') &&
                      <MiniBar value={d.amazon} max={maxClicks} color="#FF9900" />}
                  </td>
                  <td>
                    {(platform === 'All' || platform === 'Flipkart') &&
                      <MiniBar value={d.flipkart} max={maxClicks} color="#2874F0" />}
                  </td>
                  <td>
                    {(platform === 'All' || platform === 'Meesho') &&
                      <MiniBar value={d.meesho} max={maxClicks} color="#FF4F79" />}
                  </td>
                  <td>
                    <span style={{ fontWeight: 800, fontSize: 14, color: '#0f172a' }}>{total.toLocaleString()}</span>
                  </td>
                  <td>
                    {d.trending
                      ? <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 13 }}>🔥 Hot</span>
                      : <span style={{ color: '#94a3b8', fontSize: 13 }}>— Stable</span>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

