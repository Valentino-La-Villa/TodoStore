import { ChangeEvent, ReactElement, useState } from "react"
import { getDiscountPrice } from "../../../utilities/miscFunctions"
import { Item, availableSizesList } from "../../../data/generalDatabase"
import { CartItem, addToCart, subtractFromCart } from "../../../redux/slices/productHandlingSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/store"

type CurrentProduct = {
    currentProduct: Item
}

export default function ProductInfo({currentProduct}: CurrentProduct) {

    let availableSizesDropdownMenu: ReactElement | ReactElement[] | undefined // It needs this 'undefined' so the compiler doesn't complain when you render it conditionally down below

    const [selectedSize, setSelectedSize] = useState<keyof typeof availableSizesList | 'non-applicable' | 'unselected'>('unselected') // It starts as 'unselected' in order to allow for a validation check later
    
    const state = useAppSelector(state => state.products)
    const cart: CartItem[] = state.cart
    const dispatch = useAppDispatch()
    
    const addItemToCart =()=> {
        if (selectedSize !== null) {
            dispatch(addToCart({ id: currentProduct.id, size: selectedSize as keyof typeof availableSizesList | 'non-applicable'}))
        }
    }
    const subtractItemFromCart =()=> dispatch(subtractFromCart({ id: currentProduct.id }))

    const currentAmountOnCart: number = cart.find(item => (item.id === currentProduct.id && item.selectedSize == selectedSize))?.amountOnCart || 0 // This checks for item and size, in order to allow purchases of the same item on multiple sizes separately
      
    if (currentProduct.availableSizes !== 'non-applicable') {
        availableSizesDropdownMenu = currentProduct.availableSizes.map(size => {
            return (
                <option key={size} value={size}>{size}</option>
            )
        })
    }

    const handleSizeSelection=(event: ChangeEvent)=>{
        setSelectedSize((event.target as HTMLSelectElement).value as keyof typeof availableSizesList | 'unselected') // Using a type assertion because all values corresponding to the optionElements that will trigger this function will only contain values corresponding to the type provided
    }

    const validateAddToCartButton =()=> {
        if (selectedSize == 'unselected' || !currentProduct.onStock) {
            return false
        } else return true
    }

    const cartButtonValidation = validateAddToCartButton()

    return (
        <div className="d-flex flex-column justify-content-between h-100">

            <div>
                <h1 className="individualProductPage__title">{currentProduct.name}</h1>


                <p className="mb-2">{ currentProduct.discount ? // Discount interface

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
            </div>



            <div>
                {currentProduct.availableSizes === 'non-applicable' ? // Available sizes interface
                    <>{selectedSize == 'non-applicable' ? false : setSelectedSize('non-applicable')}</> // If the item rendered doesn't need a size selection, instead of rendering the size selection interface, we directly set selectedSize to 'non-applicable' (it needs to be a ternary in order not to cause an infinite loop)

                    :
                    <>
                        <select onChange={handleSizeSelection} className="form-select d-flex py-0" style={{width: '150px', height: '30px'}} name="" id="">
                            <option value={'unselected'} defaultValue={'unselected'}>Choose a size</option>
                            {availableSizesDropdownMenu}
                        </select>

                        <span className="individualProductPage__availableSizes mb-2">Currently available size/s for this clothing: {currentProduct.availableSizes.map(size => <span key={size} className="me-1">{size}</span>)}</span>
                    </>
                }

                <div className="d-flex flex-row align-items-end mt-4"             // Adding-removing from cart
                >
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={addItemToCart} disabled={!cartButtonValidation} className="btn btn-outline-primary p-1 px-2 d-flex justify-content-center">
                            <p style={{pointerEvents: 'none'}} className="individualProductPage__addButton">ADD TO CART</p>
                        </button>

                        <div className={`d-flex gap-2 individualProduct__buttons--transitionHandler-${currentAmountOnCart ? 'ON' : 'OFF'}`}>
                                <p>{currentAmountOnCart}</p>

                                <button onClick={subtractItemFromCart} className="btn btn-secondary p-0 d-flex justify-content-center individualProductPage__subtractButton">
                                    <span style={{pointerEvents: 'none'}}>-</span>
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}