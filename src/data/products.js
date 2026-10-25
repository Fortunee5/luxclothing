const u = (id, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`

export const PRODUCTS = [
  { id: 1, name: 'Satin Slip Dress', category: 'Dresses', price: 45000,
    description: 'A fluid satin slip dress with a bias cut and adjustable straps. Effortless from dinner to weekend.',
    images: [u('photo-1496747611176-843222e1e57c'), u('photo-1483985988355-763728e1935b')] },
  { id: 2, name: 'Tailored Wool Coat', category: 'Outerwear', price: 120000,
    description: 'A sharply tailored wool-blend coat with a relaxed shoulder and full lining. Built for cool evenings.',
    images: [u('photo-1539109136881-3be0616acf4b'), u('photo-1551232864-3f0890e580d9')] },
  { id: 3, name: 'Linen Resort Shirt', category: 'Tops', price: 28000,
    description: 'Breathable pure linen with a relaxed collar and mother-of-pearl buttons.',
    images: [u('photo-1556905055-8f358a7a47b2'), u('photo-1489987707025-afc232f7ea0f')] },
  { id: 4, name: 'Wide-Leg Trousers', category: 'Bottoms', price: 38000,
    description: 'High-waisted wide-leg trousers in a soft drape fabric with a clean front pleat.',
    images: [u('photo-1515886657613-9f3515b0c78f'), u('photo-1434389677669-e08b4cac3105')] },
  { id: 5, name: 'Classic Blazer', category: 'Outerwear', price: 85000,
    description: 'A structured single-breasted blazer that sharpens any outfit, day or night.',
    images: [u('photo-1507679799987-c73779587ccf'), u('photo-1591047139829-d91aecb6caea')] },
  { id: 6, name: 'Everyday Knit Top', category: 'Tops', price: 22000,
    description: 'Soft ribbed knit with a flattering fit. A wardrobe staple in every season.',
    images: [u('photo-1485968579580-b6d095142e6e'), u('photo-1529139574466-a303027c1d8b')] },
  { id: 7, name: 'Pleated Midi Skirt', category: 'Bottoms', price: 32000,
    description: 'Flowing pleats with a comfortable elastic waist, cut to a graceful midi length.',
    images: [u('photo-1469334031218-e382a71b716b'), u('photo-1445205170230-053b83016050')] },
  { id: 8, name: 'Summer Wrap Dress', category: 'Dresses', price: 52000,
    description: 'A lightweight wrap dress with a flattering waist tie and a breezy, easy fit.',
    images: [u('photo-1490481651871-ab68de25d43d'), u('photo-1503342217505-b0a15ec3261c')] },
]
