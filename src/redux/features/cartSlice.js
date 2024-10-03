import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { notifyError, notifySuccess } from "@/utils/toast";

const initialState = {
  cart_products: [],
  orderQuantity: 1,
  cartMiniOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_cart_product: (state, { payload }) => {
      // Find the product in the cart by 'product_id'
      const existingProduct = state.cart_products.find(
        (item) => item.product_id === payload.product_id
      );

      if (existingProduct) {
        // Check if there is enough stock to add more of the product
        if (
          existingProduct.orderQuantity + state.orderQuantity <=
          payload.stock_quantity
        ) {
          existingProduct.orderQuantity += state.orderQuantity;
          notifySuccess(
            `${state.orderQuantity} more ${existingProduct.name} added to cart`
          );
        } else {
          notifyError("No more quantity available for this product!");
          state.orderQuantity = 1; // Reset orderQuantity to 1 after the error
        }
      } else {
        // Add new product to cart
        const newItem = {
          ...payload,
          orderQuantity: state.orderQuantity,
        };
        state.cart_products.push(newItem);
        notifySuccess(`${state.orderQuantity} ${payload.name} added to cart`);
      }

      // Update cart in local storage
      setLocalStorage("cart_products", state.cart_products);

      // Reset orderQuantity after adding the product
      state.orderQuantity = 1;
    },

    increment: (state) => {
      state.orderQuantity += 1;
    },

    decrement: (state) => {
      state.orderQuantity =
        state.orderQuantity > 1 ? state.orderQuantity - 1 : 1;
    },

    quantityDecrement: (state, { payload }) => {
      state.cart_products = state.cart_products.map((item) => {
        if (item.product_id === payload.product_id && item.orderQuantity > 1) {
          item.orderQuantity -= 1;
        }
        return item;
      });
      setLocalStorage("cart_products", state.cart_products);
    },

    remove_product: (state, { payload }) => {
      state.cart_products = state.cart_products.filter(
        (item) => item.product_id !== payload.product_id
      );
      setLocalStorage("cart_products", state.cart_products);
      notifyError(`${payload.name} removed from cart`);
    },

    get_cart_products: (state) => {
      state.cart_products = getLocalStorage("cart_products") || [];
    },

    initialOrderQuantity: (state) => {
      state.orderQuantity = 1;
    },

    clearCart: (state) => {
      const isClearCart = window.confirm(
        "Are you sure you want to remove all items?"
      );
      if (isClearCart) {
        state.cart_products = [];
        setLocalStorage("cart_products", state.cart_products);
        notifySuccess("Cart cleared successfully.");
      }
    },

    openCartMini: (state) => {
      state.cartMiniOpen = true;
    },

    closeCartMini: (state) => {
      state.cartMiniOpen = false;
    },
  },
});

export const {
  add_cart_product,
  increment,
  decrement,
  get_cart_products,
  remove_product,
  quantityDecrement,
  initialOrderQuantity,
  clearCart,
  closeCartMini,
  openCartMini,
} = cartSlice.actions;

export default cartSlice.reducer;
