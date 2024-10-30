import { Images } from "@/utils/Images";
import Image from "next/image";

export default function Home(){
    return(
        <>
        <Image className="object-cover h-[500px] lg:h-auto" src={Images.msn} alt=""/>
        </>
    )
}