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
} from "@mui/icons-material";
import ECGChart from "../components/ECGChart";

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
      <AppBar position="static" style={{ background: "#147B72" }}>
        <Toolbar className="flex justify-between">
          <img
            src={Logo}
            alt="Med4U Logo"
            className="w-36 h-12 object-contain"
          />
          <nav className="flex space-x-4">
            <Button color="inherit" href="#fisa-medicala">
              FIȘĂ MEDICALĂ
            </Button>
            <Button color="inherit" href="#recomandari">
              RECOMANDĂRI
            </Button>
            <Button color="inherit" href="#istoric">
              ISTORIC
            </Button>
          </nav>
          <div className="flex items-center">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
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
              <div className="ml-4 text-white text-center">
                <Typography variant="body2">{pacient.nume}</Typography>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <div className="p-8">
        <Typography variant="h4" className="text-center text-[#147B72]">
          Statusul măsurătorilor de astăzi
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Typography className="block text-green-600 font-bold">
                Felicitări!
              </Typography>
              <Typography className="block">Pulsul este bun</Typography>
            </div>
            <div className="mb-4">
              <Typography className="block text-yellow-600 font-bold">
                Aveți grijă!
              </Typography>
              <Typography className="block">
                Temperatura corpului este destul de mare{" "}
                <a href="#recomandari" className="text-blue-600">
                  vezi recomandări
                </a>
              </Typography>
            </div>
            <div className="mb-4">
              <Typography className="block text-red-600 font-bold">
                Atenție!
              </Typography>
              <Typography className="block">
                ECG-ul nu arată bine{" "}
                <a href="#recomandari" className="text-blue-600">
                  vezi recomandări
                </a>
              </Typography>
            </div>
            <Button variant="contained" color="primary" className="mt-4">
              Vezi recomandările medicului
            </Button>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white p-4 rounded shadow-lg text-center">
              <CardContent>
                <img src="/bpm.svg" alt="Bătăile inimii" />
                <Typography variant="h6">Bătăile inimii</Typography>
                <Typography variant="h4" className="font-bold">
                  {measurements.puls} bpm
                </Typography>
                <Typography className="text-green-600">Normal</Typography>
              </CardContent>
            </Card>
            <Card className="bg-white p-4 rounded shadow-lg text-center">
              <CardContent>
                <img src="/temp.svg" alt="Temperatura corpului" />
                <Typography variant="h6">Temperatura corpului</Typography>
                <Typography variant="h4" className="font-bold">
                  {measurements.temperatura} °C
                </Typography>
                <Typography className="text-yellow-600">
                  Aveți grijă!
                </Typography>
              </CardContent>
            </Card>
            <div className="col-span-2 relative">
              <div className="bg-white p-4 rounded shadow-lg">
                <div className="h-64 bg-gray-200 flex justify-center items-center">
                  {/* <ECGChart /> Add the ECGChart component here */}
                </div>
              </div>
              <div className="absolute top-0 left-4 bg-red-600 text-white px-2 py-1 rounded-b-lg transform -translate-y-1/2">
                Alertă ECG
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Typography
            variant="h4"
            className="text-center text-white bg-[#147B72]  min-h-4"
          >
            RECOMANDĂRI
          </Typography>
          <div className="mt-4">
            <Card className="bg-white p-4  rounded-full shadow-lg mb-4">
              <CardContent>
                <Typography variant="h6" className="text-[#147B72]">
                  Ultima recomandare
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Consequat bibendum sit felis, sollicitudin et. Nulla aliquet
                  integer hac ac morbi. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Consequat bibendum sit felis, sollicitudin
                  et. Nulla aliquet integer hac ac morbi. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Consequat bibendum sit
                  felis, sollicitudin et. Nulla aliquet integer hac ac morbi.
                </Typography>
              </CardContent>
            </Card>
            <Card className="bg-white p-4 rounded shadow-lg">
              <CardContent>
                <Typography variant="h6" className="text-[#147B72]">
                  Penultima recomandare
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Blandit viverra porta tortor, elementum ultrices. Blandit quam
                  nec aliquam. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Blandit viverra porta tortor, elementum
                  ultrices. Blandit quam nec aliquam. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Blandit viverra porta
                  tortor, elementum ultrices. Blandit quam nec aliquam.
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacientDetailsPage;
