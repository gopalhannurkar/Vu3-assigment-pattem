<template>
    <div>
        <!-- Navigation Bar -->
        <nav>
            <div class="nav-container">
                <!-- Company Logo (Left) -->
                <div class="logo" @click="goToHome">
                    <img src="@/assets/logo.png" alt="Company Logo" />
                </div>

                <!-- Menu (Center) -->
                <ul class="menu">
                    <li><a href="#" @click.prevent="goToHome">Home</a></li>
                    <li><a href="#">Shop</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>

                <!-- Icons + Search + Sign-In + Cart (Right) -->
                <div class="nav-icons">
                    <!-- Search Icon + Input -->
                    <div class="search-container">
                        <i class="fas fa-search"></i>
                        <a href="#">Search</a>
                    </div>

                    <!-- Sign-In Icon + Link -->
                    <div class="signin-container">
                        <i class="fas fa-user"></i>
                        <a href="#">Sign In</a>
                    </div>

                    <!-- Cart Icon -->
                    <div class="cart-icon" @click="goToCart">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">{{ basketItemCount }}</span>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '', // Holds the search query
        };
    },
    computed: {
        basketItemCount() {
            return this.$store.state.basket.length; // Get the number of items in the basket
        },
    },
    methods: {
        handleSearch() {
            this.$store.dispatch('fetchProducts', { search: this.searchQuery }); // Dispatch search action
        },
        goToCart() {
            this.$router.push('/cart'); // Navigate to the cart page
        },
        goToHome(){
           this.$router.push('/'); 
        }
    },
};
</script>

<style>
/* Navigation Bar */
nav {
    /* background-color: #333; */
    color: white;
    /* padding: 10px 20px; */
}
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
}
.logo img {
    height: 40px; /* Adjust logo size */
}

/* Menu (Center) */
.menu {
    display: flex;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;
}
.menu li a {
    color: black;
    text-decoration: none;
    font-size: 16px;
}
.menu li a:hover {
    color: #42b983;
}

/* Icons + Search + Sign-In + Cart (Right) */
.nav-icons {
    display: flex;
    gap: 10px;
    align-items: center;
}
.search-container {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: white;
    padding: 5px 10px;
    border-radius: 4px;
}
.search-container a {
   text-decoration: none;
    font-size: 14px;
        color: black;
}
.search-container i {
    color: #333;
}
.signin-container {
    display: flex;
    align-items: center;
    gap: 5px;
}
.signin-container a {
        color: black;
    text-decoration: none;
    font-size: 14px;
}
.signin-container i {
    color: #333;
}
.signin-container a:hover {
    color: #42b983;
}
.cart-icon {
    position: relative;
    cursor: pointer;
}
.cart-icon i {
    color: #333;
}
.cart-count {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
}

@media (max-width: 768px) {
    .menu, .search-container, .signin-container {
        display: none; /* Hide menu, search, and sign-in on mobile */
    }
    .nav-container {
        justify-content: space-between; /* Ensure logo and cart icon are on opposite sides */
    }
}
</style>