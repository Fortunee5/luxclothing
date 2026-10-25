import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import Spinner from '../components/Spinner'
import LazyImage from '../components/LazyImage'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[0-9\s-]{7,15}$/

const FIELDS = [
  { name: 'firstName', label: 'First name', half: true },
  { name: 'lastName', label: 'Last name', half: true },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'address', label: 'Delivery address' },
  { name: 'city', label: 'City' },
]

export default function Checkout() {
  const { cart, total, clearCart } = useCart()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (cart.length === 0 && !loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-6">Your bag is empty</p>
        <Link to="/shop" className="text-sm font-bold uppercase tracking-widest underline underline-offset-4">Back to Shop</Link>
      </div>
    )
  }

  const validate = () => {
    const e = {}
    FIELDS.forEach(({ name, label }) => { if (!form[name].trim()) e[name] = `${label} is required` })
    if (form.email && !EMAIL_RE.test(form.email)) e.email = 'Enter a valid email'
    if (form.phone && !PHONE_RE.test(form.phone)) e.phone = 'Enter a valid phone number'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) {
      toast('Please fix the highlighted fields.', { type: 'error' })
      return
    }
    setLoading(true)
    // Demo only: simulate a short processing delay, no real payment or server.
    setTimeout(() => {
      const id = `LUX-${Math.floor(100000 + Math.random() * 900000)}`
      clearCart()
      navigate(`/checkout/success?id=${id}`)
    }, 1200)
  }

  const inputCls = (n) =>
    `w-full border px-4 py-3 text-sm outline-none transition-colors focus:border-[#B4532A] ${errors[n] ? 'border-red-400' : 'border-gray-200'}`

  return (
    <div>
      <div className="bg-[#F4EEE6] pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-[-0.02em]">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          <form onSubmit={handleSubmit} noValidate className="lg:col-span-2 space-y-5">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Delivery details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FIELDS.map(({ name, label, type = 'text', half }) => (
                <div key={name} className={half ? '' : 'sm:col-span-2'}>
                  <label htmlFor={name} className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5">{label}</label>
                  <input
                    id={name} type={type} value={form[name]}
                    onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                    className={inputCls(name)}
                  />
                  {errors[name] && <p className="mt-1 text-xs font-medium text-red-500">{errors[name]}</p>}
                </div>
              ))}
            </div>

            <div className="bg-[#F4EEE6] p-4 text-xs text-gray-500 leading-relaxed">
              <strong className="text-black">Demo checkout.</strong> No payment is taken and no data is sent anywhere.
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-[#16302B] text-white py-4 font-bold uppercase tracking-[0.14em] text-[11px] flex items-center justify-center gap-3 hover:bg-[#B4532A] disabled:opacity-60 active:scale-[0.98] transition-all"
            >
              {loading ? <Spinner size={16} /> : <Lock size={14} />}
              {loading ? 'Processing…' : `Place Order · ₦${total.toLocaleString()}`}
            </button>
          </form>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-[#F4EEE6] p-6 sm:p-8">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">Your Order</h2>
              <ul className="space-y-4 mb-5">
                {cart.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="w-14 aspect-[3/4] shrink-0 overflow-hidden">
                      <LazyImage src={item.image} alt={item.name} className="h-full w-full" eager />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide line-clamp-1">{item.name}</p>
                      <p className="text-[11px] text-gray-400">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-baseline">
                <span className="font-bold uppercase tracking-wide text-sm">Total</span>
                <span className="text-xl font-bold">₦{total.toLocaleString()}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
