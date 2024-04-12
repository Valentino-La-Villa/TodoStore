import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {

    const cart = useAppSelector(state => state.products.cart)

    const defineStyle = (({isActive}: {isActive: boolean}) => isActive ? 
    `text-decoration-none text-white defineNavbarFont
    fw-bold`
    :
    `text-decoration-none text-white defineNavbarFont`)


    return (
        <> 
        <div className="col-xl-1 d-none d-xl-flex" // Empty column to keep the todo store logo centered and the navbar on 3 columns (4 cols is way too big)
        ></div>

        <nav                                                            // Nav display for +1200px / hidden in lower res
        className="col-xl-3 d-none d-xl-flex align-items-center px-4
        text-center h-100 my-auto d-flex gap-2 justify-content-around flex-wrap"> 
            <NavLink className={defineStyle} to={'/'}>
                <span>Home</span></NavLink>

            <NavLink className={defineStyle}to={'/products'}>
                <span>Products</span></NavLink>

            {cart.length >= 1 ? 
            
            <NavLink className={defineStyle} to={'/cart'}>
                <span>Cart</span>
            </NavLink>
            
            :
            
            <></>}
        </nav>



        <nav                                                        // Burger menu display for -1200px / hidden in higher res
        className="col-3
                   col-sm-2
                   d-xl-none 
                   d-flex nav--burgerMenu-list-container justify-content-end ">
                    
                <BurgerMenu
                defineStyle={defineStyle} />
        </nav>
        </>
    )
}