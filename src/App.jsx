import "./App.css";
<<<<<<< HEAD
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";



=======
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import { lazy, Suspense } from "react";
>>>>>>> 85c2cf476338489dbd860f871da2e651080e5ced
const SignIn=lazy(()=>import('./components/contact/signIn'));
const SignUp=lazy(()=>import('./components/contact/signUp'));
const  CreateContact=lazy(()=>import('./components/contact/createContact'));

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Suspense fallback={<h1 style={{color:"red",textAlign:"center"}}>loading</h1>}><Home /></Suspense> ,
    },
    {
      path: "/createContact",
      element:<Suspense fallback={<h1 style={{color:"red",textAlign:"center"}}>loading</h1>}> <CreateContact /></Suspense>,
    },
    {
      path: "/signUp",
      element:<Suspense fallback={<h1 style={{color:"red",textAlign:"center"}}>loading</h1>}><SignUp /></Suspense> ,
    },
    {
      path: "/signIn",
      element:<Suspense fallback={<h1 style={{color:"red",textAlign:"center"}}>loading</h1>}> <SignIn /></Suspense>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}>
        <Home />
      </RouterProvider>
    </div>
  );
}

export default App;
