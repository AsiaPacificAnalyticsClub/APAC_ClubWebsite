"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/constants/Merch";

const Merch = () => {
  const preOrderLink = "https://form.jotform.com/252723875780467";

  //product type
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Navigate between images (if multiple exist) then button appears
  const nextImage = () => {
    if (!selectedProduct?.images) return;
    setCurrentIndex((prev) =>
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedProduct?.images) return;
    setCurrentIndex((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  // Handle outside click to close modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setSelectedProduct(null);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      {/* ============================ HEADER ============================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          Our Club&apos;s Merch
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          Represent our community with exclusive club merchandise.
          <br />High-quality, stylish, and made for every member.
        </p>
      </motion.div>

      {/* ============================ PRODUCT GRID ============================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100 ${
                product.isFeatured ? "ring-2 ring-violet-400" : ""
              }`}
            >
              {/* ============================ IMAGE SECTION ============================ */}
              <div
                className="relative w-full h-72 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentIndex(0);
                }}
              >
                {/* Overlay Tags */}
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/80 via-white/50 to-transparent z-10 flex flex-col items-start gap-2 p-4">
                  <span className="bg-pink-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                    Limited Offer
                  </span>
                  {product.isFeatured && (
                    <span className="bg-violet-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                      Best Value
                    </span>
                  )}
                </div>

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 z-0 transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* ============================ CONTENT SECTION ============================ */}
              <div className="p-6 flex flex-col flex-grow text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                <p className="text-lg font-semibold text-violet-600 mb-4">
                  {product.price}
                </p>
                <Link
                  href={preOrderLink}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-md transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Pre-order Now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ============================ FOOTER NOTE ============================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-gray-500 italic">
          * All pre-orders are processed through Google Forms. Delivery times may vary.
        </p>
      </motion.div>

      {/* ============================ IMAGE MODAL ============================ */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={handleOverlayClick}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Image */}
              <div className="relative w-full h-[70vh] flex items-center justify-center bg-gray-50">
                <Image
                  src={
                    selectedProduct.images
                      ? selectedProduct.images[currentIndex]
                      : selectedProduct.image
                  }
                  alt={selectedProduct.name}
                  fill
                  className="object-contain p-4"
                />

                {/* Navigation Buttons (only show if multiple images) */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption */}
              <div className="p-4 text-center text-gray-700">
                <p className="font-semibold">{selectedProduct.name}</p>
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <p className="text-sm text-gray-500">
                    {currentIndex + 1} / {selectedProduct.images.length}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Merch;
