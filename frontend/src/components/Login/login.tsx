"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import useStore  from "@/store/user";
import {setCookie} from 'cookies-next'
import { useRouter } from "next/navigation";
import ForgotPassword from "../ForgotPassword/forgot-password";

export default function Login() {

  const [user, setUser] = useState({ email: "", password: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  const handleUserInputs = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    if (
      user.email.trim() === "" ||
      user.password.trim() === ""
    ) {
      return alert("All Inputs Must be filled");
    }
  
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/login/`,
        user,
      );
      alert(response?.data?.message)
      if(response.status === 200){
        setCookie('token' , response?.data?.user?.verification_token)
        useStore.setState({
          user:{
            id:response.data.user.id,
            name:response.data.user.name,
            email:response.data.user.email,
            is_verified:response.data.user.is_verified
          }
        })
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally{
      setUser({ email: "", password: "" })
    }
  };



    return (
      <>
        <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleUserInputs}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <p
                      onClick={() => setIsModalOpen(true)}
                      className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    onChange={handleUserInputs}
                    value={user.password}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                href={'/signup'}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create Your Account
              </Link>
            </p>
          </div>
        </main>
        {isModalOpen && <ForgotPassword isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </>
    );
  }
  