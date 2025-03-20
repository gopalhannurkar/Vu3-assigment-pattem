<template>
    <div class="cart-page">
        <div class="cart-items">
            <h2>Your Cart</h2>
            <table v-if="basket.length > 0" class="product-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in basket" :key="item.id">
                        <td>{{ item.title }}</td>
                        <td>${{ item.price }}</td>
                        <td>
                            <input
                                type="number"
                                v-model="item.quantity"
                                min="1"
                                @change="updateQuantity(item)"
                            />
                        </td>
                        <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                        <td>
                            <button @click="removeFromBasket(item)" class="remove-btn">
                                <i class="fas fa-trash"></i> <!-- Remove icon -->
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
         </div>
        

        <!-- Product Table -->
        

        <!-- Order Summary Table -->
        <div class="cart-items"> 

            <table class="order-summary">
                <thead>
                    <tr>
                        <th colspan="2">Order Summary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>${{ subtotal.toFixed(2) }}</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>${{ shipping.toFixed(2) }}</td>
                    </tr>
                    <tr>
                        <td>
                            <a href="#" @click.prevent="applyCoupon">Add Coupon</a>
                        </td>
                        <td>-${{ discount.toFixed(2) }}</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>${{ total.toFixed(2) }}</strong></td>
                    </tr>
                </tbody>
            </table>

            <!-- Checkout Button -->
            <button @click="checkout" class="checkout-btn">
                Proceed to Checkout
            </button>
        
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            shipping: 0.0, // Fixed shipping cost
            discount: 0.0, // Discount from coupon
        };
    },
    computed: {
        basket() {
            return this.$store.state.basket; // Get the shopping basket
        },
        subtotal() {
            return this.$store.getters.totalPrice; // Get the subtotal from the store
        },
        total() {
            return this.subtotal + this.shipping - this.discount; // Calculate the total
        },
    },
    methods: {
        removeFromBasket(item) {
            this.$store.commit('removeFromBasket', item); // Remove item from the basket
        },
        updateQuantity(item) {
            if (item.quantity < 1) item.quantity = 1; // Ensure quantity is at least 1
            this.$store.commit('updateQuantity', item); // Update quantity in the store
        },
        applyCoupon() {
            // Simulate applying a coupon (10% discount)
            this.discount = this.subtotal * 0.1;
        },
        checkout() {
            alert('Proceeding to checkout...'); // Simulate checkout
        },
    },
};
</script>

<style scoped>
.cart-page {
    /* padding: 20px; */
    /* max-width: 800px; */
    /* margin: 0 auto; */
    display:flex;
    justify-content:space-between;
    gap: 50px;
}
.cart-items{
    flex:1;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}
th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
th {
    background-color: #f5f5f5;
}
.product-table input[type="number"] {
    width: 60px;
    padding: 5px;
    text-align: center;
}
.remove-btn {
    background-color: transparent;
    border: none;
    color: red;
    cursor: pointer;
}
.remove-btn:hover {
    color: darkred;
}
.order-summary {
    margin-top: 40px;
}
.order-summary a {
    color: #42b983;
    text-decoration: none;
}
.order-summary a:hover {
    text-decoration: underline;
}
.checkout-btn {
    display: block;
    width: 100%;
    padding: 15px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
}
.checkout-btn:hover {
    background-color: #369f6e;
}
</style>