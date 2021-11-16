import { getRandomImage, getRandomPrice } from "./helper";

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: () => ({
    products: [],
    shoppingCart: [],
  }),

  mutations: {
    setProducts: (state, payload) => {
      state.products = payload;
    },
    addToCart: (state, payload) => {
      if (
        state.shoppingCart.findIndex((product) => product.id === payload.id) ===
        -1
      ) {
        state.shoppingCart.push(payload);
      } else {
        state.shoppingCart = state.shoppingCart.map((product) => {
          return {
            ...product,
            qty: product.qty + payload.qty,
          };
        });
      }
    },
    removeFromCart: (state, payload) => {
      state.shoppingCart = state.shoppingCart.filter(
        (product) => product.id != payload
      );
    },
    toggleFavourite: (state, productId) => {
      state.products = state.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            favourite: !product.favourite,
          };
        } else return product;
      });
    },
    updateProduct: (state, payload) => {
      state.shoppingCart = state.shoppingCart.map((product) => {
        return product.id === payload.id ? payload : product;
      });
    },
  },
  getters: {
    getProductsInShoppingCartCount: (state) => {
      return state.shoppingCart.length;
    },
    getTotal: (state) => {
      return state.shoppingCart.reduce(
        (total, product) => total + product.price * product.qty,
        0
      );
    },
    getFavouriteProducts: (state) => {
      return state.products.filter((product) => product.favourite);
    },
  },
  actions: {
    getProducts: async (context) => {
      try {
        const res = await axios.get(
          "https://random-data-api.com/api/food/random_food?size=30"
        );
        const products = res.data.map((product) => {
          return {
            id: product.id,
            name: product.dish,
            image: getRandomImage(),
            price: getRandomPrice(),
            qty: 1,
            favourite: false,
          };
        });
        context.commit("setProducts", products);
        console.log(products);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
