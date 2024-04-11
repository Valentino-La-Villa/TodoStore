import { CartItem } from "../../redux/slices/productHandlingSlice"
import trashCanRed from '../../assets/icons/trash-can-red.png'
import { useAppDispatch } from "../../redux/store"
import { removeAllInstancesOfASingleItemFromCart } from "../../redux/slices/productHandlingSlice"
import Swal from "sweetalert2"
import { getDiscountPrice, getFinalPrice } from "../../utilities/miscFunctions"
import { ReactElement } from "react"

type propsType = {
    props: CartItem
}

export default function IndividualCartItem({props}: propsType) {

    const dispatch = useAppDispatch()
    const removeAll =()=> {
        Swal.fire({
            text: `Removed '${props.name}' from cart`,
            icon: 'warning',
            confirmButtonText: 'Continue shopping'
          })
        dispatch(removeAllInstancesOfASingleItemFromCart({id: props.id}))
    }

    let availableSizesDropdownMenu: ReactElement | ReactElement[] | undefined // It needs this 'undefined' so the compiler doesn't complain when you render it conditionally down below
    if (props.availableSizes !== 'non-applicable') {
        availableSizesDropdownMenu = props.availableSizes.map(size => {
            return (
                <option key={size} value={size}>{size}</option>
            )
        })
    }

    return (
        <div>
            <div
            key={props.id}
            className="col-12 d-flex justify-content-center "
            >
                <div className="card mb-3 col-12" style={{maxWidth: '800px', maxHeight: '270px'}}>
                    <div className="row g-0">

                        <div className="col-3 overflow-hidden">
                            <img src={props.img} style={{height: '150px', objectFit: 'cover', width: '100%'}} className="img-fluid rounded-start" alt="..."/>
                        </div>


                        <div className="col-7">
                            <div className="card-body p-2 p-sm-3">
                                <h5 className="card-title d-flex justify-content-between">{props.name} {props.selectedSize !== 'non-applicable' ? <>- {props.selectedSize}</> : false}</h5>

                                <p className="card-text mt-4 d-flex align-items-center" // Discount display - flex is used in p to level the vertical centerpoints of all three spans
                                >
                                    <span className="text-success fw-bold me-1">${getFinalPrice(props).toFixed(2)}</span> {
                                        props.amountOnCart > 1 ? 
                                        <span className="me-1"
                                            style={{
                                            fontSize: '13px',
                                            alignSelf: 'end',
                                            paddingBottom: props.discount ? '3px' : '1px',
                                            color: '#b3b3b3',
                                        }}>- ${getDiscountPrice(props)} each</span> 
                                        : 
                                        <></>
                                    }
                                    {props?.discount &&
                                    <span className="ms-1 bg-danger p-1 rounded-1 text-white text-center" style={{fontSize: '12px'}}>{props.discount}% OFF!</span>}
                                </p>
                            </div>
                        </div>

                        <div className="col-2 p-3 text-end d-flex flex-column justify-content-between">
                            <h5><span className="bg-body-secondary border border-black px-2">{props.amountOnCart}</span></h5>
                            <div>
                                <img src={trashCanRed} alt=""
                                style={{cursor: 'pointer', height: '20px'}}
                                className="me-1"
                                onClick={removeAll} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}