"use client";
import useStore, { IUser } from "@/store/user";
import { useEffect } from "react";

interface StoreInitializerProps {
  user: IUser | null; 
}

export default function StoreInitializer({ user }: StoreInitializerProps) {
  console.log(user , "user in store initializer")
  useEffect(() => {
    useStore.setState({ user });
  }, [user]); 

  return null; 
  
}
