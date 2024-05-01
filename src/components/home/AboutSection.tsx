import Warehouse from '../../assets/decoration/Warehouse.jpg'

export default function AboutSection() {
    return (
        <section className="col-12 w-100 bg-dark text-white pt-5 px-3 d-flex flex-column gap-5" style={{paddingBottom: '70px'}}>
            <h1 className="col-12 text-center pt-4" style={{fontFamily: 'Bebas Neue'}}>About us</h1>

            <div className="row">
                <div className="col-12 col-md-6 
                px-5 mb-5 
                px-md-3 mb-md-0">
                    <img src={Warehouse} className='img-fluid' alt="" />
                </div>

                <aside className="col-12 col-md-6 d-flex justify-content-center flex-column pe-5 ps-5 ps-md-2" // Powered by ChatGPT
                > 
                    <p className='about_us__text'>We are Todo Store, the perfect destination to find the choiciest fashion-forward apparel, sleek watches, and various miscellaneous items.</p>
                    
                    <p className='about_us__text mt-4'>We pride ourselves on our carefully curated selection, ensuring that every item meets our standards of quality and style. With a commitment to offering diverse choices for our customers, we strive to be your one-stop shop for all your lifestyle needs.</p>
                    
                    <p className='about_us__text mt-4'>Join us at Todo Store, where practicality meets elegance, and discover the perfect blend of function and fashion.</p> 
                </aside>
            </div>
        </section>
    )
}