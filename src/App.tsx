import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Products from './components/products/Products'
import Cart from './components/cart/Cart'
import { useAppSelector } from './redux/store'
import { ReactElement } from 'react'
import Homepage from './components/home/Homepage'
import IndividualProductPage from './components/products/individualProductPage/IndividualProductPage'
import NotFound from './components/misc/NotFound'
import Checkout from './components/cart/Checkout'

function App() {


  const CartAccessValidation = ({children}: {children: ReactElement}): ReactElement => { // This will redirect the user if they manually input the cart URL while the shopping cart being empty
    const cart = useAppSelector(state => state.products.cart)

    if (cart.length == 0) {
      return <Navigate to='/products'/>
    }

    return children
  }

  return (
    <>
    <main className='main--control'>
     <Header />
      <Routes>
        <Route path='/'
        element={
          <Homepage />
        }/>

        <Route path='/products'
        element={
          <Products />
        }/>

        <Route path='/products/:productID'
        element={
          <IndividualProductPage />
        }
        />

        <Route path='/cart'
        element={
          <CartAccessValidation>
            <Cart />
          </CartAccessValidation>
        }
        />

        <Route path='/checkout'
        element={
          <CartAccessValidation>
            <Checkout />
          </CartAccessValidation>
        }
        />

        <Route path='/*'
        element={<NotFound />}/>
      </Routes>
      </main> 
     <Footer />
    </>
  )
}

export default App
