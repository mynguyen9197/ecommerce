import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import Product from './components/Product'
import Cart from './components/Cart'
import SignIn from './components/SignIn';
import { useSelector } from 'react-redux';
import Register from './components/Register';
import Shipping from './components/Shipping';
import Payment from './components/Payment';
import PlaceOrder from './components/PlaceOrder';

function App() {

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const openMenu = ()=>{
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = ()=>{
    document.querySelector(".sidebar").classList.remove("open")
  }
  
  return (
    <Router>
      <div class="grid-container">
        <header class="header">
          <div class="brand">
            <button onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/">amazona</Link>
          </div>
          <div class="header-links">
            <Link to="/cart">Cart</Link>
            {userInfo ? <Link to="/profile">{userInfo.name}</Link> : <Link to="/signin">Sign In</Link>}
            
          </div>
        </header>
        <aside class="sidebar">
          <h3>Shopping Categories</h3>
          <button class="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>

            <li>
              <a href="index.html">Shirts</a>
            </li>

          </ul>
        </aside>
        <main class="main">
          
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/cart/:id" component={Cart} />
            <Route exact path="/shipping" component={Shipping} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/placeorder" component={PlaceOrder} />
          </Switch>

        </main>
        <footer class="footer">
          All right reserved.
        </footer>
      </div>

    </Router>
  );
}

export default App;
