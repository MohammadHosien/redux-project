import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import { lazy, Suspense } from "react";
const SignIn=lazy(()=>import('./components/contact/signIn'));
const SignUp=lazy(()=>import('./components/contact/signUp'));
const  CreateContact =lazy(()=>import('./components/contact/createContact'));

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Suspense fallback={<h1>loading</h1>}><Home /></Suspense> ,
    },
    {
      path: "/createContact",
      element:<Suspense fallback={<h1>loading</h1>}> <CreateContact /></Suspense>,
    },
    {
      path: "/signUp",
      element:<Suspense fallback={<h1>loading</h1>}><SignUp /></Suspense> ,
    },
    {
      path: "/signIn",
      element:<Suspense fallback={<h1>loading</h1>}> <SignIn /></Suspense>,
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
