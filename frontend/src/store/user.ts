import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist , createJSONStorage } from "zustand/middleware";

export interface IUser{
    id:string;
    name:string;
    email:string;
    is_verified:boolean;
}

type State={
    user:IUser | null
}

type Actions={
    setUser:(user:IUser | null)=>void
}

const useStore=create<State & Actions>()(
    persist(
        immer((set)=>({
            user:null,
            setUser:(user:IUser | null)=>set((state)=>{
            state.user=user
            })
        })),
        {
            name:'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
export default useStore;