export enum availableSizesList {'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'}
export enum itemTypes {'shirt', 'pants', 'hoodie', 'watch', 'other'}
export const itemTypesArray = Object.values(itemTypes).filter(itemType => typeof(itemType) == 'string')

export type ItemType = keyof typeof itemTypes
export type ClothingSize = keyof typeof availableSizesList

export interface Item {
    name: string,
    img: string,
    individualPriceUSD: number,
    description?: string,
    id: string,
    orderInCatalog: number,
    productType: ItemType,
    discount?: number | false,
    availableSizes: ClothingSize[] | 'non-applicable', // These should *only* go on shirts, hoodies or pants. - The 'non-applicable' option is needed to coerce the declaration of the variable (hence avoiding errors originated by having, for example, a shirt with no available sizes)
    onStock: boolean,
}

export interface CartItem extends Item {
    amountOnCart: number,
    selectedSize: ClothingSize | 'unselected' | 'non-applicable' // 'Unselected' is for clothings whose size hasn't yet been set-up and serves as a filter for cart management. 'non-applicable' is for products such as watches or pans, that only come in one size.
}
