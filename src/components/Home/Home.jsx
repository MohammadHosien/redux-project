import MyAppBar from "../MyAppBar/AppBar";
import BasicSvg from "../../svgs/basicSvg";
import BasicSvgRight from "../../svgs/basicSvgRight";
import {
  Grid,
  Typography,
  ThemeProvider,
  Button,
  Dialog,
  Paper,
} from "@mui/material";
import { costomizingTeme } from "../../helpers/color";
import { useSelector, useDispatch } from "react-redux";
import { fetchContact } from "../../featuers/posts/postsSlice";
import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { favPostFetch } from "../../featuers/posts/favPostSlice";
import Contact from "../contact/contact";
import AddIcon from "@mui/icons-material/Add";
import { useSearchParams } from "react-router-dom";
import * as jose from "jose";
import { addDB, getAllDB } from "../../featuers/idb/postDbslice";
import axios from "axios";

const Home = () => {
  const [isLoged, setIsLoged] = useState(false);
  const [userId, setUserId] = useState("");

  const postsLoading = useSelector((state) => state.posts.loading);
  const posts = useSelector((state) => state.posts.posts);
  const favs = useSelector((state) => state.fav.fav);
  const offlineDb = useSelector((state) => state.idb.postDb);
  const offlineLoading = useSelector((state) => state.idb.status);
  const navigte = useNavigate();
  const dispatch = useDispatch();
  const [fill, setFill] = useSearchParams();

  useEffect(() => {
    if (postsLoading === "idle") {
      dispatch(fetchContact());
    }
  }, [posts]);

  useEffect(() => {  
    dispatch(getAllDB());
  }, []);

  useEffect(() => {
    dispatch(favPostFetch());
    axios.get("http://localhost:9000/posts").then((res) => {
      res.data.map((i) => {
        dispatch(addDB(i));
      });
    });
  }, []);

  const createContactHandler = () => {
    if (localStorage.getItem("token")) {
      navigte("/createContact");
    } else {
      setIsLoged(true);
    }
  };
  if (localStorage.getItem("token")) {
    useEffect(() => {
      const get = async () => {
        const secret = jose.base64url.decode(import.meta.env.VITE_JWT_CODE);
        const { payload } = await jose.jwtDecrypt(
          localStorage.getItem("token"),
          secret,
          {}
        );
        return payload;
      };
      get().then((res) => setUserId(res.secretId));
    }, [userId]);
  }

  let userFilter = posts.filter((post) => post.user === userId);

  let filterPost = userFilter.filter((post) => {
    let result = post.name.startsWith(fill.get("s"));
    if (result) {
      return post.name;
    }
    if (!fill.get("s")) {
      return true;
    }
  });
  return (
    <>
      <div>
        {localStorage.getItem("token") !== null ? null : (
          <Dialog open={isLoged}>
            <Paper sx={{ width: "400px", textAlign: "center" }}>
              <h1>attention!</h1>
              <h4>
                you dont have acount
                <br />
                <br /> or you dont loging fisrt join us
              </h4>
              <ThemeProvider theme={costomizingTeme}>
                <Button
                  onClick={() => {
                    navigte("/signIn");
                  }}
                >
                  go to log in
                </Button>
                {"  "}
                <Button
                  onClick={() => {
                    navigte("/signUp");
                  }}
                >
                  go to sign up
                </Button>
              </ThemeProvider>
            </Paper>
            
          </Dialog>
        )}
        
        <MyAppBar fill={fill.get('s')} setFill={setFill} />
        <BasicSvg />
        <div className="homeText">
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "30px", md: "50px" }, color: "red" }}
          >
            vessel contact and aas
          </Typography>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "30px", md: "50px" } }}
          >
            my first
          </Typography>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "30px", md: "50px" } }}
          >
            full
          </Typography>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "30px", md: "50px" } }}
          >
            project
          </Typography>
        </div>
        <BasicSvgRight />
      </div>
      {/* <h3 className="home-explane">
        this site is my first full project by react it is not so much
        complicated and important website but i tried to make every thing that i
        learn
        <br />
        <br /> in this site i use redux and some new thing in react like lazy
        compunents and code spliting . i tried in this site more use APIs.i
        liked to use next js in site but <br />
        <br /> i thing next js is harder than that i learn in nextjs doc if you
        want to see my code <a>this is my github link</a>
      </h3> */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: "white",
          marginTop: { xs: "35px", md: "150px" },
        }}
      >
        this site is my first full project by react it is not so much
        complicated and important website but i tried to make every thing that i
        learn
        <br /> in this site i use redux and some new thing in react like lazy
        compunents and code spliting . i tried in this site more use APIs.i
        liked to use next js in site but
        <br /> i thing next js is harder than that i learn in nextjs doc if you
        want to see my code <a>this is my github link</a>
      </Typography>
      <ThemeProvider theme={costomizingTeme}>
        <Button
          variant="contained"
          onClick={createContactHandler}
          sx={{
            mt: "50px",
            display: "block",
            zIndex: "5",
            display: "flex",
            alignItems: "center",
            position: "fixed",
            bottom: "0",
          }}
        >
          {" "}
          new contact
          <AddIcon />
        </Button>
      </ThemeProvider>

      <h1 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        contacts
      </h1>
      <Grid container spacing={4} sx={{ mt: "40px" }}>
        {favs.map((fav) => (
          <Contact posts={fav} fill={fill} key={fav.id} />
        ))}

        {postsLoading !== ("reject" || "loading") ? (
          filterPost.map((post) => (
            <Contact key={post.id} fill={fill} userId={userId} posts={post} />
          ))
        ) : offlineLoading === "ful" ? (
          offlineDb.map((i) => (
            <Contact key={i.id} userId={userId} fill={fill.get('s')} posts={i}/>
          ))
        ) : (
          <h1>loading</h1>
        )}
      </Grid>
    </>
  );
};
export default Home;
