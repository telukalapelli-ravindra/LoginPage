import { useState } from 'react'
import '../layouts/DashboardLayout.css'

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Blue Denim Jeans', category: 'Jeans', price: 1299, stock: 142, platform: 'Amazon', status: 'Active', image: '👖' },
  { id: 2, name: 'White Cotton Shirt', category: 'Shirts', price: 799, stock: 88, platform: 'Flipkart', status: 'Active', image: '👔' },
  { id: 3, name: 'Graphic T-Shirt', category: 'T-Shirts', price: 349, stock: 0, platform: 'Meesho', status: 'Out of Stock', image: '👕' },
  { id: 4, name: 'Black Formal Pants', category: 'Pants', price: 1599, stock: 34, platform: 'Amazon', status: 'Active', image: '👗' },
  { id: 5, name: 'Floral Kurti', category: 'Kurtas', price: 499, stock: 210, platform: 'Meesho', status: 'Active', image: '👘' },
  { id: 6, name: 'Silk Saree', category: 'Sarees', price: 1299, stock: 55, platform: 'Meesho', status: 'Active', image: '🥻' },
  { id: 7, name: 'Bomber Jacket', category: 'Jackets', price: 2499, stock: 19, platform: 'Amazon', status: 'Low Stock', image: '🧥' },
  { id: 8, name: 'Flared Dress', category: 'Dresses', price: 1199, stock: 71, platform: 'Flipkart', status: 'Active', image: '👗' },
]

const statusChip = s => {
  const map = { Active: 'chip-green', 'Out of Stock': 'chip-red', 'Low Stock': 'chip-orange' }
  return map[s] || 'chip-blue'
}

const platformChip = p => {
  const map = { Amazon: 'chip-orange', Flipkart: 'chip-blue', Meesho: 'chip-pink' }
  return map[p] || 'chip-blue'
}

const EMPTY_FORM = { name: '', category: 'T-Shirts', price: '', stock: '', platform: 'Amazon', status: 'Active', image: '👕' }

export default function Products() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setModal(true) }
  const openEdit = p => { setForm({ ...p }); setEditId(p.id); setModal(true) }
  const save = () => {
    if (editId) {
      setProducts(ps => ps.map(p => p.id === editId ? { ...form, id: editId } : p))
    } else {
      setProducts(ps => [...ps, { ...form, id: Date.now(), price: Number(form.price), stock: Number(form.stock) }])
    }
    setModal(false)
  }
  const remove = id => setProducts(ps => ps.filter(p => p.id !== id))

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Products</div>
          <div className="page-sub">{products.length} products across all platforms</div>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Add Product</button>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-title">All Products</div>
          <div className="table-search">
            <span>🔍</span>
            <input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{p.image}</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{p.name}</span>
                  </div>
                </td>
                <td><span className="chip chip-purple">{p.category}</span></td>
                <td style={{ fontWeight: 700 }}>₹{p.price.toLocaleString()}</td>
                <td style={{ fontWeight: 600, color: p.stock === 0 ? '#ef4444' : p.stock < 25 ? '#f59e0b' : '#22c55e' }}>
                  {p.stock === 0 ? '—' : p.stock}
                </td>
                <td><span className={`chip ${platformChip(p.platform)}`}>{p.platform}</span></td>
                <td><span className={`chip ${statusChip(p.status)}`}>{p.status}</span></td>
                <td>
                  <div className="td-actions">
                    <button className="btn-edit" onClick={() => openEdit(p)}>✏️ Edit</button>
                    <button className="btn-danger" onClick={() => remove(p.id)}>🗑️ Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-title">{editId ? '✏️ Edit Product' : '➕ Add Product'}</div>
            <div className="form-grid">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Product Name</label>
                  <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Blue Jeans" />
                </div>
                <div className="form-field">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {['T-Shirts','Shirts','Pants','Jeans','Kurtas','Sarees','Dresses','Jackets'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Price (₹)</label>
                  <input className="form-input" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="999" />
                </div>
                <div className="form-field">
                  <label className="form-label">Stock Qty</label>
                  <input className="form-input" type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} placeholder="100" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Platform</label>
                  <select className="form-select" value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
                    <option>Amazon</option>
                    <option>Flipkart</option>
                    <option>Meesho</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option>Active</option>
                    <option>Out of Stock</option>
                    <option>Low Stock</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={save}>{editId ? 'Update' : 'Add Product'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

