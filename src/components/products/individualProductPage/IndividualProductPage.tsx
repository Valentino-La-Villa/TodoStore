import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../../../redux/store"
import { Item, availableSizesList } from "../../../data/generalDatabase"
import NotFound from "../../misc/NotFound"
import ProductInfo from "./ProductInfo"
import AddAndRemoveFromCart from "./AddAndRemoveFromCart"
import AvailableSizesInterface from "./AvailableSizesInterface"
import { ReactElement, useState } from "react"

export default function IndividualProductPage() {

    const productID = Number(useParams().productID)

    const state = useAppSelector(state => state.products)
    const products: Item[] = state.items

    const currentProduct: Item | undefined = products.find(product => product.id == productID)

    if (!currentProduct) {
        return <NotFound />
    }

    let availableSizesDropdownMenu: ReactElement | ReactElement[] | undefined // It needs this 'undefined' so the compiler doesn't complain when you render it conditionally down below

    const [selectedSize, setSelectedSize] = useState<keyof typeof availableSizesList | 'non-applicable' | 'unselected'>('unselected') // It starts as 'unselected' in order to allow for a validation check later

      
    if (currentProduct.availableSizes !== 'non-applicable') {
        availableSizesDropdownMenu = currentProduct.availableSizes.map(size => {
            return (
                <option key={size} value={size}>{size}</option>
            )
        })
    }

    return (
        <div className="p-2 p-sm-0">

            <Link to='/products'><button className="ms-4 mt-4 btn btn-outline-dark">←</button></Link>
            <div className="container mt-5 border border-2 border-secondary rounded-3 p-4">
                <div className="row">

                    <div className="col-12 col-md-4 d-flex justify-content-center"><img src={currentProduct.img} className="img-fluid border border-primary border-4 rounded-1 object-fit-cover" alt=""/></div>

                    <div className="col-12 col-md-8 mt-4 mt-md-0">

                        <div className="d-flex flex-column justify-content-between h-100">
                            
                            <ProductInfo // Decided to render it in a different component for better code readability :)
                            currentProduct={currentProduct} />
                    
                            <div>
                                <AvailableSizesInterface
                                currentProduct={currentProduct}
                                selectedSize={selectedSize}
                                setSelectedSize={setSelectedSize}
                                availableSizesDropdownMenu={availableSizesDropdownMenu} />
                                
                                <AddAndRemoveFromCart 
                                currentProduct={currentProduct}
                                selectedSize={selectedSize}/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

        </div>
    )
}