import { useContext, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import MyHeader from "./component/MyHeader";
import MyFooter from "./component/MyFooter";
import MainNavBar from "./component/MainNavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./component/AuthContext"; // Correct import

import HomeComponent from "./pages/HomeComponent";
import SecureLoginComponent from "./pages/SecureLoginComponent";

import RegistrationForm from "./pages/RegistrationFrom";
import FarmerDashBoard from "./pages/FarmerDashBoard";
import BuyerDashBoard from "./pages/BuyerDashBoard";
import FarmerNavBar from "./component/FarmerNavBar";
import BuyerNavBar from "./component/BuyerNavBar";
import AddProductForm from "./pages/AddProductForm";
import AppointmentBookingForm from "./pages/AppointmentBookingForm";
import MarketRateList from "./pages/MarketRateList";
import ForgotPassword from "./pages/ForgotPassword";
import AboutUs from "./pages/AboutUs";
import PurchaseProduct from "./pages/PurchaseProduct";
import BuyerOrder from "./pages/PurchaseProductList";
import PurchaseProductList from "./pages/PurchaseProductList";
// import AdminPage from "./pages/Admin";
import EditMarket from "./pages/EditMarket";
import EditUser from "./pages/EditUser";
import AdminDashboard from "./pages/AdminDashBoard";
import UsersPage from "./pages/Users";
import AppointmentsPage from "./pages/Appointments";
import MarketsPage from "./pages/Markets";
import AdminNavBar from "./component/AdminNavBar";
function App() {
  const { isLoggedIn, userRole } = useAuth();

  const renderNavBar = () => {
    if (userRole === "FARMER") {
      return <FarmerNavBar />;
    } else if (userRole === "BUYER") {
      return <BuyerNavBar />;
    } else if (userRole === "ADMIN") {
      return <AdminNavBar />;
    } else {
      return <MainNavBar />;
    }
  };

  return (
    <div>
      <MyHeader />
      {renderNavBar()}
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/securelogin" element={<SecureLoginComponent />} />
        <Route path="/addProduct" element={<AddProductForm />} />
        <Route path="/appointment" element={<AppointmentBookingForm />} />
        <Route path="/marketRate" element={<MarketRateList />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/farmer-dash" element={<FarmerDashBoard />} />
        <Route path="/buyer-dash" element={<BuyerDashBoard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/purchase" element={<PurchaseProduct />} />
        <Route path="/orders" element={<PurchaseProductList />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="/editMarket/:id" element={<EditMarket />} />
      </Routes>

      <MyFooter />
    </div>
  );
}

export default App;
