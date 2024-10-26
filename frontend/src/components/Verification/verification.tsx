"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Verification({ token }: any) {
  const router = useRouter();

  const handleToken = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/verify-email/${token}`
      );
      if (response.status === 200) {
        router.push("/");
      }
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleToken();
  }, []);
  return (
    <>
      <main className="text-4xl flex justify-center">
        This is verification page
      </main>
    </>
  );
}
