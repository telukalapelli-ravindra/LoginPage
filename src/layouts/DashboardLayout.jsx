import { Outlet } from "react-router-dom"
import "./DashboardLayout.css";
import SideBar from "../components/SideBar";


function DashboardLayout() {

  return (
    <>
    <div className="dashboard-layout">
      <SideBar/>
    <main className="main-body">
      <Outlet/>
    </main>
    </div>
    </>
  )
}

export default DashboardLayout