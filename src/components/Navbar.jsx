import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex font-inter p-4 items-center justify-between bg-slate-700">
      <h1 className="text-2xl font-bold">Background Remover</h1>
      <div className="flex gap-8 items-center">
        {user && (
          <h6 className="text-lg font-bold">Welcome, {user.username}</h6>
        )}
        {user ? (
          <h6
            className="text-lg font-bold cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </h6>
        ) : (
          <Link
            to="/login"
            style={{
              fontWeight: "bold",
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
