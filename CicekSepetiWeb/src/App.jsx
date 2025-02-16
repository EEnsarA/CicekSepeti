import { useState } from 'react'
import './css/App.css'  
import Home from './pages/Home'
import NavBar from './components/NavBar'
import {Routes,Route, useNavigate} from "react-router-dom"
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import RegisterLogin from './pages/RegisterLogin'
import * as $ from 'jquery';
import Cart from './pages/Cart'
import AdminDealers from './pages/AdminDealers'
import AdminUsers from './pages/AdminUsers'
import DealerProducts from './pages/DealerProducts'
import AdminProducts from './pages/AdminProducts'
import DealerPage from './pages/DealerPage'


function App() {

  const navigate = useNavigate();
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/:catName/:catid" element={<Products/>}></Route>
        <Route path="/:prdId" element={<ProductDetails/>}></Route>
        <Route path="/user/:registerLogin" element={<RegisterLogin/>}></Route>
        <Route path='/sepetim' element={<Cart/>}></Route>
        <Route path='/admin/dealers' element={<AdminDealers/>}></Route>
        <Route path='/admin/users' element={<AdminUsers/>}></Route>
        <Route path="/dealer/products" element={<DealerProducts/>}></Route>
        <Route path='/dealer/page' element={<DealerPage/>}></Route>
        <Route path='/admin/products' element={<AdminProducts/>}></Route>
      </Routes>
      
    </>
  )
}

export default App
