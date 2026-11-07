import { useState } from 'react'
import '../layouts/DashboardLayout.css'

const SAMPLE_BANNERS = [
  { id: 1, title: 'Diwali Sale — Up to 70% Off', page: 'Home', platform: 'All', status: 'Active', startDate: '2026-10-20', endDate: '2026-11-05', clicks: 4280, color: '#FF9900' },
  { id: 2, title: 'New Arrivals — Winter Collection', page: 'Category', platform: 'Amazon', status: 'Active', startDate: '2026-11-01', endDate: '2026-12-01', clicks: 1920, color: '#2874F0' },
  { id: 3, title: 'Free Shipping on ₹499+', page: 'Cart', platform: 'Flipkart', status: 'Active', startDate: '2026-10-15', endDate: '2026-11-30', clicks: 3140, color: '#6366f1' },
  { id: 4, title: 'Meesho Exclusive — Kurtas under ₹299', page: 'Home', platform: 'Meesho', status: 'Scheduled', startDate: '2026-11-10', endDate: '2026-11-20', clicks: 0, color: '#FF4F79' },
  { id: 5, title: 'Flash Sale — Jeans at ₹999', page: 'Product', platform: 'All', status: 'Expired', startDate: '2026-10-01', endDate: '2026-10-10', clicks: 7540, color: '#8b5cf6' },
]

const statusChip = s => {
  const map = { Active: 'chip-green', Scheduled: 'chip-blue', Expired: 'chip-red', Draft: 'chip-orange' }
  return map[s] || 'chip-blue'
}

const platformChip = p => {
  const map = { Amazon: 'chip-orange', Flipkart: 'chip-blue', Meesho: 'chip-pink', All: 'chip-purple' }
  return map[p] || 'chip-blue'
}

const EMPTY = { title: '', page: 'Home', platform: 'All', status: 'Active', startDate: '', endDate: '', clicks: 0, color: '#6366f1' }

export default function Banners() {
  const [banners, setBanners] = useState(SAMPLE_BANNERS)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModal(true) }
  const openEdit = b => { setForm({ ...b }); setEditId(b.id); setModal(true) }
  const save = () => {
    if (editId) {
      setBanners(bs => bs.map(b => b.id === editId ? { ...form, id: editId } : b))
    } else {
      setBanners(bs => [...bs, { ...form, id: Date.now(), clicks: 0 }])
    }
    setModal(false)
  }
  const remove = id => setBanners(bs => bs.filter(b => b.id !== id))

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Banners</div>
          <div className="page-sub">{banners.filter(b => b.status === 'Active').length} active banners running</div>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Add Banner</button>
      </div>

      {/* Banner preview cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {banners.filter(b => b.status === 'Active').map(b => (
          <div
            key={b.id}
            style={{
              background: `linear-gradient(135deg, ${b.color}dd, ${b.color}99)`,
              borderRadius: 14,
              padding: '20px 28px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: `0 6px 24px ${b.color}44`,
            }}
          >
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8, marginBottom: 4 }}>
                {b.page} Page · {b.platform}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em' }}>{b.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{b.startDate} → {b.endDate}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{b.clicks.toLocaleString()}</div>
              <div style={{ fontSize: 11, opacity: 0.75 }}>Total Clicks</div>
            </div>
          </div>
        ))}
      </div>

      {/* Full table */}
      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-title">All Banners</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Page</th>
              <th>Platform</th>
              <th>Duration</th>
              <th>Clicks</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map(b => (
              <tr key={b.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: b.color, flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{b.title}</span>
                  </div>
                </td>
                <td><span className="chip chip-purple">{b.page}</span></td>
                <td><span className={`chip ${platformChip(b.platform)}`}>{b.platform}</span></td>
                <td style={{ fontSize: 12, color: '#64748b' }}>{b.startDate} → {b.endDate}</td>
                <td style={{ fontWeight: 700 }}>{b.clicks.toLocaleString()}</td>
                <td><span className={`chip ${statusChip(b.status)}`}>{b.status}</span></td>
                <td>
                  <div className="td-actions">
                    <button className="btn-edit" onClick={() => openEdit(b)}>✏️ Edit</button>
                    <button className="btn-danger" onClick={() => remove(b.id)}>🗑️ Del</button>
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
            <div className="modal-title">{editId ? '✏️ Edit Banner' : '🖼️ Add Banner'}</div>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Banner Title</label>
                <input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Diwali Sale — Up to 70% Off" />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Page</label>
                  <select className="form-select" value={form.page} onChange={e => setForm(f => ({ ...f, page: e.target.value }))}>
                    <option>Home</option>
                    <option>Category</option>
                    <option>Product</option>
                    <option>Cart</option>
                    <option>Checkout</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Platform</label>
                  <select className="form-select" value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
                    <option>All</option>
                    <option>Amazon</option>
                    <option>Flipkart</option>
                    <option>Meesho</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Start Date</label>
                  <input className="form-input" type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
                </div>
                <div className="form-field">
                  <label className="form-label">End Date</label>
                  <input className="form-input" type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option>Active</option>
                    <option>Scheduled</option>
                    <option>Draft</option>
                    <option>Expired</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Banner Color</label>
                  <input className="form-input" type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} style={{ padding: 4, height: 40 }} />
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={save}>{editId ? 'Update' : 'Add Banner'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

