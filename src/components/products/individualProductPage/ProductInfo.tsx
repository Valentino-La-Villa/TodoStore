
import { getDiscountPrice } from "../../../utilities/miscFunctions"
import { Item } from "../../../data/generalDatabase"

type CurrentProduct = {
    currentProduct: Item
}

export default function ProductInfo({currentProduct}: CurrentProduct) {


    return (
        <section>
            <h1 className="individualProductPage__title">{currentProduct.name}</h1>


            <p className="mb-2">{currentProduct.discount ? // Discount interface

            <>
                <span className="card-text pb-3 d-flex">
                    <span className="text-decoration-line-through">${currentProduct.individualPriceUSD}</span>
                    <span className="mx-1">→</span>
                    <span className="text-success fw-bold me-2">${getDiscountPrice(currentProduct).toFixed(2)}</span>
                    <span className="bg-danger p-1 text-white rounded-1 fw-bold" style={{fontSize: '12px'}}>{currentProduct.discount}% OFF!</span>
                </span>
            </>

            :

            <span className="card-text text-success pb-3 fw-bold">${currentProduct.individualPriceUSD.toFixed(2)}</span>

            }</p>

            {currentProduct.description ? 
            <p className="individualProductPage__descriptionText mb-3 text-secondary">{currentProduct.description}</p> : <></>}
        </section>
    )
}