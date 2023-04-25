import "./App.css";
import Home from "./components/Home/Home";
import CreateContact from "./components/contact/createContact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/contact/signUp";
import SignIn from "./components/contact/signIn";
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
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/createContact",
      element: <CreateContact />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/signIn",
      element: <SignIn />,
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
