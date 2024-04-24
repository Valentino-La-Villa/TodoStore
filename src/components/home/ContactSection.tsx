import Axios from "axios"
import Swal from "sweetalert2"
import { FormEvent, useRef } from 'react'

export default function ContactSection() {

    const contactFormName = useRef<HTMLInputElement | null>(null)
    const contactFormEmail = useRef<HTMLInputElement | null>(null)
    const contactFormTopic = useRef<HTMLInputElement | null>(null)
    const contactFormMessage = useRef<HTMLTextAreaElement | null>(null)

    type ContactFormData = {
        contactFormName: string | undefined,
        contactFormEmail: string | undefined,
        contactFormTopic: string | undefined,
        contactFormMessage: string | undefined,
    }

    type ContactFormDataValidation = {
        res: boolean,
        err?: undefined | 'emptyInputs' | 'invalidEmail'
    }

    

    const validateContactFormData = (data: ContactFormData): ContactFormDataValidation => {
        const emailCheck = /[A-Za-z]@[A-Za-z].[A-Za-z]/

        if (!(Object.values(data).filter(value => (value !== undefined && /\w/.test(value))).length === 4)) { // Checking to see if any input is empty, or has only empty spaces
            return { res: false, err: 'emptyInputs' } // Returning an object to be able to identify the error type and customize the alert popup in the next function
        }

        else if (!emailCheck.test(data.contactFormEmail as string)) { // Checking for valid email submissions (using a type assertion because the above if statement will take care of undefined values)
            return { res: false, err: 'invalidEmail' }
        }
        else return { res: true }
    }

    const handleContactFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const data: ContactFormData = {
            contactFormName: contactFormName?.current?.value,
            contactFormEmail: contactFormEmail?.current?.value,
            contactFormTopic: contactFormTopic?.current?.value,
            contactFormMessage: contactFormMessage?.current?.value
        }

        const dataValidation = validateContactFormData(data)
        
        if (dataValidation.res) {
            Axios.post('https://jsonplaceholder.typicode.com/posts', data).then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Thank you for your message!',
                    text: 'Our team will be reviewing your submission, and, if needed, will be contacting you shortly.'
                    }
                )}
            )
        }
        else {
            const textVar = dataValidation.err === 'invalidEmail' ? // Customizing the error message for better UX
                'Provided email is invalid, try again!'
                :
                'You need to properly fill out all fields before hitting send!'

            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: textVar
            })
        }
    }

    return (
        <main className="container-fluid my-5 text-center w-100">
            
            <h1 className="col-12 text-center pt-4" style={{fontFamily: 'Bebas Neue'}}>Contact us</h1>

            <form onSubmit={handleContactFormSubmit} className="container-fluid my-5 justify-content-center d-flex"
            > 
                
                <div className="col-12 col-md-8 col-lg-7 col-xl-5 row d-flex gap-1 px-3 px-sm-5 py-5 rounded-2 border border-secondary" style={{backgroundColor: '#d9e3f2'}}>
                    
                    <label htmlFor="contactForm__name" className="contactSection__text">Your name</label>
                    <input ref={contactFormName}
                     className="mb-4 form-control bg-secondary text-white" id="contactForm__name" type="text" />

                    <label htmlFor="contactForm__email" className="contactSection__text">Your email</label>
                    <input ref={contactFormEmail}
                     className="mb-4 form-control bg-secondary text-white" id="contactForm__email" type="text" />

                    <label htmlFor="contactForm__topic" className="contactSection__text">Topic</label>
                    <input ref={contactFormTopic}
                     className="mb-4 form-control bg-secondary text-white" id="contactForm__topic" type="text" />

                    <label htmlFor="contactForm__message" className="contactSection__text">Your message</label>
                    <textarea ref={contactFormMessage}
                     className="mb-4 form-control bg-secondary text-white" id="contactForm__message" />
                    
                    <div className="col-12 d-flex justify-content-end p-0">
                        <button className="btn btn-outline-dark col-5 col-sm-3">Submit</button>
                    </div>
                </div>

            </form>
        </main>
    )
}