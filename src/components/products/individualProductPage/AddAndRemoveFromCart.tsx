import { Tooltip } from "react-tooltip"
import { Item, availableSizesList } from "../../../data/generalDatabase"
import { CartItem, addToCart, subtractFromCart } from "../../../redux/slices/productHandlingSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/store"

type Props = {
    currentProduct: Item,
    selectedSize: keyof typeof availableSizesList | 'non-applicable' | 'unselected',
}

export default function AddAndRemoveFromCart(props: Props) {

    const state = useAppSelector(state => state.products)
    const cart: CartItem[] = state.cart
    const dispatch = useAppDispatch()
    

    const addItemToCart =()=> {
        if (props.selectedSize !== null) {
            dispatch(addToCart({ id: props.currentProduct.id, size: props.selectedSize as keyof typeof availableSizesList | 'non-applicable'}))
        }
    }
    const subtractItemFromCart =()=> dispatch(subtractFromCart({ id: props.currentProduct.id }))

    const currentAmountOnCart: number = cart.find(item => (item.id === props.currentProduct.id && item.selectedSize == props.selectedSize))?.amountOnCart || 0 // This checks for item and size, in order to allow purchases of the same item on multiple sizes separately
    

    const validateAddToCartButton =()=> {
        if (props.selectedSize == 'unselected' || !props.currentProduct.onStock) {
            return false
        } else return true
    }

    const cartButtonValidation = validateAddToCartButton()

    return (
        <div className="d-flex flex-row align-items-end mt-4">
            <div className="d-flex align-items-center gap-3">

                <div
                data-tooltip-id="add-to-cart-disabled"
                data-tooltip-content="You must first pick the size in which you want to buy this item."
                data-tooltip-place="top"
                >
                    <button
                    onClick={addItemToCart} disabled={!cartButtonValidation} className="btn btn-outline-primary p-1 px-2 d-flex justify-content-center">
                        <p style={{pointerEvents: 'none'}} className="individualProductPage__addButton">ADD TO CART</p>
                    </button>
                </div>

                {cartButtonValidation ? <></> : <Tooltip id="add-to-cart-disabled"></Tooltip>}

                <div className={`d-flex gap-2 individualProduct__buttons--transitionHandler-${currentAmountOnCart ? 'ON' : 'OFF'}`}>
                        <p>{currentAmountOnCart}</p>

                        <button onClick={subtractItemFromCart} className="btn btn-secondary p-0 d-flex justify-content-center individualProductPage__subtractButton">
                            <span style={{pointerEvents: 'none'}}>-</span>
                        </button>
                </div>
            </div>
        </div>
    )
}