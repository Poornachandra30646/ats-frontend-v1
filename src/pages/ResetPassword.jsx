import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import api from "../services/api";

function ResetPassword() {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {

        return setMessage(
          "Passwords do not match"
        );

      }

      try {

        setLoading(true);

        const response =
          await api.post(
            "/auth/reset-password",
            {
              token,
              password
            }
          );

        setMessage(
          response.data.message
        );

        setTimeout(() => {

          navigate("/login");

        }, 2000);

      } catch (error) {

        setMessage(

          error.response?.data
            ?.message ||

          "Something went wrong"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-100
      px-4
      "
    >

      <div
        className="
        bg-white
        p-8
        rounded-2xl
        shadow-xl
        w-full
        max-w-md
        "
      >

        <div className="text-center mb-6">

          <div
            className="
            w-16
            h-16
            bg-blue-100
            rounded-full
            flex
            items-center
            justify-center
            mx-auto
            mb-4
            "
          >

            <FaLock
              className="
              text-blue-600
              text-2xl
              "
            />

          </div>

          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Reset Password
          </h1>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
            w-full
            border
            p-3
            rounded-xl
            mb-4
            "
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="
            w-full
            border
            p-3
            rounded-xl
            mb-4
            "
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-blue-600
            text-white
            p-3
            rounded-xl
            "
          >

            {
              loading
                ? "Updating..."
                : "Reset Password"
            }

          </button>

        </form>

        {
          message && (

            <div
              className="
              mt-4
              text-center
              text-sm
              "
            >
              {message}
            </div>

          )
        }

      </div>

    </div>

  );

}

export default ResetPassword;