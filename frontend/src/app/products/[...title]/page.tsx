import SingleProduct from "@/components/SingleProduct/single-product";
import axios from "axios";

export default async function Page({params}:any){
   const {title} = await params
   const join = title.join()

   async function fetchSingleProduct() {
    const res = await axios.get(`http://127.0.0.1:8000/api/get-single-product` , {
        params:{title:join}
    });
    return res.data
  }
  
  const product = await fetchSingleProduct()



    return(
        <>
       <SingleProduct product = {product}/>
        </>
    )
}