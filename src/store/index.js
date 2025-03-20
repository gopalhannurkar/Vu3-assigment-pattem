import { createStore } from 'vuex';
import { fetchProducts } from '../services/api';

export default createStore({
    state: {
        products: [], // All fetched products
        limit: 20, // Number of products to fetch initially
        skip: 0, // Offset for pagination
        totalProducts: 0, // Total number of products available
        basket: [], // Shopping basket
        searchQuery: '', // Search query
        selectedCategories: [], // Selected categories for filtering
    },
    mutations: {
        setProducts(state, { products, total }) {
            if (state.skip === 0) {
                // If it's a new search or filter, replace the products
                state.products = products;
            } else {
                // If it's a "View More" action, append the products
                state.products = [...state.products, ...products];
            }
            state.totalProducts = total; // Update total number of products
        },
        updateQuantity(state, item) {
          const existingItem = state.basket.find(i => i.id === item.id);
          if (existingItem) {
              existingItem.quantity = item.quantity; // Update the quantity
          }
        },
        setSkip(state, skip) {
            state.skip = skip; // Update the skip value
        },
        setSearchQuery(state, query) {
            state.searchQuery = query; // Update the search query
        },
        setSelectedCategories(state, categories) {
            state.selectedCategories = categories; // Update selected categories
        },
        addToBasket(state, product) {
            const existingItem = state.basket.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.basket.push({ ...product, quantity: 1 });
            }
        },
        removeFromBasket(state, product) {
            state.basket = state.basket.filter(item => item.id !== product.id);
        },
    },
    actions: {
        async fetchProducts({ commit, state }, { search = '' }) {
          console.log(search,"search")
            commit('setSearchQuery', search); // Update the search query in the state
            if (search || state.selectedCategories.length > 0) {
                commit('setSkip', 0); // Reset skip for new searches or filters
            }
            const { products, total } = await fetchProducts({
                limit: state.limit,
                skip: state.skip,
                search,
                categories: state.selectedCategories, // Pass selected categories to the API
            });
            commit('setProducts', { products, total }); // Append or replace products
            commit('setSkip', state.skip + state.limit); // Update the skip value
        },
    },
    getters: {
        allProducts(state) {
            // Filter products based on selected categories
            if (state.selectedCategories.length === 0) {
                return state.products;
            }
            return state.products.filter(product =>
                state.selectedCategories.includes(product.category)
            );
        },
        canLoadMore(state) {
            return state.products.length < state.totalProducts; // Check if more products can be loaded
        },
        basket(state) {
            return state.basket; // Return the shopping basket
        },
        totalPrice(state) {
            return state.basket.reduce((total, item) => total + item.price * item.quantity, 0);
        },
    },
});