import React, { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Cart from "./Cart";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity?: number;
}
const products = [
  {
    id: 1,
    name: "Cheeseburgers",
    image:
      "https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    price: 320000,
  },
  {
    id: 2,
    name: "Tacos",
    image:
      "https://a.cdn-hotels.com/gdcs/production5/d888/1b61cd53-b152-4c82-b438-be4d52e5d918.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    price: 450000,
  },
  {
    id: 3,
    name: "Cheese Hot Dog",
    image:
      "https://a.cdn-hotels.com/gdcs/production172/d1780/0301035b-e96e-470d-918a-89aff704bca4.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    price: 120000,
  },
  {
    id: 4,
    name: "Pastrami Sandwich",
    image:
      "https://a.cdn-hotels.com/gdcs/production97/d1248/df9e1345-b8c6-4824-8c98-fe114ec8d56c.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    price: 190000,
  },
  {
    id: 5,
    name: "Ice Cream Sandwich",
    image:
      "https://a.cdn-hotels.com/gdcs/production115/d1481/96ce5193-1a57-4808-ae88-fbb94146a212.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    price: 160000,
  },
  {
    id: 6,
    name: "French Dip Sandwich",
    image:
      "https://a.cdn-hotels.com/gdcs/production171/d1204/c214df30-9844-4e41-b8f8-07591c1f5e36.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    price: 420000,
  },
];

function Products() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (id: number) => {
    console.log(id);

    const selectedItem = products.find((product) => product.id === id);

    if (selectedItem) {
      const existingItemIndex = cartItems.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity! += 1;
        console.log(updatedCartItems[existingItemIndex]);

        setCartItems(updatedCartItems);
      } else {
        setCartItems((prevCartItems) => [
          ...prevCartItems,
          { ...selectedItem, quantity: 1 },
        ]);
      }
    }
  };
  console.log(cartItems);

  return (
    <div className="products">
      <div className="wrapper">
        <div className="header">
          <h1>Your Shopping Cart</h1>
          <div className="shopping-cart">
            <HiOutlineShoppingBag className="icon-shoppingCart" />
            <div className="quantity-cart">
              <span>1</span>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="container">
            {products.map((product) => (
              <div key={product.id} className="item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-product"
                />
                <div className="content">
                  <h4>{product.name}</h4>
                  <p>{product.price.toLocaleString()} VND</p>
                  <button onClick={() => addToCart(product.id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Cart cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
}

export default Products;
