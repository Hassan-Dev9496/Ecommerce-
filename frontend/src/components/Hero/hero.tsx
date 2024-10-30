import { Images } from "@/utils/Images";
import Image from "next/image";


export default function Hero(){
    return(
        <>
        <Image className="object-cover h-[500px] lg:h-auto" src={Images.msn} alt=""/>
        </>
    )
}