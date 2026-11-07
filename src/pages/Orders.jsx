import '../layouts/DashboardLayout.css'

const ORDERS = [
  { id: '#ORD-1021', product: 'Blue Denim Jeans', category: 'Jeans', platform: 'Amazon', customer: 'Rohit Sharma', amount: '₹1,299', status: 'Delivered', date: '2 Nov 2026' },
  { id: '#ORD-1020', product: 'White Cotton Shirt', category: 'Shirts', platform: 'Flipkart', customer: 'Priya Verma', amount: '₹799', status: 'Shipped', date: '1 Nov 2026' },
  { id: '#ORD-1019', product: 'Floral Kurti', category: 'Kurtas', platform: 'Meesho', customer: 'Anjali Singh', amount: '₹499', status: 'Processing', date: '31 Oct 2026' },
  { id: '#ORD-1018', product: 'Black Formal Pants', category: 'Pants', platform: 'Amazon', customer: 'Amit Patel', amount: '₹1,599', status: 'Delivered', date: '30 Oct 2026' },
  { id: '#ORD-1017', product: 'Graphic T-Shirt', category: 'T-Shirts', platform: 'Meesho', customer: 'Sonal Mehta', amount: '₹349', status: 'Cancelled', date: '29 Oct 2026' },
  { id: '#ORD-1016', product: 'Silk Saree', category: 'Sarees', platform: 'Meesho', customer: 'Nita Joshi', amount: '₹1,299', status: 'Delivered', date: '28 Oct 2026' },
  { id: '#ORD-1015', product: 'Bomber Jacket', category: 'Jackets', platform: 'Amazon', customer: 'Karan Gupta', amount: '₹2,499', status: 'Shipped', date: '27 Oct 2026' },
  { id: '#ORD-1014', product: 'Flared Dress', category: 'Dresses', platform: 'Flipkart', customer: 'Meera Das', amount: '₹1,199', status: 'Processing', date: '26 Oct 2026' },
]

const statusChip = s => {
  const map = { Delivered: 'chip-green', Shipped: 'chip-blue', Processing: 'chip-orange', Cancelled: 'chip-red' }
  return map[s] || 'chip-blue'
}

const platformChip = p => {
  const map = { Amazon: 'chip-orange', Flipkart: 'chip-blue', Meesho: 'chip-pink' }
  return map[p] || 'chip-blue'
}

export default function Orders() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Orders</div>
          <div className="page-sub">{ORDERS.length} orders · updated just now</div>
        </div>
        <button className="btn-secondary">⬇️ Export</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Orders', value: ORDERS.length, chip: 'chip-blue' },
          { label: 'Delivered', value: ORDERS.filter(o => o.status === 'Delivered').length, chip: 'chip-green' },
          { label: 'In Transit', value: ORDERS.filter(o => o.status === 'Shipped').length, chip: 'chip-blue' },
          { label: 'Cancelled', value: ORDERS.filter(o => o.status === 'Cancelled').length, chip: 'chip-red' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-title">All Orders</div>
          <div className="table-search">
            <span>🔍</span>
            <input placeholder="Search orders…" />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Platform</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map(o => (
              <tr key={o.id}>
                <td style={{ fontWeight: 700, color: '#6366f1' }}>{o.id}</td>
                <td style={{ fontWeight: 500 }}>{o.product}</td>
                <td><span className="chip chip-purple">{o.category}</span></td>
                <td><span className={`chip ${platformChip(o.platform)}`}>{o.platform}</span></td>
                <td>{o.customer}</td>
                <td style={{ fontWeight: 700 }}>{o.amount}</td>
                <td style={{ color: '#64748b', fontSize: 12 }}>{o.date}</td>
                <td><span className={`chip ${statusChip(o.status)}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

