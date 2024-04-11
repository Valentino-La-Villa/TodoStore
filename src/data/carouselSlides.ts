import storeBackground from '.././assets/decoration/store1.jpg'
import todoStore from '.././assets/decoration/todoStore.png'
import map from '.././assets/decoration/map.jpg'

export interface CarouselSlide {
    title?: string,
    caption?: string,
    img: string,
    id: number,
    onSale?: boolean,
    redirectURL: string,
}

const defaultCarouselSides: CarouselSlide[] = [ // These three need to exist so that the slideshow isn't empty when there are no current offers
    {
        img: todoStore,
        id: 9999997,
        redirectURL: ''
    },
    {
        caption: 'Now available on France, Germany and Switzerland',
        img: map,
        id: 9999998,
        redirectURL: '',
    },
    {
        img: storeBackground,
        id: 9999999,
        redirectURL: '',
    },
]

// const discountProducts =  products.filter(product => product.discount && product.onStock)

export const defaultCarouselSlides: CarouselSlide[] = [...defaultCarouselSides]