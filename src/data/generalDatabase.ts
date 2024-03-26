import blackShirtIMG from '../assets/products/Black-shirt.jpg'
import rolexIMG from '../assets/products/Rolex.jpg'
import skullRoseHoodieIMG from '../assets/products/Skull-rose-hoodie.jpg'
import darkBlueJeansIMG from '../assets/products/Dark-blue-jeans.jpg'
import aviatorSunglassesIMG from '../assets/products/Aviator-sunglasses.jpg'
import woodenDoorknobIMG from '../assets/products/Wooden_doorknob.jpg'

export enum availableSizesList {'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'}

export interface Item {
    name: string,
    img: string,
    individualPriceUSD: number,
    id: number,
    productType: 'shirt' | 'hoodie' | 'pants' | 'watch' | 'other',  // Currently unused feature, but it's included in order to allow client side product filtering
    discount?: number,
    availableSizes: (keyof typeof availableSizesList)[] | 'non-applicable', // These should *only* go on shirts, hoodies or pants. - The 'non-applicable' option is needed to coerce the declaration of the variable (hence avoiding errors originated by having, for example, a shirt with no available sizes)
    onStock: boolean,
}

export const productsFromDatabase: Item[] = [
    {
        name: 'Golden Watch',
        img: rolexIMG,
        individualPriceUSD: 500,
        id: 1,
        productType: 'watch',
        discount: 20,
        availableSizes: 'non-applicable',
        onStock: true
    },
    {
        name: 'Black Shirt',
        img: blackShirtIMG,
        individualPriceUSD: 20,
        id: 2,
        productType: 'shirt',
        availableSizes: ['S', 'M', 'XL', 'XXL'],
        onStock: true
    },
    {
        name: 'Handmade Doorknob',
        img: woodenDoorknobIMG,
        individualPriceUSD: 5,
        id: 3,
        productType: 'other',
        availableSizes: 'non-applicable',
        onStock: false
    },
    {
        name: 'Skull Rose Hoodie', 
        img: skullRoseHoodieIMG,
        individualPriceUSD: 50,
        id: 4,
        productType: 'hoodie',
        discount: 15,
        availableSizes: ['XS', 'S', 'L'],
        onStock: true
    },
    {
        name: 'Dark Blue Jeans',
        img: darkBlueJeansIMG,
        individualPriceUSD: 35,
        id: 5,
        productType: 'pants',
        availableSizes: ['L'],
        onStock: true
    },
    {
        name: 'Aviator Sunglasses',
        img: aviatorSunglassesIMG,
        individualPriceUSD: 15,
        id: 6,
        productType: 'other',
        availableSizes: 'non-applicable',
        onStock: true
    },
    
]