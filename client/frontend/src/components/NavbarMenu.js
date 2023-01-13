import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavbarMenu.css";

const NavbarMenu = () => {
  const data = localStorage.getItem("access_token");
  useEffect(() => {}, []);
  const navigate = useNavigate()
  const logoutHandler = () =>{
    localStorage.clear()
    navigate("/login", {replace: true})
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand logo-font" to="/">
            urDash
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-style" to="/debts">
                  DEBT
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-style" to="/transactions">
                  TRANSACTION
                </Link>
              </li>
              {data ? (
                <li className="nav-item">
                  <Link
                    className="nav-link text-style"
                    aria-current="page"
                    to="/"
                    onClick={() => logoutHandler()}
                  >
                    LOGOUT
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link text-style"
                    aria-current="page"
                    to="/"
                  >
                    LOGIN
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarMenu;
