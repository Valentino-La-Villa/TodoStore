import storeBackground from '.././assets/decoration/store1.jpg'
import todoStore from '.././assets/decoration/todoStore.png'
import map from '.././assets/decoration/map.jpg'

export interface CarouselSlide {
    title?: string,
    caption?: string,
    img: string,
    order: number,
    onSale?: boolean,
    redirectURL: string,
}

const defaultCarouselSides: CarouselSlide[] = [ // These three need to exist so that the slideshow isn't empty when there are no current offers
    {
        img: todoStore,
        order: 9999997,
        redirectURL: ''
    },
    {
        caption: 'Now available on France, Germany and Switzerland',
        img: map,
        order: 9999998,
        redirectURL: '',
    },
    {
        img: storeBackground,
        order: 9999999,
        redirectURL: '',
    },
]

// const discountProducts =  products.filter(product => product.discount && product.onStock)

export const defaultCarouselSlides: CarouselSlide[] = [...defaultCarouselSides]