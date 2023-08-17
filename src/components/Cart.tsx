import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: Product[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const [data, setData] = useState<Product[]>(cartItems);
  const [itemQuantities, setItemQuantities] = useState<{
    [id: number]: number;
  }>({});

  const handleDecrease = (id: number) => {
    const updatedQuantities = { ...itemQuantities };
    updatedQuantities[id] = (updatedQuantities[id] || 0) - 1;
    setItemQuantities(updatedQuantities);

    const updatedData = data.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );

    setData(updatedData);
  };

  const handleIncrease = (id: number) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setData(updatedData);
  };

  useEffect(() => {
    setData(cartItems);
  }, [cartItems]);

  return (
    <div className="cart-menu">
      <h2>Cart</h2>
      <div className="cart">
        <ul className="list-cart">
          {data.map((item) => (
            <li key={item.id}>
              <div className="cart-img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-name">{item.name}</div>
              <div className="cart-price">
                {item.price.toLocaleString()} VND
              </div>
              <div className="cart-count">
                <button
                  className="minus"
                  onClick={() => handleDecrease(item.id)}
                >
                  -
                </button>
                <div>{item.quantity}</div>
                <button
                  className="plus"
                  onClick={() => handleIncrease(item.id)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
