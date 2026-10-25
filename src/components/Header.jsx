import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { gsap, prefersReducedMotion } from '../lib/gsap'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop All' },
  { to: '/shop', label: 'New In' },
  { to: '/shop', label: 'Best Sellers' },
]

function Logo({ className = '' }) {
  return (
    <Link to="/" className={`font-serif text-2xl tracking-tight whitespace-nowrap ${className}`} style={{ fontFamily: '"Playfair Display", serif' }}>
      Lux<span className="italic text-[#B4532A]">Clothing</span>
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { cart } = useCart()
  const count = cart.reduce((s, i) => s + i.quantity, 0)
  const location = useLocation()
  const badge = useRef(null)
  const prev = useRef(count)

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  useEffect(() => {
    if (count > prev.current && badge.current && !prefersReducedMotion) {
      gsap.fromTo(badge.current, { scale: 1.6 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' })
    }
    prev.current = count
  }, [count])

  return (
    <>
      <div className="bg-[#B4532A] text-white text-[11px] tracking-wide text-center py-2 px-4">
        Complimentary delivery on orders over ₦100,000
      </div>
      <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur border-b border-[#E7DCCB]">
        <div className="container mx-auto px-4 sm:px-6 h-16 lg:h-20 grid grid-cols-3 items-center">
          {/* Left: nav (desktop) / menu button (mobile) */}
          <div>
            <button aria-label="Open menu" onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-2 rounded-full hover:bg-black/5">
              <Menu size={22} />
            </button>
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-stone-600">
              {navLinks.slice(0, 3).map((l) => (
                <Link key={l.label} to={l.to} className="hover:text-[#B4532A] transition-colors">{l.label}</Link>
              ))}
            </nav>
          </div>

          <div className="text-center"><Logo /></div>

          <div className="flex items-center justify-end gap-5">
            <Link to="/shop" className="hidden lg:block text-[13px] font-medium text-stone-600 hover:text-[#B4532A]">Best Sellers</Link>
            <Link to="/cart" aria-label={`Bag (${count} items)`} className="relative p-2 rounded-full hover:bg-black/5">
              <ShoppingBag size={20} />
              {count > 0 && (
                <span ref={badge} className="absolute -top-0.5 -right-0.5 bg-[#B4532A] text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-[60] bg-black/50 transition-opacity lg:hidden ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      <aside className={`fixed top-0 left-0 z-[70] h-full w-[300px] max-w-[85vw] bg-[#FAF6F0] shadow-2xl transition-transform duration-300 lg:hidden flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#E7DCCB]">
          <Logo />
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-black/5"><X size={20} /></button>
        </div>
        <nav className="flex-1 px-5 py-6 space-y-1">
          {navLinks.map((l) => (
            <Link key={l.label} to={l.to} className="block py-3 text-lg font-serif border-b border-[#E7DCCB]" style={{ fontFamily: '"Playfair Display", serif' }}>{l.label}</Link>
          ))}
          <Link to="/cart" className="flex items-center gap-2 pt-5 text-sm font-medium text-stone-600">
            <ShoppingBag size={16} /> Bag {count > 0 && `(${count})`}
          </Link>
        </nav>
      </aside>
    </>
  )
}
