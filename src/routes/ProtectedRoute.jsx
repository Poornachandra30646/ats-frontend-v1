import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

function ProtectedRoute({
  children
}) {

  const {
    token,
    loading
  } = useAuth();

  if (loading) {

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
      "
      >

        <h1
          className="
          text-2xl
          font-bold
        "
        >
          Loading...
        </h1>

      </div>

    );

  }

  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  return children;

}

export default ProtectedRoute;