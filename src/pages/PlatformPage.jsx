import { useParams } from 'react-router-dom'
import '../layouts/DashboardLayout.css'

const PLATFORM_DATA = {
  amazon: {
    name: 'Amazon', logo: '🛒', color: '#FF9900', bg: '#fff8ee',
    revenue: '₹11,20,000', orders: 3840, products: 486, rating: 4.3,
    topCategories: [
      { name: 'Jeans', clicks: 1240, orders: 580 },
      { name: 'Shirts', clicks: 980, orders: 420 },
      { name: 'T-Shirts', clicks: 760, orders: 310 },
      { name: 'Jackets', clicks: 540, orders: 190 },
      { name: 'Pants', clicks: 430, orders: 160 },
    ],
    recentOrders: [
      { id: '#AMZ-1021', product: 'Blue Denim Jeans', amount: '₹1,299', status: 'Delivered', date: '2 Nov 2026' },
      { id: '#AMZ-1020', product: 'White Shirt', amount: '₹799', status: 'Shipped', date: '1 Nov 2026' },
      { id: '#AMZ-1019', product: 'Bomber Jacket', amount: '₹2,499', status: 'Delivered', date: '31 Oct 2026' },
      { id: '#AMZ-1018', product: 'Polo T-Shirt', amount: '₹599', status: 'Processing', date: '30 Oct 2026' },
    ],
  },
  flipkart: {
    name: 'Flipkart', logo: '📦', color: '#2874F0', bg: '#eef3ff',
    revenue: '₹8,90,000', orders: 2910, products: 372, rating: 4.1,
    topCategories: [
      { name: 'Shirts', clicks: 1120, orders: 490 },
      { name: 'Jeans', clicks: 870, orders: 380 },
      { name: 'T-Shirts', clicks: 650, orders: 290 },
      { name: 'Dresses', clicks: 420, orders: 180 },
      { name: 'Kurtas', clicks: 410, orders: 170 },
    ],
    recentOrders: [
      { id: '#FLK-2041', product: 'White Cotton Shirt', amount: '₹799', status: 'Shipped', date: '2 Nov 2026' },
      { id: '#FLK-2040', product: 'Flared Dress', amount: '₹1,199', status: 'Delivered', date: '31 Oct 2026' },
      { id: '#FLK-2039', product: 'Black Formal Pants', amount: '₹1,599', status: 'Processing', date: '30 Oct 2026' },
      { id: '#FLK-2038', product: 'Slim Fit Jeans', amount: '₹1,099', status: 'Delivered', date: '28 Oct 2026' },
    ],
  },
  meesho: {
    name: 'Meesho', logo: '🛍️', color: '#FF4F79', bg: '#fff0f4',
    revenue: '₹4,70,000', orders: 1682, products: 621, rating: 3.9,
    topCategories: [
      { name: 'Kurtas', clicks: 2140, orders: 870 },
      { name: 'Sarees', clicks: 1890, orders: 720 },
      { name: 'T-Shirts', clicks: 1340, orders: 510 },
      { name: 'Dresses', clicks: 980, orders: 390 },
      { name: 'Jeans', clicks: 540, orders: 190 },
    ],
    recentOrders: [
      { id: '#MSH-3011', product: 'Floral Kurti', amount: '₹499', status: 'Delivered', date: '3 Nov 2026' },
      { id: '#MSH-3010', product: 'Silk Saree', amount: '₹1,299', status: 'Shipped', date: '2 Nov 2026' },
      { id: '#MSH-3009', product: 'Graphic T-Shirt', amount: '₹349', status: 'Delivered', date: '1 Nov 2026' },
      { id: '#MSH-3008', product: 'Printed Dress', amount: '₹699', status: 'Cancelled', date: '30 Oct 2026' },
    ],
  },
}

const statusChip = s => {
  const map = { Delivered: 'chip-green', Shipped: 'chip-blue', Processing: 'chip-orange', Cancelled: 'chip-red' }
  return map[s] || 'chip-blue'
}

export default function PlatformPage() {
  const { slug } = useParams()
  const data = PLATFORM_DATA[slug]

  if (!data) return (
    <div style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>
      <div style={{ fontSize: 48 }}>❓</div>
      <div style={{ fontSize: 20, fontWeight: 700, marginTop: 10 }}>Platform not found</div>
    </div>
  )

  const maxClicks = Math.max(...data.topCategories.map(c => c.clicks))

  return (
    <div>
      {/* Header */}
      <div
        style={{
          background: data.bg,
          border: `1.5px solid ${data.color}33`,
          borderRadius: 16,
          padding: '24px 28px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <span style={{ fontSize: 56 }}>{data.logo}</span>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color: data.color, letterSpacing: '-0.02em' }}>{data.name}</div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 2 }}>Platform performance overview</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ color: s <= Math.round(data.rating) ? '#f59e0b' : '#e2e8f0', fontSize: 18 }}>★</span>
            ))}
            <span style={{ fontSize: 13, color: '#64748b', alignSelf: 'center' }}>({data.rating})</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, textAlign: 'center' }}>
          {[
            { label: 'Revenue', value: data.revenue },
            { label: 'Orders', value: data.orders.toLocaleString() },
            { label: 'Products', value: data.products },
          ].map(m => (
            <div key={m.label} style={{ background: '#fff', borderRadius: 10, padding: '12px 20px', border: `1px solid ${data.color}22` }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{m.value}</div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Top categories */}
        <div className="table-card">
          <div className="table-toolbar">
            <div className="table-toolbar-title">Top Categories by Clicks</div>
          </div>
          <div style={{ padding: '0 20px 20px' }}>
            {data.topCategories.map(c => (
              <div key={c.name} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{c.name}</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{c.orders} orders</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, background: '#f1f5f9', borderRadius: 999, height: 8 }}>
                    <div style={{
                      width: `${(c.clicks / maxClicks) * 100}%`,
                      background: data.color,
                      height: '100%',
                      borderRadius: 999,
                      transition: 'width 0.5s',
                    }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#374151', minWidth: 40, textAlign: 'right' }}>
                    {c.clicks}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="table-card">
          <div className="table-toolbar">
            <div className="table-toolbar-title">Recent Orders</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map(o => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 700, color: data.color, fontSize: 12 }}>{o.id}</td>
                  <td style={{ fontSize: 12 }}>{o.product}</td>
                  <td style={{ fontWeight: 700, fontSize: 13 }}>{o.amount}</td>
                  <td><span className={`chip ${statusChip(o.status)}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

