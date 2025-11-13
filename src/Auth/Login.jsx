
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    login(email, password)
      .then((result) => {
        console.log(result.user);
        event.target.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen flex flex-col">
   

      {/* Main Login Form */}
      <div className="flex-grow flex items-center justify-center bg-gray-50 p-10">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>

          <form onSubmit={handleLogIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="text-right">
              <Link to="/auth/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn w-full rounded-full text-white text-sm font-semibold 
              bg-gradient-to-r from-[#ff8a0c] via-[#ff9e2b] to-[#07a0e3]
              hover:from-[#07a0e3] hover:via-[#2ec8f9] hover:to-[#ff8a0c]
              border-none shadow-md hover:shadow-xl transition-all duration-300"
            >
              Login
            </button>
          </form>

          <div className="my-4 flex items-center justify-center">
            <span className="border-t border-gray-300 flex-grow mr-2"></span>
            <span className="text-gray-400">or</span>
            <span className="border-t border-gray-300 flex-grow ml-2"></span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 hover:bg-gray-100 transition-all"
          >
            <FaGoogle className="text-red-500" />
            Login with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            New to our platform?{" "}
            <Link to="/auth/register" className="text-blue-500 hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default Login;
