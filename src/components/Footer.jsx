import { Link } from 'react-router-dom'
import { FaInstagram, FaTiktok, FaWhatsapp, FaPinterestP } from 'react-icons/fa6'
import { MapPin, Phone, Mail } from 'lucide-react'

const Social = ({ href, label, children }) => (
  <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#E9D8C4] hover:bg-[#B4532A] hover:text-white transition-colors">
    {children}
  </a>
)

const col = 'font-serif text-lg text-[#F4EEE6] mb-4'
const link = 'hover:text-white transition-colors'

export default function Footer() {
  return (
    <footer className="bg-[#1F1A17] text-[#B9AFA3]">
      {/* Newsletter strip */}
      <div className="bg-[#B4532A]">
        <div className="container mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Join the Lux list</h3>
            <p className="text-sm text-white/80">Early access to drops and 10% off your first order.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md gap-2">
            <input type="email" placeholder="Your email" className="min-w-0 flex-1 rounded-full px-5 py-3 text-sm text-black outline-none" />
            <button className="rounded-full bg-[#1F1A17] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-black">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <p className="font-serif text-3xl text-[#F4EEE6]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Lux<span className="italic text-[#E08A5E]">Clothing</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Considered wardrobe pieces for everyday confidence. Designed with care, delivered with ease.
            </p>
            <div className="mt-5 flex gap-2.5">
              <Social href="https://instagram.com" label="Instagram"><FaInstagram size={17} /></Social>
              <Social href="https://tiktok.com" label="TikTok"><FaTiktok size={16} /></Social>
              <Social href="https://pinterest.com" label="Pinterest"><FaPinterestP size={16} /></Social>
              <Social href="https://wa.me/" label="WhatsApp"><FaWhatsapp size={17} /></Social>
            </div>
          </div>

          <div>
            <h4 className={col} style={{ fontFamily: '"Playfair Display", serif' }}>Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className={link}>New In</Link></li>
              <li><Link to="/shop" className={link}>Dresses</Link></li>
              <li><Link to="/shop" className={link}>Outerwear</Link></li>
              <li><Link to="/shop" className={link}>Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={col} style={{ fontFamily: '"Playfair Display", serif' }}>Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cart" className={link}>Your Bag</Link></li>
              <li><a href="#" className={link}>Shipping</a></li>
              <li><a href="#" className={link}>Returns</a></li>
              <li><a href="#" className={link}>Size Guide</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className={col} style={{ fontFamily: '"Playfair Display", serif' }}>Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-[#E08A5E]" />12 Fashion Avenue, Lagos</li>
              <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0 text-[#E08A5E]" />+234 000 000 0000</li>
              <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0 text-[#E08A5E]" />hello@luxclothing.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-[#8C8277]">
          <span>© 2026 LuxClothing. All rights reserved.</span>
          <span>Crafted for modern wardrobes</span>
        </div>
      </div>
    </footer>
  )
}
