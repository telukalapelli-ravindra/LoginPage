
import { Layers, LayoutDashboard, MousePointerClick, Package, ShoppingCart, Tag, Tags } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './SideBar.css'

function SideBar() {
  return (
    <aside className="sidebar">
        <header>
            <p>DashBoard</p>
        </header>
      <nav className="nav-bar">
        <NavLink className="menu-link" to="/dashboard" end><LayoutDashboard size={16} className="menu-icon"/>Dashboard</NavLink>
         <NavLink className="menu-link" to="/dashboard/click-dashboard" end><MousePointerClick size={16} className="menu-icon"/> ClickDashboard</NavLink>
          <NavLink className="menu-link" to="/dashboard/products" end><Package size={16}/>Products</NavLink>
          <NavLink className="menu-link" to="/dashboard/orders" end><ShoppingCart size={16}/>Orders</NavLink>
          <NavLink className="menu-link" to="/dashboard/categories" end><Tags size={16}/>Categories</NavLink>
          <NavLink className="menu-link" to="/dashboard/category/:slug" end><Tag size={16}/>CategoryDetails</NavLink>
          <NavLink className="menu-link" to="/dashboard/banners" end><Layers size={16}/>Banner</NavLink>    
      </nav>

      <footer className='footer'>
        <p >Settings</p>
      </footer>
    </aside>

  )
}

export default SideBar