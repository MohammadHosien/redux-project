import { Button, ThemeProvider } from "@mui/material";
import { StylishInput } from "../../helpers/color";
import BasicSvg from "../../svgs/basicSvg";
import BasicSvgRight from "../../svgs/basicSvgRight";
import { useNavigate } from "react-router-dom";
import { costomizingTeme } from "../../helpers/color";
import { useImmer } from "use-immer";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer,toast } from "react-toastify";
import {
  getUserFetching,
  userAddFetch,
} from "../../featuers/posts/userSlice";
import * as jose from "jose";
import { useEffect, useState } from "react";

const SignUp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserFetching());
  }, []);
  const selector = useSelector((state) => state.users.user);
  const [form, setForm] = useImmer({
    name: "",
    gmail: "",
    password: "",
    id: nanoid(),
  });
  const [itsValid, setItsValid] = useState(false);

  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();
    const valid=selector.some((i) => i.gmail === form.gmail)
    let email=/^(\W|^)[\w.+\-]*(@gmail\.com|@yahoo\.com)+(\W|$)$/.test(form.gmail);
    let  passwordVal=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(form.password);
    if (!valid &&email&&passwordVal ) {
      const secretJWT = jose.base64url.decode(import.meta.env.VITE_JWT_CODE);
      const jwt = await new jose.EncryptJWT({
        password: form.password,
        secretId: form.id,
      })
        .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
        .encrypt(secretJWT);
      dispatch(
        userAddFetch({ name: form.name, token: jwt, gmail: form.gmail })
      );
      localStorage.setItem("token", jwt);
      navigate("/");
    }else{
       toast.error("before u had this gmail")
    }

    if(!passwordVal){
      toast.error("your password is not valid")
    }


  };

  const InputHandler = (e) => {
    let  passwordVal=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(form.password);
    setForm((pre) => {
      pre[e.target.name] = e.target.value;
    });
    setItsValid(passwordVal)
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
        <ToastContainer/>
        <StylishInput
          label="name"
          name="name"
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
          label="password"
          name="password"
          sx={{ width: { sx: "60%", md: "30%" } }}
          onChange={InputHandler}
        />
       {!itsValid?<span style={{color:"red"}}>like this: Testing1912</span>:<span style={{color:"red"}}>this is ok </span>} 

        <ThemeProvider theme={costomizingTeme}>
          <Button variant="contained" type="submit">
            create
          </Button>
        </ThemeProvider>
      </form>
      <BasicSvgRight />
    </>
  );
};
export default SignUp;
