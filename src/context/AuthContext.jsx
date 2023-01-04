import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const url = "http://localhost:8000/api/";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    JSON.parse(localStorage.getItem("authToken")) || null
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authToken"))
      ? jwt_decode(JSON.parse(localStorage.getItem("authToken")).access)
      : null
  );

  //console.log(JSON.parse(localStorage.getItem("authToken")) === null);

  const login = async (inputs) => {
    try {
      const response = await fetch(`${url}token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      setAuthToken(data);
      setUser(jwt_decode(data.access));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const updateToken = async () => {};

  useEffect(() => {
    localStorage.setItem("authToken", JSON.stringify(authToken));
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
