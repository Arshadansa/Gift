import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  quantityDecrement,
  remove_product,
} from "@/redux/features/cartSlice";

const CartItem = ({ product }) => {
  const { name, price, orderQuantity = 0, product_id } = product || {};

  const dispatch = useDispatch();

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = (productId, productName) => {
    dispatch(remove_product({ product_id: productId, name: productName })); // Pass both product_id and name
  };

  const img = product.images || []; // Default to an empty array if images are not present
  const _id = product.product_id; // Use product_id as the unique identifier
  const [hover, setHover] = useState(false);

  return (
    <tr>
      {/* img */}
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          <Image
            src={img[0] || "/path/to/default/image.jpg"} // Use a default image if none is available
            alt={product.name} // Use the product name for accessibility
            width={70}
            height={100}
            quality={100} // Optional: set quality for better image clarity
          />
        </Link>
      </td>
      {/* title */}
      <td
       
        className="tp-cart-title"
      >
        <Link  style={{
          color: hover ? "#990100" : "black", 
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)} href={`/product-details/${_id}`}>{name}</Link>
      </td>
      {/* price */}
      <td className="tp-cart-price">
        <span>${(price * orderQuantity).toFixed(2)}</span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            onClick={() => handleDecrement(product)}
            className="tp-cart-minus"
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={orderQuantity}
            readOnly
          />
          <span
            onClick={() => handleAddProduct(product)}
            className="tp-cart-plus"
          >
            <Plus />
          </span>
        </div>
      </td>
      {/* action */}
      <td className="tp-cart-action">
        <button
          onClick={() => handleRemovePrd(product.product_id, product.name)}
          className="tp-cart-action-btn"
        >
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
