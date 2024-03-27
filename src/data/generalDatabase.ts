import goldenWatchIMG from '../assets/products/Golden-watch.png'
import blackShirtIMG from '../assets/products/Black-shirt.jpg'
import bornToRideSkateboardIMG from '../assets/products/Born-to-ride-skateboard.png'
import skullRoseHoodieIMG from '../assets/products/Skull-rose-hoodie.png'
import darkBlueJeansIMG from '../assets/products/Dark-blue-jeans.png'
import aviatorSunglassesIMG from '../assets/products/Aviator-sunglasses.jpg'
import whiteShirtIMG from '../assets/products/White-shirt.png'
import pocketWatchIMG from '../assets/products/Pocket-watch.png'
import blackSkullHoodieIMG from '../assets/products/Black-skull-hoodie.png'
import greyJeansIMG from '../assets/products/Grey-jeans.png'
import woodenDoorknobIMG from '../assets/products/Wooden-doorknob.png'
import topazEarringsIMG from '../assets/products/Topaz-earrings.png'

export enum availableSizesList {'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'}

export interface Item {
    name: string,
    img: string,
    individualPriceUSD: number,
    id: number,
    productType: 'shirt' | 'hoodie' | 'pants' | 'watch' | 'other',  // Currently unused feature, but it's included in order to allow client side product filtering
    discount?: number | false,
    availableSizes: (keyof typeof availableSizesList)[] | 'non-applicable', // These should *only* go on shirts, hoodies or pants. - The 'non-applicable' option is needed to coerce the declaration of the variable (hence avoiding errors originated by having, for example, a shirt with no available sizes)
    onStock: boolean,
}

export const productsFromDatabase: Item[] = [
    {
        name: 'Golden Watch',
        img: goldenWatchIMG,
        individualPriceUSD: 500,
        id: 1,
        productType: 'watch',
        discount: 20,
        availableSizes: 'non-applicable',
        onStock: true
    },
    {
        name: 'Black T-Shirt',
        img: blackShirtIMG,
        individualPriceUSD: 20,
        id: 2,
        productType: 'shirt',
        discount: false,
        availableSizes: ['S', 'M', 'XL', 'XXL'],
        onStock: false
    },
    {
        name: "'Born to Ride' Skateboard Deck",
        img: bornToRideSkateboardIMG,
        individualPriceUSD: 100,
        id: 3,
        productType: 'other',
        discount: false,
        availableSizes: 'non-applicable',
        onStock: true
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
        discount: false,
        availableSizes: ['L'],
        onStock: true
    },
    {
        name: 'Aviator Sunglasses',
        img: aviatorSunglassesIMG,
        individualPriceUSD: 15,
        id: 6,
        productType: 'other',
        discount: false,
        availableSizes: 'non-applicable',
        onStock: true
    },
    {
        name: 'White T-Shirt',
        img: whiteShirtIMG,
        individualPriceUSD: 17.50,
        id: 7,
        productType: 'shirt',
        availableSizes: ['S', 'XS', 'L', 'XL'],
        discount: 10,
        onStock: true
    },
    {
        name: 'Pocket Watch',
        img: pocketWatchIMG,
        individualPriceUSD: 25,
        id: 8,
        productType: 'watch',
        discount: false,
        availableSizes: 'non-applicable',
        onStock: false
    },
    {
        name: "'Black skull of death' hoodie",
        img: blackSkullHoodieIMG,
        individualPriceUSD: 60,
        id: 9,
        productType: 'hoodie',
        discount: false,
        availableSizes: ['XXXL'],
        onStock: true
    },
    {
        name: 'Grey Jeans',
        img: greyJeansIMG,
        individualPriceUSD: 30,
        id: 10,
        productType: 'pants',
        discount: 50,
        availableSizes: ['M', 'XL', 'XXXL'],
        onStock: true
    },
    {
        name: 'Handmade Doorknob',
        img: woodenDoorknobIMG,
        individualPriceUSD: 5,
        id: 11,
        productType: 'other',
        discount: false,
        availableSizes: 'non-applicable',
        onStock: false
    },
    {
        name: 'Topaz Earrings',
        img: topazEarringsIMG,
        individualPriceUSD: 200,
        id: 12,
        productType: 'other',
        discount: false,
        availableSizes: 'non-applicable',
        onStock: false
    },
    
]