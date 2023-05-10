import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  ThemeProvider,
  InputBase,
  Divider,
  Paper,
} from "@mui/material";
import { costomizingTeme } from "../../helpers/color";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import { useDispatch } from "react-redux";
const MyAppBar = ({ setFill,fill }) => {
  const ref=useRef(null)
  const [openMenu, setOpenMenu] = useState(69);
  const [canClose, setCanClose] = useState(false);
  const [askingPrompt, setAskingprompt] = useState({});

  const navigate = useNavigate();
  const dispatch=useDispatch();
  

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setAskingprompt(e);
    });
  }, [askingPrompt]);

  let Interval = useRef(null);
  const openHandler = () => {
    clearInterval(Interval.current);
    Interval.current = setInterval(() => {
      setOpenMenu((pre) => {
        if (pre >= 300) {
          clearInterval(Interval.current);
          return 300;
        }
        return pre + 10;
      });
    });
    setCanClose(true);
  };
  const closeHandler = () => {
    clearInterval(Interval.current);
    Interval.current = setInterval(() => {
      setOpenMenu((pre) => {
        if (pre <= 69) {
          clearInterval(Interval.current);
          return 69;
        }
        return pre - 10;
      });
    });
    setCanClose(false);
  };

  let clearTime;

 

  const searchIputeHandler = (e) => {
    if (e.target.value === "") {
      clearTimeout(clearTime);
      return setFill("");
    }
    clearTimeout(clearTime);
    const searchValue = e.target.value;
    clearTime = setTimeout(() => {
      setFill({ s: searchValue });
    }, 500);
  };

  const singInHandler = () => {
    navigate('/signIn')
  };

  const signUpHandler = () => {
    navigate("/signUp");
  };

  const pwaInstalation = async () => {
    askingPrompt.prompt();
    const userChoises = await askingPrompt.userChoice;
    if (userChoises.outcome === "accepted") {
      console.log("u accept that");
    }
    setAskingprompt(null);
  };

  return (
    <>
      <AppBar
        sx={{
          bgcolor: "rgb(16, 72, 156)",
          height: `${openMenu}px`,
          overflow: "hidden",
        }}
      >
        <Toolbar
          sx={{
            display: { xs: "block", md: "flex" },
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { sm: "block", md: "none" } }}
              onClick={!canClose ? openHandler : closeHandler}
            >
              <MenuIcon sx={{ fontSize: "40px" }} />
            </IconButton>
            <h2>
              <span style={{ color: "red" }}>vessel</span>
              {"  "}contact
            </h2>
          </div>
          <ThemeProvider theme={costomizingTeme}>
            <Divider color="red" />
            <br />
            <Paper
              sx={{
                width: { xs: "50%", md: "40%", height: "35px" },
                ml: "20px",
                mx: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <SearchIcon sx={{ color: "#CE2619" }} />
              <InputBase onChange={searchIputeHandler}  sx={{ width: "100%" }}  />
            </Paper>
            <br />
            <Button
              sx={{ display: "block", mx: { xs: "auto", md: "0" } }}
              onClick={signUpHandler}
              ref={ref}
            >
              sign up
            </Button>
            <br />
            <Button
              sx={{ display: "block", mx: { xs: "auto", md: "30px" } }}
              onClick={singInHandler}
            >
            sign In
            </Button>
            <br />
            <Button
              sx={{ display: "block", mx: { xs: "auto", md: "0",display:"flex",alignContent:"baseline" } }}
              variant="outlined"
              onClick={pwaInstalation}
            >
           desktop app  {"   "}<InstallDesktopIcon/>

            </Button>
            <br />
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default MyAppBar;
