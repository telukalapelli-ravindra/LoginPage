import { useNavigate } from 'react-router-dom'
import '../layouts/DashboardLayout.css'

const stats = [
  { label: 'Total Revenue', value: '₹24.8L', change: '+12.5%', dir: 'up', icon: '💰', color: '#fef3c7', iconColor: '#f59e0b' },
  { label: 'Total Orders', value: '8,432', change: '+8.2%', dir: 'up', icon: '📦', color: '#dbeafe', iconColor: '#3b82f6' },
  { label: 'Products', value: '1,290', change: '+3.1%', dir: 'up', icon: '🛒', color: '#ede9fe', iconColor: '#7c3aed' },
  { label: 'Customers', value: '4,710', change: '+18.4%', dir: 'up', icon: '👥', color: '#dcfce7', iconColor: '#22c55e' },
]

const platforms = [
  { name: 'Amazon', slug: 'amazon', logo: '🛒', color: '#FF9900', bg: '#fff8ee', revenue: '₹11.2L', orders: 3840, growth: '+14%' },
  { name: 'Flipkart', slug: 'flipkart', logo: '📦', color: '#2874F0', bg: '#eef3ff', revenue: '₹8.9L', orders: 2910, growth: '+9%' },
  { name: 'Meesho', slug: 'meesho', logo: '🛍️', color: '#FF4F79', bg: '#fff0f4', revenue: '₹4.7L', orders: 1682, growth: '+22%' },
]

const recentOrders = [
  { id: '#ORD-1021', product: 'Blue Denim Jeans', platform: 'Amazon', customer: 'Rohit Sharma', amount: '₹1,299', status: 'Delivered' },
  { id: '#ORD-1020', product: 'White Cotton Shirt', platform: 'Flipkart', customer: 'Priya Verma', amount: '₹799', status: 'Shipped' },
  { id: '#ORD-1019', product: 'Floral Kurti', platform: 'Meesho', customer: 'Anjali Singh', amount: '₹499', status: 'Processing' },
  { id: '#ORD-1018', product: 'Black Formal Pants', platform: 'Amazon', customer: 'Amit Patel', amount: '₹1,599', status: 'Delivered' },
  { id: '#ORD-1017', product: 'Graphic T-Shirt', platform: 'Meesho', customer: 'Sonal Mehta', amount: '₹349', status: 'Cancelled' },
]

const statusChip = s => {
  const map = { Delivered: 'chip-green', Shipped: 'chip-blue', Processing: 'chip-orange', Cancelled: 'chip-red' }
  return map[s] || 'chip-blue'
}

const platformChip = p => {
  const map = { Amazon: 'chip-orange', Flipkart: 'chip-blue', Meesho: 'chip-pink' }
  return map[p] || 'chip-blue'
}

export default function DashboardHome() {
  const navigate = useNavigate()

  //  const response= dashBoard();
  //  useEffect(() =>{
  //   if(response)
  //     return navigate("/login")
  //  })

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-sub">Welcome back, Admin 👋  Here's what's happening today.</div>
        </div>
        <button className="btn-primary" onClick={() => navigate('/dashboard/click-dashboard')}>
          🖱️ Click Dashboard
        </button>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        {stats.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon" style={{ background: s.color }}>
              <span style={{ color: s.iconColor }}>{s.icon}</span>
            </div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-change ${s.dir}`}>{s.change} this month</div>
            </div>
          </div>
        ))}
      </div>

      

      {/* Platform quick tiles */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Platform Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {platforms.map(p => (
            <div
              key={p.slug}
              onClick={() => navigate(`/dashboard/platform/${p.slug}`)}
              style={{
                background: p.bg,
                border: `1.5px solid ${p.color}22`,
                borderRadius: 14,
                padding: '20px 22px',
                cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${p.color}30` }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 28 }}>{p.logo}</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: p.color }}>{p.name}</span>
                <span style={{ marginLeft: 'auto', background: p.color + '22', color: p.color, borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>{p.growth}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{p.revenue}</div>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Revenue</div>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{p.orders}</div>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Orders</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 28 }}>
        {[
          { label: 'Add Product', icon: '➕', path: '/dashboard/products', color: '#6366f1' },
          { label: 'Add Category', icon: '🗂️', path: '/dashboard/categories', color: '#8b5cf6' },
          { label: 'Add Banner', icon: '🖼️', path: '/dashboard/banners', color: '#ec4899' },
          { label: 'View Orders', icon: '📋', path: '/dashboard/orders', color: '#f59e0b' },
        ].map(a => (
          <button
            key={a.label}
            onClick={() => navigate(a.path)}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '14px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontWeight: 600,
              fontSize: 13,
              color: '#374151',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.color = a.color }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#374151' }}
          >
            <span style={{ fontSize: 20 }}>{a.icon}</span>
            {a.label}
          </button>
        ))}
      </div>

      {/* Recent orders table */}
      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-title">Recent Orders</div>
          <button className="btn-secondary" onClick={() => navigate('/dashboard/orders')}>View All →</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Platform</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(o => (
              <tr key={o.id}>
                <td style={{ fontWeight: 700, color: '#6366f1' }}>{o.id}</td>
                <td>{o.product}</td>
                <td><span className={`chip ${platformChip(o.platform)}`}>{o.platform}</span></td>
                <td>{o.customer}</td>
                <td style={{ fontWeight: 700 }}>{o.amount}</td>
                <td><span className={`chip ${statusChip(o.status)}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

