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
    description?: string,
    id: number,
    productType: 'shirt' | 'hoodie' | 'pants' | 'watch' | 'other',  // Currently unused feature, but it's included in order to allow client side product filtering
    discount?: number | false,
    availableSizes: (keyof typeof availableSizesList)[] | 'non-applicable', // These should *only* go on shirts, hoodies or pants. - The 'non-applicable' option is needed to coerce the declaration of the variable (hence avoiding errors originated by having, for example, a shirt with no available sizes)
    onStock: boolean,
}

export const productsFromDatabase: Item[] = [
    {
        name: 'Skull Rose Hoodie', 
        img: skullRoseHoodieIMG,
        individualPriceUSD: 50,
        id: 1,
        description: "A vibrant blend of edgy style and comfort. Crafted from soft, high-quality fabric, adorned with a striking skull and rose graphic in bold yellow hues. Whether you're hitting the streets or lounging at home, this hoodie is sure to make a statement wherever you go.",
        productType: 'hoodie',
        discount: 15,
        availableSizes: ['XS', 'S', 'L'],
        onStock: true
    },
    {
        name: 'Black T-Shirt',
        img: blackShirtIMG,
        individualPriceUSD: 20,
        id: 2,
        description: "A foundational piece for any wardrobe. Constructed from high-quality cotton, this essential garment ensures both comfort and style. Whether paired with tailored trousers for a refined look or denim for a casual vibe, its enduring design epitomizes effortless sophistication for every occasion.",
        productType: 'shirt',
        discount: false,
        availableSizes: [],
        onStock: false
    },
    {
        name: "'Born to Ride' Skateboard Deck",
        img: bornToRideSkateboardIMG,
        individualPriceUSD: 100,
        id: 3,
        description: "A statement piece for skateboard enthusiasts. Its vibrant design and bold message inspire confidence and adventure with every ride, making it the perfect choice for riders who live life on the edge.",
        productType: 'other',
        discount: false,
        availableSizes: 'non-applicable',
        onStock: true
    },
    {
        name: 'Golden Watch',
        img: goldenWatchIMG,
        individualPriceUSD: 500,
        id: 4,
        description: "Elevate your wristwear with our exquisite golden watch. Featuring a sleek design and precision engineering, this timepiece exudes luxury and sophistication. Crafted with attention to detail and adorned with golden accents, it's a statement accessory that seamlessly blends timeless elegance with modern flair.",
        productType: 'watch',
        discount: 20,
        availableSizes: 'non-applicable',
        onStock: true
    },
    {
        name: 'Blue Denim Jeans',
        img: darkBlueJeansIMG,
        individualPriceUSD: 35,
        id: 5,
        description: "A modern twist on a timeless classic, these jeans offer an unparalleled mixture of comfort and style. Whether paired with a tailored jacket for a polished ensemble or a casual tee for laid-back vibes, their versatile shade adds sophistication to any outfit.",
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
        description: "A stylish statement for any occasion. With their iconic design and golden hue, they add instant glamour to your look. Perfect for elevating any outfit, these aviators are a must-have accessory.",
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
        description: 'A wardrobe staple for everyone. Crafted from premium cotton, this timeless piece offers both comfort and style. Versatile enough to pair with any ensemble, whether dressed up with a blazer or down with jeans, it effortlessly embodies understated sophistication',
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
        description: "A timeless symbol of elegance. With intricate detailing and classic design, it's a piece of history in your hands. Perfect for both wearing and displaying, it adds vintage charm to any look or space.",
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
        description: "A standout piece for the fashion-forward. With its striking black and white design and prominent skull motif, it exudes edgy style. Crafted for comfort and attitude, this hoodie is a must-have for those who dare to make a statement",
        productType: 'hoodie',
        discount: 50,
        availableSizes: ['M', 'XL', 'XXXL'],
        onStock: true
    },
    {
        name: 'Grey Jeans',
        img: greyJeansIMG,
        individualPriceUSD: 30,
        id: 10,
        description: "A versatile staple for your wardrobe. Crafted for comfort and style, these jeans offer a sleek and modern silhouette. With their tasteful grey exterior, they effortlessly pair with any outfit, from casual tees to tailored shirts. Elevate your everyday look with these essential jeans, perfect for any occasion.",
        productType: 'pants',
        discount: false,
        availableSizes: [],
        onStock: false
    },
    {
        name: 'Handmade Doorknob',
        img: woodenDoorknobIMG,
        individualPriceUSD: 20,
        id: 11,
        description: "A touch of artisanal elegance for your home. Crafted with care and attention to detail, this doorknob adds warmth and character to any door. Its rich brown hue and handcrafted texture bring a sense of craftsmanship and charm to your living space, making it a delightful addition to your home decor.",
        productType: 'other',
        discount: false,
        availableSizes: 'non-applicable',
        onStock: true
    },
    {
        name: 'Topaz Earrings',
        img: topazEarringsIMG,
        individualPriceUSD: 200,
        id: 12,
        description: "Crafted with exquisite detail, these earrings shimmer with the brilliance of topaz stones. Perfect for formal wear, they add a touch of elegance to any outfit, making them a truly captivating accessory.",
        productType: 'other',
        discount: false,
        availableSizes: 'non-applicable',
        onStock: false
    },
    
]