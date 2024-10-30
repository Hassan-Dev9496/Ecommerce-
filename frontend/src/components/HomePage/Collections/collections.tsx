import { Images } from "@/utils/Images"

const barcaShirts=[
   {
    title:"Barca 2015 Final Messi Shirt",
    actual_prize:"2500",
    sale_prize:"2000",
    category:"shirt",
    size:[
        {name:"small" , quantity:'5'},
        {name:"medium" , quantity:'10'},
        {name:"large" , quantity:'2'}
    ],
    images:[
        {img:Images.msn},
    ]
   }

]

export default function Collections(){
    <>
    <main>
        <h1 className="text-4xl">Collections</h1>
        <section>
            <h1>Shirts</h1>
            <div>
                
            </div>
        </section>
    </main>
    </>
}