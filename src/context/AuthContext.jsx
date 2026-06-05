import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from "../services/api";

const AuthContext =
  createContext();

export const AuthProvider =
({
  children
}) => {

  const [user,
    setUser] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [token,
    setToken] =
    useState(
      localStorage.getItem(
        "token"
      )
    );

  useEffect(() => {

    const loadUser =
      async () => {

        if (!token) {

          setLoading(false);

          return;

        }

        try {

          const response =
            await api.get(
              "/auth/me",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setUser(
            response.data.user
          );

        } catch (error) {

          console.error(
            "Auth Restore Error",
            error
          );

          localStorage.removeItem(
            "token"
          );

          setToken(null);

          setUser(null);

        } finally {

          setLoading(false);

        }

      };

    loadUser();

  }, [token]);

  const login =
    (
      userData,
      jwtToken
    ) => {

      setUser(userData);

      setToken(jwtToken);

      localStorage.setItem(
        "token",
        jwtToken
      );

    };

 const logout = () => {

  setUser(null);

  setToken(null);

  localStorage.removeItem("token");

  Object.keys(localStorage).forEach((key) => {

    if (
      key.startsWith(
        "ats_chat_history_"
      )
    ) {

      localStorage.removeItem(key);

    }

  });

};

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        setUser
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth =
  () =>
    useContext(
      AuthContext
    );