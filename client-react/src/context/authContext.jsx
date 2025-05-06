import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [percent, setPercent] = useState(10);
  const updateUser = (data) => {
    setCurrentUser(data);
  };
  //update the percentage
  const updatePercent = (data) => {
    setPercent(data);
  }
  const logout = () => {
    // Clear both the state and localStorage
    setCurrentUser(null);
    localStorage.removeItem("user");
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser,updateUser,logout,percent,updatePercent }}>
      {children}
    </AuthContext.Provider>
  );
};
