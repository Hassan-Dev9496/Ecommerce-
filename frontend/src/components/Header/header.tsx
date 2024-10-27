import Link from "next/link";
import { cookies } from "next/headers";
import AuthControls from "./Client/AuthControls";



export default async function Header(){
    const cookieStore= await cookies()
    const token = cookieStore.get("token")?.value || null
    return(
        <>
        <header className="bg-indigo-600 w-full p-5 flex justify-between">
            <ul className="flex gap-5">
                <li><Link href={'/'}>Home</Link></li>
                <li>About</li>
                <li>Products</li>
            </ul>
          <AuthControls token={token}/>
            
        </header>
        </>
    )
}