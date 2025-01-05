'use client'

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart } from 'lucide-react'

const products = [
  {
    id: 1,
    name: "T-shirt",
    image: "/t-shirt.png",
    price: "RM 35",
    description: "Premium quality cotton t-shirt with club logo",
  },
  {
    id: 2,
    name: "Card Holder",
    image: "/cardHolder.png",
    price: "RM 15",
    description: "Durable card holder for your student ID and cards",
  },
  {
    id: 3,
    name: "Lanyard",
    image: "/lanyard.png",
    price: "RM 10",
    description: "Stylish lanyard with club branding",
  },
  {
    id: 4,
    name: "Bundle Deal",
    image: "/bundle.png",
    price: "RM 50",
    description: "Get all items at a special discounted price",
    isFeatured: true,
  },
]

const Merch = () => {
  const preOrderLink = "https://docs.google.com/forms/d/e/1FAIpQLSeJJfvmG8Tq73qe9Kb6GZDbMAV_BG6KWKrb9DS4LfCMH1BgAg/viewform?usp=sf_link"

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          Our Club&apos;s Merch
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Show your support with our exclusive merchandise collection. Pre-order now and be part of our community!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${
              product.isFeatured ? 'ring-2 ring-violet-500' : ''
            }`}>
              {/* Image Container */}
              <div className="relative py-4  flex items-center justify-center">
                {product.isFeatured && (
                  <div className="absolute top-4 right-4 z-10 bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Best Value
                  </div>
                )}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-300 flex items-center "
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2 text-center">{product.name}</h2>
                <p className="text-gray-600 mb-4 text-center flex-grow">{product.description}</p>
                <div className="text-center">
                  
                  <Link 
                    href={preOrderLink}
                    target="_blank"
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-violet-600 rounded-xl hover:bg-violet-700 transition-colors duration-200 gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Pre-order Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-gray-500">
          * Pre-orders are processed through Google Forms. Delivery times may vary.
        </p>
      </motion.div>
    </section>
  )
}

export default Merch

