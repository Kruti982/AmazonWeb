import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Logincontext } from "../context/Contexprovider";
import "react-toastify/dist/ReactToastify.css";

import "./Navbar.css";

const Navbar = () => {
  const { account, setAccount } = useContext(Logincontext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // fetch valid user
  const fetchValidUser = async () => {
    try {
      const res = await fetch("/validuser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 201) {
        setAccount(data);
      } else {
        setAccount(false);
      }
    } catch (err) {
      console.log("Error fetching user", err);
    }
  };

  useEffect(() => {
    fetchValidUser();
  }, []);

  // logout
  const logoutUser = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 201) {
        setAccount(false);
        handleClose();
        toast.success("User Logged Out 😃", {
          position: "top-center",
        });
        navigate("/");
      }
    } catch (err) {
      console.log("Logout error", err);
    }
  };

  return (
    <header>
      <nav>
        <div className="left">
          <div className="navlogo">
            <NavLink to="/">
              <img src="/amazonlogo.png" alt="Amazon logo" />
            </NavLink>
          </div>

          <div className="searchInput">
            <div className="nav_searchbaar">
              <input type="text" name="" id="" placeholder="Search..." />
            </div>
            <div className="search_icon">
              <SearchIcon />
            </div>
          </div>
        </div>

        <div className="right">
          <div className="nav_btn">
            <NavLink to={account ? "/" : "/signin"}>
              {account ? `Hi, ${account.fname}` : "Sign in"}
            </NavLink>
          </div>

          <div className="cart_btn">
            <Badge badgeContent={account?.carts?.length || 0} color="primary">
              <NavLink id="cart" to={account ? "/buynow" : "/signin"}>
                <ShoppingCartIcon id="icon" />
                cart
              </NavLink>
            </Badge>
          </div>

          <div>
            {account ? (
              <>
                <Avatar
                  className="avtar"
                  onClick={handleClick}
                  style={{ backgroundColor: "#1976d2", cursor: "pointer" }}
                >
                  {account.fname[0].toUpperCase()}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={logoutUser}>
                    <LogoutIcon style={{ fontSize: 18, marginRight: 5 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Avatar className="avtar" />
            )}
          </div>
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
