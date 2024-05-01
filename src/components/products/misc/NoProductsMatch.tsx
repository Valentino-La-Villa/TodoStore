import todoStoreLogo from '../../../assets/icons/Cropped_stretched_logo.png'

export default function NoProductsMatch() {
    return (
        <section className="col-12 d-flex align-items-center flex-column">
            <p className="col-11 col-lg-6 mt-5 rounded-3 p-2 py-4 text-center text-dark border border-1 border-dark mb-5 fw-semibold" 
            style={{ backgroundColor: '#d9e3f2', fontFamily: 'Montserrat' }}>
                No products matching your filters were found
            </p>

            
            <div className='col-12 d-flex justify-content-center mt-5'>
                <img className='col-8 col-lg-5' style={{opacity: '50%'}} src={todoStoreLogo} alt="" />
            </div>

        </section>
    )
}