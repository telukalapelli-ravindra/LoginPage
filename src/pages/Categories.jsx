import { useState } from 'react'
import '../layouts/DashboardLayout.css'

const SAMPLE_CATEGORIES = [
  { id: 1, name: 'T-Shirts', slug: 't-shirts', icon: '👕', products: 142, status: 'Active', description: 'Casual & graphic tees for all ages' },
  { id: 2, name: 'Shirts', slug: 'shirts', icon: '👔', products: 98, status: 'Active', description: 'Formal, casual, and linen shirts' },
  { id: 3, name: 'Pants', slug: 'pants', icon: '👗', products: 65, status: 'Active', description: 'Trousers, chinos, and formals' },
  { id: 4, name: 'Jeans', slug: 'jeans', icon: '👖', products: 118, status: 'Active', description: 'Slim, straight, and bootcut denim' },
  { id: 5, name: 'Kurtas', slug: 'kurtas', icon: '👘', products: 210, status: 'Active', description: 'Ethnic wear for women and men' },
  { id: 6, name: 'Sarees', slug: 'sarees', icon: '🥻', products: 155, status: 'Active', description: 'Silk, cotton, and party sarees' },
  { id: 7, name: 'Dresses', slug: 'dresses', icon: '👗', products: 87, status: 'Active', description: 'Party, casual, and maxi dresses' },
  { id: 8, name: 'Jackets', slug: 'jackets', icon: '🧥', products: 42, status: 'Inactive', description: 'Bomber, denim, and winter jackets' },
]

const EMPTY = { name: '', slug: '', icon: '👕', description: '', status: 'Active' }

export default function Categories() {
  const [cats, setCats] = useState(SAMPLE_CATEGORIES)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModal(true) }
  const openEdit = c => { setForm({ ...c }); setEditId(c.id); setModal(true) }
  const save = () => {
    if (editId) {
      setCats(cs => cs.map(c => c.id === editId ? { ...form, id: editId, products: c.products } : c))
    } else {
      setCats(cs => [...cs, { ...form, id: Date.now(), products: 0 }])
    }
    setModal(false)
  }
  const remove = id => setCats(cs => cs.filter(c => c.id !== id))

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Categories</div>
          <div className="page-sub">{cats.length} categories · manage your product taxonomy</div>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Add Category</button>
      </div>

      {/* Category grid cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 28 }}>
        {cats.map(c => (
          <div
            key={c.id}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              position: 'relative',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
          >
            <div style={{ position: 'absolute', top: 12, right: 12 }}>
              <span className={`chip ${c.status === 'Active' ? 'chip-green' : 'chip-red'}`}>{c.status}</span>
            </div>
            <div style={{ fontSize: 36, marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, lineHeight: 1.5 }}>{c.description}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#6366f1' }}>{c.products} products</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn-edit" onClick={() => openEdit(c)}>✏️</button>
                <button className="btn-danger" onClick={() => remove(c.id)}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table view */}
      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-title">Category List</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cats.map(c => (
              <tr key={c.id}>
                <td style={{ fontSize: 24 }}>{c.icon}</td>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>{c.name}</td>
                <td><code style={{ background: '#f8fafc', padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#6366f1' }}>{c.slug}</code></td>
                <td style={{ color: '#64748b', fontSize: 13 }}>{c.description}</td>
                <td style={{ fontWeight: 700 }}>{c.products}</td>
                <td><span className={`chip ${c.status === 'Active' ? 'chip-green' : 'chip-red'}`}>{c.status}</span></td>
                <td>
                  <div className="td-actions">
                    <button className="btn-edit" onClick={() => openEdit(c)}>✏️ Edit</button>
                    <button className="btn-danger" onClick={() => remove(c.id)}>🗑️ Del</button>
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
            <div className="modal-title">{editId ? '✏️ Edit Category' : '➕ Add Category'}</div>
            <div className="form-grid">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Category Name</label>
                  <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Shirts" />
                </div>
                <div className="form-field">
                  <label className="form-label">Slug</label>
                  <input className="form-input" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="e.g. shirts" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Icon (emoji)</label>
                  <input className="form-input" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="👕" />
                </div>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Description</label>
                <input className="form-input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description…" />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={save}>{editId ? 'Update' : 'Add Category'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

