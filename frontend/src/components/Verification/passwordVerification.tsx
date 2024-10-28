"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface VerificationProps {
  token: any; 
}

export default function Verification({ token }: VerificationProps) {
  const router = useRouter();
  const [inputs, setInputs] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleToken = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/verify-password-token/${token}`
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

  const handleChangePassword = async (e:any) => {
    e.preventDefault()
    if (confirmPassword.trim() === "" || newPassword.trim() === "") {
      return alert("All fieldsmust be provided.");
    }
    if (confirmPassword.trim() !== newPassword.trim() ) {
      return alert("Password and Confirm Password must be same");
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/change-password/", {
        token:token.join(),
        new_password: newPassword,
      });
      console.log(response , "res")
      alert("Password has been changed successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to change password. Check your token and try again.");
    }
  };

  

  useEffect(() => {
    handleToken();
  }, [token]); 
  return (
    <>
      <main className=" flex flex-col items-center justify-center p-10 py-20">
        <h1 className="text-4xl">This is the Password Verification Page</h1>
        {inputs ? (
        <form  className="flex flex-col items-center">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-4 p-2 border border-gray-300 rounded outline-none text-black"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-4 p-2 border border-gray-300 rounded text-black outline-none"
          />
          <button
          onClick={handleChangePassword}
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded cursor-pointer"
            
          >
            Reset Password
          </button>
        </form>
      ) : (
        <h1 className="pt-20">Your Token is Expired</h1>
      )}
      </main>
  
    </>
  );
}
