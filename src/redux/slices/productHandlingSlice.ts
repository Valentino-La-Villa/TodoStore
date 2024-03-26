import { createSlice, nanoid } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { Item, availableSizesList, productsFromDatabase } from "../../data/generalDatabase"
import Swal from "sweetalert2"
import { PaymentInfoForm } from "../../components/cart/PaymentInfo"
import Axios from "axios"

export interface CartItem extends Item {
    amountOnCart: number,
    selectedSize: 'unselected' | keyof typeof availableSizesList | 'non-applicable' // 'Unselected' is for clothings whose size hasn't yet been set-up and serves as a filter for cart management. 'non-applicable' is for products such as watches or pans, that only come in one size.
}

export interface itemDataState {
    items: Item[],
    cart: CartItem[],
}

const initialState: itemDataState = {
    items: productsFromDatabase, // This would ideally be pulled from an API or online database
    cart: []
}


export const productHandlingSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart(state: itemDataState, action: PayloadAction<{ id: number }>) {
            const itemToAdd: Item | undefined = state.items.find(item => item.id === action.payload.id)

            if (typeof(itemToAdd) == 'undefined') throw new Error('Provided ID is invalid. Please, refresh and try again.')

            const itemOnCart: CartItem | undefined = state.cart.find(item => item.id === action.payload.id)

            if (typeof(itemOnCart) == 'undefined') { // If the item you wish to add to cart is currently not on cart, add it to the cart list
                const selectedSizeValue: 'unselected' | 'non-applicable' = (itemToAdd.availableSizes === 'non-applicable' ? 'non-applicable' : 'unselected')
                
                state.cart.push({
                    ...itemToAdd,
                    amountOnCart: 1,
                    selectedSize: selectedSizeValue
                })
            }

            else if (typeof(itemOnCart) != 'undefined' && itemOnCart.amountOnCart < 99) { // If the item you wish to add is already on cart, add 1 to the current amount (with a ceiling of 99 of the same item on cart at the same time)
                itemOnCart.amountOnCart = itemOnCart.amountOnCart + 1
            } 
        },
        subtractFromCart(state: itemDataState, action: PayloadAction<{ id: number }>) {
            const itemToRemove: CartItem | undefined = state.cart.find(item => item.id === action.payload.id)

            if (typeof(itemToRemove) == 'undefined') throw new Error('Provided ID does not match any products currently on cart. Please, refresh and try again')
        
            if (itemToRemove.amountOnCart === 1) {
                state.cart.splice(
                    state.cart.indexOf(itemToRemove), 
                    state.cart.indexOf(itemToRemove) + 1
                )
            }
            else if (itemToRemove.amountOnCart > 1) {
                itemToRemove.amountOnCart = itemToRemove.amountOnCart - 1
            }
        },
        removeAllInstancesOfASingleItemFromCart(state: itemDataState, action: PayloadAction<{ id: number }>) {
            const itemToRemove: CartItem | undefined = state.cart.find(item => item.id === action.payload.id)
            if (itemToRemove) {
                state.cart.splice(
                    state.cart.indexOf(itemToRemove), 
                    state.cart.indexOf(itemToRemove) + 1
                )
            }
        },
        selectItemSize(state: itemDataState, action: PayloadAction<{ id: number, size: keyof typeof availableSizesList}>) {
            const itemOnCart: CartItem | undefined = state.cart.find(item => item.id === action.payload.id)

            if (itemOnCart === undefined) throw new Error('Provided ID does not match any products currently on cart. Please, refresh and try again')
        
            itemOnCart.selectedSize = action.payload.size
        },
        placeOrder(state: itemDataState, action: PayloadAction<{ formData: PaymentInfoForm}>) {

            const orderId = nanoid()

            Axios.post('https://jsonplaceholder.typicode.com/posts', 
            {
                id: orderId,
                date: Date.now(),
                address: action.payload.formData.deliveryAddress,
                email: action.payload.formData.emailAddress,
                phone: action.payload.formData.phoneNumber,
                order: state.cart,
            })
            console.log({
                id: orderId,
                date: Date.now(),
                address: action.payload.formData.deliveryAddress,
                email: action.payload.formData.emailAddress,
                phone: action.payload.formData.phoneNumber,
                order: state.cart
            })
            Swal.fire({
                title: 'Thank you for your purchase!',
                text: `Your order will be sent to ${action.payload.formData.deliveryAddress}`,
                icon: 'success',
                confirmButtonText: 'OK'
            })
            state.cart = []
        }
    },
})


export default productHandlingSlice.reducer
export const { addToCart, subtractFromCart, removeAllInstancesOfASingleItemFromCart, selectItemSize, placeOrder } = productHandlingSlice.actions