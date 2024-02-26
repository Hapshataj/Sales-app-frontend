import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css'
import { useDispatch } from 'react-redux';

const NarBar = () => {
  const activeLink = ' text-decoration-none text-white p-2 mt-0 d-flex';
  const normalLink = 'text-decoration-none text-white-50 p-2 mt-0 d-flex';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    navigate("/login");
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-primary ">
        <div class="container-fluid">
          <a class="navbar-brand text-white fw-800 mb-2" href="/">SALES APP</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">

                {localStorage.getItem("token") != null ? <NavLink to={"/addsale"} className={({ isActive }) => isActive ? activeLink : normalLink}>ADD SALES</NavLink>
                  : ''}
              </li>

              <li class="nav-item">

                {localStorage.getItem("token") != null ? <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to={'/top5sale'}>TOP 5 SALES</NavLink>
                  : ''} </li>
              <li class="nav-item">

                {localStorage.getItem("token") != null ? <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to={'/todaytotal'}>TODAY'S TOTAL REVENUE</NavLink>
                  : ''}</li>
              <li class="nav-item">

                <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to={'/login'}>LOGIN</NavLink>
              </li>
              <li class="nav-item">

                <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to={'/register'}>REGISTER</NavLink>

              </li>

              <li class="nav-item">

                {localStorage.getItem("token") != null ? <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink}

                  to={'/logout'} onClick={() => logout()} >LOGOUT</NavLink> : ''}

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NarBar;