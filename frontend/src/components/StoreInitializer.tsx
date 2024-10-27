"use client";
import useStore, { IUser } from "@/store/user";
import { useEffect } from "react";

interface StoreInitializerProps {
  user: IUser | null; 
}

export default function StoreInitializer({ user }: StoreInitializerProps) {
  useEffect(() => {
    useStore.setState({ user });
  }, []); 

  return null; 
  
}
