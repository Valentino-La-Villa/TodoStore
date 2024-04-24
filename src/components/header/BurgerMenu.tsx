import { useState } from "react"
import burgerMenuIcon from '../../assets/icons/burgerMenuIcon.png'
import burgerMenuCloseX from '../../assets/icons/burgerMenuCloseX.png'
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../redux/store"
import { ClickAwayListener } from "@mui/material"

type Props = {
    defineStyle: ({ isActive }: {
        isActive: boolean;
    }) => "text-decoration-none text-white defineNavbarFont\n    fw-bold" | "text-decoration-none text-white defineNavbarFont"
}

export default function BurgerMenu(props: Props) {
    
    const cart = useAppSelector(state => state.products.cart)
    
    const [burgerMenuVisibility, setBurgerMenuVisibility] = useState(false)
    const dynamicBurgerMenuClassname = (burgerMenuVisibility ? 'nav--burgerMenu--visible p-4' : 'nav--burgerMenu--hidden')

    return (
        <ClickAwayListener onClickAway={()=>{setBurgerMenuVisibility(false)}}>
            <div className="m-0 p-0 d-flex">
            <button className="btn p-0" onClick={()=>{setBurgerMenuVisibility(true)}}>
                <img className="img-fluid" style={{width: '50px'}} src={burgerMenuIcon}></img>
            </button>

            <main className={dynamicBurgerMenuClassname}>
                <ul className="nav--burgerMenu-list">
                    <li>
                        <button className="btn p-0" onClick={()=>{setBurgerMenuVisibility(false)}}>
                            <img className="img-fluid" style={{width: '50px'}} src={burgerMenuCloseX}></img>
                        </button>
                    </li>
                    <li>
                        <NavLink className={props.defineStyle} style={{fontSize: '30px'}} to={'/'}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={props.defineStyle} style={{fontSize: '30px'}} to={'/products'}>Products</NavLink>
                    </li>
                    {cart.length >= 1 ? 

                    <NavLink className={props.defineStyle} style={{fontSize: '30px'}} to={'/cart'}>
                        <span>Cart</span>
                    </NavLink>
                    
                    :
                    
                    <></>}
                </ul>
            </main>
        </div>
        </ClickAwayListener>
    )
}