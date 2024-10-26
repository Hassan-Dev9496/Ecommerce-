import Link from "next/link";

export default async function Header(){
    return(
        <>
        <header className="bg-indigo-600 w-full p-5 flex justify-between">
            <ul className="flex gap-5">
                <li><Link href={'/'}>Home</Link></li>
                <li>About</li>
                <li>Products</li>
            </ul>
            <div>
                <Link href={'/login'}>Login</Link>
            </div>
        </header>
        </>
    )
}