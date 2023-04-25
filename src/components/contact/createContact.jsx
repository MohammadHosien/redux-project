import { Button, ThemeProvider } from "@mui/material";
import { StylishInput } from "../../helpers/color";
import BasicSvg from "../../svgs/basicSvg";
import BasicSvgRight from "../../svgs/basicSvgRight";
import { useNavigate } from "react-router-dom";
import { costomizingTeme } from "../../helpers/color";
import { useImmer } from "use-immer";
import { nanoid } from "@reduxjs/toolkit";
import { addnewFetchPost } from "../../featuers/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addDB, deleteAll } from "../../featuers/idb/postDbslice";
import * as jose from "jose";

const CreateContact = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.posts.loading);
  const [form, setForm] = useImmer({
    name: "",
    lastname: "",
    gmail: "",
    numberPhone: "",
    fav: false,
    user: "",
    synced: true,
    id: nanoid(),
  });

  const navigate = useNavigate();
  const cancelHandler = (e) => {
    navigate("/");
  };
  const formHandler = async (e) => {
    e.preventDefault();
    const secret = jose.base64url.decode(import.meta.env.VITE_JWT_CODE);
    const { payload } = await jose.jwtDecrypt(
      localStorage.getItem("token"),
      secret
    );
    if (
      form.numberPhone.length === 8 &&
      (form.name.length !== 0) & (form.lastname.length !== 0) &&
      localStorage.getItem("token")
    ) {
      dispatch(addnewFetchPost({ ...form, user: payload.secretId }));
      navigate("/");
    }
   
    if (!navigator.serviceWorker) {
      return console.log("is not supported");
    }
    navigator.serviceWorker.ready
      .then((res) => {
        if (loading === "reject") {
          console.log('offlone')
          dispatch(addDB({ ...form, user: payload.secretId, synced: false }));
        }

        return res.sync.register("synced");
      })
      .then(() => {
        console.log("succest");
      })
      .catch(() => {
        console.log("help");
      });
  };

  const InputHandler = (e) => {
    setForm((pre) => {
      pre[e.target.name] = e.target.value;
    });
  };
  return (
    <>
      <h1 style={{ textAlign: "center", color: "red" }}>
        create your contacts
      </h1>
      <BasicSvg />
      <form
        onSubmit={formHandler}
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: "6",
          alignItems: "center",
          marginTop: "200px",
        }}
      >
        <StylishInput
          label="name"
          name="name"
          sx={{ width: { sx: "60%", md: "30%" } }}
          onChange={InputHandler}
        />
        <StylishInput
          label="lastname"
          name="lastname"
          sx={{ width: { sx: "60%", md: "30%" } }}
          onChange={InputHandler}
        />
        <StylishInput
          label="gmail"
          name="gmail"
          sx={{ width: { sx: "60%", md: "30%" } }}
          onChange={InputHandler}
        />
        <StylishInput
          label="numberPhone"
          name="numberPhone"
          sx={{ width: { sx: "60%", md: "30%" } }}
          onChange={InputHandler}
        />
        <ThemeProvider theme={costomizingTeme}>
          <Button variant="contained" type="submit">
            upload
          </Button>
          <Button onClick={cancelHandler} variant="contained">
            cancel
          </Button>
        </ThemeProvider>
      </form>
      <BasicSvgRight />
    </>
  );
};
export default CreateContact;
