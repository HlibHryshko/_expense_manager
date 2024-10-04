// src/components/LoginForm.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill out all fields");
      return;
    }

    dispatch(registerUser({ name, email, password })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/dashboard"); // Redirect to dashboard on success
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow-md rounded-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Registering new user..." : "Register"}
        </button>
        <div className="flex justify-around m-2 items-center">
          <p>Already have an account?</p>
          <Link to={"/login"} className="p-1 text-blue-400 hover:text-blue-800">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
