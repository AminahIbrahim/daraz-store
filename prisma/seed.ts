import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old database...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Creating fresh categories...');

  const fashion = await prisma.category.create({
    data: {
      name: 'Fashion & Apparel',
      slug: 'fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    },
  });

  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics & Gadgets',
      slug: 'electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    },
  });

  const homeLiving = await prisma.category.create({
    data: {
      name: 'Home & Living',
      slug: 'home-living',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    },
  });

  const sports = await prisma.category.create({
    data: {
      name: 'Sports & Outdoors',
      slug: 'sports-outdoors',
      image: 'https://images.unsplash.com/photo-1517649763962-0c6232662000?w=800&q=80',
    },
  });

  const beauty = await prisma.category.create({
    data: {
      name: 'Beauty & Health',
      slug: 'beauty-health',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    },
  });

  console.log('Adding clean and verified products...');

  const products = [
    // ================= FASHION =================
    {
      title: 'Classic Blue Denim Jeans Collection',
      slug: 'classic-blue-denim-jeans-stack-rack',
      description: 'Stack of premium washed cotton blue denim jeans with durable stitching and straight-fit cut.',
      price: 34.99,
      stock: 50,
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'],
      categoryId: fashion.id,
    },
    {
      title: 'Casual Summer Fashion Rack Wear',
      slug: 'casual-summer-fashion-rack-wear',
      description: 'Vibrant assortment of summer casual shirts, polo tops, and light jackets arranged on a boutique rack.',
      price: 29.99,
      stock: 40,
      images: ['https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80'],
      categoryId: fashion.id,
    },
    {
      title: 'Retro White & Black High-Top Court Basketball Sneakers',
      slug: 'retro-white-black-high-top-court-sneakers',
      description: 'High-top black and white retro basketball sneakers with padded ankle collar and premium leather finish.',
      price: 110.00,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80'],
      categoryId: fashion.id,
    },

    // ================= ELECTRONICS & GADGETS =================
    {
      title: 'Over-Ear Wireless Noise Canceling Headphones',
      slug: 'over-ear-wireless-noise-canceling-headphones',
      description: 'Premium black wireless Bluetooth headphones with plush earcups and active noise isolation.',
      price: 199.99,
      stock: 40,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
      categoryId: electronics.id,
    },
    {
      title: 'Smart Fitness Tracker Watch with Silicone Band',
      slug: 'smart-fitness-tracker-watch-silicone-band',
      description: 'Modern smartwatch with heart-rate monitoring, step counter, and high-definition touch display.',
      price: 89.00,
      stock: 55,
      images: ['https://images.unsplash.com/photo-1696688713460-de12ac76ebc6?w=600&auto=format&fit=crop&q=60'],
      categoryId: electronics.id,
    },
    {
      title: 'RGB Backlit Wireless Mechanical Gaming Keyboard',
      slug: 'rgb-backlit-wireless-mechanical-gaming-keyboard',
      description: 'Tactile mechanical keyboard with customizable RGB illumination and compact desktop footprint.',
      price: 79.99,
      stock: 35,
      images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'],
      categoryId: electronics.id,
    },
    {
      title: 'Ergonomic Precision Wireless Optical Mouse',
      slug: 'ergonomic-precision-wireless-optical-mouse',
      description: 'Dark metallic ergonomic wireless mouse designed for long working hours and seamless scrolling.',
      price: 49.50,
      stock: 50,
      images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80'],
      categoryId: electronics.id,
    },
    {
      title: 'DSLR Digital Camera with Zoom Lens Kit',
      slug: 'dslr-digital-camera-zoom-lens-kit',
      description: 'Professional black digital mirrorless camera with detachable zoom lens for crisp photography.',
      price: 649.00,
      stock: 12,
      images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80'],
      categoryId: electronics.id,
    },

    // ================= HOME & LIVING =================
    {
      title: 'Minimalist Desk Lamp with Warm Wood Base',
      slug: 'minimalist-desk-lamp-warm-wood-base',
      description: 'Aesthetic bedside ambient light with a fabric shade and solid wooden base.',
      price: 39.99,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
      categoryId: homeLiving.id,
    },

    // ================= SPORTS & OUTDOORS =================
    {
      title: 'Vacuum Insulated Stainless Steel Water Bottle (1L)',
      slug: 'vacuum-insulated-stainless-steel-water-bottle-1l',
      description: 'Double-walled matte finish water bottle that keeps beverages cold for up to 24 hours.',
      price: 22.99,
      stock: 90,
      images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80'],
      categoryId: sports.id,
    },
    {
      title: 'Non-Slip Eco-Friendly TPE Fitness Yoga Mat',
      slug: 'non-slip-eco-friendly-tpe-fitness-yoga-mat',
      description: 'Thick cushioned workout yoga mat with alignment lines and non-slip textured grip.',
      price: 35.00,
      stock: 50,
      images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80'],
      categoryId: sports.id,
    },
    {
      title: 'Rubber Encased Hexagonal Weight Dumbbells Pair',
      slug: 'rubber-encased-hexagonal-weight-dumbbells-pair',
      description: 'Durable rubber-coated hex dumbbells with ergonomic steel handles for home workouts.',
      price: 54.99,
      stock: 25,
      images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80'],
      categoryId: sports.id,
    },
    {
      title: 'Pro Leather Training Boxing Gloves Pair',
      slug: 'pro-leather-training-boxing-gloves-pair',
      description: 'Multi-layer foam padded boxing gloves with broad wrist straps for martial arts and sparring support.',
      price: 45.00,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80'],
      categoryId: sports.id,
    },

    // ================= BEAUTY & HEALTH =================
    {
      title: 'Hydrating Facial Vitamin C Glow Serum',
      slug: 'hydrating-facial-vitamin-c-glow-serum',
      description: 'Brightening facial oil serum enriched with antioxidants and hyaluronic acid in a glass dropper bottle.',
      price: 21.00,
      stock: 85,
      images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
      categoryId: beauty.id,
    },
    {
      title: 'Velvet Matte Long-Wear Lipstick',
      slug: 'velvet-matte-long-wear-lipstick',
      description: 'Smooth texture matte nude lipstick offering rich pigmentation and comfortable daily wear.',
      price: 16.99,
      stock: 95,
      images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80'],
      categoryId: beauty.id,
    },
    {
      title: 'Natural Jade Roller & Guasha Facial Massage Tool Set',
      slug: 'natural-jade-roller-guasha-facial-massage-tool',
      description: 'Real green jade stone roller for facial lymphatic drainage, skin tightening, and reducing puffiness.',
      price: 19.00,
      stock: 40,
      images: ['https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80'],
      categoryId: beauty.id,
    },
    {
      title: 'Luxury Floral Eau De Parfum Perfume Spray',
      slug: 'luxury-floral-eau-de-parfum-perfume-spray',
      description: 'Elegant glass bottle perfume spray with long-lasting floral and woody fragrance notes.',
      price: 59.50,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80'],
      categoryId: beauty.id,
    },
  ];

  for (const item of products) {
    await prisma.product.create({ data: item });
  }

  console.log(`✅ Database successfully updated without unwanted products!`);
}

main()
  .catch((e) => {
    console.error('Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });