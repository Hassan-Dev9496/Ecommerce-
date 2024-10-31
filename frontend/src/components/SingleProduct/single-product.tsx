"use client"
import Image from "next/image"
import { useState } from "react";

export default function SingleProduct({ product }: any) {
    const [mainImage, setMainImage] = useState(product.images[0].img);
    const [selectedSize, setSelectedSize] = useState<any>(product.sizes[0]);
    const [selectedQuantity, setSelectedQuantity] = useState(1);


    const handleSizeChange = (size: any) => {
        setSelectedSize(size);
        setSelectedQuantity(1); 
    };


    const increaseQuantity = () => {
        if (selectedQuantity < selectedSize.quantity) {
            setSelectedQuantity(selectedQuantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity(selectedQuantity - 1);
        }
    };

    return (
        <>
            <main className="bg-white p-10 flex gap-10">
                <section className="flex flex-col gap-5">
                    <Image
                        src={`http://127.0.0.1:8000/${mainImage}`}
                        alt="Main product image"
                        width={200}
                        height={200}
                        className="object-cover h-80 w-80"
                    />
                    <div className="flex gap-5">
                        {product.images.map((image: any, index: number) => (
                            <div key={index} className="cursor-pointer">
                                <Image
                                    src={`http://127.0.0.1:8000/${image.img}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full"
                                    onClick={() => setMainImage(image.img)}  
                                />
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h1 className="text-4xl text-black mb-5">{product.title}</h1>
                    <div className="text-black flex gap-10">
                        <p className="line-through">Rs {product.actual_prize}</p>
                        <p>Rs {product.sale_prize}</p>
                    </div>

                    <h1 className="text-2xl text-black py-5">Size</h1>
                    <div className="flex gap-5 text-black">
                        {product.sizes.map((size: any) => (
                            <div
                                key={size.id}
                                className={`cursor-pointer ${selectedSize?.id === size.id ? 'font-bold' : ''}`}
                                onClick={() => handleSizeChange(size)}
                            >
                                {size.name}
                            </div>
                        ))}
                    </div>
                    {selectedSize && (
                        <div className="text-black mt-5">
                            <p>Quantity Available: {selectedSize.quantity}</p>
                            <div className="flex items-center mt-3 gap-2">
                                <button
                                    className="px-3 py-1 bg-gray-200 text-black"
                                    onClick={decreaseQuantity}
                                    disabled={selectedQuantity === 1}
                                >
                                    -
                                </button>
                                <span className="text-black">{selectedQuantity}</span>
                                <button
                                    className="px-3 py-1 bg-gray-200 text-black"
                                    onClick={increaseQuantity}
                                    disabled={selectedQuantity >= selectedSize.quantity}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
