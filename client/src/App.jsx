import AuthLayout from "./components/authLayout/AuthLayout";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/adminLayout/AdminLayout";
import AdminDashboard from "./pages/adminView/AdminDashboard";
import Features from "./pages/adminView/Features";
import Order from "./pages/adminView/Order";
import Products from "./pages/adminView/Products";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import PathNotFound from "./pages/not-found/PathNotfound";
import Home from "./pages/ShoppingView/Home";
import Listing from "./pages/ShoppingView/Listing";
import Checkout from "./pages/ShoppingView/Checkout";
import Account from "./pages/ShoppingView/Account";
import CheckAuth from "./components/common/CheckAuth";
import Unauth from "./pages/unauth-page/Unauth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/authSlice";




function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="flex flex-col bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout></AuthLayout>
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="register" element={<Register></Register>}></Route>
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout></AdminLayout>
            </CheckAuth>
          }
        >
          <Route
            path="dashboard"
            element={<AdminDashboard></AdminDashboard>}
          ></Route>
          <Route path="features" element={<Features></Features>}></Route>
          <Route path="order" element={<Order></Order>}></Route>
          <Route path="products" element={<Products></Products>}></Route>
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout></ShoppingLayout>
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home></Home>}></Route>
          <Route path="listing" element={<Listing></Listing>}></Route>
          <Route path="checkout" element={<Checkout></Checkout>}></Route>
          <Route path="account" element={<Account></Account>}></Route>
        </Route>

        <Route path="*" element={<PathNotFound></PathNotFound>}></Route>
        <Route path="/unauth-page" element={<Unauth></Unauth>}></Route>
      </Routes>
    </div>
  );
}

export default App;
