import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DeblurIcon from "@mui/icons-material/Deblur";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui";
import styled from "styled-components";
import { authActions } from "../store/auth";
import UserService from "../api/services/User";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickUserMenu = (path) => {
    navigate(path, { replace: true });
    handleCloseUserMenu();
  };
  const login = () => {
    dispatch(uiActions.login());
    navigate("/login", { replace: true });
  };
  const signup = () => {
    dispatch(uiActions.signup());
    navigate("/register", { replace: true });
  };

  const logout = async () => {
    handleCloseUserMenu();
    const data = await UserService.logout();
    if (data.status === 'success') {
      navigate("/login", { replace: true });
      dispatch(authActions.logout());
    }
  };

  return (
    <AppBar
      elevation={0}
      position="sticky"
      style={{ backgroundColor: "white" }}
    >
      <Shadow>
        <Container maxWidth="xl" style={{ padding: "0px" }}>
          <Toolbar disableGutters>
            <DeblurIcon
              sx={{ display: { xs: "none", md: "flex" }, color: "#2479D8" }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              as={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "black",
                textDecoration: "none",
                ":hover": {
                  color: "black",
                  textDecoration: "none",
                },
              }}
            >
              RealWorld
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key="home" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <DeblurIcon
              sx={{ display: { xs: "flex", md: "none" }, color: "#2479D8" }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: "black",
                textDecoration: "none",
              }}
            >
              RealWorld
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Stack direction="row" spacing={2}>
                <Button
                  key="home"
                  onClick={() => navigate("/", { replace: true })}
                  sx={{
                    color: "black",
                    display: "block",
                    ":hover": { color: "#2479D8" },
                  }}
                >
                  Home
                </Button>
                {isAuthenticated && (
                  <Button
                    key="create"
                    direction="row"
                    sx={{
                      color: "black",
                      display: "block",
                      ":hover": { color: "#2479D8" },
                    }}
                    onClick={() => navigate("/editor", { replace: true })}
                  >
                    Create Article
                  </Button>
                )}

                {!isAuthenticated && (
                  <>
                    <Button
                      variant="outlined"
                      onClick={login}
                      startIcon={<LoginIcon />}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<PersonIcon />}
                      style={{ backgroundColor: "#2479D8" }}
                      onClick={signup}
                    >
                      Sign up
                    </Button>
                  </>
                )}
                {isAuthenticated && (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          user?.image
                            ? user.image
                            : "https://i.pinimg.com/736x/fa/75/d3/fa75d35a0d10fac453109380a62b9b35.jpg"
                        }
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key="profile"
                  onClick={() =>
                    handleClickUserMenu(`/profile/${user.username}`)
                  }
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  key="settings"
                  onClick={() => handleClickUserMenu("/settings")}
                >
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <MenuItem key="logout" onClick={() => logout()}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </Shadow>
    </AppBar>
  );
};
const Shadow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  width: 100%;
  padding: 0 15%;
  @media (max-width: 1024px) {
    padding: 0;
  }
  box-sizing: border-box;
`;

export default Header;
