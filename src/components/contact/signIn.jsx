import { StylishInput } from "../../helpers/color";
import { costomizingTeme } from "../../helpers/color";
import { ThemeProvider, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getUserFetching } from "../../featuers/posts/userSlice";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";

const SignIn = () => {
  const [form, setForm] = useImmer({
    name: "",
    password: "",
    gmail: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.user);
  useEffect(() => {
    dispatch(getUserFetching());
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();
    const user = users.find((user) => user.gmail === form.gmail);
    let email=/^(\W|^)[\w.+\-]*(@gmail\.com|@yahoo\.com)+(\W|$)$/.test(form.gmail);
    console.log(email)
    if (user != undefined) {
      const secret = jose.base64url.decode(import.meta.env.VITE_JWT_CODE);
      const { payload } = await jose.jwtDecrypt(user.token, secret);
      if (
        payload.password === form.password &&
        user.gmail === form.gmail &&
        user.name === form.name
      ) {
        navigate("/");
        if(localStorage.getItem("token")!==undefined){
           localStorage.setItem("token",user.token)
        }
      }else{
        toast.error("something was wrong ")
      }
      if(user.name!==form.name){
        toast.error("your name was wrong ")
      }
      if(user.password!==form.password){
        toast.error("your password was wrong ")
      }
      // else if (payload.password !== form.password) {
      //   dispatch(textError({ ...errors, passwordError: "password was wrong" }));
      // } else if (user.name !== form.name) {
      //   dispatch(textError({...errors,nameError:"name was wrong"}));
      // }
    }else{
      toast.error("your gmail wasny ture")
    }
  };

  const inputHandler = (e) => {
    setForm((pre) => {
      pre[e.target.name] = e.target.value;
    });
  };

  return (
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
      <ToastContainer/>
      <StylishInput
        label="name"
        name="name"
        onChange={inputHandler}
        sx={{ width: { sx: "60%", md: "30%" } }}
      />
      <StylishInput
        label="gmail"
        name="gmail"
        onChange={inputHandler}
        sx={{ width: { sx: "60%", md: "30%" } }}
      />
      <StylishInput
        label="password"
        name="password"
        onChange={inputHandler}
        sx={{ width: { sx: "60%", md: "30%" } }}
      />
      <ThemeProvider theme={costomizingTeme}>
        <Button variant="contained" type="submit">
          create
        </Button>
      </ThemeProvider>
    </form>
  );
};

export default SignIn;
