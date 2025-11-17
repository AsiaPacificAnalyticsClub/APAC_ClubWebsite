export const products = [
  {
    id: 1,
    name: "Club T-Shirt",
    description:
      "Comfortable cotton tee with logo print. \nClick to view size guide.",
    price: "RM35.00",
    image: "/t-shirt.png", // main image for card
    images: [
      "/t-shirt_front.png",
      "/t-shirt_back.png",
      "/t-shirt_sizeguide.png",
    ],
  },
  {
    id: 2,
    name: "Card Holder",
    image: "/cardHolder.png",
    price: "RM5.00",
    description: "Durable card holder for your student ID and cards",
  },
  {
    id: 3,
    name: "Lanyard",
    description: "Stylish lanyard with club branding",
    price: "RM12.00",
    image: "/lanyard.png",
    images: ["/lanyard_design.png"],
  },
  {
    id: 4,
    name: "Bundle 1: T-shirt + Card Holder + Lanyard",
    image: "/bundle1.png",
    price: "RM47.00",
    description: "Get all items at a special discounted price",
    isFeatured: true,
  },
  {
    id: 5,
    name: "Bundle 2: Card Holder + Lanyard",
    image: "/bundle2.png",
    price: "RM15.00",
    description: "Get all items at a special discounted price",
    isFeatured: true,
  },
];
