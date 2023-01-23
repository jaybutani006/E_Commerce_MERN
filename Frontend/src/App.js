import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useState, useEffect} from 'react'
import Header from './components/layout/Header/Header'
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import webFont from 'webfontloader'
import React from 'react'
import ProductDetails from './components/Product/ProductDetails'
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions';
import { useSelector} from 'react-redux'
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart'
import Shipping from './components/Cart/Shipping'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import Payment from './components/Cart/Payment'
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from './components/Order/MyOrders';
import axios from 'axios';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard'
import ProductList from './components/Admin/ProductList'
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UserList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
function App() {

  const { isAuthenticated , user} = useSelector((state) => state.user);
  let isAdmin;
  
  useEffect( () => {
    const func = async  () => {
      webFont.load({
        google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
        },
      });
      store.dispatch(loadUser());
    };
    func();
  }, [])
  useEffect(() => {
    if (user) {
      if (user.role == "admin") {
        isAdmin = true;
      } else {
        isAdmin = false;
      }
    }
  }) 
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/product/:id" element={<ProductDetails />}></Route>
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route exact path="/search" element={<Search />} />
        {isAuthenticated && (
          <Route exact path="/account" element={<Profile />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/account" element={<LoginSignUp />} />
        )}
        {isAuthenticated && (
          <Route exact path="/me/update" element={<UpdateProfile />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/me/update" element={<LoginSignUp />} />
        )}
        {isAuthenticated && (
          <Route exact path="/password/update" element={<UpdatePassword />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/password/update" element={<LoginSignUp />} />
        )}
        <Route exact path="/login" element={<LoginSignUp />}></Route>
        <Route
          exact
          path="/password/forgot"
          element={<ForgotPassword />}
        ></Route>
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        {isAuthenticated && (
          <Route exact path="/login/shipping" element={<Shipping />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/login/shipping" element={<LoginSignUp />} />
        )}
        {isAuthenticated && (
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/order/confirm" element={<LoginSignUp />} />
        )}
        {isAuthenticated && (
          <Route exact path="/process/payment" element={<Payment />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/process/payment" element={<LoginSignUp />} />
        )}
        {isAuthenticated && (
          <Route exact path="/success" element={<OrderSuccess />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/success" element={<LoginSignUp />} />
        )}
        {isAuthenticated && (
          <Route exact path="/orders" element={<MyOrders />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/orders" element={<LoginSignUp />} />
        )}
        {isAuthenticated && (
          <Route exact path="/order/:id" element={<OrderDetails />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/order/:id" element={<LoginSignUp />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
        )}
        {(!isAuthenticated || user.role != "admin") && (
          <Route exact path="/admin/dashboard" element={<LoginSignUp />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/admin/products" element={<ProductList />} />
        )}
        {(!isAuthenticated || user.role != "admin") && (
          <Route exact path="/admin/products" element={<LoginSignUp />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/admin/product" element={<NewProduct />} />
        )}
        {(!isAuthenticated || user.role != "admin") && (
          <Route exact path="/admin/product" element={<LoginSignUp />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
        )}
        {(!isAuthenticated || !isAdmin) && (
          <Route exact path="/admin/product/:id" element={<LoginSignUp />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/admin/orders" element={<OrderList />} />
        )}
        {(!isAuthenticated || user.role != "admin") && (
          <Route exact path="/admin/orders" element={<LoginSignUp />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
        )}
        {(!isAuthenticated || user.role != "admin") && (
          <Route exact path="/admin/order/:id" element={<LoginSignUp />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/admin/users" element={<UserList />} />
        )}
        {(!isAuthenticated || user.role != "admin") && (
          <Route exact path="/admin/users" element={<LoginSignUp />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/admin/user/:id" element={<UpdateUser />} />
        )}
        {(!isAuthenticated || user.role != "admin") && (
          <Route exact path="/admin/user/:id" element={<LoginSignUp />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/admin/reviews" element={<ProductReviews />} />
        )}
        {(!isAuthenticated || user.role != "admin") && (
          <Route exact path="/admin/reviews" element={<LoginSignUp />} />
        )}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;