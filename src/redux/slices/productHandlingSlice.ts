import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { CartItem, ClothingSize, Item } from "../../data/generalDatabase"
import Swal from "sweetalert2"
import { DataSentToServer } from "../../components/cart/Checkout"
import { productsCollection, ordersCollection } from "../../data/firebase"
import { addDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore"

export interface itemDataState {
    items: {
        data: Item[],
        status: 'idle' | 'loading' | 'success' | 'failed',
        error: null | string
    },
    cart: CartItem[],
    orderStatus: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: itemDataState = {
    items: {
        data: [],
        status: 'idle',
        error: null
    },
    cart: [],
    orderStatus: 'idle'
}

export const getProductListFromDatabase = createAsyncThunk('items/getProductListFromDatabase', async() => { // Acepta un string que va a funcionar como prefijo para los actiontypes creados y una función callback que oficia de 'payload creator', que debería retornar una promesa conteniendo datos de algún tipo, o una promesa rejecteada con un error
    const orderedProducts = query(productsCollection, orderBy('orderInCatalog', 'asc'))
    const productDatabase: void | Item[] = await getDocs(orderedProducts).then(
        (snapshot) => {
            let products: Item[] = []
            snapshot.docs.forEach((doc) => {
    
                const data: Omit<Item, 'id'> = doc.data() as Omit<Item, 'id'>
    
                products.push({
                    ...data,
                    id: doc.id
                })
            })
            return products
        }
    ).catch(err => console.log(err))

    if (typeof(productDatabase) === 'object') {
        return productDatabase as Item[]
    }
})

export const deliverOrderToDatabase = createAsyncThunk('checkout/deliverOrderToDatabase', async(payload: DataSentToServer)=> {
    try {
        addDoc(ordersCollection, {
            createdAt: serverTimestamp(),
            shippingAddress: payload.formData.shippingAddress,
            email: payload.formData.emailAddress,
            phone: payload.formData.phoneNumber,
            order: payload.cartJson,
            totalPriceUSD: payload.totalPriceUSD
        })
        return payload
    }
    catch(err) {console.log(err)}
})


export const productHandlingSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart(state: itemDataState, action: PayloadAction<{ id: string, size: ClothingSize | 'non-applicable'}>) {
            const itemToAdd: Item | undefined = state.items.data.find(item => item.id === action.payload.id)

            if (typeof(itemToAdd) == 'undefined') throw new Error('Provided ID is invalid. Please, refresh and try again.')

            const itemOnCart: CartItem | undefined = state.cart.find(item => (item.id === action.payload.id && item.selectedSize == action.payload.size))

            if (typeof(itemOnCart) == 'undefined') { // If the item you wish to add to cart is currently not on cart, add it to the cart list
                const selectedSizeValue: ClothingSize | 'non-applicable' = action.payload.size || 'non-applicable'
                
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
        subtractFromCart(state: itemDataState, action: PayloadAction<{ id: string, size: ClothingSize | 'non-applicable' }>) {
            const itemToRemove: CartItem | undefined = state.cart.find(item => (item.id === action.payload.id && item.selectedSize == action.payload.size))

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
        removeAllInstancesOfASingleItemFromCart(state: itemDataState, action: PayloadAction<{ id: string }>) {
            const itemToRemove: CartItem | undefined = state.cart.find(item => item.id === action.payload.id)
            if (itemToRemove) {
                state.cart.splice(
                    state.cart.indexOf(itemToRemove), 
                    state.cart.indexOf(itemToRemove) + 1
                )
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProductListFromDatabase.pending, (state: itemDataState) => {
                state.items.status = 'loading'
            })
            .addCase(getProductListFromDatabase.fulfilled, (state: itemDataState, action ) => {
                state.items.status = 'success'
                state.items.data = action.payload as Item[]
            })
            .addCase(getProductListFromDatabase.rejected, (state: itemDataState) => {
                state.items.status = 'failed'
            }),
        
        builder
            .addCase(deliverOrderToDatabase.pending, (state: itemDataState) => {
                state.orderStatus = 'loading'
            })
            .addCase(deliverOrderToDatabase.fulfilled, (state: itemDataState, action) => {
                state.orderStatus = 'success'
                Swal.fire({
                    title: 'Thank you for your purchase!',
                    text: `We will contact you shortly at ${(action.payload as DataSentToServer).formData.emailAddress}`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                    state.cart = []
            })
            .addCase(deliverOrderToDatabase.rejected, (state: itemDataState) => {
                state.orderStatus = 'failed'
                Swal.fire({
                    title: 'An unexpected error has happened!',
                    text: `Please, refresh the page and try again`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            })
    }
})


export default productHandlingSlice.reducer
export const { addToCart, subtractFromCart, removeAllInstancesOfASingleItemFromCart } = productHandlingSlice.actions