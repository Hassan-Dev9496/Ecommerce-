import Verification from "@/components/Verification/verification"

export default async function Page({params}:any) {
    const {token} = await params
    return(
        <>
        <Verification token={token}/>
        </>
    )
    
}