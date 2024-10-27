"use client";

import useStore from "@/store/user";
import axios from "axios";
import { useState } from "react";

export default function ForgotPassword({ isOpen, onClose }:any) {
  const user = useStore.getState().user
  console.log(user , "user")
  const [email, setEmail] = useState("");
  const handleResetPassword = async () => {
    if (email.trim() === "") {
      return alert("Email must be provided.");
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/forgot-password/", { email });
      alert("Password reset link has been sent to your email.");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to send reset email.");
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md w-80">
          <h2 className="text-xl font-bold mb-4 text-indigo-600">Reset Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border text-black outline-none rounded-md mb-4"
          />
          <button onClick={handleResetPassword} className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-500">
            Send Reset Link
          </button>
          <button  onClick={onClose} className="w-full mt-2 bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
