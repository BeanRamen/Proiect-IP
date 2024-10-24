import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout as LogoutOutlined,
  AccountCircle as UserOutlined,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../assets/LogoappLogo.png";

const Navbar = ({ pacient }) => {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <AppBar position="static" sx={{ backgroundColor: "#147B72" }}>
      <Toolbar className="flex justify-between">
        <img src={Logo} alt="Med4U Logo" className="w-36 h-12 object-contain" />
        <Box className="hidden md:flex space-x-4">
          <Button sx={{ color: "white" }} href="#fisa-medicala">
            FIȘĂ MEDICALĂ
          </Button>
          <Button sx={{ color: "white" }} href="#recomandari">
            RECOMANDĂRI
          </Button>
          <Button sx={{ color: "white" }} href="#istoric">
            ISTORIC
          </Button>
        </Box>
        <Box className="flex items-center">
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ color: "white" }}
            className="hidden md:flex"
          >
            <UserOutlined />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}>
              <LogoutOutlined /> Logout
            </MenuItem>
          </Menu>
          {pacient && (
            <div className="ml-4 text-center hidden md:block">
              <Typography variant="body2" sx={{ color: "white" }}>
                {pacient.nume}
              </Typography>
            </div>
          )}
        </Box>
        <Box className="md:hidden">
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        id={mobileMenuId}
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(mobileMoreAnchorEl)}
        onClose={handleClose}
      >
        <MenuItem href="#fisa-medicala">FIȘĂ MEDICALĂ</MenuItem>
        <MenuItem href="#recomandari">RECOMANDĂRI</MenuItem>
        <MenuItem href="#istoric">ISTORIC</MenuItem>
        <MenuItem onClick={logout}>
          <LogoutOutlined /> Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
