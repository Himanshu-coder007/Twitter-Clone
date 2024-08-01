import "./App.css";

import Home from "./components/Home";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import {Toaster} from "react-hot-toast"

import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

function App() {
   const appRouter = createBrowserRouter([
     {
       path: "/",
       element: <Home/>,
       children: [
        {
          path: "/",
          element: <Feed/>,
        },
        {
          path:"/profile",
          element:<Profile/>
        }
       ]
     },
     {
       path: "/login",
       element: <Login />,
     },
   ]);
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
      <Toaster/>
    </div>
  );
}

export default App;
