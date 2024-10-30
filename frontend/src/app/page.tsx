import Collections from "@/components/Collections/collections";
import Hero from "@/components/Hero/hero";
import axios from "axios";



async function fetchAllProducts() {
  const res = await axios.get(`http://127.0.0.1:8000/api/products`);
  return res.data
}

const products = await fetchAllProducts()


export default async function Home() {
  return (
    <>
    <Hero/>
    <Collections products = {products}/>
    </>
  );
}
