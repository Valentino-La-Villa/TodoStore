import { useAppSelector } from "../../redux/store"
import IndividualCartItem from "./IndividualCartItem"
import { CartItem } from "../../redux/slices/productHandlingSlice"
import { ReactElement } from "react"
import { Link } from "react-router-dom"
import { getTotalPriceForCart } from "../../utilities/miscFunctions"

export default function Cart() {

    const shoppingCart: CartItem[] = useAppSelector(state => state.products.cart)

    const shoppingCartItemListDisplay: ReactElement[] = shoppingCart.map((item: CartItem): ReactElement => {

        return (
            <IndividualCartItem
            props={item}
            key={`${item.id}-${item.selectedSize}`} />
        )
    })

    const totalPrice = getTotalPriceForCart(shoppingCart)

    return (
        <div className="container-fluid mt-5">
            <div className="col-12 d-flex justify-content-center mb-4">
                <div className="container bg-primary text-white rounded p-4 d-flex gap-4 justify-content-between align-items-center"  style={{maxWidth: '800px'}}>
                    <p>Total price: <span className="fw-bold bg-light p-1 text-success border-1 border border-black">${totalPrice.toFixed(2)}</span></p>
                    <Link to={'/checkout'} ><button className="btn btn-outline-light">Proceed to checkout</button></Link>
                </div>
            </div>
            {shoppingCartItemListDisplay}
        </div>
    )
}