import {
  Paper,
  Grid,
  ListItemButton,
  List,
  ListItem,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addnewFetchPost,
  changeFetchPost,
  deleteFetchPost,
} from "../../featuers/posts/postsSlice";
import { useDispatch } from "react-redux";
import { addFavPostFetching } from "../../featuers/posts/favPostSlice";
import { nanoid } from "@reduxjs/toolkit";
import { deleteFavFetching } from "../../featuers/posts/favPostSlice";
import { useState } from "react";
import { StylishInput } from "../../helpers/color";
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { useImmer } from "use-immer";
import { memo } from "react";

const Contact = memo(({ posts, userId }) => {
  const dispatch = useDispatch();

  const [updating, setUpdating] = useState(false);
  const [updatingValue, setUpdaingValue] = useImmer({
    name: posts.name,
    lastname: posts.lastname,
    gmail: posts.gmail,
    numberPhone: posts.numberPhone,
    fav: posts.fav,
    user: userId,
  });
  const deleteHandler = () => {
    if (!posts.fav) {
      dispatch(deleteFetchPost(posts.id));
    } else {
      dispatch(deleteFavFetching(posts.id));
    }
  };
  const favHandler = () => {
    if (posts.fav) {
      dispatch(deleteFavFetching(posts.id));
      dispatch(addnewFetchPost({ ...posts, fav: false, id: nanoid() }));
    } else {
      dispatch(deleteFetchPost(posts.id));
      dispatch(addFavPostFetching({ ...posts, fav: true, id: nanoid() }));
    }
  };
  const editHandler = () => {
    if (updating) {
      dispatch(changeFetchPost({ id: posts.id, post: updatingValue }));
    }
    setUpdating(!updating);
  };

  const updatingHandler = (e) => {
    setUpdaingValue((pre) => {
      pre[e.target.name] = e.target.value;
    });
  };
  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ bgcolor: "#031725", color: "white", position: "relative" }}
        >
          <h2 style={{ textAlign: "center" }}>
            hello my name is <span style={{ color: "red" }}>{posts.name}</span>{posts.synced?<WifiIcon sx={{color:"red"}}/>:<WifiOffIcon sx={{color:"red"}}/>}
          </h2>
          <div style={{ textAlign: "end" }}>
            <IconButton onClick={deleteHandler}>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
            
            <IconButton onClick={editHandler}>
              <EditIcon sx={{ color: "#10489C" }} />
            </IconButton>
            <Checkbox
              onClick={favHandler}
              checked={posts.fav}
              icon={<FavoriteBorderIcon sx={{ color: "red" }} />}
              checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
            />
            
          </div>
          {/* <svg style={{height:"300px",position:'absolute'}} id="eIujTixqFYW1"  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600" shapeRendering="geometricPrecision" textRendering="geometricPrecision"><path d="" fill="none" stroke="#3f5787" strokeWidth="1.2"/><path d="M127.24528,41.510654v232.047497h167.456957l-2.392243,139.946171l132.769445,2.392242" fill="none" stroke="#cf2820" strokeWidth="7.2"/><ellipse rx="17.343757" ry="18.539877" transform="translate(428.069741 417.690746)" fill="#cf2820" stroke="#cf2820"/><path d="M187.051336,97.728346l2.392242,249.989315l149.51514,4.784484-1.196121,136.357808l148.319019,1.196121" fill="none" stroke="#cf2820" strokeWidth="7.2"/><ellipse rx="13.755393" ry="13.755393" transform="translate(490.26804 490.654135)" fill="#d2241a" strokeWidth="0"/><path d="M69.831466,118.062406l2.392242,309.79537h145.926777v94.493568l165.064714,3.588363" fill="none" stroke="#cf2820" strokeWidth="7.2"/><ellipse rx="11.961211" ry="13.157332" transform="translate(385.607442 529.528071)" fill="#d2241a" strokeWidth="0"/></svg> */}
          <svg
            id="eu2gxJ71FEn1"
            style={{ height: "300px", position: "absolute", right: 0 }}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 600 600"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
          >
            <path d="" fill="none" stroke="#3f5787" strokeWidth="1.2" />
            <path d="" fill="none" stroke="#a61d17" strokeWidth="7.2" />
            <path
              d="M515.722993,42.774058L509.64894,509.261294l-183.779026-3.114898l6.229798-214.928014-152.630039-4.672348"
              fill="none"
              stroke="#ce2619"
              strokeWidth="7.2"
            />
            <ellipse
              rx="21.025567"
              ry="21.025567"
              transform="translate(192.707993 285.767309)"
              fill="#ce2619"
              strokeWidth="0"
            />
            <path
              d="M456.695662,98.094659l-4.672349,313.047325-66.970323-3.114899l1.55745-56.068178h-95.004412l-3.114899,57.625627-186.893925-1.557449"
              fill="none"
              stroke="#ce2619"
              strokeWidth="7.2"
            />
            <ellipse
              rx="18.689393"
              ry="17.910667"
              transform="translate(107.827002 411.920709)"
              fill="#ce2619"
              strokeWidth="0"
            />
            <path
              d="M565.717118,163.507533l-3.114899,400.264489h-204.025868l1.557449-96.561861-188.451374-6.229797"
              fill="none"
              stroke="#ce2619"
              strokeWidth="7.2"
            />
            <ellipse
              rx="15.574494"
              ry="16.353218"
              transform="translate(187.256919 463.316538)"
              fill="#ce2619"
              strokeWidth="0"
            />
          </svg>
          {updating ? (
            <form
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "22px",
                zIndex: "6",
                alignItems: "center",
              }}
            >
              <StylishInput
                label="name"
                name="name"
                value={updatingValue.name || ""}
                onChange={updatingHandler}
                sx={{ width: "90%" }}
              />
              <StylishInput
                label="lastname"
                name="lastname"
                value={updatingValue.lastname || ""}
                onChange={updatingHandler}
                sx={{ width: "90%" }}
              />
              <StylishInput
                label="number phone"
                name="numberPhone"
                value={updatingValue.numberPhone || ""}
                onChange={updatingHandler}
                sx={{ width: "90%" }}
              />
              <StylishInput
                label="gmail"
                name="gmail"
                value={updatingValue.gmail || ""}
                onChange={updatingHandler}
                sx={{ mb: "88px", width: "90%" }}
              />
            </form>
          ) : (
            <List>
              <ListItem>
                <ListItemButton>
                  <h3>name:{posts.name}</h3>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <h3>lastname: {posts.lastname}</h3>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <h3>number phone:{posts.numberPhone}</h3>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <h3>gmail:{posts.gmail}</h3>
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </Paper>
      </Grid>
    </>
  );
});
export default memo(Contact);
