import { ProductFilter } from "../components/products/misc/ProductFiltering"
import { Item, CartItem, ItemType } from "../data/generalDatabase"
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

export const getTotalPriceForCart=(cart: CartItem[]): number => {
    return cart.map(item => getFinalPrice(item)).reduce((a, b) => a + b)
}

export const filterProductDisplay=(filter: ProductFilter, productList: Item[]): Item[]=> {

    const itemFilters = Object.keys(filter.typeFilter).filter(itemType => filter.typeFilter[itemType as ItemType] === true) // This will return an array containing all applied 'item type' filters (while the === true isn't necessary, I put it there for better readability)

    const searchbarFilter = productList.filter((item)=> {
        if (filter.searchbar == '') {
            return item
        }
        else {
            return item.name.toLowerCase().includes(filter.searchbar)
        }
    })

    if (itemFilters.length == 0) { // If no 'item type' filters are applied, return the array as is
        return searchbarFilter
    } else {
        const finalFilter = searchbarFilter.filter(item => itemFilters.includes(item.productType))
        return finalFilter
    }
}