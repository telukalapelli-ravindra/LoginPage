import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/login.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import DashboardHome from './pages/DashboardHome.jsx'
import ClickDashboard from './pages/ClickDashboard.jsx'
import PlatformPage from './pages/PlatformPage.jsx'
import Products from './pages/Products.jsx'
import Categories from './pages/Categories.jsx'
import CategoryDetail from './pages/CategoryDetail.jsx'
import Banners from './pages/Banners.jsx'
import Orders from './pages/Orders.jsx'

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="click-dashboard" element={<ClickDashboard />} />
        <Route path="platform/:slug" element={<PlatformPage />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="category/:slug" element={<CategoryDetail />} />
        <Route path="banners" element={<Banners />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
