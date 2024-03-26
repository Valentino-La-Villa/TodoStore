import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { placeOrder } from "../../redux/slices/productHandlingSlice"


export type PaymentInfoForm = {
    emailAddress: string,
    phoneNumber: string, // Saving it as a string to account for '+' '-' and other anomalies in phone numbers
    deliveryAddress: string
}

export default function PaymentInfo() {

    const [formData, setFormData] = useState<PaymentInfoForm>({
        emailAddress: '',
        phoneNumber: '',
        deliveryAddress: ''
    })

    
    const cart = useAppSelector(state => state.products.cart)
    const dispatch = useAppDispatch()
    
    const sendOrder =()=> {
        event?.preventDefault()
        dispatch(placeOrder({formData: formData}))
    }
    const handleForm=(event: any)=> {
        setFormData(prev => {
            return {
                ...prev,
                [event.target.id]: event.target.value
            }
        })
    }

    const orderValidation: boolean = useMemo(()=>{ // This function will only make the 'Place your order' button clickable if all conditions are met (all clothing size selected & properly filled form)
        const phoneNumberValidation: boolean = 
            /[0-9]{4}/.test(formData.phoneNumber) && 
            !/[A-Za-z]/.test(formData.phoneNumber) // This will filter only phone numbers that have at least 4 consecutive numbers in them, and no letters (it's wired this way in order to allow dashses, plus signs and other necessary things when writing down phone numbers)

        const emailAddressValidation: boolean =
            /[A-Za-z]@[A-Za-z].[A-Za-z]/.test(formData.emailAddress)

        const deliveryAddressValidation: boolean = formData.deliveryAddress.length > 5

        const sizeValidation = (): boolean => {
            const allValidSizesSelected = cart.map(item => item.selectedSize).filter(size => size !== 'unselected') // This will get all sizes selected and account for products that don't require size selection, filtering out any clothing items whose 'size' attribute is equal to unselected
            
            if (allValidSizesSelected.length !== cart.length) {
                return false
            }
            else return true
        }

        const hasUserSelectedAllNecessarySizes: boolean = sizeValidation()

        return (phoneNumberValidation && emailAddressValidation &&  deliveryAddressValidation && hasUserSelectedAllNecessarySizes)
    }, [formData, cart])

    return (
        <div className="col-12 d-flex justify-content-center mb-4">
            <form className="row container bg-primary text-white rounded px-2 pt-4 pb-2 d-flex row-gap-4"  style={{maxWidth: '800px'}}>
                        
                        <div className="col-6 col-md-4 d-flex justify-content-center">
                            <div className="col-12 gap-2 d-flex flex-column" style={{maxWidth: '200px'}}>
                                <label htmlFor='emailAddress' >Email address:</label>
                                <input type="text" id='emailAddress' value={formData.emailAddress} onChange={handleForm} />
                            </div>
                        </div>

                        <div className="col-6 col-md-4 d-flex justify-content-end justify-content-md-center">
                            <div className="col-12 gap-2 d-flex flex-column" style={{maxWidth: '200px'}}>
                                <label htmlFor="phoneNumber">Phone number:</label>
                                <input type="text" id='phoneNumber' value={formData.phoneNumber} onChange={handleForm} />
                            </div>
                        </div>

                        
                        <div className="col-6 col-md-4 d-flex justify-content-center">
                            <div className="col-12 gap-2 d-flex flex-column" style={{maxWidth: '200px'}}>
                                <label htmlFor="deliveryAddress">Delivery address:</label>
                                <input type="text" id='deliveryAddress' value={formData.deliveryAddress} onChange={handleForm} />
                            </div>
                        </div>

                        <div className="col-6 col-md-12 d-flex justify-content-end pe-md-4 align-items-end">
                            <div>
                                <button disabled={!orderValidation} onClick={sendOrder} className="btn btn-dark me-2">Place your order</button>
                            </div>
                        </div>

                        <div className="w-100 align-items-center d-flex justify-content-between 
                                        col-12">
                        </div>
            </form>
        </div>
    )
}