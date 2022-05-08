import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
} from "reactstrap";

import styles from "./header.module.css";
import { Redirect } from "react-router-dom";

const Header = () => {
  const {
    state: { auth },
    dispatch,
  } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.removeItem("OLX_TOKEN");
    dispatch({
      type: "AUTH",
      payload: {},
    });

    return <Redirect to="/" />;
  };

  return (
    <div>
      <Navbar className={`${styles.customNavbar}`} expand="md" dark>
        <Link to="/" className={`${styles.customNavbarBrand} navbar-brand`}>
          Olx
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {Object.keys(auth).length > 0 && auth.token && auth.user && (
            <Nav className="ms-auto" navbar>
              <NavItem>
                <Link
                  to="/create-ad"
                  className={`nav-link ${styles.customLoginRegister}`}
                >
                  Create Advertisment
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/customer-home"
                  className={`nav-link ${styles.customLoginRegister}`}
                >
                  Customer Home
                </Link>
              </NavItem>
            </Nav>
          )}
          <Nav className="ms-auto" navbar>
            {Object.keys(auth).length > 0 && auth.token && auth.user ? (
              <NavItem>
                <Dropdown
                  className="nav-item-link"
                  isOpen={isDropDown}
                  toggle={() => setIsDropDown(!isDropDown)}
                >
                  <DropdownToggle caret nav>
                    <span className={`${styles.customLoginRegister}`}>
                      {auth.user.name}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link
                      to={"/profile"}
                      onClick={() => setIsDropDown(!isDropDown)}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <DropdownItem
                        style={{
                          color: "#009dc4",
                        }}
                        className={`nav-link ${styles.customLoginRegister}`}
                      >
                        Profile
                      </DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={logout}
                      style={{
                        color: "#009dc4",
                      }}
                      className={`nav-link ${styles.customLoginRegister}`}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            ) : (
              <NavItem>
                <Link
                  to="/signin"
                  className={`nav-link ${styles.customLoginRegister}`}
                >
                  Login/Register
                </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
