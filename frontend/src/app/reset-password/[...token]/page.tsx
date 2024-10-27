import PasswordVerification from "@/components/Verification/passwordVerification"

export default async function Page({params}:any) {
    const {token} = await params
    return(
        <>
        <PasswordVerification token={token}/>
        </>
    )
    
}