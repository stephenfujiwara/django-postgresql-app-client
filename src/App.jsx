import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import UserHome from "./pages/UserHome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";

function Layout() {
  return (
    <>
      <AuthContextProvider>
        <div className="absolute w-full h-full flex flex-col">
          <Navbar />
          <Outlet />
        </div>
      </AuthContextProvider>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user/:id",
        element: <UserHome />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
