import "./App.css";
// import Home from "./components/Home/Home";
// import CreateContact from "./components/contact/createContact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignUp from "./components/contact/signUp";
// import SignIn from "./components/contact/signIn";
import { lazy, Suspense } from "react";
// import { openDB } from "idb";
// import { db } from "../public/sw";

//  export const db = openDB("contacts", 1, {
//   upgrade(db){
//      db.createObjectStore("contacts",{
//       keyPath:"id",
//       autoIncrement:true
//      })
//   }
// }
// );

const Home=lazy(()=>import('./components/Home/Home'));
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
