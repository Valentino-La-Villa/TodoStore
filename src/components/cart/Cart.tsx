import { useAppSelector } from "../../redux/store"
import IndividualCartItem from "./IndividualCartItem"
import { CartItem } from "../../redux/slices/productHandlingSlice"
import { ReactElement } from "react"
import PaymentInfo from "./PaymentInfo"

export default function Cart() {

    const shoppingCart: CartItem[] = useAppSelector(state => state.products.cart)

    const shoppingCartItemListDisplay: ReactElement[] = shoppingCart.map((item: CartItem): ReactElement => {

        return (
            <IndividualCartItem
            props={item}
            key={item.id} />
        )
    })

    return (
        <div className="container-fluid mt-5">
            <PaymentInfo />
            {shoppingCartItemListDisplay}
        </div>
    )
}