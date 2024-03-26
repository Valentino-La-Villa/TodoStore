import { Item } from "../data/generalDatabase"
import { CartItem } from "../redux/slices/productHandlingSlice"

export const getDiscountPrice=(item: Item | CartItem): number => {
    if (item.discount) {
        return (item.individualPriceUSD - item.individualPriceUSD * (item.discount / 100))
    }
    else return item.individualPriceUSD
}

export const getFinalPrice=(item: CartItem): number => {
    const finalPrice = getDiscountPrice(item)
    return finalPrice * item.amountOnCart
}