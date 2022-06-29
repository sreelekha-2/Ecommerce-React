import React from 'react'
import { BrowserRouter as Router , Routes , Route, Navigate } from 'react-router-dom'
import MyAppBar from './components/MyAppBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import ProductInfo from './components/ProductInfo';
import Cart from './components/Cart';
import PaginationProducts from './components/PaginationProducts';
import {isLoggedIn,isAdmin} from "./service/Auth"
import Home from './components/Home';

function ProtectedRoute({children}){
  const auth=isLoggedIn()
  return auth ? children:<Navigate to="/"/>
}

function AdminProtectedRoute({children}){
  const auth=isLoggedIn()
  const admin=isAdmin()

  return auth && admin ? children : <Navigate to="/"/>
}

export default function App() {
  return (
    <>
      <Router>
        <MyAppBar/>
        <section>
          <Routes>
              <Route path="/" element={<Login/>}/>
              
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/home" element={<ProtectedRoute>
                 <Home/>
              </ProtectedRoute>}/>
              
              <Route path="/products" element={<ProtectedRoute>
                    <PaginationProducts/>
              </ProtectedRoute>}/>
              <Route path="/addproduct" element={<AdminProtectedRoute>
                <AddProduct/>
              </AdminProtectedRoute>}/>
              <Route path="/productinfo:id" element={<ProtectedRoute>
                    <ProductInfo/>
              </ProtectedRoute>}/>
              <Route path="/cart" element={<Cart/>}/>

          </Routes>
        </section>
      </Router>
    </>
  )
}
