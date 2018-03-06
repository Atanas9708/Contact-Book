import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Header = ({ isLogged, logout }) => (
  <header>
    <h1><Link to='/catalog'>✉ Contact Book</Link></h1>
    <nav>
      <ul>
        {!isLogged && (
          <div>
            <li><NavLink to='/register'>Register</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
          </div>)}
        {isLogged && (
          <div>
            <li>Welcome, {localStorage.getItem('username')}</li>
            <li><NavLink to='/myContacts'>My Contacts</NavLink></li>
            <li><NavLink to='/create'>Create</NavLink></li>
            <li><a onClick={logout} href="javascript:void(0)">Logout</a></li>
          </div>
        )}
      </ul>
    </nav>
  </header>
)

export default Header;