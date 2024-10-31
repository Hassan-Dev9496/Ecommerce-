import Collections from "@/components/Collections/collections";
import Hero from "@/components/Hero/hero";
import axios from "axios";
import useStore from "@/store/user";



async function fetchAllProducts() {
  const res = await axios.get(`http://127.0.0.1:8000/api/products`);
  return res.data
}

const products = await fetchAllProducts()
const user = useStore.getState().user
console.log(user , "us")

// const createCart = async () => {

//   try {
//     const response = await axios.post(
//       `http://127.0.0.1:8000/api/create-cart/`, 
//       {}, 
//     );

//     if (response.status === 200) {
//       alert(`Cart created successfully with ID: ${response.data.cart_id}`);
//     }
//   } catch (error) {
//     console.error("Error creating cart:", error);
//     alert("Failed to create cart.");
//   }
// };


export default async function Home() {
  return (
    <>
    <Hero/>
    <Collections products = {products}/>
    </>
  );
}
