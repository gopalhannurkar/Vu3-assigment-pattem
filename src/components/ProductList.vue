<template>
    <div style="display:  flex;flex-direction: column;">
        <div class="product-list">
            <div v-for="product in products" :key="product.id" class="product-card">
                <!-- Product Thumbnail -->
                <div class="product-image">
                    <img :src="product.thumbnail" :alt="product.title" />
                </div>
                <!-- Product Details -->
                <div class="product-details">
                    <h3>{{ product.title }}</h3>
                    <p>${{ product.price }}</p>
                    <div class="product-actions">
                        <button @click="addToBasket(product)" class="add-to-basket-btn">
                            Add to Basket
                        </button>
                        <button @click="toggleFavorite(product)" class="favorite-btn" :class="{ favorited: isFavorited(product) }">
                            <i class="fas fa-heart"></i> <!-- Favorite icon -->
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- View More Button -->
        <button v-if="canLoadMore" @click="loadMore" class="view-more-btn">
            View More
        </button>
    </div>
</template>

<script>
export default {
    computed: {
        products() {
            return this.$store.getters.allProducts; // Get all fetched products
        },
        canLoadMore() {
            return this.$store.getters.canLoadMore; // Check if more products can be loaded
        },
        isFavorited() {
            return this.$store.getters.isFavorited; // Get the isFavorited getter from the store
        },
    },
    methods: {
        addToBasket(product) {
            this.$store.commit('addToBasket', product);
        },
        toggleFavorite(product) {
            this.$store.commit('toggleFavorite', product); // Toggle favorite status
        },
        loadMore() {
            this.$store.dispatch('fetchProducts', { search: this.$store.state.searchQuery }); // Fetch more products
        },
    },
    created() {
        this.$store.dispatch('fetchProducts',{ search:''}); // Fetch initial products when the component is created
    },
};
</script>

<style scoped>
.product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
.product-card {
    /* border: 1px solid #ccc; */
    border-radius: 8px;
    overflow: hidden; /* Ensure nothing overflows outside the card */
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.product-image {
    width: 100%;
    overflow: hidden; /* Ensure the image doesn't overflow */
    display: flex;
    align-items: center;
    justify-content: center;
}
.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensure the image covers the container without distortion */
}
.product-details {
    padding: 15px;
    flex-grow: 1; /* Allow details to take up remaining space */
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.product-details h3 {
    margin: 0;
    font-size: 18px;
}
.product-details p {
    margin: 0;
    font-size: 14px;
    color: #555;
}
.product-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto; /* Push buttons to the bottom */
}
.add-to-basket-btn  {
    padding: 10px;
    background-color: darkblue;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    margin-top: auto; /* Push the button to the bottom */
}
.add-to-basket-btn :hover {
    background-color: #369f6e;
}
.favorite-btn {
    background-color: transparent;
    border: none;
    color: #ccc; /* Default color for unfavorited icon */
    cursor: pointer;
    font-size: 18px;
}
.favorite-btn.favorited {
    color: red; /* Color for favorited icon */
}
.view-more-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self:center;
}
.view-more-btn:hover {
    background-color: #369f6e;
}
</style>