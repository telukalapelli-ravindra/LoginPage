import { useParams } from 'react-router-dom'
import '../layouts/DashboardLayout.css'

const CATEGORY_DATA = {
  't-shirts': { name: 'T-Shirts', icon: '👕', color: '#6366f1', products: [
    { id: 1, name: 'Graphic T-Shirt', price: 349, platform: 'Meesho', stock: 210, clicks: 1340 },
    { id: 2, name: 'Polo T-Shirt', price: 599, platform: 'Amazon', stock: 88, clicks: 1050 },
    { id: 3, name: 'Plain Round Neck Tee', price: 249, platform: 'Flipkart', stock: 320, clicks: 820 },
    { id: 4, name: 'V-Neck T-Shirt', price: 399, platform: 'Meesho', stock: 140, clicks: 670 },
  ]},
  'shirts': { name: 'Shirts', icon: '👔', color: '#2563eb', products: [
    { id: 5, name: 'White Cotton Shirt', price: 799, platform: 'Flipkart', stock: 88, clicks: 980 },
    { id: 6, name: 'Blue Oxford Shirt', price: 999, platform: 'Amazon', stock: 55, clicks: 760 },
    { id: 7, name: 'Linen Casual Shirt', price: 1199, platform: 'Amazon', stock: 42, clicks: 540 },
    { id: 8, name: 'Printed Party Shirt', price: 1499, platform: 'Meesho', stock: 30, clicks: 320 },
  ]},
  'pants': { name: 'Pants', icon: '👗', color: '#7c3aed', products: [
    { id: 9, name: 'Black Formal Pants', price: 1599, platform: 'Amazon', stock: 34, clicks: 540 },
    { id: 10, name: 'Chino Pants', price: 1099, platform: 'Flipkart', stock: 61, clicks: 430 },
    { id: 11, name: 'Cargo Pants', price: 1299, platform: 'Meesho', stock: 48, clicks: 380 },
    { id: 12, name: 'Slim Fit Trousers', price: 1799, platform: 'Amazon', stock: 22, clicks: 290 },
  ]},
  'jeans': { name: 'Jeans', icon: '👖', color: '#1d4ed8', products: [
    { id: 13, name: 'Blue Denim Jeans', price: 1299, platform: 'Amazon', stock: 142, clicks: 1240 },
    { id: 14, name: 'Slim Fit Jeans', price: 1099, platform: 'Flipkart', stock: 95, clicks: 870 },
    { id: 15, name: 'Distressed Jeans', price: 1499, platform: 'Meesho', stock: 60, clicks: 540 },
    { id: 16, name: 'Black Skinny Jeans', price: 1199, platform: 'Amazon', stock: 38, clicks: 480 },
  ]},
  'kurtas': { name: 'Kurtas', icon: '👘', color: '#b45309', products: [
    { id: 17, name: 'Floral Kurti', price: 499, platform: 'Meesho', stock: 210, clicks: 2140 },
    { id: 18, name: 'Embroidered Kurti', price: 799, platform: 'Meesho', stock: 158, clicks: 1680 },
    { id: 19, name: 'Cotton Kurti', price: 399, platform: 'Flipkart', stock: 290, clicks: 1200 },
    { id: 20, name: 'Anarkali Kurti', price: 1199, platform: 'Amazon', stock: 72, clicks: 890 },
  ]},
  'sarees': { name: 'Sarees', icon: '🥻', color: '#be185d', products: [
    { id: 21, name: 'Silk Saree', price: 1299, platform: 'Meesho', stock: 55, clicks: 1890 },
    { id: 22, name: 'Banarasi Saree', price: 2499, platform: 'Amazon', stock: 28, clicks: 1340 },
    { id: 23, name: 'Cotton Saree', price: 699, platform: 'Meesho', stock: 142, clicks: 980 },
    { id: 24, name: 'Party Wear Saree', price: 1899, platform: 'Flipkart', stock: 36, clicks: 760 },
  ]},
  'dresses': { name: 'Dresses', icon: '👗', color: '#db2777', products: [
    { id: 25, name: 'Flared Dress', price: 1199, platform: 'Flipkart', stock: 71, clicks: 980 },
    { id: 26, name: 'Printed Dress', price: 699, platform: 'Meesho', stock: 115, clicks: 760 },
    { id: 27, name: 'Maxi Dress', price: 1599, platform: 'Amazon', stock: 42, clicks: 540 },
    { id: 28, name: 'Mini Party Dress', price: 1399, platform: 'Meesho', stock: 60, clicks: 420 },
  ]},
  'jackets': { name: 'Jackets', icon: '🧥', color: '#374151', products: [
    { id: 29, name: 'Bomber Jacket', price: 2499, platform: 'Amazon', stock: 19, clicks: 890 },
    { id: 30, name: 'Denim Jacket', price: 1999, platform: 'Flipkart', stock: 32, clicks: 720 },
    { id: 31, name: 'Puffer Jacket', price: 2999, platform: 'Amazon', stock: 14, clicks: 540 },
    { id: 32, name: 'Hoodie Jacket', price: 1499, platform: 'Meesho', stock: 48, clicks: 380 },
  ]},
}

const platformChip = p => {
  const map = { Amazon: 'chip-orange', Flipkart: 'chip-blue', Meesho: 'chip-pink' }
  return map[p] || 'chip-blue'
}

export default function CategoryDetail() {
  const { slug } = useParams()
  const data = CATEGORY_DATA[slug]

  if (!data) return (
    <div style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>
      <div style={{ fontSize: 48 }}>❓</div>
      <div style={{ fontSize: 20, fontWeight: 700, marginTop: 10 }}>Category not found</div>
    </div>
  )

  const maxClicks = Math.max(...data.products.map(p => p.clicks))
  const totalRevenue = data.products.reduce((s, p) => s + p.price * p.stock, 0)

  return (
    <div>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${data.color}11, ${data.color}05)`,
        border: `1.5px solid ${data.color}22`,
        borderRadius: 16, padding: '24px 28px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <span style={{ fontSize: 56 }}>{data.icon}</span>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color: data.color, letterSpacing: '-0.02em' }}>{data.name}</div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 2 }}>{data.products.length} products in this category</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          {[
            { label: 'Products', value: data.products.length },
            { label: 'Est. Revenue', value: `₹${(totalRevenue/1000).toFixed(1)}K` },
            { label: 'Total Clicks', value: data.products.reduce((s, p) => s + p.clicks, 0).toLocaleString() },
          ].map(m => (
            <div key={m.label} style={{ background: '#fff', borderRadius: 10, padding: '12px 20px', textAlign: 'center', border: `1px solid ${data.color}22` }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{m.value}</div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Product cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
        {data.products.map(p => (
          <div key={p.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 18, transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
          >
            <div style={{ fontSize: 36, marginBottom: 10, textAlign: 'center', background: '#f8fafc', borderRadius: 10, padding: 12 }}>{data.icon}</div>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 14, marginBottom: 6 }}>{p.name}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: data.color, marginBottom: 8 }}>₹{p.price.toLocaleString()}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className={`chip ${platformChip(p.platform)}`}>{p.platform}</span>
              <span style={{ fontSize: 12, color: p.stock < 25 ? '#f59e0b' : '#22c55e', fontWeight: 600 }}>
                {p.stock} in stock
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Clicks</div>
            <div style={{ background: '#f1f5f9', borderRadius: 999, height: 6 }}>
              <div style={{ width: `${(p.clicks / maxClicks) * 100}%`, background: data.color, height: '100%', borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginTop: 4, textAlign: 'right' }}>{p.clicks.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-title">{data.name} — Detailed View</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Platform</th>
              <th>Stock</th>
              <th>Clicks</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600, color: '#0f172a' }}>{p.name}</td>
                <td style={{ fontWeight: 700 }}>₹{p.price.toLocaleString()}</td>
                <td><span className={`chip ${platformChip(p.platform)}`}>{p.platform}</span></td>
                <td style={{ fontWeight: 600, color: p.stock < 25 ? '#f59e0b' : '#22c55e' }}>{p.stock}</td>
                <td style={{ fontWeight: 700 }}>{p.clicks.toLocaleString()}</td>
                <td style={{ width: 140 }}>
                  <div style={{ background: '#f1f5f9', borderRadius: 999, height: 8 }}>
                    <div style={{ width: `${(p.clicks / maxClicks) * 100}%`, background: data.color, height: '100%', borderRadius: 999 }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

