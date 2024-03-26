import Navbar from "./Navbar";
import BrandLogo from '../../assets/icons/Logo.png'
import StretchedLogo  from '../../assets/icons/Stretched_logo.png'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
        <header className="container-fluid bg-primary p-2 vh-10 position-fixed shadow" style={{zIndex: '99'}}>
            <div className="row">
                <div className="d-none
                                d-sm-block col-1">
                    <Link to='/'><img className="img-fluid" src={BrandLogo} alt="" style={{height: '10vh', minWidth: '10vh'}} /></Link>
                </div>

                <div className="col-3
                                col-sm-1 
                                col-xl-3" // Empty div for balancing out logo size and centering the next element
                                >
                </div>


                <div className="col-6
                                col-sm-8
                                col-xl-4
                text-center my-auto">
                    <Link to='/'><img className="col-12" style={{maxWidth: '300px'}} src={StretchedLogo} alt="" /></Link>
                </div>

                <Navbar />
            </div>
        </header>
        
        <div id='header' className="vh-10" style={{minHeight: '12vh'}}              // KEEP THIS DIV EMPTY - It's an empty box with about the same size as the Header placed to occupy the block-space that Header does not occupy due to using the 'fixed' property
        ></div>
        </>
    )
}