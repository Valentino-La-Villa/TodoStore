import { useAppSelector } from "../../redux/store"
import IndividualProduct from "./IndividualProduct"
import { Item } from "../../data/generalDatabase"
import { ReactElement } from "react"

export default function Products() {

    const allProducts: Item[] = useAppSelector(state => state.products.items)

    const productDisplay: ReactElement[] = allProducts.map((product: Item) => {
            return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2 d-flex justify-content-center" // Column placement is handled up here
            key={product.id}
            > 
                <IndividualProduct
                    props={product}/>
            </div>
            )
    })

    return (
        <div className="container">
            <div className="row col-12 d-flex g-3">
            {productDisplay}
            </div>
        </div>
    )
}