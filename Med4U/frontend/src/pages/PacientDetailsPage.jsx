import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { backendURL } from "../constants/backendURL";
import Logo from "../assets/LogoappLogo.png";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import {
  AccountCircle as UserOutlined,
  Logout as LogoutOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import RecomandariList from "../components/RecomandariList";
import IstoricRecomandari from "../components/IstoricRecomandari";

const PacientDetailsPage = () => {
  const { pacientId } = useParams();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [pacient, setPacient] = useState(null);
  const [measurements, setMeasurements] = useState({
    puls: 98,
    temperatura: 38.3,
    ecg: [],
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchPacientDetails = async () => {
      try {
        const response = await fetch(
          `http://${backendURL}:3000/api/auth/pacienti/${pacientId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPacient(data);
      } catch (error) {
        console.error("Error fetching pacient details:", error);
      }
    };

    fetchPacientDetails();
  }, [pacientId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" sx={{ backgroundColor: "#147B72" }}>
        <Toolbar className="flex justify-between">
          <img
            src={Logo}
            alt="Med4U Logo"
            className="w-36 h-12 object-contain"
          />
          <nav className="hidden md:flex space-x-4">
            <Button sx={{ color: "white" }} href="#fisa-medicala">
              FIȘĂ MEDICALĂ
            </Button>
            <Button sx={{ color: "white" }} href="#recomandari">
              RECOMANDĂRI
            </Button>
            <Button sx={{ color: "white" }} href="#istoric">
              ISTORIC
            </Button>
          </nav>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ color: "white" }}
            className="md:hidden"
          >
            <MenuIcon />
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
            <MenuItem onClick={handleClose} href="#fisa-medicala">
              FIȘĂ MEDICALĂ
            </MenuItem>
            <MenuItem onClick={handleClose} href="#recomandari">
              RECOMANDĂRI
            </MenuItem>
            <MenuItem onClick={handleClose} href="#istoric">
              ISTORIC
            </MenuItem>
            <MenuItem onClick={logout}>
              <LogoutOutlined /> Logout
            </MenuItem>
          </Menu>
          {pacient && (
            <div className="ml-4 text-center">
              <Typography variant="body2" sx={{ color: "white" }}>
                {pacient.nume}
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <div className="p-8">
        <Typography variant="h4" className="text-center text-[#147B72] mb-8">
          Statusul măsurătorilor de astăzi
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="text-center">
              <Typography className="text-green-600 font-bold">
                Felicitări!
              </Typography>
              <Typography>Pulsul este bun</Typography>
            </div>
            <div className="text-center">
              <Typography className="text-yellow-600 font-bold">
                Aveți grijă!
              </Typography>
              <Typography>
                Temperatura corpului este destul de mare{" "}
                <a href="#recomandari" className="text-blue-600">
                  vezi recomandări
                </a>
              </Typography>
            </div>
            <div className="text-center">
              <Typography className="text-red-600 font-bold">
                Atenție!
              </Typography>
              <Typography>
                ECG-ul nu arată bine{" "}
                <a href="#recomandari" className="text-blue-600">
                  vezi recomandări
                </a>
              </Typography>
            </div>
            <Button variant="contained" color="primary">
              Vezi recomandările medicului
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white p-4 rounded shadow-lg text-center">
              <CardContent>
                <img
                  src="/bpm.svg"
                  alt="Bătăile inimii"
                  className="w-16 mx-auto"
                />
                <Typography variant="h6" className="text-[#147B72]">
                  Bătăile inimii
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {measurements.puls} bpm
                </Typography>
                <Typography className="text-green-600">Normal</Typography>
              </CardContent>
            </Card>
            <Card className="bg-white p-4 rounded shadow-lg text-center">
              <CardContent>
                <img
                  src="/temp.svg"
                  alt="Temperatura corpului"
                  className="w-16 mx-auto"
                />
                <Typography variant="h6" className="text-[#147B72]">
                  Temperatura corpului
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {measurements.temperatura} °C
                </Typography>
                <Typography className="text-yellow-600">
                  Aveți grijă!
                </Typography>
              </CardContent>
            </Card>
            <div className="col-span-2">
              <div className="bg-white p-4 rounded shadow-lg">
                <div className="h-64 bg-gray-200 flex justify-center items-center">
                  {/* Graficul ECG va fi implementat aici */}
                  <Typography className="text-[#147B72]">ECG Graph</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="recomandari" className="mt-8">
        <RecomandariList
          pacientId={pacientId}
          isMedic={user.role === "medic"}
        />
      </div>
      <div id="istoric" className="mt-8">
        <IstoricRecomandari pacientId={pacientId} />
      </div>
    </div>
  );
};

export default PacientDetailsPage;
