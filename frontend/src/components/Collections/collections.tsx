import Image from "next/image"
import Link from "next/link";

export default async function Collections({ products }: { products: any }) {


    return (
        <>
            <main className="bg-white p-10">
                <h1 className="text-4xl text-black">Collections</h1>
                <div className="text-black">
                    <h1>Shirts</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products?.map((item: any) => (
                            <section key={item.id} className="border p-4 rounded shadow">
                                <h2 className="text-2xl">{item.title}</h2>
                                <p className="text-lg">Actual Price: ${item.actual_prize}</p>
                                <p className="text-lg">Sale Price: ${item.sale_prize}</p>
                                <p className="text-lg">Category: {item.category}</p>

                                <h3 className="text-xl">Sizes:</h3>
                                <ul>
                                    {item?.sizes?.map((size: any) => (
                                        <li key={size.id}>
                                            {size.name} - Quantity: {size.quantity}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex space-x-2">
                                    {item?.images?.map((image: any) => (
                                        <div key={image.id} className="w-24 h-24 relative">
                                            <Image
                                                src={`http://127.0.0.1:8000/${image.img}`}
                                                alt={item.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Link href={`products/${item.title.replace(/\s+/g, '-')}`}>
                                <button>
                                    View in Detail
                                </button>
                                </Link>
                            </section>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
