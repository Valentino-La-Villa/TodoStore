import { Item } from "../../data/generalDatabase"
import { getDiscountPrice } from "../../utilities/miscFunctions"
import { Link } from "react-router-dom"
import magnifyingGlass from '../../assets/icons/search.svg'

type propsType = {
    props: Item
}

export default function IndividualProductComponent({props}: propsType) {

    return (
        <article className="col-12 col-sm-6 col-md-4 col-lg-3 p-2 d-flex justify-content-center">
            <div className="card" style={{width: "18rem", minHeight: '27rem', maxHeight: '35rem', position: "relative", // Position relative is needed for the grey filter on disabled items
            pointerEvents: props.onStock ? 'auto' : 'none',  // This will disable the pointer events if the item is not in stock
            }}
            >
                {props.onStock ? // This piece of code will put a gray filter and the 'Out of stock' sign when needed
                <></> 
                : 
                <>
                    <div className="w-100 h-100 bg-secondary opacity-50 position-absolute"></div>
                    
                    <div className="w-100 h-100 position-absolute d-flex align-items-center justify-content-center">
                        <p className="bg-primary rounded-1 p-2 text-white" style={{border: '1px white solid'}}>Out of stock</p>
                    </div>
                </>
                } 



                <div style={{height: '65%'}}>
                <img src={props.img} className="card-img-top shadow object-fit-cover img-fluid h-100 bg-secondary text-secondary" alt={props.name}/> {/* background and text colors are set for a smoother transition when the image loads (if the text is left on default the name of the image will pop some ms before the picture) */}
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                    <h2 className="card-title fs-5">{props.name}</h2>

                        { props.discount ? // Discount interface

                        <>
                            <p className="card-text pb-3 d-flex">
                                <span className="text-decoration-line-through">${props.individualPriceUSD}</span>
                                <span className="mx-1">→</span>
                                <span className="text-success fw-bold me-2">${getDiscountPrice(props)}</span>
                                <span className="bg-danger p-1 text-white rounded-1 fw-bold" style={{fontSize: '12px'}}>{props.discount}% OFF!</span>
                            </p>
                        </>

                        :

                        <p className="card-text text-success pb-3 fw-bold">${props.individualPriceUSD}</p>

                        }
                    </div>



                    <div className="d-flex justify-content-end align-items-center">
                        <Link to={`/products/${props.id}`}><button className="btn btn-outline-primary p-2 d-flex justify-content-center"><img src={magnifyingGlass} alt="" /></button></Link>
                    </div>

                </div>
            </div>
        </article>
    )
}