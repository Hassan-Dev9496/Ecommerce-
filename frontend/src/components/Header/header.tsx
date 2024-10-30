import Link from "next/link";
import { cookies } from "next/headers";
import AuthControls from "./Client/AuthControls";



export default async function Header(){
    const cookieStore= await cookies()
    const token = cookieStore.get("token")?.value || null
    return(
        <>
        <header className=" w-full flex justify-between">
            <ul className="flex gap-5 bg-[#001ABC] w-1/2 p-5 ">
                <li><Link href={'/'}>Home</Link></li>
                <li>About</li>
                <li>Products</li>
            </ul>
          <div className="bg-[#A5004A] w-1/2 p-5 flex justify-end">
          <AuthControls token={token}/>
          </div>
            
        </header>
        </>
    )
}