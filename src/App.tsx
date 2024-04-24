import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import 'react-tooltip/dist/react-tooltip.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Products from './components/products/Products'
import Cart from './components/cart/Cart'
import { useAppDispatch, useAppSelector } from './redux/store'
import { ReactElement, useEffect } from 'react'
import Homepage from './components/home/Homepage'
import IndividualProductPage from './components/products/individualProductPage/IndividualProductPage'
import NotFound from './components/misc/NotFound'
import Checkout from './components/cart/Checkout'
import { getProductListFromDatabase } from './redux/slices/productHandlingSlice'
import LoadingScreenIndividualProductPage from './components/products/loadingScreens/IndividualProductPageLS'


function App() {
  const productsFetchStatus = useAppSelector(state => state.products.items.status)
  const dispatch = useAppDispatch()

  useEffect(()=>{
      if (productsFetchStatus == 'idle') {
          dispatch(getProductListFromDatabase())
      }
  }, [dispatch, productsFetchStatus])

  const CartAccessValidation = ({children}: {children: ReactElement}): ReactElement => { // This will redirect the user if they manually input the cart URL while the shopping cart being empty
    const cart = useAppSelector(state => state.products.cart)

    if (cart.length == 0) {
      return <Navigate to='/products'/>
    }

    return children
  }

  function getIndividualProductPageDisplay(): ReactElement {
    if (productsFetchStatus == 'success') { // Whenever the data gets pulled, display the corresponding product page
      return <Route path='/products/:productID'
        element={
            <IndividualProductPage />
        }
      />
    } 
    else if (productsFetchStatus == 'loading' || 'idle') { // If the catalog fetch process is still going when the user enters this route, display the corresponding loading screen
      return <Route path='/products/*'
        element={<LoadingScreenIndividualProductPage/>}
      />}
  
    else return <NotFound/> // When the data finished loading, if the specified URL doesn't match any product in the database, display the 'not found' element
  }
  const individualProductPageDisplay = getIndividualProductPageDisplay()

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
        }
        />

        {individualProductPageDisplay}

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
        element={<NotFound />}
        />
      </Routes>
      </main> 
     <Footer />
    </>
  )
}

export default App
