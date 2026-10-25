import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import PageTransition from './components/PageTransition'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'

function App() {
  // Fades out the optional #initial-loader if your index.html has one.
  useEffect(() => {
    const loader = document.getElementById('initial-loader')
    if (!loader) return
    const timer = setTimeout(() => {
      loader.classList.add('hide')
      setTimeout(() => loader.remove(), 550)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/success" element={<CheckoutSuccess />} />
                </Routes>
              </PageTransition>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  )
}

export default App
