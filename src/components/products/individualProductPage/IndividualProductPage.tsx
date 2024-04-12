import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../../../redux/store"
import { Item } from "../../../data/generalDatabase"
import NotFound from "../../misc/NotFound"
import ProductInfo from "./ProductInfo"
import { Tooltip } from "react-bootstrap"

export default function IndividualProductPage() {

    const productID = Number(useParams().productID)

    const state = useAppSelector(state => state.products)
    const products: Item[] = state.items

    const currentProduct: Item | undefined = products.find(product => product.id == productID)

    if (!currentProduct) {
        return <NotFound />
    }

    return (
        <div className="p-2 p-sm-0">

            <Link to='/products'><button className="ms-4 mt-4 btn btn-outline-dark">←</button></Link>
            <div className="container mt-5 border border-2 border-secondary rounded-3 p-4">
                <div className="row">

                    <div className="col-12 col-md-4 d-flex justify-content-center"><img src={currentProduct.img} className="img-fluid border border-primary border-4 rounded-1 object-fit-cover" alt=""/></div>

                    <div className="col-12 col-md-8 mt-4 mt-md-0">
                            <ProductInfo // Decided to render it in a different component for better code readability :)
                            currentProduct={currentProduct} />
                    </div>
                </div>
            </div>
        </div>
    )
}