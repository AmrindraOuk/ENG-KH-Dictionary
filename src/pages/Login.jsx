import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login with test account
    if (email === "test@example.com" && password === "password123") {
      login({
        firstName: "Test",
        email: email,
      });
      navigate("/");
    } else {
      alert(
        "Please use the test account:\nEmail: test@example.com\nPassword: password123"
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | English-Khmer Dictionary</title>
        <meta
          name="description"
          content="Login to access your saved words, favorites, and more features."
        />
      </Helmet>

      <div
        className={`min-h-fit flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        } py-12 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2
              className={`mt-6 text-center text-3xl font-extrabold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Sign in to your account
            </h2>
            <p
              className={`mt-2 text-center text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Test Account:
              <br />
              Email: test@example.com
              <br />
              Password: password123
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "border-gray-300 text-gray-900"
                  } placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "border-gray-300 text-gray-900"
                  } placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
