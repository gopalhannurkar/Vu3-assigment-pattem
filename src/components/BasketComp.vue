<template>
  <div>
    <h1>Your Basket</h1>
    <div v-for="item in basket" :key="item.id">
      <p>{{ item.name }} - Quantity: {{ item.quantity }} - Price: \${{ item.price * item.quantity }}</p>
      <button @click="removeFromBasket(item.id)">Remove</button>
    </div>
    <h2>Total Price: \${{ totalPrice }}</h2>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['basket']),
    ...mapGetters(['totalPrice']),
  },
  methods: {
    removeFromBasket(productId) {
      this.$store.commit('removeFromBasket', productId);
    },
  },
};
</script>