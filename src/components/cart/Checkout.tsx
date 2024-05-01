import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { deliverOrderToDatabase } from "../../redux/slices/productHandlingSlice"
import { Link } from "react-router-dom"
import { getTotalPriceForCart } from "../../utilities/miscFunctions"
import { Tooltip } from "react-tooltip"


export type PaymentInfoForm = {
    emailAddress: string,
    phoneNumber: string, // Saving it as a string to account for '+' '-' and other anomalies in phone numbers
    shippingAddress: string
}

export type DataSentToServer = {
    formData: PaymentInfoForm,
    totalPriceUSD: number,
    cartJson: string[]
}

export default function Checkout() {

    const [formData, setFormData] = useState<PaymentInfoForm>({
        emailAddress: '',
        phoneNumber: '',
        shippingAddress: ''
    })

    const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false)

    const cart = useAppSelector(state => state.products.cart)
    const dispatch = useAppDispatch()
    
    const sendOrder =()=> {
        event?.preventDefault()
        const cartToJson: string[] = cart.map(itemOnCart => 
            `${itemOnCart.name}${itemOnCart.selectedSize == 'non-applicable' ? '' : ` - ${itemOnCart.selectedSize}`}: ${itemOnCart.amountOnCart} units ordered`)
        dispatch(deliverOrderToDatabase({formData: formData, totalPriceUSD: totalPrice, cartJson: cartToJson}))
    }
    const handleForm=(event: any)=> {
        setFormData(prev => {
            return {
                ...prev,
                [event.target.id]: event.target.value
            }
        })
    }

    const phoneNumberValidation: boolean = 
    /[0-9]{4}/.test(formData.phoneNumber) && 
    !/[A-Za-z]/.test(formData.phoneNumber) // This will filter only phone numbers that have at least 4 consecutive numbers in them, and no letters (it's wired this way in order to allow dashses, plus signs and other necessary things when writing down phone numbers)

    const emailAddressValidation: boolean =
        /[A-Za-z]@[A-Za-z].[A-Za-z]/.test(formData.emailAddress)

    const shippingAddressValidation: boolean = formData.shippingAddress.length > 5

    const orderValidation: boolean = useMemo(()=>{ // This function will only make the 'Place your order' button clickable if all conditions are met (all clothing size selected & properly filled form)
        return (phoneNumberValidation && emailAddressValidation &&  shippingAddressValidation && termsAndConditions)
    }, [formData, cart, termsAndConditions])

    const totalPrice = getTotalPriceForCart(cart)

    return (
        <main>

        <div className="col-12 d-flex justify-content-center my-5">

            <div className="col-11 col-md-8 col-lg-6 bg-secondary border border-2 border-black text-white p-4">
                <p className="mb-4">
                    After filling out your billing information and sending your order to us, we will manually verify said information, and contact you through the email address provided in order to proceed with payment. Until then, your order will be pending.
                </p>

                <p className="d-flex flex-row flex-nowrap align-items-center gap-2">
                    <input type="checkbox" onChange={()=>{setTermsAndConditions(prev => !prev)}} checked={termsAndConditions} id="termsAndConditionsCheckbox" />
                    <label htmlFor="termsAndConditionsCheckbox" className="fs-6 text-break">I've read and agree to the company's <a className="text-white" target='_blank' href="https://github.com/Valentino-La-Villa">terms and conditions</a>.</label>
                </p>
            </div>
        </div>

        <div className="col-12 d-flex justify-content-center mb-4">
            <form className="row container border border-1 border-black rounded px-2 pt-4 pb-2 d-flex" style={{maxWidth: '800px', backgroundColor: '#d9e3f2'}}>
                        
                        <div className="col-6 col-md-4 d-flex justify-content-center">
                            <div className="col-12 gap-2 d-flex flex-column" style={{maxWidth: '200px'}}>
                                <label htmlFor='emailAddress' >Email address:</label>
                                <input type="text" id='emailAddress' value={formData.emailAddress} onChange={handleForm} />
                            </div>
                        </div>

                        <div className="col-6 col-md-4 d-flex justify-content-center">
                            <div className="col-12 gap-2 d-flex flex-column" style={{maxWidth: '200px'}}>
                                <label htmlFor="phoneNumber">Phone number:</label>
                                <input type="text" id='phoneNumber' value={formData.phoneNumber} onChange={handleForm} />
                            </div>
                        </div>

                        
                        <div className="col-6 col-md-4 d-flex justify-content-center">
                            <div className="col-12 gap-2 d-flex flex-column" style={{maxWidth: '200px'}}>
                                <label htmlFor="shippingAddress">Shipping address:</label>
                                <input type="text" id='shippingAddress' value={formData.shippingAddress} onChange={handleForm} />
                            </div>
                        </div>

                        <div className="col-12 d-flex justify-content-end align-items-center pt-5 pe-4">
                            <p className="me-2">Total price: <span className="fw-bold bg-light p-1 text-success border-1 border border-black">${totalPrice.toFixed(2)}</span></p>
                        </div>

                        <hr className="border-black border border-1 mt-4 opacity-100" />

                        <div className="mb-3 col-12">

                            <div className="col-12 d-flex justify-content-between px-md-4 align-items-end">
                                <Link to='/cart'>
                                    <button className="btn btn-outline-primary ms-2">← Back to cart</button>
                                </Link>

                                <div className="d-flex align-items-center">
                                    <div
                                    data-tooltip-id="send-order-disabled"
                                    data-tooltip-place="top">
                                        <button disabled={!orderValidation} onClick={sendOrder} className="btn btn-outline-primary me-2">Place your order</button>
                                    </div>
                                </div>
                                
                                {orderValidation ? 
                                <></> 
                                : 
                                <Tooltip id="send-order-disabled">
                                    <div className="d-flex flex-column">
                                        <b>Before submitting your order you must first:</b>
                                        <span>Agree to the terms and conditions: {termsAndConditions ? <>✅</> : <>❌</>}</span>
                                        <span>❗Properly fill out:</span>
                                        <span>Email address field: {emailAddressValidation ? <>✅</> : <>❌</>}</span>
                                        <span>Phone number field: {phoneNumberValidation ? <>✅</> : <>❌</>}</span>
                                        <span>Shipping address field: {shippingAddressValidation ? <>✅</> : <>❌</>}</span>
                                    </div>
                                </Tooltip>}
                            </div>
                        </div>
            </form>
        </div>
        </main>
    )
}