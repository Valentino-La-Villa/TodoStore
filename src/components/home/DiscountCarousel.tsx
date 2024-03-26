import { Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../redux/store"
import { Item } from "../../data/generalDatabase"
import { CarouselSlide, carouselSlides } from "../../data/carouselSlides"

export default function DiscountCarousel() {

    const items = useAppSelector(state => state.products.items)
    const discountItemsForCarousel = items.filter(item => item.discount && item.onStock).map((item: Item): CarouselSlide => ({
        title: item.name || '',
        caption: `${item.discount}% OFF`,
        img: item.img,
        id: item.id,
        onSale: true,
        redirectURL: '/products'
    })
)

    const itemsForCarousel: (CarouselSlide)[] = [carouselSlides[0], ...discountItemsForCarousel, ...carouselSlides.slice(1)]

    const carouselItems = itemsForCarousel.map((item: CarouselSlide) => {
        return (
            <Carousel.Item key={item.id}>
                {item.onSale ? 

                <p className="position-absolute z-3 px-2 text-white fw-bold" style={{top: '20px', left: '20px', backgroundColor: 'red', border: '1px solid white', fontFamily: 'Roboto'}}>ON SALE</p> 
                : 
                <></>
                }
                <Link to={item.redirectURL}>

                    <img src={item.img} className="img-fluid overflow-hidden position-relative" style={{height: '50vh', width: '100%', objectFit: 'cover'}} alt="" />
                    

                    {(item.caption || item.title) && // 'Only render the caption if there is text to be put inside it'
                    <Carousel.Caption>
                        <>
                            <h3><span className="bg-primary px-2 d-inline-block">{item.title}</span></h3> 
                            <p><span className="text-white px-2 d-inline-block bg-primary">{item.caption}</span></p>
                        </>
                    </Carousel.Caption>}
                </Link>
            </Carousel.Item>
        )
    })
    return (
        <div className="col-12 col-md-6">
            <Carousel>
                {carouselItems}
            </Carousel>
        </div>
    )
}