import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, RefreshCw, ShieldCheck, Sparkles, Star } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import useGsapContext from '../hooks/useGsapContext'
import { gsap, ScrollTrigger, EASE } from '../lib/gsap'
import { getCachedProducts } from '../lib/productsApi'

const perks = [
  { icon: Truck, label: 'Free delivery', desc: 'Orders over ₦100,000' },
  { icon: RefreshCw, label: '14-day returns', desc: 'Simple and stress-free' },
  { icon: ShieldCheck, label: 'Secure checkout', desc: 'Your details stay private' },
  { icon: Sparkles, label: 'Premium fabrics', desc: 'Chosen to last' },
]

const pillars = [
  { n: '01', t: 'Fabrics first', d: 'We start with breathable linens, soft knits and weighty wools, then design around them.' },
  { n: '02', t: 'Cut with intent', d: 'Every silhouette is fitted and re-fitted until it moves the way you do.' },
  { n: '03', t: 'Made to stay', d: 'Fewer, better pieces that keep their shape and your trust, season after season.' },
]

const reviews = [
  { q: 'The blazer fits like it was made for me. I have worn it to three meetings and a wedding already.', n: 'Adaeze O.', c: 'Lagos' },
  { q: 'Delivery was quick and the satin dress looks even better in person. Quality is clearly a priority.', n: 'Tolu B.', c: 'Abuja' },
  { q: 'Finally a store where the linen shirts are actually breathable. Ordering a second one this week.', n: 'Chinedu A.', c: 'Port Harcourt' },
]

const tiles = [
  { img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1000', label: 'The Dress Edit', cls: 'sm:row-span-2 aspect-[4/5] sm:aspect-auto' },
  { img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1000', label: 'Wardrobe Staples', cls: 'aspect-[16/10]' },
  { img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000', label: 'Easy Layers', cls: 'aspect-[16/10]' },
]

export default function Home() {
  const products = getCachedProducts()
  const heroRef = useRef(null)
  const rootRef = useRef(null)

  useGsapContext(() => {
    const tl = gsap.timeline({ defaults: { ease: EASE } })
    tl.fromTo('.hero-in', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 })
      .fromTo('.hero-img', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 }, 0.1)
  }, [], heroRef)

  useGsapContext(() => {
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(t)
  }, [], rootRef)

  return (
    <div ref={rootRef} className="bg-[#FAF6F0]">
      {/* Hero: split layout with arched image */}
      <section ref={heroRef} className="container mx-auto px-4 sm:px-6 py-10 lg:py-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <p className="hero-in inline-block rounded-full bg-[#B4532A]/10 text-[#B4532A] px-4 py-1.5 text-xs font-semibold tracking-wide mb-5">
            The Autumn Edit · New season
          </p>
          <h1 className="hero-in text-5xl sm:text-6xl xl:text-7xl leading-[1.05] text-stone-900">
            Dress for the <em className="text-[#B4532A]">life</em> you are building.
          </h1>
          <p className="hero-in mt-6 text-stone-600 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            Refined everyday pieces in rich textures and warm tones, made to be worn on repeat.
          </p>
          <div className="hero-in mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16302B] text-white px-8 py-4 text-sm font-semibold hover:bg-[#B4532A] transition-colors">
              Explore the edit <ArrowRight size={16} />
            </Link>
            <Link to="/shop" className="inline-flex items-center justify-center rounded-full border border-stone-300 px-8 py-4 text-sm font-semibold hover:border-stone-900 transition-colors">
              Best sellers
            </Link>
          </div>
        </div>

        <div className="hero-img order-1 lg:order-2 relative mx-auto w-full max-w-md lg:max-w-none">
          <LazyImage
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1400"
            alt="LuxClothing autumn edit"
            eager
            className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-3xl"
          />
          <div className="absolute -bottom-4 -left-2 sm:-left-6 rounded-2xl bg-white shadow-xl px-5 py-4">
            <div className="flex gap-0.5 text-[#B4532A]">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
            <p className="mt-1 text-xs font-semibold text-stone-800">Loved by 2,000+ customers</p>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-[#E7DCCB]">
        <div className="container mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {perks.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#16302B] text-[#F4EEE6]"><Icon size={17} /></span>
              <div>
                <p className="text-sm font-semibold text-stone-900">{label}</p>
                <p className="text-xs text-stone-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New in: swipeable row */}
      <section className="reveal container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl sm:text-5xl text-stone-900">Just landed</h2>
          <Link to="/shop" className="text-sm font-semibold text-[#B4532A] inline-flex items-center gap-1.5 hover:gap-3 transition-all">
            See everything <ArrowRight size={15} />
          </Link>
        </div>
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2">
          {products.map((p, i) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group snap-start shrink-0 w-[62%] sm:w-[34%] lg:w-[23.5%]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <LazyImage src={p.images[0]} alt={p.name} className="h-full w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" eager={i < 3} />
                {i < 2 && <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#B4532A]">New</span>}
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold normal-case tracking-normal line-clamp-1 group-hover:text-[#B4532A] transition-colors">{p.name}</h3>
                  <p className="text-xs text-stone-500">{p.category}</p>
                </div>
                <p className="text-sm font-bold shrink-0">₦{parseFloat(p.price).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mosaic */}
      <section className="reveal container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="grid sm:grid-cols-2 gap-4">
          {tiles.map(({ img, label, cls }) => (
            <Link key={label} to="/shop" className={`group relative overflow-hidden rounded-3xl block ${cls}`}>
              <LazyImage src={img} alt={label} className="absolute inset-0 h-full w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute left-5 bottom-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-stone-900 group-hover:bg-[#B4532A] group-hover:text-white transition-colors">
                {label} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Lux: dark panel with numbered pillars */}
      <section className="reveal bg-[#16302B] text-[#F4EEE6]">
        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-[#E08A5E] text-sm font-semibold mb-4">Why LuxClothing</p>
            <h2 className="text-4xl sm:text-5xl leading-tight">Quietly confident clothing, built properly.</h2>
          </div>
          <ul className="divide-y divide-white/15">
            {pillars.map(({ n, t, d }) => (
              <li key={n} className="flex gap-5 py-6 first:pt-0">
                <span className="font-serif text-2xl text-[#E08A5E]">{n}</span>
                <div>
                  <h3 className="text-lg font-semibold normal-case tracking-normal">{t}</h3>
                  <p className="mt-1 text-sm text-[#C9D3CC] leading-relaxed">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="reveal container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-[#B4532A] text-sm font-semibold mb-3">Kind words</p>
          <h2 className="text-3xl sm:text-5xl text-stone-900">What our customers say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map(({ q, n, c }) => (
            <figure key={n} className="rounded-3xl bg-white border border-[#E7DCCB] p-7 flex flex-col">
              <div className="flex gap-0.5 text-[#B4532A] mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
              <blockquote className="font-serif text-lg leading-snug text-stone-800 flex-1" style={{ fontFamily: '"Playfair Display", serif' }}>“{q}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16302B] text-sm font-semibold text-[#F4EEE6]">{n[0]}</span>
                <span className="text-sm"><strong className="block text-stone-900">{n}</strong><span className="text-stone-500">{c}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
