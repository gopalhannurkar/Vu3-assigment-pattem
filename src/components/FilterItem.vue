<template>
    <div class="filters">
        <!-- Search Input and Button -->
        <div class="search-container">
            <input
                v-model="searchQuery"
                placeholder="Search products..."
                @keyup.enter="handleSearch"
            />
            <button @click="handleSearch" class="search-btn">
                Search
            </button>
        </div>

        <!-- Filter Button -->
        <div class="filter-dropdown">
            <button @click="toggleFilterMenu" class="filter-btn">
                Filter by Category
            </button>
            <!-- Filter Menu -->
            <div v-if="isFilterMenuOpen" class="filter-menu">
                <div v-for="category in categories" :key="category" class="filter-option">
                    <input
                        type="checkbox"
                        :id="category"
                        :value="category"
                        v-model="selectedCategories"
                    />
                    <label :for="category">{{ category }}</label>
                </div>
                <!-- Apply and Clear Buttons -->
                <div class="filter-actions">
                    <button @click="applyFilters" class="apply-btn">
                        Apply
                    </button>
                    <button @click="clearFilters" class="clear-btn">
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '', // Holds the search query
            isFilterMenuOpen: false, // Controls the visibility of the filter menu
            selectedCategories: [], // Holds the selected categories
        };
    },
    computed: {
        categories() {
            // Get unique categories from the products in the store
            return [...new Set(this.$store.state.products.map(product => product.category))];
        },
    },
    methods: {
        handleSearch() {
            this.$store.dispatch('fetchProducts', { search: this.searchQuery }); // Dispatch search action
        },
        toggleFilterMenu() {
            this.isFilterMenuOpen = !this.isFilterMenuOpen; // Toggle filter menu visibility
        },
        applyFilters() {
            this.$store.commit('setSelectedCategories', this.selectedCategories); // Update selected categories in the store
            this.$store.dispatch('fetchProducts', { search: this.searchQuery }); // Fetch products with filters applied
        },
        clearFilters() {
            this.selectedCategories = []; // Clear selected categories
            this.$store.commit('setSelectedCategories', []); // Clear selected categories in the store
            this.$store.dispatch('fetchProducts', { search: this.searchQuery }); // Fetch products without filters
        },
    },
};
</script>

<style scoped>

.filters {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.search-container {
    display: flex;
    gap: 10px;
    align-items: center;
    flex: 1;
    min-width: 200px; /* Ensure the search container doesn't get too small */
}

input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
}

.search-btn {
    padding: 10px 20px;
    background-color: sandybrown;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.search-btn:hover {
    background-color: #369f6e;
}

.filter-dropdown {
    position: relative;
}

.filter-btn {
    padding: 10px 20px;
    background-color: darkolivegreen;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%; /* Full width on mobile */
}

.filter-btn:hover {
    background-color: #369f6e;
}

.filter-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin-top: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 95%; /* Full width on mobile */
}

.filter-option {
    /* display: flex;
    align-items: center; */
    margin-bottom: 8px;
}

.filter-option input {
    margin-right: 8px;
}

.filter-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.apply-btn {
    padding: 5px 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.apply-btn:hover {
    background-color: #369f6e;
}

.clear-btn {
    padding: 5px 10px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.clear-btn:hover {
    background-color: #cc0000;
}

@media (max-width: 600px) {
    .filters {
        flex-direction: column; /* Stack elements vertically on mobile */
    }

    .search-container {
        width: 100%; /* Full width on mobile */
        padding: 5px 5px;
    }

    .filter-dropdown {
        width: 100%; /* Full width on mobile */
    }

    .filter-menu {
        left: 0; /* Align dropdown menu to the left */
    }
}
</style>