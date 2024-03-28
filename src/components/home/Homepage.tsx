import AboutSection from "./AboutSection.tsx";
import ContactSection from "./ContactSection.tsx";
import DiscountCarousel from "./DiscountCarousel.tsx";
import SocialMediaButtons from "./SocialMedia.tsx";


export default function Homepage() {
    return (
        <div className="container-fluid d-flex gap-5 flex-column py-4 px-0">

            <h1 className="col-12 text-center pt-4" style={{fontFamily: 'Bebas Neue'}}>Welcome to Todo Store</h1>

            <div className="container" style={{marginBottom: '18vh'}}>
                <div className="row">
                    <DiscountCarousel />

                    <SocialMediaButtons />
                </div>
            </div>

                <AboutSection />
                <ContactSection />
        </div>
    )
}