"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface VerificationProps {
  token: string; 
}

export default function Verification({ token }: VerificationProps) {
  const router = useRouter();
  const [inputs, setInputs] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleToken = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/verify-email/${token}`
      );
      if (response.status === 200) {
        setInputs(true);
      }
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
      setInputs(false);
      setError("Your token is expired or invalid."); 
    }
  };



  useEffect(() => {
    handleToken();
  }, [token]); 
  return (
    <>
      <main className="text-4xl flex justify-center">
        This is the Password Verification Page
      </main>
      {inputs ? (
        <form  className="flex flex-col items-center">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            disabled={password !== confirmPassword} 
          >
            Reset Password
          </button>
        </form>
      ) : (
        <h1>Your Token is Expired</h1>
      )}
    </>
  );
}
